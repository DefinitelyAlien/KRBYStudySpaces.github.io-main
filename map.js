// MapLibre
const map = new maplibregl.Map({
	container: "map",
	style: "https://api.maptiler.com/maps/streets-v2/style.json?key=O25HJX84zRELhSSf1dc4",
	center: [-86.91406, 40.42725],
	zoom: 15.75
});

// Preferences storage
let preferences = JSON.parse(localStorage.getItem("preferences")) || {
	light: null,
	sound: null,
	occupancy: null,
	priority: "occupancy"
};

// Favorites storage
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

// Array to store markers for opacity updates
let allMarkers = [];

map.on("load", () => {
	for (let i = 0; i < PLACES.length; i++) {
		let occupancy = Math.random();

		// Marker Element
		let m = document.createElement("div");
		m.className = "custom-marker";
		if (occupancy < 0.51) m.style.borderColor = "#2D9B2B";
		else if (occupancy < 0.66) m.style.borderColor = "#FFD700";
		else if (occupancy < 0.81) m.style.borderColor = "#FFA500";
		else if (occupancy < 0.96) m.style.borderColor = "#D40000";

		// Tiny favorite heart
		let heartMarker = document.createElement("div");
		heartMarker.style.position = "absolute";
		heartMarker.style.top = "-18px";
		heartMarker.style.right = "-18px";
		heartMarker.style.fontSize = "12px";
		heartMarker.style.color = favorites[PLACES[i][0]] ? "pink" : "transparent";
		heartMarker.innerHTML = "❤️";
		m.appendChild(heartMarker);

		// Random light and sound levels
		let lightIndex = Math.floor(Math.random() * 4);
		let noiseIndex = Math.floor(Math.random() * 4);
		const lightIcons = ["☁️", "⛅", "🌤️", "☀️"];
		const noiseIcons = ["🔇", "🔈", "🔉", "🔊"];
		const occupancyIcon = "👥";

		// Popup HTML with heart button
		const popupHTML = `
			<div style="position: relative; font-size: 12.5px; line-height: 1.15; padding-right: 25px;">
				<span class="heart-btn" style="
					position: absolute;
					top: 0;
					right: 0;
					cursor: pointer;
					font-size: 20px;
				">
					${favorites[PLACES[i][0]] ? "♥️" : "🩶"}
				</span>
				<strong style="font-size: 20px;">${PLACES[i][0]}</strong>
				<hr>
				<em style="font-size: 12px; margin-bottom: 10px;">${PLACES[i][4]}</em><br><br>
				<strong>${occupancyIcon} Occupancy:</strong> ${Math.floor(occupancy * PLACES[i][3])}/${PLACES[i][3]}<br>
				<strong>🌡️ Light-Level:</strong> ${lightIcons[lightIndex]} ${lightScale[lightIndex]}<br>
				<strong>🔊 Sound-Level:</strong> ${noiseIcons[noiseIndex]} ${noiseScale[noiseIndex]}
			</div>
		`;

		const marker = new maplibregl.Marker({ element: m })
			.setLngLat([PLACES[i][2], PLACES[i][1]])
			.addTo(map);

		const popup = new maplibregl.Popup({ offset: 25 }).setHTML(popupHTML);
		marker.setPopup(popup);

		// ✅ Store marker info for updating opacity
		allMarkers.push({
			marker: marker,
			element: m,
			heartMarker: heartMarker,
			lightIndex: lightIndex,
			noiseIndex: noiseIndex,
			occupancy: Math.floor(occupancy * PLACES[i][3]),
			maxOccupancy: PLACES[i][3]
		});

		// Attach click listener **when popup opens**
		popup.on("open", () => {
			const heartBtn = popup.getElement().querySelector(".heart-btn");
			if (!heartBtn) return;

			heartBtn.onclick = () => {
				if (favorites[PLACES[i][0]]) {
					favorites[PLACES[i][0]] = false;
					heartBtn.innerHTML = "🩶"; // outline
					heartMarker.style.color = "transparent"; // hide marker heart
				} else {
					favorites[PLACES[i][0]] = true;
					heartBtn.innerHTML = "♥️"; // filled heart
					heartMarker.style.color = "pink"; // show marker heart
				}
				localStorage.setItem("favorites", JSON.stringify(favorites));
			};
		});
	}

	// Function to update marker opacity based on preferences
	function updateMarkerOpacity() {
		allMarkers.forEach((mObj) => {
			let score = 0;
			let lightWeight = 1, soundWeight = 1, occupancyWeight = 1;

			// Adjust weights based on priority
			if (preferences.priority === "light") lightWeight = 2;
			else if (preferences.priority === "sound") soundWeight = 2;
			else if (preferences.priority === "occupancy") occupancyWeight = 2;

			if (preferences.light !== null)
				score += Math.abs(mObj.lightIndex - preferences.light) * lightWeight;

			if (preferences.sound !== null)
				score += Math.abs(mObj.noiseIndex - preferences.sound) * soundWeight;

			if (preferences.occupancy !== null)
				score += (Math.abs(mObj.occupancy - preferences.occupancy) / mObj.maxOccupancy * 3) * occupancyWeight;

			// Set opacity based on weighted score
			if (score >= 6) mObj.element.style.opacity = 0.25;
			else if (score >= 4) mObj.element.style.opacity = 0.7;
			else mObj.element.style.opacity = 1;
		});
	}

	// Geolocation control
	const geoLoc = new maplibregl.GeolocateControl({
		positionOptions: { enableHighAccuracy: true },
		trackUserLocation: false,
		showAccuracyCircle: true
	});
	map.addControl(geoLoc);
	geoLoc.on("trackuserlocationstart", () => { geoLoc.trigger() });

	// Preferences button functionality
	const prefBtn = document.getElementById("preferences-btn");
	const prefPopup = document.getElementById("preferences-popup");

	prefBtn.onclick = () => {
		prefPopup.style.display = prefPopup.style.display === "none" ? "block" : "none";
		// Populate current preferences
		document.getElementById("pref-light").value = preferences.light !== null ? preferences.light : 0;
		document.getElementById("pref-sound").value = preferences.sound !== null ? preferences.sound : 0;
		document.getElementById("pref-occupancy").value = preferences.occupancy !== null ? preferences.occupancy : "";
		document.getElementById("pref-priority").value = preferences.priority;
	};

	document.getElementById("pref-save").onclick = () => {
		preferences.light = parseInt(document.getElementById("pref-light").value);
		preferences.sound = parseInt(document.getElementById("pref-sound").value);
		preferences.occupancy = document.getElementById("pref-occupancy").value ? parseInt(document.getElementById("pref-occupancy").value) : null;
		preferences.priority = document.getElementById("pref-priority").value;
		localStorage.setItem("preferences", JSON.stringify(preferences));
		
		updateMarkerOpacity();

		// Show confirmation message inside popup
		const msgDiv = document.getElementById("pref-message");
		msgDiv.innerText = "✅ Your preferences are saved!";
		msgDiv.style.display = "block";

		// Hide the message after 2 seconds
		setTimeout(() => {
			msgDiv.style.display = "none";
			prefPopup.style.display = "none";
		}, 1000);

		
	};

	// Initial opacity update
	updateMarkerOpacity();
});
