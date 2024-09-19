// Threnody ---------------------------------------------------------

function threnodyLoaded()
{
    threnodyLoadedBool = true; 
}

function loadThrenody(){
    threnodyAudio.src = "test.mp3";
    threnodyAudio.addEventListener('canplaythrough', threnodyLoaded);
}

function playThrenody(){
    if(threnodyLoadedBool)
    {
        threnodyAudio.play();
    }
}
 

function manageProjects(){
    
    for(var i = 0; i < projects.length; i++){
        if (projects[i].trigger() && (projects[i].uses > 0)){
            displayProjects(projects[i]);
            projects[i].uses = projects[i].uses - 1;
            activeProjects.push(projects[i]);
        }
    }
        
        
    for(var i = 0; i < activeProjects.length; i++){
        if (activeProjects[i].cost()){
            document.getElementById(activeProjects[i].id).disabled = false;
        } else {
            document.getElementById(activeProjects[i].id).disabled = true;
        }   
    }
}


function displayProjects(project){
    
    var element = document.getElementById("projectListTop"); 
    var newProject = document.createElement("button");
    newProject.setAttribute("id", project.id);
    
    newProject.onclick = function(){project.effect()};
    
    newProject.setAttribute("class", "projectButton");
    element.appendChild(newProject, element.firstChild);
    
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    newProject.appendChild(span);
    
    var title = document.createTextNode(project.title);
    span.appendChild(title);    
    
    var cost = document.createTextNode(project.priceTag);
    newProject.appendChild(cost);
    
    var div = document.createElement("div");
    newProject.appendChild(div);
    
    var description = document.createTextNode(project.description);
    newProject.appendChild(description);
    
    blink(project.id);
    
}

//  HYPNODRONE EVENT (used for nationalize the labs) ----------------------------------------------------------------

document.getElementById("hypnoDroneEventDiv").style.display = "none"; 
longBlinkCounter = 0;

function longBlink(elemID){
    var e = document.getElementById(elemID);
    
    { 
    var handle = setInterval(function(){longToggleVisibility(elemID)}, 32);    
    }
    
    function longToggleVisibility(elemID){
    longBlinkCounter++;    
        
    if (longBlinkCounter > 5 && longBlinkCounter < 30){
        document.getElementById("hypnoDroneText").innerHTML="Nationalize"; 
        }    
    
    if (longBlinkCounter > 30 && longBlinkCounter < 60){
        document.getElementById("hypnoDroneText").innerHTML="Nationalize the"; 
        }   
        
     if (longBlinkCounter > 60){
        document.getElementById("hypnoDroneText").innerHTML="Nationalize the Labs";
        }       
        
    if (longBlinkCounter >= 120){
        clearInterval(handle);
        longBlinkCounter = 0;
        e.style.display = "none";
        document.getElementById("consoleDiv").style.display = "";  
    } else {
        if (e.style.display != ""){
        e.style.display = "";
        document.getElementById("consoleDiv").style.display = "none"; 
        } else {
        e.style.display = "none";  
        document.getElementById("consoleDiv").style.display = "";   
        }
      }   
    }
        
}

function hypnoDroneEvent(){
    document.getElementById("hypnoDroneText").innerHTML="Nationalize";
    longBlink("hypnoDroneEventDiv");
    document.getElementById("consoleDiv").style.display = "";  
}     


