//the number of notes on each page
var numOfNotes = 1;
var barWidth = 0; //the width of the colour bars in accordance to the number of notes on sheet
var notePosition = 0;
var noteArray = [];
var noteLength = [];
var noteDrawerShow = false; //determines if the drawer is closed or open
var deleteTrue = false;

var image; //the notes

//shakeJS
window.onload = function() {
	var myShakeEvent = new Shake({
		threshold: 10
	});
	myShakeEvent.start();
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur(){
		var note = document.getElementById("note" + (noteArray.length + 1) + "");
		document.body.removeChild(note);
		noteArray.pop();
		console.log("asdasd" + noteArray.length);
		numOfNotes--;
		notePosition--;
	}
}


function playSounds(){
	var synth = new Tone.MonoSynth();
	 synth.toMaster();
	 
	 var playNotePosition = 0;
	 
	 //create a callback which is invoked every quarter note
	 Tone.Transport.setInterval(function(time){
		 //trigger middle C for the duration of an 8th note
		 
		  synth.triggerAttackRelease(noteArray[playNotePosition], noteLength[playNotePosition], time);
		  playNotePosition++;
		  console.log(playNotePosition);
		  if(playNotePosition > noteArray.length-1){
			playNotePosition = 0;
		  }
		  // var note = document.getElementById("note" + (playNotePosition + 2) + "");
		  // note.img.src = "../img/8t.png";
	  }, "1");
	 
	// //start the transport
	 Tone.Transport.start();
 }
 
//user determines if they are using treble or bass
function trebleOrBass(){
		// document.getElementById("symbolBass").style.display = "none";
	// else if(symbol == "bass"){
	// 	document.getElementById("symbolBass").style.left = "0%";
	// 	document.getElementById("symbolBass").style.top = "25%";
	// 	document.getElementById("symbolTreble").style.display = "none";
	// 	document.getElementById("musicSheet").style.display = "block";
	// }
	// document.getElementById("chooseStaffText").style.display = "none";
	// document.getElementById("bassText").style.display = "none";
	// document.getElementById("trebleText").style.display = "none";
}

//opens the note drawer when a line is pressed
function openNotes(x){
	// if(noteDrawerShow == true){
	// 	//hide the drawer when clicked outside the drawer
	// 	document.getElementById("showDrawer").style.display = "none";
	// 	noteDrawerShow = false;
	// }
	// // else if(numOfNotes < 5 && noteDrawerShow == false){ //currently only allow up to 4 notes
	// else if(noteDrawerShow == false){ //currently only allow up to 4 notes
	// 	//show the note drawer
	// 	document.getElementById("showDrawer").style.display = "block";
	// 	noteDrawerShow = true;
		
	// }
	notePosition = x;
	console.log("noteArray: " + noteArray.length);
}


//adds note to the sheet and sets its position
function noteToSheet(noteName){
	numOfNotes++;
	// var image = document.createElement("IMG");
	// image.setAttribute("src", "" + noteName + "");
	console.log(notePosition);
	image = document.createElement("input");
	image.setAttribute("src", noteName);
	image.setAttribute("type", "image");
	image.setAttribute("id", "note" + numOfNotes + "");
	image.setAttribute("onclick", "deleteNote(" + numOfNotes + ")");
	image.style.position = "absolute";
	image.style.height = "10vh";
	image.style.left = "" + (17 * numOfNotes) + "vw";
	image.style.top = "" + (18 + 4.5 * notePosition) + "%";
	
	//use if statements to determine the actual note
	if(notePosition == 0){noteArray.push("F" + 2 + "");}
	if(notePosition == 1){noteArray.push("E" + 2 + "");}
	if(notePosition == 2){noteArray.push("D" + 2 + "");}
	if(notePosition == 3){noteArray.push("C" + 1 + "");}
	if(notePosition == 4){noteArray.push("B" + 1 + "");}
	if(notePosition == 5){noteArray.push("A" + 1 + "");}
	if(notePosition == 6){noteArray.push("G" + 1 + "");}
	if(notePosition == 7){noteArray.push("F" + 1 + "");}
	if(notePosition == 8){noteArray.push("E" + 1 + "");}


	document.body.appendChild(image);
	console.log(noteArray);
	console.log(noteLength);
	
	// if(noteDrawerShow == true){
	// 	document.body.appendChild(image);
	// 	//closes the note drawer if the note is clicked
	// 	openNotes(-1);
	// }
	// else if(noteDrawerShow == false){
	// 	image.style.display = "none";
	// }
	
	//make more room for the notes so you can scroll right
	if((numOfNotes - 1) % 3 == 0){
		// var w = document.getElementsByClassName("noteDrawer");
		var x = document.getElementsByClassName("blackBar");
		var y = document.getElementsByClassName("whiteBar");
		var z = document.getElementsByClassName("tealBar");
		barWidth++;
		// w[0].style.width = "" + (100 + barWidth * 50) + "%";
		for(var i = 0; i < 5; i++){
			x[i].style.width = "" + (100 + barWidth * 50) + "%";
		}
		for(var j = 0; j < 4; j++){
			y[j].style.width = "" + (100 + barWidth * 50) + "%";
		}
		for(var k = 0; k < 2; k++){
			z[k].style.width = "" + (100 + barWidth * 50) + "%";
		}
	}
}

function deletePressed(){
	// deleteTrue = true;
	// console.log("delete pressed");
	var note = document.getElementById("note" + (noteArray.length + 1) + "");
	document.body.removeChild(note);
	noteArray.pop();
	console.log("asdasd" + noteArray.length);
	numOfNotes--;
	notePosition--;
}

function deleteNote(x){
	console.log(x);
	if(deleteTrue == true){
		var note = document.getElementById("note" + x + "");
		document.body.removeChild(note);
		noteArray[x-2] = null;
		console.log(noteArray);
	}
}

function addPressed(){
	playSounds();
	console.log("asdasd");
}

// hold for time
var holdStart = 0;
var holdTime = 0;
function mouseDown() {
    document.getElementById("line0").style.color = "red";
    holdStart = Date.now();
}


function touchStarts() {
    document.getElementById("line0").style.color = "red";
    holdStart = Date.now();
}

function mouseUp() {
	holdTime = Date.now() - holdStart;
	console.log(holdTime);
	//checks which note will show
	if(holdTime <= 250){
		noteToSheet('img/4n.png');
		noteLength.push("4n");
	}
	if(holdTime <= 500 && holdTime >= 250){
		noteToSheet('img/2n.png');
		noteLength.push("2n");
	}
	if(holdTime <= 1000 && holdTime >= 500){
		noteToSheet('img/1n.png');
		noteLength.push("1n");
	}
	//reset the hold time on release
	holdTime = 0;
}

function touchEnds() {
	holdTime = Date.now() - holdStart;
	console.log(holdTime);
	//checks which note will show
	if(holdTime <= 250){
		noteToSheet('img/4n.png');
		noteLength.push("4n");
	}
	if(holdTime <= 500 && holdTime >= 250){
		noteToSheet('img/2n.png');
		noteLength.push("2n");
	}
	if(holdTime <= 1000 && holdTime >= 500){
		noteToSheet('img/1n.png');
		noteLength.push("1n");
	}
	//reset the hold time on release
	holdTime = 0;
}


trebleOrBass();