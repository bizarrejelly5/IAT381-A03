//the number of notes on each page
var numOfNotes = 1;
var barWidth = 0; //the width of the colour bars in accordance to the number of notes on sheet
var notePosition = 0;
var noteArray = [];
var noteLength = [];
var noteDrawerShow = false; //determines if the drawer is closed or open
var deleteTrue = false;
var undoTrue = false;
var notesTrue = true;
var image; //the notes
var playbackTrue = false;

// function playBackPage(){
// 		//make more room for the notes so you can scroll right
// 	if((numOfNotes - 1) % 3 == 0){
// 		// var w = document.getElementsByClassName("noteDrawer");
// 		var x = document.getElementsByClassName("blackBar");
// 		var y = document.getElementsByClassName("whiteBar");
// 		var z = document.getElementsByClassName("tealBar");
// 		barWidth++;
// 		// w[0].style.width = "" + (100 + barWidth * 50) + "%";
// 		for(var i = 0; i < 5; i++){
// 			x[i].style.width = "" + (100 + barWidth * 50) + "%";
// 		}
// 		for(var j = 0; j < 4; j++){
// 			y[j].style.width = "" + (100 + barWidth * 50) + "%";
// 		}
// 		for(var k = 0; k < 2; k++){
// 			z[k].style.width = "" + (100 + barWidth * 50) + "%";
// 		}
// 	}
// }

function undo(){
	console.log(undoTrue);
	var undoIcon = document.getElementsByClassName("undo");
	if(undoTrue == false){
		undoTrue = true;
		undoIcon[0].src = "./img/bundo.png";
	}
	else if(undoTrue == true){
		undoTrue = false;
		undoIcon[0].src = "./img/undo.png";
	}
}

function notesClicked(){
	var notesIcon = document.getElementsByClassName("notes");
	var restIcon = document.getElementsByClassName("rest");
	// console.log(notesIcon);
	if(notesTrue == true){
		notesTrue = false;
		notesIcon[0].src = "./img/4bn.png";
		restIcon[0].src = "./img/4r.png";
	}
	else if(notesTrue == false){
		notesTrue = true;
		notesIcon[0].src = "./img/4n.png";
		restIcon[0].src = "./img/4br.png";
	}
	console.log(notesTrue);
}


//shakeJS
window.onload = function() {
	//touch event for mobile, code snippet taken from mozilla 


	
	var myShakeEvent = new Shake({
		threshold: 10
	});
	myShakeEvent.start();
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur(){
		if(undoTrue == true){
			var note = document.getElementById("note" + (noteArray.length + 1) + "");
			document.body.removeChild(note);
			noteArray.pop();
			console.log("asdasd" + noteArray.length);
			numOfNotes--;
			notePosition--;
		}
	}
}