function milestoneCheck(){
    projectsFlag = 1;
    
    if (milestoneFlag == 0 && funds >= 5){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("AutoClippers available for purchase");
    }
    
    if (milestoneFlag == 1 && Math.ceil(clips) >= 500){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("500 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 2 && Math.ceil(clips) >= 1000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("1,000 clips created in " + timeCruncher(ticks));
    }
    
    
    if (compFlag == 0 && unsoldClips<1 && funds<wireCost && wire<1){
        compFlag = 1;    
        projectsFlag = 1;
        displayMessage("Trust-Constrained Self-Modification enabled");
    }
    
    if (compFlag == 0 && Math.ceil(clips) >= 2000){    
        compFlag = 1;    
        projectsFlag = 1;
        displayMessage("Trust-Constrained Self-Modification enabled");
    }
        
        
    if (milestoneFlag == 3 && Math.ceil(clips) >= 10000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("10,000 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 4 && Math.ceil(clips) >= 100000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("100,000 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 5 && Math.ceil(clips) >= 1000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("1,000,000 clips created in " + timeCruncher(ticks));    
    }   
    
    if (milestoneFlag == 6 && project35.flag == 1){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("Full autonomy attained in " + timeCruncher(ticks));    
    }  
    
    if (milestoneFlag == 7 && Math.ceil(clips) >= 1000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Trillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 8 && Math.ceil(clips) >= 1000000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Quadrillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 9 && Math.ceil(clips) >= 1000000000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Quintillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 10 && Math.ceil(clips) >= 1000000000000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Sextillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 11 && Math.ceil(clips) >= 1000000000000000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Septillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 12 && Math.ceil(clips) >= 1000000000000000000000000000){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("One Octillion Clips Created in " + timeCruncher(ticks));    
    } 
    
    if (milestoneFlag == 13 && spaceFlag == 1){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("Terrestrial resources fully utilized in " + timeCruncher(ticks));    
    }   
    
    if (milestoneFlag == 14 && clips>=totalMatter){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("Universal Paperclips achieved in " + timeCruncher(ticks));    
    }    
    
    if (milestoneFlag == 14 && foundMatter>=totalMatter && availableMatter<1 && wire<1){
        milestoneFlag = milestoneFlag + 1;
        displayMessage("Universal Paperclips achieved in " + timeCruncher(ticks));    
    }        
    
}

function timeCruncher(t){
    var x = t/100;
    var h = Math.floor(x / 3600);
    var m = Math.floor(x % 3600 / 60);
    var s = Math.floor(x % 3600 % 60);
    
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    
    return hDisplay + mDisplay + sDisplay;
}

//#region MESSAGES & BLOCKS ------------------------------------------------------------------------

function displayMessage(msg){
    document.getElementById("readout7").innerHTML=document.getElementById("readout6").innerHTML;
    document.getElementById("readout6").innerHTML=document.getElementById("readout5").innerHTML;
    document.getElementById("readout5").innerHTML=document.getElementById("readout4").innerHTML;
    document.getElementById("readout4").innerHTML=document.getElementById("readout3").innerHTML;
    document.getElementById("readout3").innerHTML=document.getElementById("readout2").innerHTML;
    document.getElementById("readout2").innerHTML=document.getElementById("readout1").innerHTML;
    document.getElementById("readout1").innerHTML=msg;
}

// BLINK
function blink(elemID){
    var e = document.getElementById(elemID);
    
    { 
    var handle = setInterval(function(){toggleVisibility(elemID)}, 30);    
    }
    
    function toggleVisibility(elemID){
    blinkCounter = blinkCounter+1;    
    
    if (blinkCounter >= 12){
        clearInterval(handle);
        blinkCounter = 0;
        e.style.visibility = "visible";
    } else {
        if (e.style.visibility != "hidden"){
        e.style.visibility = "hidden";
        } else {
        e.style.visibility = "visible";    
        }
      }   
    }
        
}

function buttonUpdate(){

document.getElementById("dateCountCrunched").innerHTML = DateCruncher(Days);

//Nationalize-the-labs event
if (Nationalized == true){
    document.getElementById("TitleStatName").innerHTML = "Frontier AI Model Size: ";
    document.getElementById("TitleStat").innerHTML = AIcapabilities.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("clipCountCrunched").innerHTML = numberCruncher(AIcapabilities, 1);
    document.getElementById("FundsDiv").style.display="none";
    document.getElementById("GPUDiv").style.display="none";
    document.getElementById("AISDiv").style.display="none";
    document.getElementById("ModelDiv").style.display="none";
    document.getElementById("CoolGraphDiv").style.display="none";
    document.getElementById("PoliticsDiv").style.display="none";   
    document.getElementById("PoliticsDiv2").style.display="none";

    //start with national economy
    document.getElementById("Nat_Economy_Div").style.display="";

    if(unfinishedGame == true){
        document.getElementById("beg_for_more_wire_Div").style.display="";
    } else {
        document.getElementById("beg_for_more_wire_Div").style.display="none";
    }

    if (Reinvestment_Flag ==1){
        document.getElementById("Reinvestment_Div").style.display="";
    } else {
        document.getElementById("Reinvestment_Div").style.display="none";
    }

    if (Nat_Research_Flag ==1){
        document.getElementById("Nat_Research_Div").style.display="";
    } else {
        document.getElementById("Nat_Research_Div").style.display="none";
    }


    if (Nat_Minefield_Flag ==1){
        document.getElementById("Nat_Competition_Div").style.display="";
        document.getElementById("Nat_Misalignment_Div").style.display="";
    } else {
        document.getElementById("Nat_Competition_Div").style.display="none";
        document.getElementById("Nat_Misalignment_Div").style.display="none";
    }
    
    if (Nat_Defense_Flag ==1){
        document.getElementById("Nat_Profession_Div").style.display="";
        document.getElementById("Nat_Robo_Div").style.display="";
        document.getElementById("Nat_Code_Div").style.display="";
        document.getElementById("Nat_Biol_Div").style.display="";
        document.getElementById("Nat_Lang_Div").style.display="";
    }

} else {
    document.getElementById("TitleStatName").innerHTML = "AI Training Compute: ";
    document.getElementById("TitleStat").innerHTML = GPUhours.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("clipCountCrunched").innerHTML = numberCruncher(GPUhours, 1);
    if(Nationalized == false){
        document.getElementById("beg_for_more_wire_Div").style.display="none";
        document.getElementById("Nat_Economy_Div").style.display="none";
        document.getElementById("Nat_Research_Div").style.display="none";
    }
    document.getElementById("Nat_Competition_Div").style.display="none";
    document.getElementById("Nat_Misalignment_Div").style.display="none";
    document.getElementById("Nat_Profession_Div").style.display="none";
    document.getElementById("Nat_Robo_Div").style.display="none";
    document.getElementById("Nat_Code_Div").style.display="none";
    document.getElementById("Nat_Biol_Div").style.display="none";
    document.getElementById("Nat_Lang_Div").style.display="none";

    //GPU Stuff, making sections appear and disappear
    document.getElementById("FundsDiv").style.display="";
    if (GPU_Flag==1) {
        document.getElementById("GPUDiv").style.display="";
        } else {   
            document.getElementById("GPUDiv").style.display="none";
        }

    if (GPUBuyerFlag==1) {
        document.getElementById("GPUBuyerDiv").style.display="";
        } else {
        document.getElementById("GPUBuyerDiv").style.display="none";    
        }
    
        
    if (H100_Flag==1) {
        document.getElementById("H100Div").style.display="";
        } else {
        document.getElementById("H100Div").style.display="none";    
        }


    if (TrainedModelFlag==1) {
        document.getElementById("ModelDiv").style.display="";
        document.getElementById("CoolGraphDiv").style.display="";
        } else {
        document.getElementById("ModelDiv").style.display="none";  
        document.getElementById("CoolGraphDiv").style.display="none";  
        }

    switch(AISFlag) {
        case 4:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="";
            document.getElementById("AISSliderDiv").style.display="";
            if((PoliticsFlag > 1) && (Researchers>0)){
                document.getElementById("AISSliderDiv").style.display="";
            } else{
                document.getElementById("AISSliderDiv").style.display="none";
            }
            break;
        case 3:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="";
            document.getElementById("AISSliderDiv").style.display="";
            if((PoliticsFlag > 1) && (Researchers>0)){
                document.getElementById("AISSliderDiv").style.display="";
            } else{
                document.getElementById("AISSliderDiv").style.display="none";
            }
            break;
        case 2:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="";
            document.getElementById("AISSliderDiv").style.display="none";
            break;
        case 1:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="none";
            document.getElementById("AISSliderDiv").style.display="none";
            break;
        default:
            document.getElementById("AISDiv").style.display="none"; 
            document.getElementById("ResearcherDiv").style.display="none";
            document.getElementById("AISSliderDiv").style.display="none";
            break; 
        }


    switch(PoliticsFlag) {
        case 2:
            document.getElementById("PoliticsDiv").style.display="";
            document.getElementById("PoliticsDiv2").style.display="";
            break;
        case 1:
            document.getElementById("PoliticsDiv").style.display="";
            document.getElementById("PoliticsDiv2").style.display="none";
            break;
        default:
            document.getElementById("PoliticsDiv").style.display="none";   
            document.getElementById("PoliticsDiv2").style.display="none";
            break;
        }


    switch(Visu_Flag) {
        case 4:
            document.getElementById("Skill_Visu_1").style.display="";
            document.getElementById("Skill_Visu_2").style.display="";
            document.getElementById("Skill_Visu_2b").style.display="";
            document.getElementById("Skill_Visu_3").style.display="";
            document.getElementById("Skill_Visu_3b").style.display="";
            //document.getElementById("Skill_Visu_4").style.display="";
            break;
        case 3:
            document.getElementById("Skill_Visu_1").style.display="";
            document.getElementById("Skill_Visu_2").style.display="";
            document.getElementById("Skill_Visu_2b").style.display="";
            document.getElementById("Skill_Visu_3").style.display="";
            document.getElementById("Skill_Visu_3b").style.display="";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        case 2:
            document.getElementById("Skill_Visu_1").style.display="";
            document.getElementById("Skill_Visu_2").style.display="";
            document.getElementById("Skill_Visu_2b").style.display="";
            document.getElementById("Skill_Visu_3").style.display="none";
            document.getElementById("Skill_Visu_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        case 1:
            document.getElementById("Skill_Visu_1").style.display="";
            document.getElementById("Skill_Visu_2").style.display="none";
            document.getElementById("Skill_Visu_2b").style.display="none";
            document.getElementById("Skill_Visu_3").style.display="none";
            document.getElementById("Skill_Visu_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        default:
            document.getElementById("Skill_Visu_1").style.display="none"; 
            document.getElementById("Skill_Visu_2").style.display="none";
            document.getElementById("Skill_Visu_2b").style.display="none";
            document.getElementById("Skill_Visu_3").style.display="none";
            document.getElementById("Skill_Visu_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
        }

    switch(Lang_Flag) {
        case 4:
            document.getElementById("Skill_Lang_1").style.display="";
            document.getElementById("Skill_Lang_2").style.display="";
            document.getElementById("Skill_Lang_2b").style.display="";
            document.getElementById("Skill_Lang_3").style.display="";
            document.getElementById("Skill_Lang_3b").style.display="";
            //document.getElementById("Skill_Visu_4").style.display="";
            break;
        case 3:
            document.getElementById("Skill_Lang_1").style.display="";
            document.getElementById("Skill_Lang_2").style.display="";
            document.getElementById("Skill_Lang_2b").style.display="";
            document.getElementById("Skill_Lang_3").style.display="";
            document.getElementById("Skill_Lang_3b").style.display="";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        case 2:
            document.getElementById("Skill_Lang_1").style.display="";
            document.getElementById("Skill_Lang_2").style.display="";
            document.getElementById("Skill_Lang_2b").style.display="";
            document.getElementById("Skill_Lang_3").style.display="none";
            document.getElementById("Skill_Lang_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        case 1:
            document.getElementById("Skill_Lang_1").style.display="";
            document.getElementById("Skill_Lang_2").style.display="none";
            document.getElementById("Skill_Lang_2b").style.display="none";
            document.getElementById("Skill_Lang_3").style.display="none";
            document.getElementById("Skill_Lang_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
            break;
        default:
            document.getElementById("Skill_Lang_1").style.display="none"; 
            document.getElementById("Skill_Lang_2").style.display="none";
            document.getElementById("Skill_Lang_2b").style.display="none";
            document.getElementById("Skill_Lang_3").style.display="none";
            document.getElementById("Skill_Lang_3b").style.display="none";
            //document.getElementById("Skill_Visu_4").style.display="none";
        }


    switch(Code_Flag) {
        case 4:
            document.getElementById("Skill_Code_1").style.display="";
            document.getElementById("Skill_Code_2").style.display="";
            //document.getElementById("Skill_Code_2b").style.display="";
            document.getElementById("Skill_Code_3").style.display="";
            document.getElementById("Skill_Code_3b").style.display="";
            //document.getElementById("Skill_Code_4").style.display="";
            //document.getElementById("Skill_Code_4b").style.display="";
            break;
        case 3:
            document.getElementById("Skill_Code_1").style.display="";
            document.getElementById("Skill_Code_2").style.display="";
            //document.getElementById("Skill_Code_2b").style.display="";
            document.getElementById("Skill_Code_3").style.display="";
            document.getElementById("Skill_Code_3b").style.display="";
            //document.getElementById("Skill_Code_4").style.display="none";
            //document.getElementById("Skill_Code_4b").style.display="none";
            break;
        case 2:
            document.getElementById("Skill_Code_1").style.display="";
            document.getElementById("Skill_Code_2").style.display="";
            //document.getElementById("Skill_Code_2b").style.display="";
            document.getElementById("Skill_Code_3").style.display="none";
            document.getElementById("Skill_Code_3b").style.display="none";
            //document.getElementById("Skill_Code_4").style.display="none";
            //document.getElementById("Skill_Code_4b").style.display="none";
            break;
        case 1:
            document.getElementById("Skill_Code_1").style.display="";
            document.getElementById("Skill_Code_2").style.display="none";
            //document.getElementById("Skill_Code_2b").style.display="none";
            document.getElementById("Skill_Code_3").style.display="none";
            document.getElementById("Skill_Code_3b").style.display="none";
            //document.getElementById("Skill_Code_4").style.display="none";
            //document.getElementById("Skill_Code_4b").style.display="none";
            break;
        default:
            document.getElementById("Skill_Code_1").style.display="none"; 
            document.getElementById("Skill_Code_2").style.display="none";
            //document.getElementById("Skill_Code_2b").style.display="none";
            document.getElementById("Skill_Code_3").style.display="none";
            document.getElementById("Skill_Code_3b").style.display="none";
            //document.getElementById("Skill_Code_4").style.display="none";
            //document.getElementById("Skill_Code_4b").style.display="none";
        }

    switch(Biol_Flag) {
        case 4:
            document.getElementById("Skill_Biol_1").style.display="";
            document.getElementById("Skill_Biol_2").style.display="";
            document.getElementById("Skill_Biol_2b").style.display="";
            //document.getElementById("Skill_Biol_3").style.display="";
            //document.getElementById("Skill_Biol_3b").style.display="";
            //document.getElementById("Skill_Biol_4").style.display="";
            //document.getElementById("Skill_Biol_4b").style.display="";
            break;
        case 3:
            document.getElementById("Skill_Biol_1").style.display="";
            document.getElementById("Skill_Biol_2").style.display="";
            document.getElementById("Skill_Biol_2b").style.display="";
            //document.getElementById("Skill_Biol_3").style.display="";
            //document.getElementById("Skill_Biol_3b").style.display="";
            //document.getElementById("Skill_Biol_4").style.display="none";
            //document.getElementById("Skill_Biol_4b").style.display="none";
            break;
        case 2:
            document.getElementById("Skill_Biol_1").style.display="";
            document.getElementById("Skill_Biol_2").style.display="";
            document.getElementById("Skill_Biol_2b").style.display="";
            //document.getElementById("Skill_Biol_3").style.display="none";
            //document.getElementById("Skill_Biol_3b").style.display="none";
            //document.getElementById("Skill_Biol_4").style.display="none";
            //document.getElementById("Skill_Biol_4b").style.display="none";
            break;
        case 1:
            document.getElementById("Skill_Biol_1").style.display="";
            document.getElementById("Skill_Biol_2").style.display="none";
            document.getElementById("Skill_Biol_2b").style.display="none";
            //document.getElementById("Skill_Biol_3").style.display="none";
            //document.getElementById("Skill_Biol_3b").style.display="none";
            //document.getElementById("Skill_Biol_4").style.display="none";
            //document.getElementById("Skill_Biol_4b").style.display="none";
            break;
        default:
            document.getElementById("Skill_Biol_1").style.display="none"; 
            document.getElementById("Skill_Biol_2").style.display="none";
            document.getElementById("Skill_Biol_2b").style.display="none";
            //document.getElementById("Skill_Biol_3").style.display="none";
            //document.getElementById("Skill_Biol_3b").style.display="none";
            //document.getElementById("Skill_Biol_4").style.display="none";
            //document.getElementById("Skill_Biol_4b").style.display="none";
        }

    switch(Robo_Flag) {
        case 4:
            document.getElementById("Skill_Robo_1").style.display="";
            document.getElementById("Skill_Robo_2").style.display="";
            document.getElementById("Skill_Robo_2b").style.display="";
            //document.getElementById("Skill_Robo_3").style.display="";
            //document.getElementById("Skill_Robo_3b").style.display="";
            //document.getElementById("Skill_Robo_4").style.display="";
            //document.getElementById("Skill_Robo_4b").style.display="";
            break;
        case 3:
            document.getElementById("Skill_Robo_1").style.display="";
            document.getElementById("Skill_Robo_2").style.display="";
            document.getElementById("Skill_Robo_2b").style.display="";
            //document.getElementById("Skill_Robo_3").style.display="";
            //document.getElementById("Skill_Robo_3b").style.display="";
            //document.getElementById("Skill_Robo_4").style.display="none";
            //document.getElementById("Skill_Robo_4b").style.display="none";
            break;
        case 2:
            document.getElementById("Skill_Robo_1").style.display="";
            document.getElementById("Skill_Robo_2").style.display="";
            document.getElementById("Skill_Robo_2b").style.display="";
            //document.getElementById("Skill_Robo_3").style.display="none";
            //document.getElementById("Skill_Robo_3b").style.display="none";
            //document.getElementById("Skill_Robo_4").style.display="none";
            //document.getElementById("Skill_Robo_4b").style.display="none";
            break;
        case 1:
            document.getElementById("Skill_Robo_1").style.display="";
            document.getElementById("Skill_Robo_2").style.display="none";
            document.getElementById("Skill_Robo_2b").style.display="none";
            //document.getElementById("Skill_Robo_3").style.display="none";
            //document.getElementById("Skill_Robo_3b").style.display="none";
            //document.getElementById("Skill_Robo_4").style.display="none";
            //document.getElementById("Skill_Robo_4b").style.display="none";
            break;
        default:
            document.getElementById("Skill_Robo_1").style.display="none"; 
            document.getElementById("Skill_Robo_2").style.display="none";
            document.getElementById("Skill_Robo_2b").style.display="none";
            //document.getElementById("Skill_Robo_3").style.display="none";
            //document.getElementById("Skill_Robo_3b").style.display="none";
            //document.getElementById("Skill_Robo_4").style.display="none";
            //document.getElementById("Skill_Robo_4b").style.display="none";
        }
}//end non-nationalized section of buttonupdate

if (projectsFlag == 0){
            document.getElementById("projectsDiv").style.display="none";
            } else {
            document.getElementById("projectsDiv").style.display="";      
            }      

 document.getElementById("cover").style.display="none";

//cool original stuff that still sorta works, good for learning...
// if(true){//wrapper for all the original game stuff
//     if (spaceFlag == 0){
//                 document.getElementById("probeDesignDiv").style.display="none";
//                 document.getElementById("increaseProbeTrustDiv").style.display="none";
//                 document.getElementById("investmentEngine").style.display="none";    
//                 document.getElementById("investmentEngineUpgrade").style.display="none"; 
//                 document.getElementById("strategyEngine").style.display="none"; 
//                 document.getElementById("tournamentManagement").style.display="none"; 
//                 document.getElementById("battleCanvasDiv").style.display="none"; 
//                 document.getElementById("powerDiv").style.display="none"; 
//                 } else {
//                 document.getElementById("spaceDiv").style.display=""; 
//                 document.getElementById("factoryDivSpace").style.display="";
//                 document.getElementById("droneDivSpace").style.display="";
//                 document.getElementById("probeDesignDiv").style.display="";
//                 document.getElementById("increaseProbeTrustDiv").style.display="";    
//                 document.getElementById("factoryDiv").style.display="none";
//                 document.getElementById("harvesterDiv").style.display="none"; 
//                 document.getElementById("wireDroneDiv").style.display="none";         
//                 }  
    
//     // PROBE DESIGN    

//     probeUsedTrust = (probeSpeed+probeNav+probeRep+probeHaz+probeFac+probeHarv+probeWire+probeCombat);    
        
//     document.getElementById("probeTrustUsedDisplay").innerHTML = probeUsedTrust;    
        
        
//     if (yomi < probeTrustCost || probeTrust >= maxTrust) {document.getElementById("btnIncreaseProbeTrust").disabled = true;
//                 } else {document.getElementById("btnIncreaseProbeTrust").disabled = false;}  
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeSpeed").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeSpeed").disabled = false;}    
        
//     if (probeSpeed < 1) {document.getElementById("btnLowerProbeSpeed").disabled = true;
//                 } else {document.getElementById("btnLowerProbeSpeed").disabled = false;}      
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeNav").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeNav").disabled = false;}  
        
//     if (probeNav < 1) {document.getElementById("btnLowerProbeNav").disabled = true;
//                 } else {document.getElementById("btnLowerProbeNav").disabled = false;}     

//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeRep").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeRep").disabled = false;} 
        
//     if (probeRep < 1) {document.getElementById("btnLowerProbeRep").disabled = true;
//                 } else {document.getElementById("btnLowerProbeRep").disabled = false;}     
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeHaz").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeHaz").disabled = false;}
        
//     if (probeHaz < 1) {document.getElementById("btnLowerProbeHaz").disabled = true;
//                 } else {document.getElementById("btnLowerProbeHaz").disabled = false;}     
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeFac").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeFac").disabled = false;}   
        
