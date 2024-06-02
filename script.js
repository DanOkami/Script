// JavaScript Document

//Selector
let selector = document.getElementsByClassName("Selector")[0];

//Parallax
let body = document.body;

let sideMenu = document.getElementsByClassName("sideMenu");
let sideMenuBackground = sideMenu[0].children[0];

let banner = document.getElementsByClassName("Banner");
let bannerBackground = banner[0].children[0];

window.onmousemove = function(event) {
	
	let mousePosition = [event.clientX, event.clientY];
	let screenSize = [window.screen.width, window.screen.height];
	
	let mousePositionPercX = 
		((((mousePosition[0]-(screenSize[0]/2)))/50)/screenSize[0]*100)+50;
	
	let mousePositionPercY = 
		((((mousePosition[1]-(screenSize[1]/2)))/50)/screenSize[1]*100)+50;
	
	sideMenuBackground.animate(
		{backgroundPosition: `${mousePositionPercX}% ${mousePositionPercY}%`},
		{duration: 2000, fill: "forwards"});
	bannerBackground.animate(
		{backgroundPosition: `${mousePositionPercX}% ${mousePositionPercY}%`},
		{duration: 2000, fill: "forwards"});
	body.animate(
		{backgroundPosition: `${mousePositionPercX}% ${mousePositionPercY}%`},
		{duration: 1200, fill: "forwards"});

	

	/*selector.animate(
		{top: `${mousePosition[1]/8.5}%`},
		{duration: 1200, fill: "forwards"});*/
}


let sectionButton   = 		document.getElementsByClassName("SectionButton");
let section			= 		document.getElementsByClassName("Section");
let presentation	= 		document.getElementById("presentation");
let work			= 		document.getElementById("work");
let education		= 		document.getElementById("education");
let languages		= 		document.getElementById("languages");

for (let i=0; i<sectionButton.length-3; i++){

	sectionButton[i].addEventListener("click", function(){

		presentation.animate(
			{opacity: 0, transform: "translateY(-100%)", display: "none"},
			{duration: 500, easing: "ease-in-out", fill: "forwards"});
			workAnimation("none", 0, 0);
		education.animate(
			{opacity: 0, transform: "translateY(-100%)", display: "none"},
			{duration: 500, easing: "ease-in-out", fill: "forwards"});
		languages.animate(
			{opacity: 0, transform: "translateY(-100%)", display: "none"},
			{duration: 500, easing: "ease-in-out", fill: "forwards"});

		console.log("clicked: " + i);
		switch(i){
			case 0:
				presentation.animate(
					{display: "block", transform: "translateY(0)", opacity: 1},
					{duration: 500, easing: "ease-in-out", fill: "forwards"});
				break;
			case 1:
				workAnimation("block", 1, "67%");
				break;
			case 2:
				education.animate(
					{display: "block", transform: "translateY(0)", opacity: 1},
					{duration: 500, easing: "ease-in-out", fill: "forwards"});
				education.style.display = "block";
				break;
			case 3:
				languages.animate(
					{display: "block", transform: "translateY(0)", opacity: 1},
					{duration: 500, easing: "ease-in-out", fill: "forwards"});
				languages.style.display = "block";
				break;
			default:
				console.log("No elements to display")
		}
	})

	function workAnimation(display_value, opacity_value, line_width){
		work.animate(
			{display: display_value, opacity: opacity_value},
			{duration: 500, easing: "ease-in-out", fill: "forwards"});
		work.style.display = display_value;
		for(let i = 0; i < work.children[0].childElementCount; i++){
			setTimeout(()=> {
				if(i != 7){
				work.children[0].children[i].animate(
					{opacity: opacity_value},
					{duration: 500, fill: "forwards"}
				)
				} else work.children[0].children[i].animate(
					{opacity: opacity_value, width: line_width},
					{duration: 500, easing: "ease-in-out", fill: "forwards"}
				)
			}, 100*i)
		}
	}
}


//WORK EXPERIENCE SECTION:
let jobButtons = document.getElementsByClassName("Job");
let jobDate = document.getElementsByClassName("JobDate");
let jobDescription = document.getElementsByClassName("WorkDescription");
let progress = document.getElementById("progress");
let lastClicked = -1;

let jobButtonOver = function(x){
	console.log("Over the button: " + x);
	jobButtons[x].style.background = "#DC4545";
	jobDate[x].animate(
		{ transform: "translateY(125%) scale(110%)", opacity: 1, display: "flex" },
		{ duration: 250, easing: "ease-in-out", fill: "forwards" }
	);
}
let jobButtonOut = function(x) {
	console.log("Out of the button: " + x);
	if(jobButtons[x].getAttribute("value") == "0"){
		jobButtons[x].style.background = "white";
		jobDate[x].animate(
			{ transform: "translateY(0)", opacity: 0, display: "hidden" },
			{ duration: 250, easing: "ease-in-out", fill: "forwards" }
		);
	} else if (jobButtons[x].getAttribute("value") == "1"){
		//jobButtons[x].style.background = "white";
		jobDate[x].animate(
			{ transform: "translateY(0)", opacity: 0, display: "hidden" },
			{ duration: 250, easing: "ease-in-out", fill: "forwards" }
	);
	}
}

let mouseOverHandler = [];
let mouseOutHandler = [];

