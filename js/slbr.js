	//Window Onload Event Handlers
	function addEventHandler(oNode, evt, oFunc, bCaptures) {
		if (typeof (window.event) != "undefined")
			oNode.attachEvent("on" + evt, oFunc);
		else
			oNode.addEventListener(evt, oFunc, bCaptures);
	}

	function getEventTarget(e) {
		if (window.event) return window.event.srcElement;
		else return e.target;

	}

	//Math COnstants
	var pi = Math.PI;
	var k = 1934;

	var pi2 = pi / 2; //90 degrees
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

	// Predefined SVG attributes
	discattr = {
		fill: "transparent",
		stroke: "transparent",
		"stroke-width": 3
	};

	var pathParams = {
		fill: "none",
		stroke: "#7f8c8d",
		"stroke-width": 1
	};

	var thickParams = {
		fill: "none",
		stroke: "#7f8c8d",
		"stroke-width": 2
	};


	var losParams = {
		stroke: "#ecf0f1",
		"stroke-width": 2,
		"arrow-end": 'block-wide-long',
		fill: "none"
	};

	var testParams = {
		stroke: "#ff00ff",
		"stroke-width": 0,
		"arrow-end": 'block-wide-long',
		fill: "none"
	};


	var minorParams = {
		stroke: "#7f8c8d",
		"stroke-width": 2
	};

	var narrowParams = {
		stroke: "#7f8c8d",
		"stroke-width": 1,
		opacity: 1
	};

	var textParams = {
		fill: "#7f8c8d",
		"font-size": 10
	};

	var textParams1 = {
		fill: "#7f8c8d",
		"font-size": 8
	};

	var dotParams = {
		fill: "none",
		stroke: "#373435",
		"stroke-width": 1,
		"stroke-dasharray": ". ",
		"font-size": 10
	};

	var dot2Params = {
		fill: "#7f8c8d",
		stroke: "#7f8c8d",
		"stroke-width": 1.5,
		"stroke-dasharray": ". ",
		"font-size": 10
	};

	var wide = 2 * (Math.round($("#mobo").width() / 2) - 6);
	var high = 2 * (Math.round($("#mobo").height() / 2));
	var r = Snap("#mobosvg");


	var w = 2 * (Math.round($("#holder").width() / 2));
	var h = 2 * (Math.round(w * 1.425) / 2);
	var ep = Snap("#evalsvg");

	window.onload = function () {
		//Evaluator Plot (EvalPlot) Container Element Information

		var center = Math.round(w / 2);
		var center2 = w / 2;
		var radium = w / 3.25;

		$(function () {
			$("#evalsvg").width(w).height(h);
		});

		//Maneuvering Board (Moboard) Container Element Information

		$(function () {
			$("#mobosvg").width(wide * 2).height(wide * 1);
		});

		//Quadrant Lines
		// Center Line
		ep.path([
        ["M", center, 10],
        ["L", center, h]
    ]).attr(losParams);

		// Target Cross line
		ep.path([
        ["M", 10, center / 1.25],
        ["L", w - 10, center / 1.25]
    ]).attr(pathParams);

		//OS Cross Line
		ep.path([
        ["M", 10, center2 * 2.15],
        ["L", w - 10, center2 * 2.15]
    ]).attr(pathParams);

		// main circle for target (North Circle)
		var tCircle = ep.circle(center, center / 1.25, radium).attr(pathParams);
		tCircle.node.id = "tCircle";
		//Main Circle for Own Ship (South Circle)
		var val = 360;
		var oCircle = ep.circle(center, center2 * 2.15, radium).attr(pathParams);
		oCircle.node.id = "oCircle";
		//Target Motion Vector
		var tVector = ep.path([
        ["M", center, center / 1.25],
        ["L", center, center / 1.25 - radium]
    ]).attr({
			stroke: "#e74c3c",
			"stroke-width": 2
		});
		tVector.node.id = "tVector";
		//Ownship Motion Vector

		var cx = center;
		var cy = center2 * 2.15;

		var oVector = ep.path([
        ["M", cx, cy],
        ["L", center, center2 * 2.15 - radium]
    ]).attr({
			stroke: "#2980b9",
			"stroke-width": 2
		});
		oVector.node.id = "oVector";
		//Aft End Fires 60 degree degraded sector aft of the array 

		//end fire bearings
		var eFX1 = center + ((Math.sin(((0) + pi) + 0.5)) * radium);
		var eFY1 = center2 * 2.15 + ((-1 * (Math.cos(((0) + pi) + 0.5))) * radium);
		var eFX2 = center + ((Math.sin(((0) + pi) - 0.5)) * radium);
		var eFY2 = center2 * 2.15 + ((-1 * (Math.cos(((0) + pi) - 0.5))) * radium);


		var oBaffle = ep.path([
        ["M", center, center2 * 2.15],
        ["L", eFX1, eFY1],
        ["A", radium, radium, 0, 0, 0, eFX2, eFY2],
        ["z"]
    ]).attr({
			fill: "#2980b9",
			opacity: ".5",
			stroke: "#2980b9",
			"stroke-width": 1
		});
		oBaffle.node.id = "oBaffle";
		var oBaffleArray = oBaffle.attr("path");


		ep.circle(center, center2 * 2.15, 6).attr({
			fill: "#2980b9",
			stroke: "#0D1217",
			"stroke-width": 1.5
		});
		ep.circle(center, center / 1.25, 6).attr({
			fill: "#e74c3c",
			stroke: "#0D1217",
			"stroke-width": 1.5
		});

		//End Evaluator Plot Graphics

		var cen = wide / 2;
		var cen2 = wide / 2;
		var radius = wide * 0.45;
		var radius2 = wide * 0.436;
		var radius3 = wide * 0.43;
		var radius4 = wide * 0.42;
		var radius5 = wide * 0.46;
		var radius6 = wide * 0.425;


		r.circle(cen, cen2, radius + 2).attr(thickParams);

		//Create Radial Spoke Lines and degree labels
		for (var i = 0; i < 360; i++) {
			var theta = i * (Math.PI / 180);
			var cos = Math.cos(theta);
			var sin = Math.sin(theta);

			sector = r.path([
            ["M", cen + radius * cos, cen2 + radius * sin],
            ["L", cen + radius2 * cos, cen2 + radius2 * sin]
        ]).attr(dotParams);

		}

		for (var i = 0; i < 36; i++) {
			var theta = i * 10 * (Math.PI / 180);
			var cos = Math.cos(theta);
			var sin = Math.sin(theta);
			dotick = r.path([
            ["M", cen, cen2],
            ["L", cen + radius2 * cos, cen2 + radius2 * sin]
        ]).attr(dotParams);
		}


		for (var i = 0; i < 36; i++) {
			var theta = i * 10 * (Math.PI / 180);
			var cos = Math.cos(theta);
			var sin = Math.sin(theta);

			tick = r.path([
            ["M", cen + radius * cos, cen2 + radius * sin],
            ["L", cen + radius6 * cos, cen2 + radius6 * sin]
        ]).attr(minorParams);

		}
		//Inner Circles
		for (var i = 0; i < 10; i++) {
			var rad = i * (radius / 10);
			circ = r.circle(cen, cen2, rad).attr(dotParams);
		}

		// Inverse Labels
		for (var i = 0; i < 36; i++) {
			var theta = i * 10 * (Math.PI / 180);
			var cos = Math.cos(theta);
			var sin = -1 * Math.sin(theta);

			label1 = r.text((cen - 6 + ((radius - 35) * sin)), (cen2 + 4 + ((radius - 35) * cos)), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams1);
		}

		//Center Circle
		r.circle(cen, cen2, radius / 10).attr(dotParams);

		//Target Motion Vector
		var mtVector = r.path([
        ["M", cen, cen2],
        ["L", cen, cen2 - 1]
    ]).attr({
			stroke: "#e74c3c",
			"stroke-width": 2
		});
		mtVector.node.id = "mtVector";
		//Ownship Motion Vector

		//LOS/TBO Vector
		var losVector = r.path([
        ["M", cen, cen2 - radius - 10],
        ["L", cen, cen2 + radius + 10]
    ]).attr(losParams);
		losVector.node.id = "losVector";


		// Vector Parallel to the LOS/TBO
		var paraVector = r.path([
        ["M", cen, cen2 - radius - 10],
        ["L", cen, cen2 + radius + 10]
    ]).attr(testParams);
		paraVector.node.id = "paraVector";


		/* var perpVector =  r.path([
        ["M", cen-radius -10, cen],
        ["L", cen+radius +10, cen]
    ]).attr(minorParams);
    perpVector.node.id = "perpVector";
	*/

		var moVector = r.path([
        ["M", cen, cen2],
        ["L", cen, cen2 + 1]
    ]).attr({
			stroke: "#2980b9",
			"stroke-width": 2
		});
		moVector.node.id = "moVector";

		var group = r.group();
		var masRec = r.rect(0, 0, wide, wide + 100).attr({
			'fill': 'rgb(11,9,11)'
		});
		group.rect(0, 0, wide, wide).attr({
			fill: "#fff"
		});
		group.circle(cen, cen2, radius + 10).attr({
			fill: "#000"
		});

		masRec.attr({
			mask: group
		});

		// Labels
		for (var i = 0; i < 36; i++) {
			var theta = i * 10 * (Math.PI / 180);
			var cos = Math.cos(theta);
			var sin = Math.sin(theta);

			label = r.text(cen - 10 + ((radius + 18) * sin), cen2 + 4 + ((radius + 18) * (-1 * cos)), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams);
		}

		r.circle(cen, cen2, 4).attr(thickParams);

		//End MoBoard SetUp Function    

		// Target Course Vectors Based on LOS
		// 15 degrees
		var cb1 = ep.circle(center + ((pi12S) * radium), (center / 1.25) + ((-pi12C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).mouseover(function () {
			cb1.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb1.animate({
				"r": 4
			}, 100);
		});

		cb1.node.id = "cBtn1";
		cb1.node.onclick = function () {
			setCrs();
		}
		ep.circle(center + ((pi12S) * radium), (center / 1.25) + ((-pi12C) * radium), 15).attr(discattr).click(function () {
			setCrs();
		}).mouseover(function () {
			cb1.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb1.animate({
				"r": 4
			}, 100);
		});;;

		// 30 degrees						
		var cb2 = ep.circle(center + ((pi6S) * radium), (center / 1.25) + ((-pi6C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).mouseover(function () {
			cb2.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb2.animate({
				"r": 4
			}, 100);
		});
		cb2.node.id = "cBtn2";
		cb2.node.onclick = function () {
			setCrs1();
		}
		ep.circle(center + ((pi6S) * radium), (center / 1.25) + ((-pi6C) * radium), 15).attr(discattr).click(function () {
			setCrs1();
		}).mouseover(function () {
			cb2.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb2.animate({
				"r": 4
			}, 100);
		});;;

		// 45 degrees
		var cb3 = ep.circle(center + ((pi4S) * radium), (center / 1.25) + ((-pi4C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).mouseover(function () {
			cb3.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb3.animate({
				"r": 4
			}, 100);
		});
		cb3.node.id = "cBtn3";
		cb3.node.onclick = function () {
			setCrs2();
		}

		ep.circle(center + ((pi4S) * radium), (center / 1.25) + ((-pi4C) * radium), 15).attr(discattr).click(function () {
			setCrs2();
		}).mouseover(function () {
			cb3.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb3.animate({
				"r": 4
			}, 100);
		});;;

		// 60 degrees
		var cb4 = ep.circle(center + ((pi3S) * radium), (center / 1.25) + ((-pi3C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs3();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});
		ep.circle(center + ((pi3S) * radium), (center / 1.25) + ((pi3C) * radium), 15).attr(discattr).click(function () {
			setCrs3();
		}).mouseover(function () {
			cb4.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb4.animate({
				"r": 4
			}, 100);
		});;;

		// 120 degrees
		var cb5 = ep.circle(center + ((pi3S) * radium), (center / 1.25) + ((pi3C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs4();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((pi3S) * radium), (center / 1.25) + ((pi3C) * radium), 15).attr(discattr).click(function () {
			setCrs4();
		}).mouseover(function () {
			cb5.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb5.animate({
				"r": 4
			}, 100);
		});;;

		// 135 degrees
		var cb6 = ep.circle(center + ((pi4S) * radium), (center / 1.25) + ((pi4C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs5();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((pi4S) * radium), (center / 1.25) + ((pi4C) * radium), 4).attr(discattr).click(function () {
			setCrs5();
		}).mouseover(function () {
			cb6.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb6.animate({
				"r": 4
			}, 100);
		});;;

		// 150 degrees
		var cb7 = ep.circle(center + ((pi6S) * radium), (center / 1.25) + ((pi6C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs6();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((pi6S) * radium), (center / 1.25) + ((pi6C) * radium), 15).attr(discattr).click(function () {
			setCrs6();
		}).mouseover(function () {
			cb7.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb7.animate({
				"r": 4
			}, 100);
		});;;

		// 165 degrees
		var cb8 = ep.circle(center + ((pi12S) * radium), (center / 1.25) + ((pi12C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs8();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});
		ep.circle(center + ((pi12S) * radium), (center / 1.25) + ((pi12C) * radium), 15).attr(discattr).click(function () {
			setCrs8();
		}).mouseover(function () {
			cb8.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb8.animate({
				"r": 4
			}, 100);
		});;;

		// 195 degrees				
		var cb9 = ep.circle(center + ((-pi12S) * radium), (center / 1.25) + ((pi12C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs9();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((-pi12S) * radium), (center / 1.25) + ((pi12C) * radium), 15).attr(discattr).click(function () {
			setCrs9();
		}).mouseover(function () {
			cb9.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb9.animate({
				"r": 4
			}, 100);
		});;;

		// 210 degrees	
		var cb10 = ep.circle(center + ((-pi6S) * radium), (center / 1.25) + ((pi6C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs10();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((-pi6S) * radium), (center / 1.25) + ((pi6C) * radium), 15).attr(discattr).click(function () {
			setCrs10();
		}).mouseover(function () {
			cb10.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb10.animate({
				"r": 4
			}, 100);
		});;;

		// 245 degrees
		var cb11 = ep.circle(center + ((-pi3S) * radium), (center / 1.25) + ((pi3C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs11();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});
		ep.circle(center + ((-pi3S) * radium), (center / 1.25) + ((pi3C) * radium), 15).attr(discattr).click(function () {
			setCrs11();
		}).mouseover(function () {
			cb11.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb11.animate({
				"r": 4
			}, 100);
		});;;

		// 225 degrees

		var cb12 = ep.circle(center + ((-pi4S) * radium), (center / 1.25) + ((pi4C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs12();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});
		ep.circle(center + ((-pi4S) * radium), (center / 1.25) + ((pi4C) * radium), 15).attr(discattr).click(function () {
			setCrs12();
		}).mouseover(function () {
			cb12.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb12.animate({
				"r": 4
			}, 100);
		});;;

		// 300 Degrees Left
		var cb13 = ep.circle(center + ((-pi3S) * radium), (center / 1.25) + ((-pi3C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs13();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});
		ep.circle(center + ((-pi3S) * radium), (center / 1.25) + ((-pi3C) * radium), 15).attr(discattr).click(function () {
			setCrs13();
		}).mouseover(function () {
			cb13.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb13.animate({
				"r": 4
			}, 100);
		});;;

		// 315 Degrees
		var cb14 = ep.circle(center + ((-pi4S) * radium), (center / 1.25) + ((-pi4C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			setCrs14();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((-pi4S) * radium), (center / 1.25) + ((-pi4C) * radium), 15).attr(discattr).click(function () {
			setCrs14();
		}).mouseover(function () {
			cb14.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb14.animate({
				"r": 4
			}, 100);
		});;;
		// 330 Degrees

		var cb15 = ep.circle(center + ((-pi6S) * radium), (center / 1.25) + ((-pi6C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			deg330();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((-pi6S) * radium), (center / 1.25) + ((-pi6C) * radium), 15).attr(discattr).click(function () {
			deg330();
		}).mouseover(function () {
			cb15.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb15.animate({
				"r": 4
			}, 100);
		});;;

		// 60 Degrees Right
		var cb16 = ep.circle(center + ((-pi12S) * radium), (center / 1.25) + ((-pi12C) * radium), 4).attr({
			fill: "#677274",
			stroke: "#0D1217",
			"stroke-width": 1
		}).click(function () {
			deg345();
		}).mouseover(function () {
			this.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			this.animate({
				"r": 4
			}, 100);
		});

		ep.circle(center + ((-pi12S) * radium), (center / 1.25) + ((-pi12C) * radium), 15).attr(discattr).click(function () {
			deg345();
		}).mouseover(function () {
			cb16.animate({
				"r": 8
			}, 100);
		}).mouseout(function () {
			cb16.animate({
				"r": 4
			}, 100);
		});;;
		// End Course Estimates


		// end onLoad Script	
	}

	// Input values

	// 6 User Input Values as objects with value properties
	// Own Ships Course

	function osCRS() {
		oc = Snap.rad(parseFloat($("input[name='oCRS']").val(), 10));
		return (oc);
		console.log(oc);
	}

	function osSPD() {
		os = parseFloat($("input[name='oSPD']").val(), 10);
		return (os);
		console.log(os);
	}

	function tCRS() {
		tc = Snap.rad(parseFloat($("input[name='tCRS']").val(), 10));
		return (tc);
		console.log(tc);
	}

	function tSPD() {
		ts = parseFloat($("input[name='tSPD']").val(), 10);
		return (ts);
		console.log(ts);
	}

	function lOS() {
		los = Snap.rad(parseFloat($("input[name='lOS']").val(), 10));
		return (los);
		console.log(los);
	}

	function bRate() {
		br = parseFloat($("input[name='bRate']").val(), 10);
		return (br);
		console.log(br);
	}


	// Derivative Values

	//Relative Bearing
	function relBrg() {

		var relBrg = 0;
		if ((lOS() + (Math.PI * 2)) - osCRS() >= (Math.PI * 2)) {
			relBrg = ((lOS() + (Math.PI * 2)) - osCRS() - Math.PI * 2);
		} else {
			relBrg = (lOS() + (Math.PI * 2)) - osCRS();
		}
		document.getElementById("relBRG").innerHTML = Math.round(Snap.deg(relBrg)) + ' &deg;';

		return Math.round(Snap.deg(relBrg));
	}

	//recipricol bearing
	function repBrg() {
		var repBrg = 0;
		if (lOS() < pi) {
			repBrg = Snap.deg(lOS() + pi);
		} else {
			repBrg = Snap.deg(lOS() - pi);
		}
		document.getElementById("repBRG").innerHTML = Math.round(repBrg) + ' &deg;';

		return Math.round(relBrg);

	}

	// Three Minute Rule
	function tmrUpdater() {
		document.getElementById('tmrPrint').innerHTML = tSPD() * 100;
		document.getElementById('omrPrint').innerHTML = Math.round(tSPD() * 33.333333)
	}

	//Stabilization Time
	function stabTime() {
		//var cableScope = parseInt((document.getElementById('cabscope').value), 10);
		var cableScope = 1500;
		var sTi = ((cableScope * 2) / (osSPD() * 100)).toFixed(1);
		document.getElementById("stabPrint").innerHTML = sTi;
	}


	//Spped In and Across the LOS Math
	//Own Ship Speed Across the Line of Sound

	function llAngle() {
		var llTheta = osCRS() - lOS();
		return (llTheta);
	}

	function tgtAngle() {
		var taTheta = tCRS() - lOS();
		return (taTheta);
	}


	function sOA() {
		var soa = (Math.sin(llAngle()) * osSPD()).toFixed(2);
		if (isNaN(soa)) {
			soa = "0.0";
		}
		document.getElementById("soaRO").textContent = Math.abs(soa) + ' kts';
		return (soa);
	}


	function sOI() {
		var soi = (Math.cos(llAngle()) * osSPD()).toFixed(2);
		if (isNaN(soi)) {
			soi = "0.0";
		}
		document.getElementById("soiRO").textContent = soi + ' kts';
		return (soi);
	}

	function oscMath() {
		sOA();
		sOI();
	}

	//Target Speed Across the Line of Sound

	function sTA() {
		var sta = (Math.sin(tgtAngle()) * tSPD()).toFixed(2);
		if (isNaN(sta)) {
			sta = "0.0";
		}
		document.getElementById('staRO').textContent = Math.abs(sta) + ' kts';
		return (sta);
	}


	function sTI() {
		var sti = (Math.cos(tgtAngle()) * tSPD()).toFixed(2);
		if (isNaN(sti)) {
			sti = "0.0";
		}
		document.getElementById('stiRO').textContent = sti + ' kts';
		return (sti);
	}


	function tgtMath() {
		sTA();
		sTI();
	}

	function sideCheck() {
		var side = true;
		var o = Math.sin(llAngle());
		var t = Math.sin(tgtAngle());
		if (o < 0 && t < 0) {
			side = true;
		} else if (o >= 0 && t >= 0) {
			side = true;
		} else {
			side = false;
		}
		return (side);
	}


	function sRa() {
		var sra = 0;
		if (sideCheck()) {
			sra = sOA() - sTA();
		} else {
			sra = sOA() - sTA();
		}

		return (sra);
	}


	function reqCourses() {
		// Target Best Course Estimator
		var los = los();
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


	//Eval Plot Animate Own Shp Vector
	//Own Ship Vector and baffle Group

	function oscDraw() {
		//Define the vector and the center point of the circle it overlays
		var ep = Snap("#evalsvg");

		var oC = ep.select("#oCircle");
		var oV = ep.select("#oVector");
		var oB = ep.select("#oBaffle");
		var bb = oC.getBBox();
		var cx = bb.x + bb.width / 2;
		var cy = bb.y + bb.width / 2;


		//Moboard Vector	
		var mb = Snap("#mobo");
		var moV = mb.select("#moVector");
		var mcx = wide / 2;
		var mcy = mcx;

		var g = ep.group(oV, oB, oC);

		//Describe Own Ship's Vector length, start and end points
		var oLength = Snap.path.getTotalLength(oV);
		var endPoints = Snap.path.getPointAtLength(oV, oLength);
		var ex = endPoints.x;
		var ey = endPoints.y;

		//Angular value of Own Ship Vector and the Line of Sound    
		var oc = osCRS();
		var lOs = lOS();
		if (lOs === NaN) {
			lOs = 0;
		}

		var os = osSPD();

		function rads() {
			var rad = os * (wide * 0.45 / 20);
			if (document.getElementById('ratio').checked) {
				rad = os * (wide * 0.45 / 50);
				return (rad);
			} else {
				rad = os * (wide * 0.45 / 20);
				return (rad);
			}
		}
		//var rads = os * (wide * 0.45 / 20);

		var startTheta = Snap.angle(cx, cy, ex, ey);
		var newTheta = Snap.deg(oc - lOs);


		//Moboard Own Ship Vector End Points
		var nOX = mcx + (Math.sin(oc) * rads());
		var nOY = mcy + ((-1 * Math.cos(oc)) * rads());

		//Rotate Own Ship Vector and Baffles to proper orientation

		var rotateTo = (startTheta - newTheta) - 90;

		g.attr({
			transform: "rotate(" + rotateTo + " " + cx + " " + cy + ")"
		});

		var pathString = "M" + mcx + "," + mcy + "L" + nOX + "," + nOY + "z";

		moV.attr('d');
		moV.animate({
			d: pathString
		}, 500, mina.easeout);
		return (endPoints);

	}


	//Control Rotation of Target Vector 
	function tgtDraw() {
		//Define the vector and the center point of the circle it overlays

		//Eval plot Vector	
		var ep = Snap("#evalsvg");
		var tC = ep.select("#tCircle");
		var tV = ep.select("#tVector");
		var bb2 = tC.getBBox();
		var cx = bb2.x + bb2.width / 2;
		var cy = bb2.y + bb2.width / 2;

		//Moboard Vector	
		var mb = Snap("#mobo");
		var mtV = mb.select("#mtVector");
		var mcx = wide / 2;
		var mcy = mcx;

		//Angular value of Own Ship Vector and the Line of Sound    
		var tc = tCRS();
		var lOs = lOS();
		if (lOs === NaN) {
			lOs = 0;
		}
		var ts = tSPD();

		function tRads() {
			var rad = ts * (wide * 0.45 / 20);
			if (document.getElementById('ratio').checked) {
				rad = ts * (wide * 0.45 / 50);
				return (rad);
			} else {
				rad = ts * (wide * 0.45 / 20);
				return (rad);
			}
		}
		// var rads = ts * (wide * 0.45 / 20);


		//Describe Own Ship's Vector length, start and end points
		var tLength = Snap.path.getTotalLength(tV);
		var endPoints = Snap.path.getPointAtLength(tV, tLength);
		var ex = endPoints.x;
		var ey = endPoints.y;

		var startTheta = Snap.angle(cx, cy, ex, ey);
		var newTheta = Snap.deg(tgtAngle());

		//Moboard Target Vector End Points
		var nTX = mcx + (Math.sin(tc) * tRads);
		var nTY = mcy + ((-1 * Math.cos(tc)) * tRads);




		//Rotate Own Ship Vector and Baffles to proper orientation

		var rotateTo = (startTheta - newTheta) - 90;

		tV.attr({
			transform: "rotate(" + rotateTo + " " + cx + " " + cy + ")"
		});

		var pathString = "M" + mcx + "," + mcy + "L" + nTX + "," + nTY + "z";

		mtV.attr('d');
		mtV.animate({
			d: pathString
		}, 500, mina.easeout);

	}

	function slbRange() {
		var br = bRate();
		var sra = sRa();

		var range = Math.abs(k * (sra / br)).toFixed(0);
		if (sra == NaN) {
			range = "00000";
		}
		document.getElementById('slbRange').innerHTML = range;

		tmrUpdater();
		stabTime();


		if (relBrg() < 45 && relBrg() > 5) {
			relPos = "Starboard Bow";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 135 && relBrg() > 45) {
			relPos = "Starboard Beam";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 175 && relBrg() > 135) {
			relPos = "Starboard Quarter";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 355 && relBrg() > 315) {
			relPos = "Port Bow";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 315 && relBrg() > 225) {
			relPos = "Port Beam";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 225 && relBrg() > 185) {
			relPos = "Port Quarter";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 5 || relBrg() > 355) {
			relPos = "Dead Ahead";
			document.getElementById("relativePosition").innerHTML = relPos;
		} else if (relBrg() < 185 && relBrg() > 175) {
			relPos = "Dead Astern";
			document.getElementById("relativePosition").innerHTML = relPos;
		}

		repBrg();

	}

	//moboard test stuff
	function losDraw() {
		var cx = wide / 2;
		var cy = cx;

		var mlV = r.select("#losVector");
		var lOs = lOS();

		//Describe LOS's Vector length, start and end points
		var losLength = Snap.path.getTotalLength(mlV);
		var endPoints = Snap.path.getPointAtLength(mlV, losLength);
		var startPoints = Snap.path.getPointAtLength(mlV, 0);

		var sx = startPoints.x;
		var sy = startPoints.y;
		var ex = endPoints.x;
		var ey = endPoints.y;

		var nLX1 = cx + (Math.sin(lOs) * cx);
		var nLY1 = cy + ((-1 * Math.cos(lOs)) * cx);
		var nLX2 = cx + ((-1 * Math.sin(lOs)) * cx);
		var nLY2 = cy + (Math.cos(lOs) * cx);

		//Rotate LOS and TBO to proper orientation   
		/*var newTheta = Snap.deg(lOs);

    var rotateTo = (newTheta);
	
	
    mlV.attr({
        transform: "rotate(" + rotateTo + " " + cx + " " + cy + ")"
    }); */

		mlV.attr('d')
		var pathStringL = 'M ' + (nLX1) + ' ' + (nLY1) + ', L ' + (nLX2) + ' ' + (nLY2);
		mlV.animate({
			d: pathStringL
		}, 0, mina.easeout);



	}

	function paraDraw() {
		var cx1 = wide / 2;
		var cy1 = cx1;

		var mpV = r.select("#paraVector");
		var lOs = lOS();

		//Describe LOS's Vector length, start and end points
		var losLength = Snap.path.getTotalLength(mpV);
		var endPoints = Snap.path.getPointAtLength(mpV, losLength);
		var startPoints = Snap.path.getPointAtLength(mpV, 0);

		var sx1 = startPoints.x;
		var sy1 = startPoints.y;
		var ex1 = endPoints.x;
		var ey1 = endPoints.y;

		var nLX3 = cx1 + (Math.sin(lOs) * cx1);
		var nLY3 = cy1 + ((-1 * Math.cos(lOs)) * cx1);
		var nLX4 = cx1 + ((-1 * Math.sin(lOs)) * cx1);
		var nLY4 = cy1 + (Math.cos(lOs) * cx1);

		mpV.attr('d')
		var pathStringL = 'M ' + (nLX3 + 100) + ' ' + (nLY3 + 100) + ', L ' + (nLX4 + 100) + ' ' + (nLY4 + 100);
		mpV.animate({
			d: pathStringL
		}, 0, mina.easeout);

	}


	function moDraw() {
		losDraw();
		paraDraw();
	}



	function setCrs() {
		var losDeg = lOS();
		var nCRS = Math.round((losDeg + 15) % 360,0);
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs1() {
		var losDeg = lOS();
		var nCRS = (losDeg + 30) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs2() {
		var losDeg = lOS();
		var nCRS = (losDeg + 45) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs3() {
		var losDeg = lOS();
		var nCRS = (losDeg + 60) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs4() {
		var losDeg = lOS();
		var nCRS = (losDeg + 120) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs5() {
		var losDeg = lOS();
		var nCRS = (losDeg + 135) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs6() {
		var losDeg = lOS();
		var nCRS = (losDeg + 150) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs7() {
		var losDeg = lOS();
		var nCRS = (losDeg + 165) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs8() {
		var losDeg = lOS();
		var nCRS = (losDeg + 195) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs9() {
		var losDeg = lOS();
		var nCRS = (losDeg + 210) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}

	function setCrs10() {
		var losDeg = lOS();
		var nCRS = (losDeg + 225) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs11() {
		var losDeg = lOS();
		var nCRS = (losDeg + 240) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs12() {
		var losDeg = lOS();
		var nCRS = (losDeg + 300) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs13() {
		var losDeg = lOS();
		var nCRS = (losDeg + 315) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs14() {
		var losDeg = lOS();
		var nCRS = (losDeg + 330) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}


	function setCrs15() {
		var losDeg = lOS();
		var nCRS = (losDeg + 345) % 360;
		document.getElementById('tCRS').value = nCRS * 1;
		tgtDraw();
	}




	// Toggle Full Screen
	function toggleFullScreen() {
		if (!document.fullscreenElement && // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}


	$(".checkbox").change(function () {
		if (this.checked) {
			$('#fiveOne').css('color', c);
			moDraw();
		}
	});


	// onInput Functions - What happens when user changes or inputs a value
	function oscHandler() {
		oscMath();
		oscDraw();
		paraDraw();
		slbRange();
	}

	function ossHandler() {
		oscMath();
		oscDraw();
		paraDraw();
		slbRange();
	}

	function tcHandler() {
		tgtMath();
		tgtDraw();
		slbRange();
	}

	function tsHandler() {
		tgtMath();
		tgtDraw();
		slbRange();
	}

	function losHandler() {
		oscMath();
		tgtMath();
		slbRange();
		moDraw();
		oscDraw();
		tgtDraw();
	}

	function brHandler() {
		console.log(bRate());
		slbRange();
	}

	//Initialize Event Handlers for user inputs
	// Own Ship Course 
	document.getElementById("oCRS").addEventListener("input", oscHandler);
	document.getElementById("oSPD").addEventListener("input", ossHandler);
	document.getElementById("lOS").addEventListener("input", losHandler);
	document.getElementById("tCRS").addEventListener("input", tcHandler);
	document.getElementById("tSPD").addEventListener("input", tsHandler);
	document.getElementById("bRate").addEventListener("input", brHandler);