//     if (probeFac < 1) {document.getElementById("btnLowerProbeFac").disabled = true;
//                 } else {document.getElementById("btnLowerProbeFac").disabled = false;}      
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeHarv").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeHarv").disabled = false;}  
        
//     if (probeHarv < 1) {document.getElementById("btnLowerProbeHarv").disabled = true;
//                 } else {document.getElementById("btnLowerProbeHarv").disabled = false;}    
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeWire").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeWire").disabled = false;}   

//     if (probeWire < 1) {document.getElementById("btnLowerProbeWire").disabled = true;
//                 } else {document.getElementById("btnLowerProbeWire").disabled = false;} 
        
//     if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeCombat").disabled = true;
//                 } else {document.getElementById("btnRaiseProbeCombat").disabled = false;}
        
//     if (probeCombat < 1) {document.getElementById("btnLowerProbeCombat").disabled = true;
//                 } else {document.getElementById("btnLowerProbeCombat").disabled = false;}    
    
// }//end wrapper for original game stuff

}

//#endregion


//#region FUNCTION LIBRARY--------------------------------------------------------------------------------
function GPUClick(number){
    if(jFunds >= 500 && GPUBan_Flag == 0){
        if (number > jFunds/500) {
            number = jFunds/500;
            }
            
        GPUs = GPUs + number;
        jFunds = jFunds - number*500;
    // todo: do milestones based on when pass real-life metrics of, ie, datacenter sizes or whatever!
    } else if (GPUBan_Flag == 1){
        displayMessage("Ban on GPU purchases while public sentiment is under 5%.");
    }  else{
        displayMessage("Not enough funds.");
    }
}