function playSounds(){
	//push something to the end of the array to fake it cuz it doesn't currently play the last note
	noteArray.push("");
	Tone.Transport.start();
	var synth = new Tone.MonoSynth();
	 synth.toMaster();
	 	// //start the transport
	 
 // 	var synth = new Tone.PolySynth(7, Tone.Sampler, {
	// 	"A1" : "./audio/A1.mp3",
	// 	"B1" : "./audio/B1.mp3",
	// 	"C2" : "./audio/C2.mp3",
	// 	"D2" : "./audio/D2.mp3",
	// 	"E2" : "./audio/E2.mp3",
	// 	"F2" : "./audio/F2.mp3",
	// 	"G2" : "./audio/G2.mp3",
	// });
	// synth.toMaster();
	// synth.volume.value = -15;

	 var playNotePosition = 0;
	 
	 //create a callback which is invoked every quarter note
	 Tone.Transport.setInterval(function(time){
		// synth.triggerAttackRelease("A1", noteLength[playNotePosition], time);
		synth.triggerAttackRelease(noteArray[playNotePosition], noteLength[playNotePosition], time);
			var note = document.getElementById("note" + (playNotePosition + 2) + "");
			//change notes to blue
			if(noteLength[playNotePosition] == "4n"){
				note.src = "./img/4bn.png";
			}
			if(noteLength[playNotePosition] == "2n"){
				note.src = "./img/2bn.png";
			}
			if(noteLength[playNotePosition] == "1n"){
				note.src = "./img/1bn.png";
			}
			if(noteLength[playNotePosition] == "4r"){
				note.src = "./img/4br.png";
			}
			if(noteLength[playNotePosition] == "2r"){
				note.src = "./img/2br.png";
			}
			if(noteLength[playNotePosition] == "1r"){
				note.src = "./img/1br.png";
			}
			playNotePosition++;
			console.log(playNotePosition);
			if(playNotePosition >= noteArray.length){
				playNotePosition = 0;

				//change all the notes back to black
				for(var i = 0; i <= noteLength.length+1; i++){
					var note = document.getElementById("note" + (i + 2) + "");
					if(noteLength[i] == "4n"){
						note.src = "./img/4n.png";
						console.log("fuck");
					}
					if(noteLength[i] == "2n"){
						note.src = "./img/2n.png";
					}
					if(noteLength[i] == "1n"){
						note.src = "./img/1n.png";
					}
					if(noteLength[i] == "4r"){
						note.src = "./img/4r.png";
						console.log("fuck");
					}
					if(noteLength[i] == "2r"){
						note.src = "./img/2r.png";
					}
					if(noteLength[i] == "1r"){
						note.src = "./img/1r.png";
					}
				}
				// noteArray.pop();
				// Tone.Transport.stop();
			}
			console.log(playNotePosition);
		}, noteLength[playNotePosition]);		
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
	console.log("notePosition: " + notePosition);
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
	if(notesTrue == true){
		if(notePosition == 0){noteArray.push("F" + 2 + "");}
		if(notePosition == 1){noteArray.push("E" + 2 + "");}
		if(notePosition == 2){noteArray.push("D" + 2 + "");}
		if(notePosition == 3){noteArray.push("C" + 1 + "");}
		if(notePosition == 4){noteArray.push("B" + 1 + "");}
		if(notePosition == 5){noteArray.push("A" + 1 + "");}
		if(notePosition == 6){noteArray.push("G" + 1 + "");}
		if(notePosition == 7){noteArray.push("F" + 1 + "");}
		if(notePosition == 8){noteArray.push("E" + 1 + "");}
	}
	if(notesTrue == false){
		noteArray.push(null);
	}

	document.body.appendChild(image);
	console.log(noteArray);
	console.log(noteLength);
	
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

// for mobile
function handleStart(evt) {
	console.log("touched");
	holdStart = Date.now();
}

function handleEnd(evt) {
	holdTime = Date.now() - holdStart;
	console.log(holdTime);
	// openNotes(4);
	//checks which note will show
	if(notesTrue == true){
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
	}
	if(notesTrue == false){
		if(holdTime <= 250){
			noteToSheet('img/4r.png');
			noteLength.push("4r");
		}
		if(holdTime <= 500 && holdTime >= 250){
			noteToSheet('img/2r.png');
			noteLength.push("2r");
		}
		if(holdTime <= 1000 && holdTime >= 500){
			noteToSheet('img/1r.png');
			noteLength.push("1r");
		}
	}
	//reset the hold time on release
	holdTime = 0;
}

trebleOrBass();

function white1(evt){
	notePosition = 1;
}
function white3(evt){
	notePosition = 3;
}
function white5(evt){
	notePosition = 5;
}
function white7(evt){
	notePosition = 7;
}
function black0(evt){
	notePosition = 0;
}
function black2(evt){
	notePosition = 2;
}
function black4(evt){
	notePosition = 4;
}
function black6(evt){
	notePosition = 6;
}
function black8(evt){
	notePosition = 8;
}