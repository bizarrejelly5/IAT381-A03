//the number of notes on each page
var numOfNotes = 1;
var notePosition = 0;
var noteDrawerShow = false; //determines if the drawer is closed or open

//user determines if they are using treble or bass
function trebleOrBass(symbol){
	if(symbol == "treble"){
		document.getElementById("symbolTreble").style.left = "0%";
		document.getElementById("symbolBass").style.display = "none";
		document.getElementById("musicSheet").style.display = "block";
	}
	else if(symbol == "bass"){
		document.getElementById("symbolBass").style.left = "5%";
		document.getElementById("symbolTreble").style.display = "none";
		document.getElementById("musicSheet").style.display = "block";
	}
	document.getElementById("chooseStaffText").style.display = "none";
	document.getElementById("bassText").style.display = "none";
	document.getElementById("trebleText").style.display = "none";
}

//opens the note drawer when a line is pressed
function openNotes(x){
	if(noteDrawerShow == true){
		//hide the drawer when clicked outside the drawer
		document.getElementById("showDrawer").style.display = "none";
		noteDrawerShow = false;
	}
	else if(numOfNotes < 5 && noteDrawerShow == false){ //currently only allow up to 4 notes
		//show the note drawer
		document.getElementById("showDrawer").style.display = "block";
		noteDrawerShow = true;
		notePosition = x;
	}
}


//adds note to the sheet and sets its position
function noteToSheet(noteName){
	numOfNotes++;
	var image = document.createElement("IMG");
	image.setAttribute("src", "" + noteName + "");
	image.style.position = "absolute";
	image.style.width = "5vh";
	image.style.left = "" + (17 * numOfNotes) + "vw";
	image.style.top = "" + (9.75*notePosition) + "vh";
	
	if(noteDrawerShow == true){
		document.body.appendChild(image);
		//closes the note drawer if the note is clicked
		openNotes(-1);
	}
	else if(noteDrawerShow == false){
		image.style.display = "none";
	}
}