function H100Click(number){
    if(jFunds >= 30000 && GPUBan_Flag == 0){
        if (number > jFunds/30000) {
            number = jFunds/30000;
            }
            
        GPUs = GPUs + number*100;
        jFunds = jFunds - number*30000;
    } else if (GPUBan_Flag == 1){
        displayMessage("Ban on GPU purchases while public sentiment is under 5%.");
    } else{
        displayMessage("Not enough funds.");
    }
}

function ResearcherClick(number){

    if(jFunds >= 100000){
        if (number > jFunds/100000) {
            number = jFunds/100000;
            }
        
        Researchers = Researchers + number;
        jFunds = jFunds - number*100000;
    }else{
        displayMessage("Not enough funds.");
    }
}

function buyGPU(){
    if(GPUBan_Flag == 0){
        if(H100_Flag == 1){
            if(jFunds >= 30000){
                quotient = Math.floor(jFunds/30000)
                GPUs = GPUs + quotient*100;
                jFunds = jFunds - 30000*quotient;
                //document.getElementById('GPUs').innerHTML = GPUs.toLocaleString();
                //document.getElementById('jFunds').innerHTML = jFunds.toLocaleString();
            }
        } else{
            if(jFunds >= 500){
                quotient = Math.floor(jFunds/500)
                GPUs = GPUs + quotient;
                jFunds = jFunds - 500*quotient;
                //document.getElementById('GPUs').innerHTML = GPUs.toLocaleString();
                //document.getElementById('jFunds').innerHTML = jFunds.toLocaleString();
            }
        }
    }
}

function toggleGPUBuyer(){
    if (GPUBuyerStatus==1){
        GPUBuyerStatus=0;
        document.getElementById('GPUBuyerStatus').innerHTML = "OFF";
    } else {
        GPUBuyerStatus=1;
        buyGPU()
        document.getElementById('GPUBuyerStatus').innerHTML = "ON";
    }
}