for (let j = 0; j < jobButtons.length; j++){
	mouseOverHandler[j] = createMouseOverHandler(j);
	mouseOutHandler[j] = createMouseOutHandler(j)

	jobButtons[j].addEventListener("mouseover", mouseOverHandler[j]);
	jobButtons[j].addEventListener("mouseout", mouseOutHandler[j]);
	jobButtons[j].addEventListener("click", createClickComputing(j));
}
function createMouseOverHandler(j) {
	return function () {
	  jobButtonOver(j);
	};
  }
function createMouseOutHandler(j) {
	return function () {
	  jobButtonOut(j);
	};
  }
function createClickComputing(j) {
	return function(){
		for (let i = 0; i < jobButtons.length+1; i++){
			jobDescription[i].animate(
				{right: `${100*(j+1)}%`},
				{duration: 500*Math.abs(lastClicked-j), easing: "ease-in-out", fill: "forwards"});
			if(i < jobButtons.length){
				jobButtons[i].removeEventListener("mouseover", mouseOverHandler[i], false);
				jobButtons[i].removeEventListener("mouseout", mouseOutHandler[i], false);
			}
			if(i < j && i < jobButtons.length){
				jobButtons[i].style.background = "#DC4545";
				jobButtons[i].setAttribute("value", "1");
				jobButtons[i].addEventListener("mouseover", mouseOverHandler[i]);
				jobButtons[i].addEventListener("mouseout", mouseOutHandler[i]);
				jobDate[i].animate(
					{ transform: "translateY(0)", opacity: 0, display: "hidden" },
					{ duration: 250, easing: "ease-in-out", fill: "forwards" }
				);
			} else if(i == j && i < jobButtons.length){
				jobButtons[i].setAttribute("value", "1");
				jobButtons[i].style.background = "#DC4545";
			} else if(i > j && i < jobButtons.length){
				jobButtons[i].setAttribute("value", "0");
				jobButtons[i].style.background = "white";
				jobButtons[i].addEventListener("mouseover", mouseOverHandler[i]);
				jobButtons[i].addEventListener("mouseout", mouseOutHandler[i]);
				jobDate[i].animate(
					{ transform: "translateY(0)", opacity: 0, display: "hidden" },
					{ duration: 250, easing: "ease-in-out", fill: "forwards" }
				);
			}
		}
		progress.style.width = (j/(jobButtons.length-1))*100 + "%";
		console.log("Clicked: " + j)
		lastClicked = j;
	}
}

//LANGUAGE SECTION:
let btn_lang = document.getElementsByClassName("LanguageButton");
let langLevel = document.getElementsByClassName("LangLevel");
let progressBar = document.getElementsByClassName("CircProgress");
let div_err = document.getElementsByClassName("LangError")[0];

let lvStep = 58.67;

for (let i = 0; i < btn_lang.length; i++){
	btn_lang[i].addEventListener("click", function(){
		switch (i){
			case 0:
				setLanguageLevels("C2", "C2", "C2", "C2", "C2", false);
				setProgressLevels(lvStep*0, lvStep*0, lvStep*0, lvStep*0, lvStep*0);
				break;
			case 1:
				setLanguageLevels("B2", "B2", "B2", "B2", "B2", false);
				setProgressLevels(lvStep*2, lvStep*2, lvStep*2, lvStep*2, lvStep*2);
				break;
			case 2:
				setLanguageLevels("ERR", "ERR", "ERR", "ERR", "ERR", true);
				setProgressLevels(lvStep*6, lvStep*6, lvStep*6, lvStep*6, lvStep*6);
				break;
			case 3:
				setLanguageLevels("ERR", "ERR", "ERR", "ERR", "ERR", true);
				setProgressLevels(lvStep*6, lvStep*6, lvStep*6, lvStep*6, lvStep*6);
				break;
			case 4:
				setLanguageLevels("ERR", "ERR", "ERR", "ERR", "ERR", true);
				setProgressLevels(lvStep*6, lvStep*6, lvStep*6, lvStep*6, lvStep*6);
				break;
			default:
				console.log("no element available");
		}
	})
}

function setLanguageLevels(listen, speak, read, comm, write, err){
	let parameters = [listen, speak, read, comm, write, err];
	for(let i = 0; i < 5; i++){
		setTimeout(()=> {
			langLevel[i].animate(
				{ opacity: 0},
				{ duration: 100, fill: "forwards" }
			)
		}, 100*i);
	}
	if(err == true){
		div_err.style.display = "flex";
	}else{
		div_err.style.display = "none";
	}
	for(let i = 0; i < 5; i++){
		setTimeout(()=> {
			langLevel[i].children[0].innerHTML = parameters[i];
			langLevel[i].animate(
				{ opacity: 1},
				{ duration: 100, fill: "forwards" }
			)
		}, (100*i)+250);
	}
}

function setProgressLevels(listen, speak, read, comm, write){
	listen = listen + 128;
	speak = speak + 128;
	read = read + 128;
	comm = comm + 128;
	write = write + 128;

	let parameters = [listen, speak, read, comm, write];

	for(let i = 0; i < 5; i++){
		setTimeout(()=> {
			progressBar[i].style = 'stroke-dashoffset: ' + parameters[i];
		}, 100*i);
	}
}
