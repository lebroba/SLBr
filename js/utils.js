	$(".spinner").spinner();

	// Set Up Evaluator Plot Graphics
	var w = Math.floor($("#holder").width());
	var h = Math.floor($("#holder").height());

	var top = 0;

	var pi = Math.PI;
	var pi3 = pi / 3; //60 degrees
	var pi4 = pi / 4; //45 degrees
	var pi6 = pi / 6; //30 degrees
	var pi12 = pi / 12; //15 degrees

	var pi3S = Math.sin(pi3); //60 degrees
	var pi3C = Math.cos(pi3);
	var pi4S = Math.sin(pi4); //45 degrees
	var pi6S = Math.sin(pi6); //30 degrees
	var pi12S = Math.sin(pi12); //15 degrees
	var pi4C = Math.cos(pi4); //45 degrees
	var pi6C = Math.cos(pi6); //30 degrees
	var pi12C = Math.cos(pi12); //15 degrees

	var paper = Raphael("holder", w * .9, w * 1.45);
	paper.dragging = false;
	paper.highlight = false;

	var center = Math.round(w / 3);
	var center2 = w / 2;
	var radius = w / 3.25;

	// Center Line
	paper.path([
	 ["M", center, center * 0.25],
	 ["L", center, center * 4.25]
	]).attr({
	 stroke: "#ecf0f1",
	 "stroke-width": 2
	});

	// Target Cross line
	paper.path([
	 ["M", center * 0, center * 1.25],
	 ["L", center * 2, center * 1.25]
	]).attr({
	 stroke: "#7f8c8d",
	 "stroke-width": 1
	});

	//Target Circle    
	// main circle for target
	tc = paper.circle(center, center * 1.25, radius).attr({
	 stroke: "#7f8c8d",
	 "stroke-width": 1
	});

	/* tc.glow({
	    width: 18, opacity: .15,
	    fill: false, color: "#7f8c8d", offset: 2       
	}); */

	//OS Cross Line

	paper.path([
	 ["M", center * 0, center2 * 2.15],
	 ["L", center * 2, center2 * 2.15]
	]).attr({
	 stroke: "#7f8c8d",
	 "stroke-width": 1
	});

	var tVector = paper.path([
	 ["M", center, center * 1.25],
	 ["L", center, center * 1.25]
	]).attr({
	 stroke: "#e74c3c",
	 "stroke-width": 1
	});

	//Center Circle
	paper.circle(center, center * 1.25, 4).attr({
	 fill: "#e74c3c",
	 stroke: "#0D1217",
	 "stroke-width": 1
	});

	tLength = tVector.getTotalLength();
	tVector.node.id = "tVector";
	var tVectorArray = tVector.attr("path");
	tHandle = paper.circle(center * 1.25, center * 1.25, 0).attr({
	 fill: "#8D3315",
	 stroke: "#0D1217",
	 "stroke-width": 1,
	 cursor: "move",
	});

	tHandle.node.id = "tcap"

	// Own Ship Circle
	var oCircle = paper.circle(center, center2 * 2.15, radius).attr({
	 stroke: "#7f8c8d",
	 "stroke-width": 1
	});
	/* oCircle.glow({
	    width: 18, opacity: .15,
	    fill: false, color: "#7f8c8d", offset: 2
	}); */

	var oVector = paper.path([
	 ["M", center, center2 * 2.15],
	 ["L", center, center2 * 2.15]
	]).attr({
	 stroke: "#2980b9",
	 "stroke-width": 1
	});

	paper.circle(center, center2 * 2.15, 4).attr({
	 fill: "#2980b9",
	 stroke: "#0D1217",
	 "stroke-width": 1
	});
	var oBaffle = paper.path([
	 ["M", center, center2 * 2.15],
	 ["L", center, center2 * 1.8],
	 ["A", radius, radius, 0, 0, 0, center, center2 * 1.79],
	 ["z"]
	]).attr({
	 fill: "#2980b9",
	 opacity: ".5",
	 stroke: "#2980b9",
	 "stroke-width": 1
	});
	oBaffle.node.id = "oBaffle";
	oVector.node.id = "oVector";

	var oBaffleArray = oBaffle.attr("path");
	var oVectorArray = oVector.attr("path");
	oHandle = paper.circle(center, center2 * 2.15, 0).attr({
	 fill: "#639ea6",
	 stroke: "#0D1217",
	 "stroke-width": 1,
	 cursor: "move",
	});
	oHandle.node.id = "ocap";

	// SrA Circle
	var sraRO = paper.text(center * 2.2, center2 * 1.65, "SrA ").attr({
	 fill: "#4F5856",
	 "font-size": 14,
	 "font-family": "Roboto"
	});

	sraRO.node.id = "sraRO";
	var sraRO = paper.text(center * 2.2, center2 * 1.48, "0.0").attr({
	 fill: "#ADBFC0",
	 "font-family": "Bender-Light",
	 "font-size": 24
	});

	paper.circle(center * 2.2, center2 * 1.5, center / 2.2).attr({
	 stroke: "#7f8c8d",
	 "stroke-width": 1
	});

	paper.text(center * 2.25, center2 / 4, "Target").attr({
	 fill: "#4F5856",
	 "font-size": 14
	});

	paper.text(center * 2.25, center2 * 2.65, "Own Ship").attr({
	 fill: "#4F5856",
	 "font-size": 14
	});


	// SLBr Logic Start
	function tA() {

	 //Target LOS component variables	
	 //Angles as Degress and Radians
	 var w = $("#holder").width();

	 var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (Math.PI / 180);
	 var crsTDeg = parseInt((document.getElementById('tgtCRS').value), 10);
	 var crsORad = parseFloat(document.getElementById('osCRS').value) * (Math.PI / 180);
	 var crsODeg = parseInt((document.getElementById('osCRS').value), 10);
	 var losRad = parseFloat(document.getElementById('LOS').value) * (Math.PI / 180);
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);

	 var oneEighty = 180 * (Math.PI / 180);

	 //Derived Angles, Sines and Cosines
	 var taRad = (crsTRad - losRad) * (180 / Math.PI);
	 var taDeg = (crsTDeg - losDeg);
	 if ((crsTDeg - losDeg) <= 0) {
	  taDeg = (((crsTDeg - losDeg) + 400) - 40);
	 } else {
	  taDeg = (crsTDeg - losDeg);
	 }

	 var taSin = Math.sin(crsTRad - losRad);
	 var taCos = Math.cos(crsTRad - losRad);
	 var laRad = (crsORad - losRad) * (180 / Math.PI);
	 var laDeg = (crsODeg - losDeg);
	 if ((crsTDeg - losDeg) <= 0) {
	  laDeg = (((crsODeg - losDeg) + 400) - 40);
	 } else {
	  laDeg = (crsODeg - losDeg);
	 }

	 var laSin = Math.sin(crsORad - losRad);
	 var laCos = Math.cos(crsORad - losRad);
	 var aCos = Math.cos(oneEighty + (crsORad - losRad));

	 //Speeds and Rates 

	 var spdT = parseFloat((document.getElementById("tgtSPD").value), 10);
	 var spdO = parseFloat(document.getElementById("osSPD").value, 10);
	 var sTa = Math.abs((spdT * taSin));
	 var sOa = Math.abs((spdO * laSin));
	 var sTi = (spdT * taCos);
	 var sOi = (spdO * aCos);

	 var x = taDeg;
	 if (x >= 180) {
	  x = (taDeg - 180);
	 }

	 var y = laRad;
	 var center = w / 3;
	 var center2 = w / 2.5;

	 var crsDif = (crsORad - crsTRad) * (180 / Math.PI);

	 // Own Ship Quadrant Logic
	 var osQuad1;
	 if (laSin < 0) {
	  osQuad1 = 0;
	 } else {
	  osQuad1 = 10;
	 }

	 var osQuad2;
	 if (laCos < 0) {
	  osQuad2 = 0;
	 } else {
	  osQuad2 = 5;
	 }

	 var osQuad = osQuad1 + osQuad2;

	 // Target Quadrant Logic
	 var tQuad1;
	 if (taSin < 0) {
	  tQuad1 = 0;
	 } else {
	  tQuad1 = 10;
	 }

	 var tQuad2;
	 if (taCos < 0) {
	  tQuad2 = 0;
	 } else {
	  tQuad2 = 5;
	 }

	 var tQuad = tQuad1 + tQuad2;

	 var osQuadVal = 0;
	 if (osQuad == 15) {
	  osQuadVal = 1;
	 } else if (osQuad == 5) {
	  osQuadVal = 2;
	 } else if (osQuad === 0) {
	  osQuadVal = 3;
	 } else if (osQuad == 10) {
	  osQuadVal = 4;
	 }

	 var tQuadVal = 0;
	 if (tQuad == 15) {
	  tQuadVal = 1;
	 } else if (tQuad == 5) {
	  tQuadVal = 2;
	 } else if (tQuad === 0) {
	  tQuadVal = 3;
	 } else if (tQuad == 10) {
	  tQuadVal = 4;
	 }

	 var quadVal = (osQuadVal * 10) + tQuadVal;

	 //Side Checker Logic
	 var sideCheck = false;
	 if (quadVal == 11) {
	  sideCheck = true;
	 } else if (quadVal == 14) {
	  sideCheck = true;
	 } else if (quadVal == 22) {
	  sideCheck = true;
	 } else if (quadVal == 23) {
	  sideCheck = true;
	 } else if (quadVal == 32) {
	  sideCheck = true;
	 } else if (quadVal == 33) {
	  sideCheck = true;
	 } else if (quadVal == 41) {
	  sideCheck = true;
	 } else if (quadVal == 44) {
	  sideCheck = true;
	 }

	 //Relative Speed In & Across the Line of Sound
	 var sO1 = (spdO * laSin);
	 var sT1 = (spdT * taSin);
	 var sT2 = (spdT * taCos);
	 var sO2 = (spdO * laCos);

	 var sRa = 0;
	 if (sideCheck === true) {
	  sRa = Math.abs(sOa - sTa);
	 } else {
	  sRa = Math.abs(sOa + sTa);
	 }

	 var sRi = (sOi + sTi);

	 var brgRATE = parseFloat(document.getElementById('brgRATE').value);
	 var k = 1934;

	 var nTX = center + (taSin * radius);
	 var nTY = center + ((-1 * taCos) * radius);
	 var nOX = center + ((laSin) * radius);
	 var nOY = center2 + ((-1 * laCos) * radius);

	 var lowBR = 0.01;

	 //recipricol bearing
	 var repBrg = 0;
	 if (losDeg < 180) {
	  repBrg = (losDeg + 200) - 20;
	 } else {
	  repBrg = (losDeg - 200) + 20;
	 }

	 //relative bearing
	 var relBrg = 0;
	 if ((losDeg + 360) - crsODeg >= 360) {
	  relBrg = ((losDeg + 360) - crsODeg - 360);
	 } else {
	  relBrg = (losDeg + 360) - crsODeg;
	 }
	 //relative position
	 var stbd1 = true;
	 if (relBrg < 45 && relBrg > 5) {
	  stbd1 = true;
	 } else {
	  stbd1 = false;
	 }

	 var stbd2 = true;
	 if (relBrg < 135 && relBrg > 45) {
	  stbd2 = true;
	 } else {
	  stbd2 = false;
	 }

	 var stbd3 = true;
	 if (relBrg < 175 && relBrg > 135) {
	  stbd3 = true;
	 } else {
	  stbd3 = false;
	 }

	 var port1 = true;
	 if (relBrg < 355 && relBrg > 315) {
	  port1 = true;
	 } else {
	  port1 = false;
	 }

	 var port2 = true;
	 if (relBrg < 315 && relBrg > 225) {
	  port2 = true;
	 } else {
	  port2 = false;
	 }

	 var port3 = true;
	 if (relBrg < 225 && relBrg > 185) {
	  port3 = true;
	 } else {
	  port3 = false;
	 }

	 var dead1 = true;
	 if (relBrg < 5 || relBrg > 355) {
	  dead1 = true;
	 } else {
	  dead1 = false;
	 }

	 var dead2 = true;
	 if (relBrg < 185 && relBrg > 175) {
	  dead2 = true;
	 } else {
	  dead2 = false;
	 }

	 var relPos = "Dead Ahead";
	 if (stbd1 === true) {
	  relPos = "Starboard Bow";
	 } else if (stbd2 === true) {
	  relPos = "Starboard Beam";
	 } else if (stbd3 === true) {
	  relPos = "Starboard Quarter";
	 } else if (port1 === true) {
	  relPos = "Port Bow";
	 } else if (port2 === true) {
	  relPos = "Port Beam";
	 } else if (port3 === true) {
	  relPos = "Port Quarter";
	 } else if (dead1 === true) {
	  relPos = "Dead Ahead";
	 } else if (dead2 === true) {
	  relPos = "Dead Astern";
	 }

	 //line of sound geometry logic

	 var nta = false;
	 if ((x <= 15) || (x >= 165)) {
	  nta = true;
	 }

	 var zbr = false;
	 if (sideCheck === true && crsDif <= 15 && brgRATE <= lowBR && nta === false) {
	  zbr = true;
	 }

	 var pointing = false;
	 if (relBrg <= 15 || relBrg >= 345) {
	  pointing = true;
	 }

	 var lead = false;
	 if (sideCheck === true && sTa > sOa && zbr === false && pointing === false && nta === false) {
	  lead = true;
	 }

	 var overlead;
	 if (sideCheck === true && sOa > sTa && zbr === false && pointing === false && nta === false) {
	  overlead = true;
	 }

	 var lag = false;
	 if (sideCheck === false && pointing === false && nta === false) {
	  lag = true;
	 }

	 var opClos = 0;
	 if (sRi < 0) {
	  opClos = ("CLOSING");
	 } else {
	  opClos = ("OPENING");
	 }

	 var geometry = "Unknown";
	 if (lead === true) {
	  geometry = "LEAD";
	 } else if (overlead === true) {
	  geometry = "OVERLEAD";
	 } else if (lag === true) {
	  geometry = "LAG";
	 } else if (zbr === true) {
	  geometry = "ZBR";
	 } else if (pointing === true) {
	  geometry = "POINTING";
	 } else if (nta === true) {
	  geometry = "NTA";
	 } else {
	  geometry = "Unknown";
	 }

	 //derived range values
	 var maxRange = 0;
	 if (geometry == "OVERLEAD") {
	  maxRange = (Math.abs(sOa / brgRATE) * k).toFixed(0);
	 } else if (geometry == "LAG") {
	  maxRange = (Math.abs(sOa + spdT) / brgRATE * k).toFixed(0);
	 } else if (geometry == "LEAD") {
	  maxRange = ((spdT - sOa) / brgRATE * k).toFixed(0);
	 } else if (geometry == "POINTING") {
	  maxRange = ((spdT * brgRATE) * k).toFixed(0);
	 } else if (geometry == "NTA") {
	  maxRange = "-";
	 } else if (geometry == "ZBR") {
	  maxRange = "-";
	 }

	 if (geometry == "OVERLEAD") {
	  $("#losGeo").click(function() {
	   showpage(2);
	   return false
	  });

	  $(".info").click(function() {
	   showpage(2);
	   return false
	  });
	 } else if (geometry == "LAG") {
	  $("#losGeo").click(function() {
	   showpage(3);
	   return false
	  });
	  $(".info").click(function() {
	   showpage(3);
	   return false
	  });
	 } else if (geometry == "LEAD") {
	  $("#losGeo").click(function() {
	   showpage(1);
	   return false
	  });
	  $(".info").click(function() {
	   showpage(1);
	   return false
	  });
	 } else if (geometry == "POINTING") {
	  $("#losGeo").click(function() {
	   showpage(5);
	   return false
	  });
	  $(".info").click(function() {
	   showpage(5);
	   return false
	  });
	 } else if (geometry == "NTA") {
	  $("#losGeo").click(function() {
	   showpage(6);
	   return false
	  });
	  $(".info").click(function() {
	   showpage(6);
	   return false
	  });
	 } else if (geometry == "ZBR") {
	  $("#losGeo").click(function() {
	   showpage(4);
	   return false
	  });
	  $(".info").click(function() {
	   showpage(4);
	   return false
	  });
	 }


	 var minRange = 0;
	 if (geometry == "OVERLEAD") {
	  minRange = (Math.abs((spdT - sOa) / brgRATE) * k).toFixed(0);
	 } else if (geometry == "LAG") {
	  minRange = (Math.abs(sOa / brgRATE) * k).toFixed(0);
	 }

	 var estRange = 0;
	 if (geometry == "POINTING") {
	  estRange = (Math.abs(spdT / brgRATE) * k).toFixed(0);
	 } else if (geometry == "NTA") {
	  estRange = (Math.abs(sOa) / brgRATE * k).toFixed(0);
	 }

	 // Results of all this madness
	 staRO.attr("text", sTa.toFixed(1) + ' kts');
	 stiRO.attr("text", sTi.toFixed(1) + ' kts');
	 soaRO.attr("text", sOa.toFixed(1) + ' kts');
	 soiRO.attr("text", sOi.toFixed(1) + ' kts');
	 sraRO.attr("text", sRa.toFixed(1) + ' kts');
	 document.getElementById('slbRange').innerHTML = Math.abs(k * sRa / brgRATE).toFixed(0);
	 document.getElementById("tVector").setAttribute("dy", nTY);
	 document.getElementById("tVector").setAttribute("dx", nTX);
	 document.getElementById("oVector").setAttribute("dy", nOY);
	 document.getElementById("oVector").setAttribute("dx", nOX);
	 document.getElementById("recBRG").innerHTML = repBrg + ' &deg;';
	 document.getElementById("repBRG").innerHTML = relBrg + ' &deg;';
	 document.getElementById("relativePosition").innerHTML = relPos;
	 document.getElementById('losOc').innerHTML = opClos;
	 document.getElementById('losGeo').innerHTML = geometry;
	 document.getElementById('maxRNG').innerHTML = maxRange;
	 document.getElementById('minRNG').innerHTML = minRange;
	 document.getElementById('estRNG').innerHTML = estRange;
	 document.getElementById('tmrPrint').innerHTML = Math.round(Math.ceil(spdT * 100));
	 document.getElementById('omrPrint').innerHTML = Math.round(spdT * 33.333333);
	}

	function stabTime() {
	 var cableScope = parseInt((document.getElementById('mfta').value), 10);
	 var spdO = parseInt(document.getElementById("osSPD").value, 10);
	 var sTi = ((cableScope * 2) / (spdO * 100)).toFixed(1);
	 document.getElementById("stabPrint").innerHTML = sTi;
	}

	function reqCourses() {
	 // Target Best Course Estimator
	 var los = parseInt((document.getElementById('LOS').value), 10);
	 //recipricol bearing
	 var repBrg = 0;
	 if (los < 180) {
	  repBrg = (los + 200) - 20;
	 } else {
	  repBrg = (los - 200) + 20;
	 }

	 // 15deg from LOS Overlead side		
	 var brg15lead = repBrg + 15;
	 if (tA.sideCheck === true) {
	  brg15lead = repBrg + 15;
	 }
	 if (brg15lead >= 360) {
	  brg15lead = (repBrg - 345);
	 } else {
	  brg15lead = repBrg + 15;
	 }

	 // 30deg from LOS Overlead side		
	 var brg30lead = repBrg + 30;
	 if (tA.sideCheck === true) {
	  brg30lead = repBrg + 30;
	 }
	 if (brg30lead >= 360) {
	  brg30lead = (repBrg - 330);
	 } else {
	  brg30lead = (repBrg + 30);
	 }

	 // 45deg from LOS Overlead side
	 var brg45lead = repBrg + 45;
	 if (tA.sideCheck === true) {
	  brg45lead = repBrg + 45;
	 }
	 if (brg45lead >= 360) {
	  brg45lead = (repBrg - 315);
	 } else {
	  brg45lead = (repBrg + 45);
	 }

	 // 60deg from LOS Overlead side
	 var brg60lead = repBrg + 60;
	 if (tA.sideCheck === true) {
	  brg60lead = repBrg + 60;
	 }
	 if (brg60lead >= 360) {
	  brg60lead = (repBrg - 300);
	 } else {
	  brg60lead = (repBrg + 60);
	 }

	 // 15deg from LOS lag side
	 var brg15lag = repBrg - 15;
	 if (tA.sideCheck === true) {
	  brg15lag = repBrg - 15;
	 }
	 if ((repBrg - 15) <= 0) {
	  brg15lag = (repBrg + 345);
	 } else {
	  brg15lag = (repBrg - 15);
	 }

	 // 30deg from LOS lag side
	 var brg30lag = repBrg - 30;
	 if (tA.sideCheck === true) {
	  brg30lag = repBrg - 30;
	 }
	 if ((repBrg - 30) <= 0) {
	  brg30lag = (repBrg + 330);
	 } else {
	  brg30lag = (repBrg - 30);
	 }

	 // 45deg from LOS lag side
	 var brg45lag = repBrg - 45;
	 if (tA.sideCheck === true) {
	  brg45lag = repBrg - 45;
	 }
	 if ((repBrg - 45) <= 0) {
	  brg45lag = (repBrg + 315);
	 } else {
	  brg45lag = (repBrg - 45);
	 }

	 // 60deg from LOS lag side
	 var brg60lag = repBrg - 60;
	 if (tA.sideCheck === true) {
	  brg60lag = repBrg - 60;
	 }
	 if ((repBrg - 60) <= 0) {
	  brg60lag = (repBrg + 300);
	 } else {
	  brg60lag = (repBrg - 60);
	 }

	 document.getElementById('15lead').innerHTML = brg15lead;
	 document.getElementById('30lead').innerHTML = brg30lead;
	 document.getElementById('45lead').innerHTML = brg45lead;
	 document.getElementById('60lead').innerHTML = brg60lead;
	 document.getElementById('15lag').innerHTML = brg15lag;
	 document.getElementById('30lag').innerHTML = brg30lag;
	 document.getElementById('45lag').innerHTML = brg45lag;
	 document.getElementById('60lag').innerHTML = brg60lag;
	}

	// Draw course vector for own ship
	function oscDraw() {
	 var w = $("#holder").width();

	 var pi = Math.PI;

	 var center = (w / 3);
	 var center2 = (w / 2) * 2.15;
	 var radius = (w / 3.25);

	 var crsORad = parseFloat(document.getElementById('osCRS').value) * (Math.PI / 180);
	 var losRad = parseFloat(document.getElementById('LOS').value) * (Math.PI / 180);

	 if (isNaN(losRad)) {
	  losRad = (Math.floor((360 / pi)));
	 }
	 if (isNaN(crsORad)) {
	  crsORad = (Math.floor((90 / pi)));
	 }

	 var laSin = Math.sin(crsORad - losRad);
	 var laCos = Math.cos(crsORad - losRad);

	 var nOX = center + ((laSin) * radius);
	 var nOY = center2 + ((-1 * laCos) * radius);

	 //end fire bearings
	 var endFire1 = (Math.sin(((crsORad - losRad) + pi) +0.5));
	 var endFire2 = (Math.cos(((crsORad - losRad) + pi) +0.5));
	 var endFire3 = (Math.sin(((crsORad - losRad) + pi) -0.5));
	 var endFire4 = (Math.cos(((crsORad - losRad) + pi) -0.5));

	 var eFX1 = center + ((endFire1) * radius);
	 var eFY1 = center2 + ((-1 * endFire2) * radius);
	 var eFX2 = center + ((endFire3) * radius);
	 var eFY2 = center2 + ((-1 * endFire4) * radius);

	 var oanim = Raphael.animation({
	  cx: nOX,
	  cy: nOY
	 }, 200);
	 oHandle.animate(oanim);

	 oBaffleArray[1][1] = eFX1;
	 oBaffleArray[1][2] = eFY1;
	 oBaffleArray[2][6] = eFX2;
	 oBaffleArray[2][7] = eFY2;
	 oBaffle.attr({
	  path: oBaffleArray
	 });

	 oVectorArray[1][1] = nOX;
	 oVectorArray[1][2] = nOY;
	 oVector.attr({
	  path: oVectorArray
	 });
	}

	// Draw course vector for target
	function tgtDraw() {
	 var w = $("#holder").width();

	 var pi = Math.PI;

	 var center = Math.round(w / 3);
	 var center2 = center * 1.25;
	 var radius = (w / 3.25);

	 var losRad = parseFloat(document.getElementById('LOS').value) * (pi / 180);
	 var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (pi / 180);

	 var taSin = Math.sin(crsTRad - losRad);
	 var taCos = Math.cos(crsTRad - losRad);

	 var nTX = center + (taSin * radius);
	 var nTY = center2 + ((-1 * taCos) * radius);

	 var tanim = Raphael.animation({
	  cx: nTX,
	  cy: nTY
	 }, 1e1);
	 tHandle.animate(tanim);

	 tVectorArray[1][1] = nTX;
	 tVectorArray[1][2] = nTY;
	 tVector.attr({
	  path: tVectorArray
	 });

	}

	// Alert if there is an invalid input for O/S Course
	function ocAlert() {
	 var myCrs = document.getElementById('osCRS');
	 if (myCrs.checkValidity() === false) {
	  //alert('Enter Own Ship Course in Degrees True from 0 to 360.');
	  myCrs.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  myCrs.style.background = "white";
	 }
	}

	// Alert if there is an invalid input for O/S/ Speed
	function osAlert() {
	 var mySpd = document.getElementById('osSPD');
	 if (mySpd.checkValidity() === false) {
	  //alert('Enter Own Ship Speed in Knots from 0 to 45.');
	  mySpd.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  mySpd.style.background = "white";
	 }
	}

	// Three Minute Rule
	function tmrUpdater() {
	 var spdT = parseFloat((document.getElementById("tgtSPD").value), 10);
	 document.getElementById('tmrPrint').innerHTML = spdT * 100;
	 document.getElementById('omrPrint').innerHTML = Math.round(spdT * 33.333333)
	}

	function stabTime() {
	 var cableScope = parseInt((document.getElementById('cabscope').value), 10);
	 var spdO = parseInt(document.getElementById("osSPD").value, 10);
	 var sTi = ((cableScope * 2) / (spdO * 100)).toFixed(1);
	 document.getElementById("stabPrint").innerHTML = sTi;
	}

	// Alert if there is an invalid input for Target Course
	function tcAlert() {
	 var hisCrs = document.getElementById('tgtCRS');
	 if (hisCrs.checkValidity() === false) {
	  //alert('Enter Target Course in Degrees True from 0 to 360.');
	  hisCrs.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  hisCrs.style.background = "white";
	 }
	}

	// Alert if there is an invalid input for Target Speed
	function tsAlert() {
	 var hisSpd = document.getElementById('tgtSPD');
	 if (hisSpd.checkValidity() === false) {
	  //alert('Enter Target Speed in Knots from 0 to 45.');
	  hisSpd.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  hisSpd.style.background = "white";
	 }
	}

	// Alert if there is an invalid input for Line of Sound
	function losAlert() {
	 var losTru = document.getElementById('LOS');
	 if (losTru.checkValidity() === false) {
	  //alert('Enter Bearing to Target in Degrees True from 0 to 360.');
	  losTru.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  losTru.style.background = "white";
	 }
	}

	// Alert if there is an invalid input for Bearing Rate
	function brAlert() {
	 var bR = document.getElementById('brgRATE');
	 if (bR.checkValidity() === false) {
	  //alert('Enter Measured Bearing Rate from 0 to 90.');
	  bR.style.background = "rgba(255,0,0,0.5)";
	 } else {
	  bR.style.background = "white";
	 }
	}

	// SVG buttons 
	//15 degress from the LOS
	discattr = {
	 fill: "transparent",
	 stroke: "transparent",
	 "stroke-width": 3
	};

	function setCrs() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 15) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	 return false;
	}

	function deg15() {
	 setCrs();
	 tgtDraw();
	 watchDog();
	}

	function setCrs1() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 30) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	 return false;
	}

	function deg30() {
	 setCrs1();
	 tgtDraw();
	 watchDog();
	}

	function setCrs2() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 45) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg45() {
	 setCrs2();
	 tgtDraw();
	 watchDog();
	}

	function setCrs3() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 60) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg60() {
	 setCrs3();
	 tgtDraw();
	 watchDog();
	}

	function setCrs4() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 120) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg120() {
	 setCrs4();
	 tgtDraw();
	 watchDog();
	}

	function setCrs5() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 135) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg135() {
	 setCrs5();
	 tgtDraw();
	 watchDog();
	}

	function setCrs6() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 150) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg150() {
	 setCrs6();
	 tgtDraw();
	 watchDog();
	}

	function setCrs7() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 165) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg165() {
	 setCrs7();
	 tgtDraw();
	 watchDog();
	}

	function setCrs8() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 195) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg195() {
	 setCrs8();
	 tgtDraw();
	 watchDog();
	}

	function setCrs9() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 210) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg210() {
	 setCrs9();
	 tgtDraw();
	 watchDog();
	}

	function setCrs10() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 225) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg225() {
	 setCrs10();
	 tgtDraw();
	 watchDog();
	}

	function setCrs11() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 240) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg240() {
	 setCrs11();
	 tgtDraw();
	 watchDog();
	}

	function setCrs12() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 300) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg300() {
	 setCrs12();
	 tgtDraw();
	 watchDog();
	}

	function setCrs13() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 315) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg315() {
	 setCrs13();
	 tgtDraw();
	 watchDog();
	}

	function setCrs14() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 330) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg330() {
	 setCrs14();
	 tgtDraw();
	 watchDog();
	}

	function setCrs15() {
	 var losDeg = parseInt((document.getElementById('LOS').value), 10);
	 var nCRS = (losDeg + 345) % 360;
	 document.getElementById('tgtCRS').value = nCRS * 1;
	}

	function deg345() {
	 setCrs15();
	 tgtDraw();
	 watchDog();
	}

	// Slider Controls

	function oscSlider(val) {
	 document.querySelector('#osCRS').value = val;
	}

	function ossSlider(val) {
	 document.querySelector('#osSPD').value = val;
	}

	function losSlider(val) {
	 document.querySelector('#LOS').value = val;
	}

	function brgSlider(val) {
	 document.querySelector('#brgRATE').value = val;
	}

	function tgtSlider(val) {
	 document.querySelector('#tgtCRS').value = val;
	}

	function tgsSlider(val) {
	 document.querySelector('#tgtSPD').value = val;
	}

	function showpage(id) {
	 clearpages()
	 var page = document.getElementById('page' + id);
	 page.style.display = "block";
	}

	function clearpages() {
	 for (var i = 1; i <= 9; i++) {
	  var pages = document.getElementById('page' + i);
	  pages.style.display = "none";
	 }
	}

	$(function() {
	 $('.add').on('click', function() {
	  var $qty = $(this).closest('div').find('.form-control');
	  var currentVal = parseInt($qty.val());
	  var isOver = (currentVal) >= 359;
	  if (!isNaN(currentVal)) {
	   $qty.val(currentVal + 1);
	  }
	  if (isOver) {
	   $qty.val((currentVal * 0) * (+currentVal + 1) || 0);
	  } else {
	   $qty.val((+currentVal + 1) || 0);
	  }
	  watchDog();


	 });

	 $('.minus').on('click', function() {
	  var $qty = $(this).closest('div').find('.form-control');
	  var currentVal = parseInt($qty.val());
	  var isNegative = (currentVal) <= 0;
	  var isNothing = (!currentVal);
	  if (isNothing) {
	   $qty.val(000);
	  }
	  if (isNegative) {
	   $qty.val(360 + (currentVal - 1));
	  } else {
	   $qty.val(currentVal - 1);
	   watchDog();

	  }
	 });

	 var w = $("#holder").width();
	 var h = $("#holder").height();
	 var top = 0;

	 var pi = Math.PI;
	 var pi3 = pi / 3; //60 degrees
	 var pi4 = pi / 4; //45 degrees
	 var pi6 = pi / 6; //30 degrees
	 var pi12 = pi / 12; //15 degrees

	 var pi3S = Math.sin(pi3); //60 degrees
	 var pi3C = Math.cos(pi3);
	 var pi4S = Math.sin(pi4); //45 degrees
	 var pi6S = Math.sin(pi6); //30 degrees
	 var pi12S = Math.sin(pi12); //15 degrees
	 var pi4C = Math.cos(pi4); //45 degrees
	 var pi6C = Math.cos(pi6); //30 degrees
	 var pi12C = Math.cos(pi12); //15 degrees



	 var center = Math.round(w / 3);
	 var center2 = center * 1.25;
	 var radius = (w / 3.25);

	 // Target Course Vectors Based on LOS
	 // 15 degrees
	 var cb1 = paper.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).mouseover(function() {
	  cb1.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb1.animate({
	   "r": 4
	  }, 100);
	 });

	 cb1.node.id = "cBtn1";
	 cb1.node.onclick = function() {
	  deg15();
	 }
	 paper.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function() {
	  deg15();
	 }).mouseover(function() {
	  cb1.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb1.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 30 degrees						
	 var cb2 = paper.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).mouseover(function() {
	  cb2.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb2.animate({
	   "r": 4
	  }, 100);
	 });
	 cb2.node.id = "cBtn2";
	 cb2.node.onclick = function() {
	  deg30();
	 }
	 paper.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function() {
	  deg30();
	 }).mouseover(function() {
	  cb2.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb2.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 45 degrees
	 var cb3 = paper.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).mouseover(function() {
	  cb3.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb3.animate({
	   "r": 4
	  }, 100);
	 });
	 cb3.node.id = "cBtn3";
	 cb3.node.onclick = function() {
	  deg45();
	 }

	 paper.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function() {
	  deg45();
	 }).mouseover(function() {
	  cb3.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb3.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 60 degrees
	 var cb4 = paper.circle(center + ((pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg60();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });
	 paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
	  deg60();
	 }).mouseover(function() {
	  cb4.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb4.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 120 degrees
	 var cb5 = paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg120();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
	  deg120();
	 }).mouseover(function() {
	  cb5.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb5.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 135 degrees
	 var cb6 = paper.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg135();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr(discattr).click(function() {
	  deg135();
	 }).mouseover(function() {
	  cb6.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb6.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 150 degrees
	 var cb7 = paper.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg150();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function() {
	  deg150();
	 }).mouseover(function() {
	  cb7.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb7.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 165 degrees
	 var cb8 = paper.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg165();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });
	 paper.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function() {
	  deg165();
	 }).mouseover(function() {
	  cb8.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb8.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 195 degrees				
	 var cb9 = paper.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg195();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function() {
	  deg195();
	 }).mouseover(function() {
	  cb9.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb9.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 210 degrees	
	 var cb10 = paper.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg210();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function() {
	  deg210();
	 }).mouseover(function() {
	  cb10.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb10.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 245 degrees
	 var cb11 = paper.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg240();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });
	 paper.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
	  deg240();
	 }).mouseover(function() {
	  cb11.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb11.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 225 degrees

	 var cb12 = paper.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg225();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });
	 paper.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 15).attr(discattr).click(function() {
	  deg225();
	 }).mouseover(function() {
	  cb12.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb12.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 300 Degrees Left
	 var cb13 = paper.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg300();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });
	 paper.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 15).attr(discattr).click(function() {
	  deg300();
	 }).mouseover(function() {
	  cb13.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb13.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 315 Degrees
	 var cb14 = paper.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg315();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function() {
	  deg315();
	 }).mouseover(function() {
	  cb14.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb14.animate({
	   "r": 4
	  }, 100);
	 });;;
	 // 330 Degrees

	 var cb15 = paper.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg330();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function() {
	  deg330();
	 }).mouseover(function() {
	  cb15.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb15.animate({
	   "r": 4
	  }, 100);
	 });;;

	 // 60 Degrees Right
	 var cb16 = paper.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
	  fill: "#677274",
	  stroke: "#0D1217",
	  "stroke-width": 1
	 }).click(function() {
	  deg345();
	 }).mouseover(function() {
	  this.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  this.animate({
	   "r": 4
	  }, 100);
	 });

	 paper.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function() {
	  deg345();
	 }).mouseover(function() {
	  cb16.animate({
	   "r": 8
	  }, 100);
	 }).mouseout(function() {
	  cb16.animate({
	   "r": 4
	  }, 100);
	 });;;
	 // End Course Estimates
	});

	function soaDraw() {
	 var soaPerc = soa / spdO * 250;
	 soaGraph.transform(t0, "soaPerc");
	}

	function soiDraw() {
	 var soiPerc = soi / spdO * 250;
	}

	function staDraw() {
	 var soaPerc = sta / spdT * 250;
	}

	function stiDraw() {
	 var soaPerc = sti / spdT * 250;
	}

	$('input[id="osCRS"]').spinner({
	 min: 0,
	 max: 360
	});
	$('input[id="osSPD"]').spinner({
	 min: 0,
	 max: 35
	});
	$('input[id="LOS"]').spinner({
	 min: 0,
	 max: 360
	});
	$('input[id="brgRATE"]').spinner({
	 min: 0,
	 max: 15
	});
	$('input[id="tgtCRS"]').spinner({
	 min: 0,
	 max: 360
	});
	$('input[id="tgtSPD"]').spinner({
	 min: 0,
	 max: 35
	});

	$('.ui-spinner-button').click(function() {
	 $(this).siblings('input').input();
	});

	$('#osCRS').spinner().input(function() {
	 oscDraw();
	 watchDog();
	});
	$('#osSPD').spinner().input(function() {
	 watchDog();
	});
	$('#LOS').spinner().input(function() {
	 oscDraw();
	 tgtDraw();
	 watchDog();
	});
	$('#brgRATE').spinner().input(function() {
	 watchDog();
	});
	$('#tgtCRS').spinner().input(function() {
	 tgtDraw();
	 watchDog();
	});
	$('#tgtSPD').spinner().input(function() {
	 tmrUpdater();
	 watchDog();
	});
	$("button").click(function() {
	 $('input[id="oscSlide"]').toggle();
	});

	function outputUpdate(vol) {

	 document.querySelector('#osCRS').value = vol;

	}

	function mobo() {
	 var wide = $("#findr").width();

	 var pi = Math.PI;
	 var pi3 = pi / 3; //60 degrees
	 var pi4 = pi / 4; //45 degrees
	 var pi6 = pi / 6; //30 degrees
	 var pi12 = pi / 12; //15 degrees

	 var pi3S = Math.sin(pi3); //60 degrees
	 var pi3C = Math.cos(pi3);
	 var pi4S = Math.sin(pi4); //45 degrees
	 var pi6S = Math.sin(pi6); //30 degrees
	 var pi12S = Math.sin(pi12); //15 degrees
	 var pi4C = Math.cos(pi4); //45 degrees
	 var pi6C = Math.cos(pi6); //30 degrees
	 var pi12C = Math.cos(pi12); //15 degrees

	 var center = wide / 2;
	 var center2 = center;
	 var radius = wide * .45;

	 var crsORad = parseFloat(document.getElementById('osCRS').value) * (pi / 180);
	 var losRad = parseFloat(document.getElementById('LOS').value) * (pi / 180);
	 var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (pi / 180);
	 var spdO = parseFloat(document.getElementById("osSPD").value, 10);
	 var spdT = parseFloat(document.getElementById("tgtSPD").value, 10);

	 var laSin = Math.sin(crsORad);
	 var laCos = Math.cos(crsORad);
	 var taSin = Math.sin(crsTRad);
	 var taCos = Math.cos(crsTRad);
	 var thetaSin = Math.sin(losRad);
	 var thetaCos = Math.cos(losRad);
	 var pa = losRad + pi / 2;
	 var paSin = Math.sin(pa);
	 var paCos = Math.cos(pa);

	 var rads = spdO * (radius / 20);
	 var tads = spdT * (radius / 20);

	 var nOX = center + ((laSin) * rads);
	 var nOY = center2 + ((-1 * laCos) * rads);

	 var nTX = center + ((taSin) * tads);
	 var nTY = center2 + ((-1 * taCos) * tads);

	 var nLX = center + ((thetaSin) * center * 0.95);
	 var nLY = center2 + ((-1 * thetaCos) * center * 0.95);
	 var nLX0 = center + ((-1 * thetaSin) * center * 0.95);
	 var nLY0 = center2 + ((thetaCos) * center * 0.95);

    //var length = Math.sqrt((nLX0-nLX)*(nLX0-nLX)+(nLY0-nLY)*(nLY0-nLY));
    //var a = {x:nLX0,y:nLY0};
	//var b = {x:nLX,y:nLY}; 
    // var slope = -1 / ((b.y - a.y) / (b.x - a.x));     
          

    var m = (nLY0 - nLY) / (nLX0 - nLX);
    var b = nLY-(m * nLX);
        
    //bottom points    
	 var nPDX = nOX + ((nLX0-nLX));
	 var nPDY = nOY + ((nLY0-nLY));
        
	 //top points
     var nPDX0 = nOX + (-1 * (nLX0 - nLX));
	 var nPDY0 = nOY + (-1 * (nLY0 - nLY)); 
        
	 var nPX = center + ((paSin) * center * 0.5);
	 var nPY = center2 + ((-1 * paCos) * center * 0.5);
	 var nPX0 = center + ((-1 * paSin) * center);
	 var nPY0 = center2 + ((paCos) * center);

		
		
//Test Function of perpendicular lines
			 var nPPX = nOX + (nPX0 - nPX) ;
	 var nPPY = nOY + (nPY0 - nPY) ;
	 var nPPX0 = nOX + (-1 * (nPX0 - nPX)) ;
	 var nPPY0 = nOY + (-1 * (nPY0 - nPY)) ;
		
		
		
	/*	
	 var nPPX = nOX + (nPX0 - nPX) * .85;
	 var nPPY = nOY + (nPY0 - nPY) * .85;
	 var nPPX0 = nOX + (-1 * (nPX0 - nPX)) * .85;
	 var nPPY0 = nOY + (-1 * (nPY0 - nPY)) * .85;
      */  
	 // Own ship Vector

	 var moanim = Raphael.animation({
	  cx: nOX,
	  cy: nOY
	 }, 200);
	 moHandle.animate(moanim);
	 moVectorArray[0][1] = center;
	 moVectorArray[0][2] = center2;
	 moVectorArray[1][1] = nOX;
	 moVectorArray[1][2] = nOY;
	 moVector.attr({
	  path: moVectorArray
	 });

	 // Target Vector

	 var toanim = Raphael.animation({
	  cx: nTX,
	  cy: nTY
	 }, 1e1);
	 toHandle.animate(moanim);
	 toVectorArray[0][1] = center;
	 toVectorArray[0][2] = center;
	 toVectorArray[1][1] = nTX;
	 toVectorArray[1][2] = nTY;
	 toVector.attr({
	  path: toVectorArray
	 });

	 // LOS Vector

	 var lVectorArray = lVector.attr("path");
	 lVectorArray[0][1] = nLX0;
	 lVectorArray[0][2] = nLY0;
	 lVectorArray[1][1] = nLX;
	 lVectorArray[1][2] = nLY;
	 lVector.attr({
	  path: lVectorArray,
	 });

	 // Parallel Vector
    
	 var pdVectorArray = pdVector.attr("path");
	 pdVectorArray[0][1] = nPDX0;
	 pdVectorArray[0][2] = nPDY0;
	 pdVectorArray[1][1] = nPDX;
	 pdVectorArray[1][2] = nPDY;
	 pdVector.attr({
	  path: pdVectorArray
	 });

    
        
	 // Perpendicular Vector

	 var ppVectorArray = ppVector.attr("path");
	 ppVectorArray[0][1] = nPPX0;
	 ppVectorArray[0][2] = nPPY0;
	 ppVectorArray[1][1] = nPPX;
	 ppVectorArray[1][2] = nPPY;
	 ppVector.attr({
	  path: ppVectorArray
	 });

	 // Data Circles
	 var marbRad = parseInt(document.getElementById("maxRNG").innerHTML, 10);
	 var mirbRad = parseInt(document.getElementById("minRNG").innerHTML, 10);
	 var erbRad = parseInt(document.getElementById("estRNG").innerHTML, 10);

	 tdz.animate({
	  r: tads
	 }, 100);

	 mirb.animate({
	  r: mirbRad / 100
	 }, 100);

	 marb.animate({
	  r: marbRad / 100
	 }, 100);

	 erb.animate({
	  r: erbRad / 100
	 }, 100);
}

	function watchDog() {
	 var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (Math.PI / 180);
	 var crsORad = parseFloat(document.getElementById('osCRS').value) * (Math.PI / 180);
	 var losRad = parseFloat(document.getElementById('LOS').value) * (Math.PI / 180);
	 var spdT = parseFloat((document.getElementById("tgtSPD").value), 10);
	 var spdO = parseFloat(document.getElementById("osSPD").value, 10);
	 var brgRATE = parseFloat(document.getElementById('brgRATE').value, 10);
	 var rng = parseInt($('#slbRange').text().trim());

	 if ((isNaN(crsORad)) || (isNaN(crsTRad)) || (isNaN(losRad)) || (isNaN(spdT)) || (isNaN(spdO)) || (isNaN(brgRATE))) {
	  return false;
	 } else {
	  tA();
	  mobo();
	 }
	}