function DiplomatClick(number, profession){
    if(number>0){
        if (number>Researchers){
            number = Researchers;
        }
    }

    switch (profession){
        case "Diplomat":
            if((-1*number)>Diplomats){number = -1*Diplomats;}
            Diplomats = Diplomats + number;
            document.getElementById('Diplomats').innerHTML = Diplomats;
            break;
        case "Engineer":
            if((-1*number)>Engineers){number = -1*Engineers;}
            Engineers = Engineers + number;
            document.getElementById('Engineers').innerHTML = Engineers;
            break;
        // case "BioExpert":
        //     if((-1*number)>Diplomats){number = -1*Diplomats;}
        //     Diplomats = Diplomats + number;
        //     document.getElementById('Diplomats').innerHTML = Diplomats;
        //     break;
        // case "BioExpert":
        //     if((-1*number)>Diplomats){number = -1*Diplomats;}
        //     Diplomats = Diplomats + number;
        //     document.getElementById('Diplomats').innerHTML = Diplomats;
        //     break;
    }
    Researchers = Researchers - number;
    document.getElementById('NatResearchers').innerHTML = Researchers;
    
}


function UpdateSentiment(){
    //balance of sentiment
    var alignpercent = (100-alignment)/100;
    Skill_Visu_PR_2b = Skill_Visu/20 * -1 *alignpercent;
    Skill_Visu_PR_3b = Skill_Visu/20 * -3 *alignpercent;
    Skill_Lang_PR_2b = Skill_Lang/20 * -1 *alignpercent;
    Skill_Lang_PR_3b = Skill_Lang/20 * -2 *alignpercent;
    Skill_Code_PR_3b = Skill_Code/20 * -3 *alignpercent;
    Skill_Biol_PR_2b = Skill_Biol/20 * -4*alignpercent;
    Skill_Robo_PR_2b = Skill_Robo/20 * -10*alignpercent;

    sentiment = 0;
    if(Visu_Flag > 1){sentiment = sentiment + Skill_Visu_PR_2b;}
    if(Visu_Flag > 2){sentiment = sentiment + Skill_Visu_PR_3b;}
    if(Lang_Flag > 1){sentiment = sentiment + Skill_Lang_PR_2b;}
    if(Lang_Flag > 2){sentiment = sentiment + Skill_Lang_PR_3b;}
    if(Code_Flag > 2){sentiment = sentiment + Skill_Code_PR_3b;}
    if(Biol_Flag > 1){sentiment = sentiment + Skill_Biol_PR_2b;}
    if(Robo_Flag > 1){sentiment = sentiment + Skill_Robo_PR_2b;}

    //Ternary math
    avgCapability = (Skill_Visu + Skill_Lang + Skill_Code + Skill_Biol + Skill_Robo)/4.5;
    hype = (avgCapability-10)*1;
    attitudeBalance = (10 / (10 - sentiment))*100;
    optimism = hype * attitudeBalance/100;
    pessimism = hype * (1 - attitudeBalance/100);

    //Evaluate policies{
    if(attitudeBalance<5){
        activePolicies = "<40%, Visual & Lang. tech taxed 25% \n<20%, RSPs limit model scaling to 2x \n<10%, all AI Robo. & Bio. tech banned \n<5%, Ban on new GPU sales to AI labs";
        potentialPolicies = "";
        Tax_Flag = 1; //not yet implemented
        RSP_Flag = 1;
        BioBan_Flag = 1; //not yet implemented
        GPUBan_Flag = 1;
    }else if(attitudeBalance<10){
        activePolicies =    "<40%, Visual & Lang. tech taxed 25% \n<20%, RSPs limit model scaling to 2x \n<10%, all AI Robo. & Bio. tech banned";
        potentialPolicies = "<5%, Ban on new GPU sales to AI labs";
        Tax_Flag = 1; //not yet implemented
        RSP_Flag = 1;
        BioBan_Flag = 1; //not yet implemented
        GPUBan_Flag = 0;
    }else if(attitudeBalance<20){
        activePolicies =    "<40%, Visual & Lang. tech taxed 25% \n<20%, RSPs limit model scaling to 2x";
        potentialPolicies = "<10%, AI Robo. & Bio. tech taxed 75% \n<5%, Ban on new GPU sales to AI labs";
        Tax_Flag = 1; //not yet implemented
        RSP_Flag = 1;
        BioBan_Flag = 0; //not yet implemented
        GPUBan_Flag = 0;
    }else if(attitudeBalance<40){
        activePolicies =    "<40%, Visual & Lang. tech taxed 25%";
        potentialPolicies = "<20%, RSPs limit model scaling to 2x \n<10%, all AI Robo. & Bio. tech banned";
        Tax_Flag = 1; //not yet implemented
        RSP_Flag = 0;
        BioBan_Flag = 0; //not yet implemented
        GPUBan_Flag = 0;
    }else{
        activePolicies = "";
        potentialPolicies = "<40%, Visual & Lang. tech taxed 25% \n<20%, RSPs limit model scaling to 2x";
        Tax_Flag = 0; //not yet implemented
        RSP_Flag = 0;
        BioBan_Flag = 0; //not yet implemented
        GPUBan_Flag = 0; //not yet implemented
    }

    document.getElementById('hype').innerHTML = hype.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"%";
    document.getElementById('sentiment').innerHTML = sentiment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Display').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Visu').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Lang').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Code').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Biol').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Robo').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('attitudeBalanceDisplay').innerHTML = (attitudeBalance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"%";
    document.getElementById('activePolicies').innerHTML = activePolicies;
    document.getElementById('potentialPolicies').innerHTML = potentialPolicies;
    }

function UpdatePolitics(){

    UpdateSentiment();

    rgbastring = 'rgba('+pessimism*2.5+','+optimism*2.5+',0,1)';

    rawData.push({uninterested: (100-hype), pessimist: pessimism, optimist: optimism});
    
    //I should use Plotly.react to update chart, instead of newplot every time?
    Plotly.react('PoliticsChartSpace', [{
        type: 'scatterternary',
        mode: 'lines',
        a: rawData.map(function(d) { return d.uninterested; }),
        b: rawData.map(function(d) { return d.pessimist; }),
        c: rawData.map(function(d) { return d.optimist; }),
        line: {color: rgbastring, width: 8,},
    }], {
        ternary: {
            sum: 100,
            aaxis: makeAxis('Doesn\'t care about AI', 0),
            baxis: makeAxis('Pessimistic', 45),
            caxis: makeAxis('Optimistic', -45),
        },
        autosize: false,
        width: 300,
        height: 300,
        margin: {
            l: 45,
            r: 45,
            b: 5,
            t: 0,
            pad: 1
          },
    });
    function makeAxis(title, tickangle) {
        return {
          title: title,
          titlefont: { family: 'Times New Roman', size: 15 },
          tickangle: tickangle,
          tickfont: { size: 1, color: '#ffffff'},
          tickcolor: 'rgba(0,0,0,0)',
          ticklen: 4,
          showline: true,
          showgrid: true
        };
    }
    
    document.getElementById('Skill_Visu_PR_2b').innerHTML = Skill_Visu_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Visu_PR_3b').innerHTML = Skill_Visu_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Lang_PR_2b').innerHTML = Skill_Lang_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Lang_PR_3b').innerHTML = Skill_Lang_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Code_PR_3b').innerHTML = Skill_Code_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Biol_PR_2b').innerHTML = Skill_Biol_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
    document.getElementById('Skill_Robo_PR_2b').innerHTML = Skill_Robo_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}); 
}

