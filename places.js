const noiseScale = [
	"Quiet (~40 dB)",
	"Medium-Quiet (~50 dB)",
	"Medium-Loud (~60 dB)",
	"Loud (~70 dB)"
];

const lightScale = [
	"Dark",
	"Moody",
	"Well-Lit",
	"Bright"
];

const PLACES = [
      //[Identifier, Latitude, Longitude, Max Occupancy, Description]
	["ARMS", 40.431008, -86.914955, 120, "Armstrong (Neil) Hall of Engineering"],
	["BALY", 40.427192, -86.910063, 150, "Bailey (Ralph and Bettye) Hall"],
	["BHEE", 40.428643, -86.911951, 100, "Brown (Max W & Maileen) Family Hall"],
	["BRNG", 40.425577, -86.916278, 200, "Beering (Steven C.) Hall of Liberal Arts and Education"],
	["BRWN", 40.426581, -86.911887, 100, "Brown (Herbert C.) Laboratory of Chemistry"],
	["CHAS", 40.428578, -86.915604, 120, "Chaney-Hale Hall of Science"],
	["CL50", 40.426328, -86.915052, 150, "Class of 1950 Lecture Hall"],
	["DSAI", 40.428954, -86.914870, 100, "Hall of Data Science and AI"],
	["DUDL", 40.427141, -86.911265, 120, "Dudley Hall"],
	["FRNY", 40.429513, -86.913982, 150, "Forney Hall of Chemical Engineering"],
	["GRIS", 40.426342, -86.910845, 100, "Grissom Hall"],
	["HAAS", 40.426818, -86.916326, 120, "Haas (Felix) Hall"],
	["HAMP", 40.430318, -86.914878, 150, "Hampton (Delon and Elizabeth) Hall of Civil Engineering"],
	["HIKS", 40.424535, -86.912653, 400, "Hicks (John W.) Undergraduate Library"],
	["HOVD", 40.428239, -86.914434, 120, "Hovde (Frederick L.) Hall of Administration"],
	["JNSN", 40.429405, -86.915528, 100, "Johnson (Helen R.) Hall of Nursing"],
	["KNOY", 40.427774, -86.911139, 150, "Knoy (Maurice G.) Hall of Technology"],
	["LMBS", 40.427608, -86.911654, 100, "Lambertus Hall"],
	["LWSN", 40.427790, -86.916986, 250, "Lawson (Richard and Patricia) Computer Science Building"],
	["MATH", 40.426214, -86.915764, 150, "Mathematical Sciences Building"],
	["ME",   40.428235, -86.912898, 200, "Mechanical Engineering Building"],
	["MRRT", 40.424552, -86.916997, 120, "Marriott Hall"],
	["MSEE", 40.429354, -86.912646, 150, "Materials and Electrical Engineering Building"],
	["MTHW", 40.424729, -86.916381, 100, "Matthews Hall"],
	["PGSC", 40.429877, -86.911840, 150, "Purdue Graduate Student Center"],
	["PHYS", 40.430197, -86.913522, 120, "Physics Building"],
	["PMU",  40.425033, -86.911373, 500, "Purdue Memorial Union"],
	["PMUC", 40.425385, -86.910673, 150, "Purdue Memorial Union Club"],
	["POTR", 40.427516, -86.912399, 120, "Potter (A.A.) Engineering Center"],
	["PRCE", 40.426651, -86.915055, 100, "Peirce Hall"],
	["PSYC", 40.427043, -86.914942, 120, "Psychological Sciences Building"],
	["RHPH", 40.429754, -86.915976, 120, "Heine (Robert E.) Pharmacy Building"],
	["SC",   40.426469, -86.914372, 150, "Stanley Coulter Hall"],
	["SCHM", 40.425805, -86.915203, 120, "Helen B. Schleman Hall"],
	["STEW", 40.425046, -86.912706, 600, "Stewart Center"],
	["STON", 40.424646, -86.915264, 100, "Stone (Winthrop E.) Hall"],
	["UNIV", 40.425270, -86.915193, 150, "University Hall"],
	["WALC", 40.427412, -86.913220, 1800, "Wilmeth Active Learning Center"],
	["WANG", 40.430458, -86.912556, 100, "Wang (Seng-Liang) Hall"],
	["WTHR", 40.426457, -86.913099, 120, "Wetherill (Richard Benbridge) Laboratory of Chemistry"],
];