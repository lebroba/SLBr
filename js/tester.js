function oscDraw(){
//Define the vector and the center point of the circle it overlays
    var ep = Snap("#evalsvg");
    
    var oC = ep.select("#oCircle");
    var oV = ep.select("#oVector");	
    var oB = ep.select("#oBaffle");
    var bb = oC.getBBox();
    var cx = bb.x + bb.width/2;
    var cy = bb.y + bb.width/2;


    //Moboard Vector	
    var mb = Snap("#mobo");
    var moV = mb.select("#moVector");
    var mcx = wide / 2;
    var mcy = mcx;
    
    var g = ep.group(oV,oB,oC);
    
//Describe Own Ship's Vector length, start and end points
   var oLength = Snap.path.getTotalLength(oV);
   var endPoints = Snap.path.getPointAtLength(oV, oLength); 
   var ex = endPoints.x;
   var ey = endPoints.y;

//Angular value of Own Ship Vector and the Line of Sound    
    var oc = osCRS();
    var lOs = lOS(); 
	if (lOs ===NaN){
		lOs = 0;
	}

    var os = osSPD();
    var rads = os * (wide * 0.45 / 20);

    var startTheta = Snap.angle(cx, cy, ex, ey);
    var newTheta = Snap.deg(oc-lOs);


   //Moboard Own Ship Vector End Points
    var nOX = mcx + (Math.sin(oc) * rads);
    var nOY = mcy + ((-1 * Math.cos(oc)) * rads);

//Rotate Own Ship Vector and Baffles to proper orientation
    
    var rotateTo = (startTheta - newTheta)-90;
    
	g.attr({transform: "rotate("+rotateTo+" "+cx+" "+cy+")"});

	var pathString = "M"+mcx+","+mcy+"L"+nOX+","+nOY+"z";

   moV.attr('d');
    moV.animate({d: pathString}, 500, mina.easeout);
	return(endPoints);

    sOA();
    sOI();
}



function speedAcross(a,b,c){
	var sA = (Math.sin(a))*b.toFixed(2);
	if (isNaN(sA)) {
		sA=("0.0")
	}
	c = Math.abs(sA) + 'kts';
	return (sA);
	
	speedAcross(llAngle,osSPD, SpeedHolder);
}


function sOA(){
    var soa = (Math.sin(llAngle()) * osSPD()).toFixed(2);
    if (isNaN(soa)) {
        soa = "0.0";
    }
    document.getElementById("soaRO").textContent = Math.abs(soa) + ' kts';
    return(soa);
}


function sOI(){
    var soi = (Math.cos(llAngle())* osSPD()).toFixed(2);
    if (isNaN(soi)) {
        soi = "0.0";
    }
    document.getElementById("soiRO").textContent = soi + ' kts';
    return(soi);
}