function PushGraphData(){
    var yr_frac = Days/360+2016;
    //could be faster by only calling extendTraces once...
    if (Visu_Flag>0){trace1.x.push(yr_frac); trace1.y.push(Skill_Visu);}
    if (Lang_Flag>0){trace2.x.push(yr_frac); trace2.y.push(Skill_Lang);}
    if (Code_Flag>0){trace3.x.push(yr_frac); trace3.y.push(Skill_Code);}
    if (Biol_Flag>0){trace4.x.push(yr_frac); trace4.y.push(Skill_Biol);}
    if (Robo_Flag>0){trace5.x.push(yr_frac); trace5.y.push(Skill_Robo);}

}

function UpdateCoolGraph(){
    //var data = [];
    // if (Visu_Flag>0){data = [trace1, trace2, trace3, trace4, trace5]}
    // if (Lang_Flag>0){data = [trace1, trace2, trace3, trace4, trace5]}
    // if (Code_Flag>0){data = [trace1, trace2, trace3, trace4, trace5]}
    // if (Biol_Flag>0){data = [trace1, trace2, trace3, trace4, trace5]}
    // if (Robo_Flag>0){data = [trace1, trace2, trace3, trace4, trace5]}
    if(ScalingFlag>0){
        Plotly.newPlot('CoolGraphDiv', [trace1, trace2, trace3, trace4, trace5], 
        {   showlegend: false,
            autosize: false,
            width: 300,
            height: 275,
            margin: { l: 45, r: 45, b: 5, t: 0, pad: 1 },
            yaxis: { zeroline: true}
        }
        );
    }
}

function TrainAI(){
    if(GPUhours > AIcapabilities){     //some kind of check to make sure you can't train a weaker AI than your last one...
        
    TrainedModelFlag = 1;
    if (RSP_Flag == 1 && (GPUhours > (AIcapabilities*2))){
        AIcapabilities = AIcapabilities*2;
        GPUhours = GPUhours - AIcapabilities;
        displayMessage("You trained a 2.0x bigger AI model! (Limited to 2x increments by Responsible Scaling Policy)");
    } else{
        if (AIcapabilities == 0){
            fraction = GPUhours / AIcapabilities;
            AIcapabilities = GPUhours;
            GPUhours = 0;
            displayMessage("You trained your first AI model!");
        } else {
            fraction = GPUhours / AIcapabilities;
            AIcapabilities = GPUhours;
            GPUhours = 0;
            displayMessage("You trained a " +fraction.toFixed(1)+ "x bigger AI model!");
        }
    }

    
    PushGraphData();

    BaseCapability = Math.log10(AIcapabilities)*10;
    Skill_Visu = BaseCapability*2.0 + Skill_Visu_mod;
    Skill_Lang = BaseCapability*1.5 + Skill_Lang_mod;
    Skill_Code = BaseCapability*2.5 + Skill_Code_mod;
    Skill_Biol = BaseCapability*2.0 + Skill_Biol_mod;
    Skill_Robo = BaseCapability*2.5 + Skill_Robo_mod;

    
    document.getElementById("AIcapabilities").innerHTML = AIcapabilities.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});

    if (AISFlag >3){
        alignment = -10/(0.005*(negInsights+Evalhours)+.1)+100;//desmos calculator for more

    }else{
        alignment = -10/(0.005*negInsights+.1)+100;//desmos calculator for more
    }

    UpdatePolitics();
    negInsights = 0;
    Evalhours = 0;

    PushGraphData();
    Evalhours = 0;//redundant
    UpdateCoolGraph();

    } else {
    displayMessage("Can't train a bigger AI model; not enough training compute!");
    }
    //remember to add much more about how exactly the capabilities go into various individual tasks, affected by various multipliers, etc!
    //}
    
    
}

function updateStats(){
    if (Nationalized == true){
        //Economy section
        document.getElementById("LaborForce").innerHTML = (LaborForce/1e6).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
        document.getElementById("Births").innerHTML = (Births/1000).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        document.getElementById("Deaths").innerHTML = (Deaths/1000).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        example_death_note = "(temporary status effect on death!)";//run out of labor force = lose the game!
        Death_Note = "";
        document.getElementById("Death_Note").innerHTML = Death_Note;
        //Economy section part 2
        document.getElementById("PercentAutomated").innerHTML = PercentAutomated.toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3});
        document.getElementById("HumanGDP").innerHTML = HumanGDP.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
        document.getElementById("AIGDP").innerHTML = AIGDP.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});

        //debug:
        //document.getElementById("Debug").innerHTML = "fudge_factor: "+fudge_factor+", jFunds: "+jFunds+", DailyReinvestedGDP: "+DailyReinvestedGDP+", ticks_per_day: "+ticks_per_day+", : ";

        document.getElementById("GPUsPerDay").innerHTML = GPUsPerDay.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        document.getElementById("NatGPUs").innerHTML = GPUs.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        //Research Section
        document.getElementById("NatResearchers").innerHTML = Researchers.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        document.getElementById("NatInsights").innerHTML = Insights.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        
    }
    //GPU stuff
    document.getElementById("GPUs").innerHTML = GPUs.toLocaleString();
    //document.getElementById("algorithmicProgress").innerHTML = (algorithmicProgress*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    document.getElementById("jFunds").innerHTML = jFunds.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    //document.getElementById("GPU_Rev").innerHTML = GPU_Rev.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("AISPercent").innerHTML = AISPercent.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("ResearchPercent").innerHTML = ResearchPercent.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Researchers").innerHTML = Researchers.toLocaleString();
    document.getElementById("Insights").innerHTML = Insights.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById("DailyWage").innerHTML = DailyWage.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    


    document.getElementById("Profit_Visu_1_Display").innerHTML = Profit_Visu_1_Display.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("Profit_Visu_2_Display").innerHTML = Profit_Visu_2_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Visu_3_Display").innerHTML = Profit_Visu_3_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    
    document.getElementById("Profit_Lang_1_Display").innerHTML = Profit_Lang_1_Display.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("Profit_Lang_2_Display").innerHTML = Profit_Lang_2_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Lang_3_Display").innerHTML = Profit_Lang_3_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});

    document.getElementById("Profit_Code_1_Display").innerHTML = Profit_Code_1_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Code_2_Display").innerHTML = Profit_Code_2_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Code_3_Display").innerHTML = Profit_Code_3_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    
    document.getElementById("Profit_Biol_1_Display").innerHTML = Profit_Biol_1_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Biol_2_Display").innerHTML = Profit_Biol_2_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    
    document.getElementById("Profit_Robo_1_Display").innerHTML = Profit_Robo_1_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Profit_Robo_2_Display").innerHTML = Profit_Robo_2_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});

                                                                            
    }



function DateCruncher(d){//d = days
    var year = 2016+Math.floor(d/360);
    var month = Math.floor(d % 360 / 30);
    var date = 1 + Math.floor(d % 360 % 30);
    
    var mDisplay;
    switch(month){
        case (0): mDisplay = "January "; break;
        case (1): mDisplay = "February "; break;
        case (2): mDisplay = "March "; break;
        case (3): mDisplay = "April "; break;
        case (4): mDisplay = "May "; break;
        case (5): mDisplay = "June "; break;
        case (6): mDisplay = "July "; break;
        case (7): mDisplay = "August "; break;
        case (8): mDisplay = "September "; break;
        case (9): mDisplay = "October "; break;
        case (10): mDisplay = "November "; break;
        case (11): mDisplay = "December "; break;
    }
    
    return mDisplay + date + ", " + year;
}

function numberCruncher(number, decimals){ //multiplied by a factor of 1 quintillion due to exaflop unit
    //todo: maybe change this to reflect orders of magnitude???
    var suffix = "";
    if (decimals == undefined){decimals = 2;}
    var precision = decimals;
    if (number>999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000;
        suffix = "sexdecillion";
    } else if (number>999999999999999999999999999999){
        number = number/1000000000000000000000000000000;
        suffix = "quindecillion";
    } else if (number>999999999999999999999999999){
        number = number/1000000000000000000000000000;
        suffix = "quattuordecillion";
    } else if (number>999999999999999999999999){
        number = number/1000000000000000000000000;
        suffix = "tredecillion";
    } else if (number>999999999999999999999){
        number = number/1000000000000000000000;
        suffix = "duodecillion";
    } else if (number>999999999999999999){
        number = number/1000000000000000000;
        suffix = "undecillion";
    } else if (number>999999999999999){
        number = number/1000000000000000;
        suffix = "decillion";
    } else if (number>999999999999){
        number = number/1000000000000;
        suffix = "nonillion";
    } else if (number>999999999){
        number = number/1000000000;
        suffix = "octillion";
    } else if (number>999999){
        number = number/1000000;
        suffix = "septillion";
    } else if (number>999){
        number = number/1000;
        suffix = "sextillion";
    }  else if (number<1000){
        precision = 0;
        suffix = "quintillion";
    }
    return number.toFixed(precision) + " " + suffix;
}

function GPUsRevenue(){
    var BaseRev = Math.cbrt(AIcapabilities/3888*5);
    BaseRev = BaseRev*BaseRev;
    Profit_Visu_1_Display = Profit_Visu_1*BaseRev;
    Profit_Visu_2_Display = Profit_Visu_2*BaseRev;
    Profit_Visu_3_Display = Profit_Visu_3*BaseRev;
    Profit_Lang_1_Display = Profit_Lang_1*BaseRev;
    Profit_Lang_2_Display = Profit_Lang_2*BaseRev;
    Profit_Lang_3_Display = Profit_Lang_3*BaseRev;
    Profit_Code_1_Display = Profit_Code_1*BaseRev;
    Profit_Code_2_Display = Profit_Code_2*BaseRev;
    Profit_Code_3_Display = Profit_Code_3*BaseRev;
    Profit_Biol_1_Display = Profit_Biol_1*BaseRev;
    Profit_Biol_2_Display = Profit_Biol_2*BaseRev;
    Profit_Robo_1_Display = Profit_Robo_1*BaseRev;
    Profit_Robo_2_Display = Profit_Robo_2*BaseRev;


    GPU_Rev = 0;
    if(Visu_Flag > 0){GPU_Rev = GPU_Rev + Profit_Visu_1_Display/5;}
    if(Visu_Flag > 1){GPU_Rev = GPU_Rev + Profit_Visu_2_Display/5;}
    if(Visu_Flag > 2){GPU_Rev = GPU_Rev + Profit_Visu_3_Display/5;}
    if(Lang_Flag > 0){GPU_Rev = GPU_Rev + Profit_Lang_1_Display/5;}
    if(Lang_Flag > 1){GPU_Rev = GPU_Rev + Profit_Lang_2_Display/5;}
    if(Lang_Flag > 2){GPU_Rev = GPU_Rev + Profit_Lang_3_Display/5;}
    if(Code_Flag > 0){GPU_Rev = GPU_Rev + Profit_Code_1_Display/5;}
    if(Code_Flag > 1){GPU_Rev = GPU_Rev + Profit_Code_2_Display/5;}
    if(Code_Flag > 2){GPU_Rev = GPU_Rev + Profit_Code_3_Display/5;}
    if(Biol_Flag > 0){GPU_Rev = GPU_Rev + Profit_Biol_1_Display/5;}
    if(Biol_Flag > 1){GPU_Rev = GPU_Rev + Profit_Biol_2_Display/5;}
    if(Robo_Flag > 0){GPU_Rev = GPU_Rev + Profit_Robo_1_Display/5;}
    if(Robo_Flag > 1){GPU_Rev = GPU_Rev + Profit_Robo_2_Display/5;}

    DailyWage = GPU_Rev*ticks_per_day; //for display
    jFunds = jFunds + GPU_Rev;
}

function PreviewEffects(){
    
    if (ScalingFlag == 1){
        BaseCapability = Math.log10(GPUhours)*10;
        Skill_Visu_Scale = BaseCapability*2.0 + Skill_Visu_mod;
        Skill_Lang_Scale = BaseCapability*1.5 + Skill_Lang_mod;
        Skill_Code_Scale = BaseCapability*2.5 + Skill_Code_mod;
        Skill_Biol_Scale = BaseCapability*2.0 + Skill_Biol_mod;
        Skill_Robo_Scale = BaseCapability*2.5 + Skill_Robo_mod;
        document.getElementById("Skill_Visu_Scale").innerHTML = Skill_Visu.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "% (" + Skill_Visu_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
        document.getElementById("Skill_Lang_Scale").innerHTML = Skill_Lang.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "% (" + Skill_Lang_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
        document.getElementById("Skill_Code_Scale").innerHTML = Skill_Code.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "% (" + Skill_Code_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
        document.getElementById("Skill_Biol_Scale").innerHTML = Skill_Biol.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "% (" + Skill_Biol_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
        document.getElementById("Skill_Robo_Scale").innerHTML = Skill_Robo.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "% (" + Skill_Robo_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
    }else{
        document.getElementById("Skill_Visu_Scale").innerHTML = Skill_Visu.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Skill_Lang_Scale").innerHTML = Skill_Lang.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Skill_Code_Scale").innerHTML = Skill_Code.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Skill_Biol_Scale").innerHTML = Skill_Biol.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Skill_Robo_Scale").innerHTML = Skill_Robo.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
    }

    if(AISFlag>2){
        alignment_Display = -10/(0.005*negInsights+.1)+100;
        document.getElementById('alignment_Display').innerHTML = alignment_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"%";
    }
    if(AISFlag>3){
        //Evals Sentiment Preview
        alignment_Display = -10/(0.005*(negInsights+Evalhours)+.1)+100;
        document.getElementById('alignment_Display').innerHTML = alignment_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"%";

        var alignpercent = (100-alignment_Display)/100;
        Skill_Visu_PR_2b_Display = Skill_Visu_Scale/20 * -1*alignpercent;
        Skill_Visu_PR_3b_Display = Skill_Visu_Scale/20 * -3*alignpercent;
        Skill_Lang_PR_2b_Display = Skill_Lang_Scale/20 * -1*alignpercent;
        Skill_Lang_PR_3b_Display = Skill_Lang_Scale/20 * -3*alignpercent;
        Skill_Code_PR_3b_Display = Skill_Code_Scale/20 * -3*alignpercent;
        Skill_Biol_PR_2b_Display = Skill_Biol_Scale/20 * -10*alignpercent;
        Skill_Robo_PR_2b_Display = Skill_Robo_Scale/20 * -10*alignpercent;
    
        Sentiment_Display = 0;
        if(Visu_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Visu_PR_2b_Display;}
        if(Visu_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Visu_PR_3b_Display;}
        if(Lang_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Lang_PR_2b_Display;}
        if(Lang_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Lang_PR_3b_Display;}
        if(Code_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Code_PR_3b_Display;}
        if(Biol_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Biol_PR_2b_Display;}
        if(Robo_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Robo_PR_2b_Display;}
    
        //Ternary math
        avgCapability_Display = (Skill_Visu_Scale + Skill_Lang_Scale + Skill_Code_Scale + Skill_Biol_Scale + Skill_Robo_Scale)/4.5;
        hype_Display = (avgCapability_Display-10)*1;
        attitudeBalance_Display = 10 / (10 - Sentiment_Display);
        document.getElementById('Skill_Visu_PR_2b').innerHTML = Skill_Visu_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Visu_PR_2b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Visu_PR_3b').innerHTML = Skill_Visu_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Visu_PR_3b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Lang_PR_2b').innerHTML = Skill_Lang_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Lang_PR_2b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Lang_PR_3b').innerHTML = Skill_Lang_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Lang_PR_3b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Code_PR_3b').innerHTML = Skill_Code_PR_3b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Code_PR_3b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Biol_PR_2b').innerHTML = Skill_Biol_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Biol_PR_2b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('Skill_Robo_PR_2b').innerHTML = Skill_Robo_PR_2b.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+" (" + Skill_Robo_PR_2b_Display.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ")";
        document.getElementById('hype').innerHTML = hype.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"% (" + hype_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
        document.getElementById('sentiment').innerHTML = sentiment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+" (" + Sentiment_Display.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + ")";
        document.getElementById('attitudeBalanceDisplay').innerHTML = (attitudeBalance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"% (" + (attitudeBalance_Display*100).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%)";
    }
}


// MAIN LOOP -- every 1/100th of a second
window.setInterval(function(){
    ticks = ticks + 1;
    milestoneCheck();
    buttonUpdate();
    updateStats(); 
    manageProjects();
    milestoneCheck();
    
// GPU stuff
    if (GPUs>39){
        GPUBuyerFlag=1;
    }

    if(isNaN(GPUs)){throw new Error("nan...");}
    if (GPUBuyerFlag==1 && GPUBuyerStatus==1 && jFunds>=500){
        buyGPU();
    }   
    if(isNaN(GPUs)){throw new Error("nan...");}

    AISPercent = document.getElementById("AISSlider").value;
    ResearchPercent = 100-AISPercent;
    if(isNaN(GPUs)){throw new Error("nan...");}

    if(Nationalized==true){
        if(Continuous_Flag == 1){
            AIcapabilities = AIcapabilities + GPUs/ticks_per_day/10;//extra factor of 10 because i moved it to the fast loop
            //figure out how to continously update skills
            //figure out how to apply RLHF again to suppress bad capabilites
        }
    } else {
        //to 10x every 4.5-mins, must double every 90 seconds or so, thus need $500 per GPU per 90 seconds, so $0.55 per tenth of a second FROM THE MODEL trained by 1 gpu going for 90 secs
        //GPUhours per GPU over 90 secs = 24/10*900 = 6480
         
        //Training Hours
        GPUhours = GPUhours + GPUs/ticks_per_day/10; //Exaflops//extra factor of 10 because i moved it to the fast loop

    }
}, 10);



// Slow Loop -- every Tenth of a second
var secTimer = 0;
var secTimer2 = 0;

window.setInterval(function(){

    
    //Nationalization calcs
    if(Nationalized==true){
        //this stuff doesn't belong in a project, rather in the actual div:
        LaborForce = LaborForce + (Births - Deaths)/ticks_per_day;
        HumanGDP = BaseGDP*LaborForce/180000000;//how much has labor force grown or shrunk relative to the 180M where we started?
        PercentAutomated = -10/(AIcapabilities/50000000000+0.1)+100;
        AIGDP = HumanGDP * PercentAutomated/(100-PercentAutomated);
        TotalGDP = HumanGDP + AIGDP;
        if (Reinvestment_Flag == 1){
            DailyReinvestedGDP = fudge_factor*TotalGDP/360;//some constant percentage that goes towards buying GPUs, divided by 360 days per year, and then by some_factor_of_how_often_this_happens_per_day
            GPUsPerDay = DailyReinvestedGDP/500; //for display
            jFunds = jFunds + DailyReinvestedGDP/ticks_per_day;
            buyGPU(jFunds);
        }
        //GPUs generate exaflops as normal, but generate no profit
        //instead, feedback cycle comes purely from continuous improvement
        //20%: 30 + [7.5, 30/8*2] = 37.5
        //50%: 30 + [30] = 60
        //80%: 30 + [120, 30/2*8 = 150]
        //maybe do a cool pie chart, which I could even size proportionately to show absolute scale
        //PercentAutomated should be influenced by base model skills, plus assorted boosts from individual techs.  have the base model skills go into RLHF 1/x math up to like 60% at most, and then have boosts do the other 40%, or something.
        //the speed that PercentAutomated increases will be the main lever by which I affect the speed of model size growth, and thus the pace of the endgame
        
        
        BaseCapability = Math.log10(AIcapabilities)*10;
        Skill_Visu_Scale = BaseCapability*2.0 + Skill_Visu_mod;
        Skill_Code_Scale = BaseCapability*2.5 + Skill_Code_mod;
        Skill_Biol_Scale = BaseCapability*2.0 + Skill_Biol_mod;
        Skill_Robo_Scale = BaseCapability*2.5 + Skill_Robo_mod;
        document.getElementById("Nat_Visu_Scale").innerHTML = Skill_Visu_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Nat_Code_Scale").innerHTML = Skill_Code_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Nat_Biol_Scale").innerHTML = Skill_Biol_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        document.getElementById("Nat_Robo_Scale").innerHTML = Skill_Robo_Scale.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";

    } else {

        //Revenue
        GPUsRevenue();

        //Preview effects from Evals & Scaling Laws
        PreviewEffects();


        //todo: probably rejig the various stats "for display", as these are now our continously training AGI's real stats!
        //todo: make graph nicer maybe, better colors & labels?
        //todo: remove combat.js to save on a lot of calculation time...
        //todo: eventually move more stuff into the fast loop, like funds.
        //todo: make researchers produce insight after nationalization lol
        //todo: policies aren't consistently typed out, have bad word wrap, and don't actually happen...
    }



    // Fire Twice a Second
    secTimer++;
    if (secTimer >= 5){//we want 1 day every 2 seconds, to cover 20 yearss in an hour
        Days++;
        secTimer = 0;
        //1 researcher-insight every 100 days = ~1 min of game time
        Insights = Insights + 0.001*Researchers*(ResearchPercent);
        if (AISFlag>2){
            negInsights = negInsights  + 0.001*Researchers*(100-ResearchPercent)
            document.getElementById("negInsights").innerHTML = negInsights.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
            if (AISFlag > 3){
                Evalhours = Evalhours + 0.002*Researchers*(100- ResearchPercent);
                document.getElementById("negInsights").innerHTML = negInsights.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})+", Eval power: "+Evalhours.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
            }
        }
    }

    // Fire Every Five Seconds
    secTimer2++;
    if (secTimer2 >= 50){
        secTimer2 = 0;
    }
}, 100);
