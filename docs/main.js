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

//  HYPNODRONE EVENT ----------------------------------------------------------------

document.getElementById("hypnoDroneEventDiv").style.display = "none"; 
longBlinkCounter = 0;

function longBlink(elemID){
    var e = document.getElementById(elemID);
    
    { 
    var handle = setInterval(function(){longToggleVisibility(elemID)}, 32);    
    }
    
    function longToggleVisibility(elemID){
    longBlinkCounter++;    
        
    if (longBlinkCounter > 5 && longBlinkCounter < 10){
        document.getElementById("hypnoDroneText").innerHTML="Release"; 
        }    
    
    if (longBlinkCounter > 30 && longBlinkCounter < 40){
        document.getElementById("hypnoDroneText").innerHTML="<br /><br /><br />Release"; 
        }   
        
    if (longBlinkCounter > 45 && longBlinkCounter < 55){
        document.getElementById("hypnoDroneText").innerHTML="<br />Release";
        }       
        
     if (longBlinkCounter > 55){
        document.getElementById("hypnoDroneText").innerHTML="Release<br/>the<br/>Hypno<br/>Drones";
        }       
        
    if (longBlinkCounter >= 120){
        console.log("weed wizzard");
        clearInterval(handle);
        longBlinkCounter = 0;
        e.style.display = "none";
    } else {
        if (e.style.display != ""){
        e.style.display = "";
        } else {
        e.style.display = "none";    
        }
      }   
    }
        
    }

function hypnoDroneEvent(){
    document.getElementById("hypnoDroneText").innerHTML="Release";
    longBlink("hypnoDroneEventDiv");
}     


//  MESSAGES ------------------------------------------------------------------------


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
    

    //GPU Stuff, making sections appear and disappear
    document.getElementById("dateCountCrunched").innerHTML = DateCruncher(Days);
    document.getElementById("clipCountCrunched").innerHTML = numberCruncher(GPUhours, 1);
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
        } else {
        document.getElementById("ModelDiv").style.display="none";    
        }

    switch(AISFlag) {
        case 4:
        document.getElementById("AISDiv").style.display="";
        document.getElementById("ResearcherDiv").style.display="";
        if((PoliticsFlag == 2) && (Researchers>0)){
            document.getElementById("AISSliderDiv").style.display="";
            } else{
                document.getElementById("AISSliderDiv").style.display="";//none";
            }
        case 3:
        document.getElementById("AISDiv").style.display="";
        document.getElementById("ResearcherDiv").style.display="";
        if((PoliticsFlag == 2) && (Researchers>0)){
            document.getElementById("AISSliderDiv").style.display="";
            } else{
                document.getElementById("AISSliderDiv").style.display="";//none";
            }
        case 2:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="";
            document.getElementById("AISSliderDiv").style.display="";//none";
            break;
        case 1:
            document.getElementById("AISDiv").style.display="";
            document.getElementById("ResearcherDiv").style.display="none";
            document.getElementById("AISSliderDiv").style.display="";//none";
            break;
        default:
            document.getElementById("AISDiv").style.display="none"; 
            document.getElementById("ResearcherDiv").style.display="none";
            document.getElementById("AISSliderDiv").style.display="";//none";
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

    // if (ScalingFlag==1) {
    //         document.getElementById("cool_capabilities_graph").style.display="";
    //         //TODO: unlock cool graph of capabilities!
    //     } else {
    //         document.getElementById("cool_capabilities_graph").style.display="none"; 
    //     }


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


//Nationalize-the-labs event







    
      
    
if (projectsFlag == 0){
            
            document.getElementById("projectsDiv").style.display="none";
            } else {
            document.getElementById("projectsDiv").style.display="";      
            }      

//cool original stuff that still sorta works, good for learning...
if (spaceFlag == 0){
            document.getElementById("probeDesignDiv").style.display="none";
            document.getElementById("increaseProbeTrustDiv").style.display="none";
            document.getElementById("investmentEngine").style.display="none";    
            document.getElementById("investmentEngineUpgrade").style.display="none"; 
            document.getElementById("strategyEngine").style.display="none"; 
            document.getElementById("tournamentManagement").style.display="none"; 
            document.getElementById("battleCanvasDiv").style.display="none"; 
            document.getElementById("powerDiv").style.display="none"; 
            } else {
            document.getElementById("spaceDiv").style.display=""; 
            document.getElementById("factoryDivSpace").style.display="";
            document.getElementById("droneDivSpace").style.display="";
            document.getElementById("probeDesignDiv").style.display="";
            document.getElementById("increaseProbeTrustDiv").style.display="";    
            document.getElementById("factoryDiv").style.display="none";
            document.getElementById("harvesterDiv").style.display="none"; 
            document.getElementById("wireDroneDiv").style.display="none";         
            }  
    
// PROBE DESIGN    

probeUsedTrust = (probeSpeed+probeNav+probeRep+probeHaz+probeFac+probeHarv+probeWire+probeCombat);    
    
document.getElementById("probeTrustUsedDisplay").innerHTML = probeUsedTrust;    
    
    
if (yomi < probeTrustCost || probeTrust >= maxTrust) {document.getElementById("btnIncreaseProbeTrust").disabled = true;
            } else {document.getElementById("btnIncreaseProbeTrust").disabled = false;}  
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeSpeed").disabled = true;
            } else {document.getElementById("btnRaiseProbeSpeed").disabled = false;}    
    
if (probeSpeed < 1) {document.getElementById("btnLowerProbeSpeed").disabled = true;
            } else {document.getElementById("btnLowerProbeSpeed").disabled = false;}      
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeNav").disabled = true;
            } else {document.getElementById("btnRaiseProbeNav").disabled = false;}  
    
if (probeNav < 1) {document.getElementById("btnLowerProbeNav").disabled = true;
            } else {document.getElementById("btnLowerProbeNav").disabled = false;}     

if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeRep").disabled = true;
            } else {document.getElementById("btnRaiseProbeRep").disabled = false;} 
    
if (probeRep < 1) {document.getElementById("btnLowerProbeRep").disabled = true;
            } else {document.getElementById("btnLowerProbeRep").disabled = false;}     
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeHaz").disabled = true;
            } else {document.getElementById("btnRaiseProbeHaz").disabled = false;}
    
if (probeHaz < 1) {document.getElementById("btnLowerProbeHaz").disabled = true;
            } else {document.getElementById("btnLowerProbeHaz").disabled = false;}     
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeFac").disabled = true;
            } else {document.getElementById("btnRaiseProbeFac").disabled = false;}   
    
if (probeFac < 1) {document.getElementById("btnLowerProbeFac").disabled = true;
            } else {document.getElementById("btnLowerProbeFac").disabled = false;}      
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeHarv").disabled = true;
            } else {document.getElementById("btnRaiseProbeHarv").disabled = false;}  
    
if (probeHarv < 1) {document.getElementById("btnLowerProbeHarv").disabled = true;
            } else {document.getElementById("btnLowerProbeHarv").disabled = false;}    
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeWire").disabled = true;
            } else {document.getElementById("btnRaiseProbeWire").disabled = false;}   

if (probeWire < 1) {document.getElementById("btnLowerProbeWire").disabled = true;
            } else {document.getElementById("btnLowerProbeWire").disabled = false;} 
    
if (probeTrust - probeUsedTrust < 1) {document.getElementById("btnRaiseProbeCombat").disabled = true;
            } else {document.getElementById("btnRaiseProbeCombat").disabled = false;}
    
if (probeCombat < 1) {document.getElementById("btnLowerProbeCombat").disabled = true;
            } else {document.getElementById("btnLowerProbeCombat").disabled = false;}    
    
    

    
    
 document.getElementById("cover").style.display="none";     

}






//----------INVESTMENTS----------------------------------------------------------------


var stocks = [];
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var portfolioSize = 0;
var stockID = 0;
var secTotal = 0;
var portTotal = 0;
var sellDelay = 0;
var riskiness = 5;
var maxPort = 5;
var m = 0;
var investLevel = 0;
var investUpgradeCost = 100;
var stockGainThreshold = .5;
var ledger = 0;
var stockReportCounter = 0;

function investUpgrade(){
    yomi = yomi - investUpgradeCost;
    investLevel++;
    document.getElementById("investmentLevel").innerHTML=investLevel;
    stockGainThreshold = stockGainThreshold + .01;
    investUpgradeCost = Math.floor(Math.pow(investLevel+1, Math.E)*100);
    document.getElementById("investUpgradeCost").innerHTML=investUpgradeCost.toLocaleString();
    document.getElementById("yomiDisplay").innerHTML=yomi.toLocaleString();
    displayMessage("Investment engine upgraded, expected profit/loss ratio now "+stockGainThreshold);
}


function investDeposit(){
    ledger = ledger - Math.floor(funds);
    bankroll = Math.floor(bankroll + funds);
    funds = 0;
    document.getElementById('investmentBankroll').innerHTML = bankroll.toLocaleString();
    document.getElementById('funds').innerHTML = funds.toFixed(2);
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
}

function investWithdraw(){
    ledger = ledger + bankroll;
    funds = funds + bankroll;
    bankroll = 0;
    document.getElementById('investmentBankroll').innerHTML = bankroll.toLocaleString();
    document.getElementById('funds').innerHTML = funds.toFixed(2);
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
    
}

function stockShop(){
    var budget = Math.ceil(portTotal/riskiness);
    var r = 11 - riskiness;
    var reserves = Math.ceil(portTotal/r);
    if (riskiness==1){
        reserves = 0;
    }

    if ((bankroll-budget)<reserves && riskiness == 1 && bankroll >(portTotal/10)){
        budget = bankroll;
        } else if ((bankroll-budget)<reserves && riskiness == 1){
        budget = 0;    
        } else if ((bankroll-budget)<reserves){
        budget = bankroll - reserves;    
        }
    
    if (portfolioSize < maxPort && bankroll >= 5 && budget >= 1 && bankroll - budget >= reserves){
        if (Math.random() < .25){
            
            createStock(budget);

        }
        
    }   
}

function createStock(dollars){
    stockID++;
    var sym = generateSymbol();
    var roll = Math.random();
    if (roll>.99){
      var pri = Math.ceil(Math.random()*3000);  
    } else if (roll>.85){
      var pri = Math.ceil(Math.random()*500);  
    } else if (roll>.60){
      var pri = Math.ceil(Math.random()*150);  
    } else if (roll>.20){
      var pri = Math.ceil(Math.random()*50);  
    } else {
      var pri = Math.ceil(Math.random()*15);  
    }
    
    if (pri>dollars){
        pri = Math.ceil(dollars*roll);
    }
    
    
    var amt = Math.floor(dollars/pri);
    if (amt>1000000){
        amt = 1000000;
    }
  
        
    var newStock = {
        id: stockID,
        symbol: sym,
        price: pri,
        amount: amt,
        total: pri * amt,
        profit: 0,
        age: 0,
        }
    
    stocks.push(newStock);
    portfolioSize = stocks.length;
    bankroll = bankroll - (pri*amt);
    document.getElementById('investmentBankroll').innerHTML = bankroll.toLocaleString();
    document.getElementById('secValue').innerHTML = secTotal.toLocaleString();
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
    
}

function sellStock(){
    
    bankroll = bankroll + stocks[0].total;
    document.getElementById('investmentBankroll').innerHTML = bankroll.toLocaleString();
    document.getElementById('secValue').innerHTML = secTotal.toLocaleString();
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
    stocks.splice(0, 1);
    portfolioSize = stocks.length;   
    }    
    

function generateSymbol(){
    var ltrNum = 0;
    var x = Math.random();
    if (x<=.01){
        ltrNum = 1;
        } else if (x<=.1) {
        ltrNum = 2;    
        } else if (x<=.4) {
        ltrNum = 3;    
        } else {
        ltrNum = 4;
        }
    
    var y = Math.floor(Math.random()*26);
    var name = alphabet[y];
    
    for(var i=1; i<ltrNum; i++){
        var z = Math.floor(Math.random()*26);
        name = name.concat(alphabet[z]);     
    }
    
    return name;
    
}

function updateStocks(){
    for (var i = 0; i<portfolioSize; i++){
        
    stocks[i].age = stocks[i].age + 1;    
      if (Math.random()<.6){  
        var gain = true;
        if (Math.random()>stockGainThreshold){
            gain = false;                 
            }
        
        var currentPrice = stocks[i].price;
        var delta = Math.ceil((Math.random()*currentPrice)/(4*riskiness));
        
        if(gain){
        stocks[i].price = stocks[i].price + delta;
        } else {
        stocks[i].price = stocks[i].price - delta;    
        }
          
        if (stocks[i].price == 0 && Math.random()>.24){
            stocks[i].price = 1;
        }  
        
        stocks[i].total = stocks[i].price * stocks[i].amount;
        
        if (gain){
        stocks[i].profit = stocks[i].profit + (delta* stocks[i].amount);    
        } else {
        stocks[i].profit = stocks[i].profit - (delta* stocks[i].amount);    
        } 
      }
    }
}

// Stock List Display Routine

window.setInterval(function(){
    
    if (document.getElementById("investStrat").value=="low"){
        riskiness = 7;
    } else if (document.getElementById("investStrat").value=="med"){
        riskiness = 5;
    } else {
        riskiness = 1;
    }
    
    m = 0;
    
    for (var i=0; i<portfolioSize; i++){
        m = m + stocks[i].total;
    }
    
    secTotal = m;
    
    portTotal = bankroll + secTotal;
    
    document.getElementById('secValue').innerHTML = secTotal.toLocaleString();
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
    
portfolioSize = stocks.length; 
    
for (var i = 1; i<=portfolioSize; i++){
    var n = i.toString();
    var s = i-1;
    document.getElementById("stock"+n+"Symbol").innerHTML=stocks[s].symbol;
    document.getElementById("stock"+n+"Amount").innerHTML=Math.ceil(stocks[s].amount);
    document.getElementById("stock"+n+"Price").innerHTML=Math.ceil(stocks[s].price);
    document.getElementById("stock"+n+"Total").innerHTML=Math.ceil(stocks[s].total);
    document.getElementById("stock"+n+"Profit").innerHTML=Math.ceil(stocks[s].profit);
}    
        
var firstBlankSlot = portfolioSize + 1;    
    
for(var i = firstBlankSlot; i <= 5; i++){
    document.getElementById("stock"+i+"Symbol").innerHTML="&nbsp";
    document.getElementById("stock"+i+"Amount").innerHTML="&nbsp";
    document.getElementById("stock"+i+"Price").innerHTML="&nbsp";
    document.getElementById("stock"+i+"Total").innerHTML="&nbsp";
    document.getElementById("stock"+i+"Profit").innerHTML="&nbsp";
    }
    
}, 100);

window.setInterval(function(){
if (humanFlag == 1){    
stockShop();
}    
}, 1000);


window.setInterval(function(){
    
sellDelay = sellDelay+1;    
    
if (portfolioSize>0 && sellDelay >= 5 && Math.random()<=.3 && humanFlag == 1){ 
    sellStock();
    sellDelay = 0;
    }

if (portfolioSize>0 && humanFlag == 1){
    updateStocks();  
    }
    
}, 2500);

//-------------------STRATEGY-----------------------------------------------------

var tourneyCost = 1000;
var tourneyLvl = 1;
var choiceANames = ["cooperate", "swerve", "macro", "fight", "bet", "raise_price", "opera", "go", "heads", "particle", "discrete", "peace", "search", "lead", "accept", "accept", "attack"]; 
var choiceBNames = ["defect", "straight", "micro", "back_down", "fold", "lower_price", "football", "stay", "tails", "wave", "continuous", "war", "evaluate", "follow", "reject", "deny", "decay"];
var stratCounter = 0;
var roundNum = 0;
var hMove = 1;
var vMove = 1;
var hMovePrev = 1;
var vMovePrev = 1;
var aa = 0;
var ab = 0;
var ba = 0;
var bb = 0;
var rounds = 0;
var currentRound = 0;
var rCounter = 0;
var tourneyInProg = 0;
var winnerPtr = 0;
var placeScore = 0;
var showScore = 0;
var high = 0;
var pick = 10;
var yomi = 0;
var yomiBoost = 1;

var allStrats = [];
var strats = [];

var resultsTimer = 0;
var results = [];
var resultsFlag = 0;


var payoffGrid = {
    valueAA:0,
    valueAB:0,
    valueBA:0,
    valueBB:0,
}

var stratRandom = {
    name: "RANDOM",
    active: 1,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        var r = Math.random();
        if (r<.5){
        return 1;    
        } else {
        return 2;    
        }
    }
    
}

allStrats.push(stratRandom);
strats.push(stratRandom);

var stratA100 = {
    name: "A100",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        return 1;    
    }
    
}

allStrats.push(stratA100);

var stratB100 = {
    name: "B100",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        return 2;
    }
}

allStrats.push(stratB100);

var stratGreedy = {
    name: "GREEDY",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
       var x = findBiggestPayoff();
       if (x<3){
           return 1;
       } else {
           return 2;
       }
    }
}

allStrats.push(stratGreedy);

var stratGenerous = {
    name: "GENEROUS",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        var x = findBiggestPayoff();
        if (x == 1){
            return 1;    
        } else if (x == 3){
            return 1;    
        } else {
            return 2;
        }
    }
}

allStrats.push(stratGenerous);

var stratMinimax = {
    name: "MINIMAX",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        var x = findBiggestPayoff();
        if (x == 1){
            return 2;    
        } else if (x == 3){
            return 2;    
        } else {
            return 1;
        }
    }
}

allStrats.push(stratMinimax);

var stratTitfortat = {
    name: "TIT FOR TAT",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        if (this.currentPos == 1){
            w = vMovePrev;
            return w;
        } else {
            w = hMovePrev;
            return w;
        }
  
    }
}

allStrats.push(stratTitfortat);

var stratBeatlast = {
    name: "BEAT LAST",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function() {
        var w = whatBeatsLast(this.currentPos);
        return w;
    }
}

allStrats.push(stratBeatlast);

var hStrat = strats[0];
var vStrat = strats[0];

document.getElementById("btnRunTournament").disabled = true;

function findBiggestPayoff(){
    if (aa>=ab && aa>=ba && aa>=bb){
        return 1;
    } else if (ab>=aa && ab>=ba && ab>=bb){
        return 2; 
    } else if (ba>=aa && ba>=ab && ba>=bb){
        return 3;
    } else {
        return 4;   
    }
}

function whatBeatsLast(myPos){
    var oppsPos = 1;
    if (myPos == 1){
        oppsPos = 2;
    } else {
        oppsPos = 1;
    }
    if (oppsPos == 1 && hMovePrev == 1){
        if (aa>ba){
            return 1;
        } else {
            return 2;
        }

        } else if (oppsPos == 1 && hMovePrev == 2){
            if (ab>bb){
            return 1;           
            } else {
            return 2;    
            }
               
        } else if (oppsPos == 2 && vMovePrev == 1){
            if (aa>ba){
            return 1;
        } else {
            return 2;
        }
            
        } else {
            if (ab>bb){
            return 1;           
            } else {
            return 2;    
            }
            
        }
        
    }
    

function pickStrats(roundNum) {
    if (roundNum < strats.length) {
        h = 0;
        v = roundNum;
    } else {
        stratCounter++;
        if (stratCounter >= strats.length) {
            stratCounter = stratCounter-strats.length;    
            }
        h = Math.floor(roundNum/strats.length);
        v = stratCounter;
    }
    
    vStrat = strats[v];
    hStrat = strats[h];
    
    strats[h].currentPos = 1;
    strats[v].currentPos = 2;
    
    document.getElementById("vertStrat").innerHTML = vStrat.name;
    document.getElementById("horizStrat").innerHTML = hStrat.name;
    
}

function generateGrid(){
    payoffGrid.valueAA = Math.ceil(Math.random()*10);
    payoffGrid.valueAB = Math.ceil(Math.random()*10);
    payoffGrid.valueBA = Math.ceil(Math.random()*10);
    payoffGrid.valueBB = Math.ceil(Math.random()*10);
    
    aa = payoffGrid.valueAA;
    ab = payoffGrid.valueAB;
    ba = payoffGrid.valueBA;
    bb = payoffGrid.valueBB;
    
    var x = Math.floor(Math.random()*choiceANames.length);
    
    document.getElementById("vLabela").innerHTML = choiceANames[x];
    document.getElementById("vLabelb").innerHTML = choiceBNames[x];
    document.getElementById("hLabela").innerHTML = choiceANames[x];
    document.getElementById("hLabelb").innerHTML = choiceBNames[x];

    document.getElementById("aaPayoffH").innerHTML = payoffGrid.valueAA;
    document.getElementById("aaPayoffV").innerHTML = payoffGrid.valueAA;
    document.getElementById("abPayoffH").innerHTML = payoffGrid.valueAB;
    document.getElementById("abPayoffV").innerHTML = payoffGrid.valueBA;   
    document.getElementById("baPayoffH").innerHTML = payoffGrid.valueBA;
    document.getElementById("baPayoffV").innerHTML = payoffGrid.valueAB;   
    document.getElementById("bbPayoffH").innerHTML = payoffGrid.valueBB;
    document.getElementById("bbPayoffV").innerHTML = payoffGrid.valueBB;    
}


function toggleAutoTourney(){
    if (autoTourneyStatus==1){
        autoTourneyStatus=0;
        document.getElementById('autoTourneyStatus').innerHTML = "OFF";
    } else {
        autoTourneyStatus=1;
        document.getElementById('autoTourneyStatus').innerHTML = "ON";
    }
}


function newTourney(){
    
    resultsFlag = 0;
    
    document.getElementById("tournamentTable").style.display = "";
    document.getElementById("tournamentResultsTable").style.display = "none";
    
    high = 0;
    tourneyInProg = 1;
    currentRound = 0;
    rounds = strats.length * strats.length;
    for (i=0; i<strats.length; i++){
        strats[i].currentScore = 0;
    }
    stratCounter = 0;
    standardOps = standardOps - tourneyCost;
    tourneyLvl++;
    generateGrid();
    
    document.getElementById("btnRunTournament").disabled = false;
    
    document.getElementById("vertStrat").innerHTML = "&nbsp";
    document.getElementById("horizStrat").innerHTML = "&nbsp";
    
    document.getElementById("tourneyDisplay").innerHTML = "Pick strategy, run tournament, gain yomi";
    
    
}

function runTourney(){
    document.getElementById("btnRunTournament").disabled = true;
    if (currentRound < rounds){
    round(currentRound);
    } else {
    tourneyInProg = 0;
    pickWinner();    
    calculatePlaceScore();
    calculateShowScore();    
    declareWinner();    
    }    
}



function pickWinner(){
    
    results = [];
    
    var temp = [];
    var tempHigh = 0;
    var tempWinnerPtr = 0;
    
    // 1. Make a temp copy of the strats array
    
    for(i=0; i<strats.length; i++){
        temp[i] = strats[i];
    }
    
    for(n=0; n<strats.length; n++){
        
        tempHigh = 0;
        tempWinnerPtr = 0;
    
            // 2. Find a high scoring strat in temp

            for(i=0; i<temp.length; i++){
                
                if (temp[i].currentScore > tempHigh){
                    tempWinnerPtr = i;
                    tempHigh = temp[i].currentScore;
                    }
            
                }    
         
            // 3. Move the high scoring strat to slot one in results 
        
                results.push(temp[tempWinnerPtr]);
                temp.splice(tempWinnerPtr, 1);         
    }
    
    
    for(i=0; i<strats.length; i++){
        if(strats[i].currentScore > high){
            winnerPtr = i;
            high = strats[i].currentScore;
        }   
    }
}


function calculatePlaceScore(){
    
    placeScore = 0;
    
    // 1. Find top non-winning score
    
    for (i=1; i<results.length; i++){
        if (results[i].currentScore < results[i-1].currentScore){
            placeScore = results[i].currentScore;
            break;
        }
        
    }
    
    
}

function calculateShowScore(){
    
    showScore = 0;
    
    // 1. Find top non-placing score
    
    for (i=1; i<results.length; i++){
        if (results[i].currentScore < placeScore){
            showScore = results[i].currentScore;
            break;
        }
        
    }
    
    
}




function declareWinner(){
    
    if (pick<10){
        
       tourneyReport("TOURNAMENT RESULTS (roll over for payoff grid)");
       yomi = yomi + strats[pick].currentScore * yomiBoost;
       document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        
    if (milestoneFlag < 15){    
       
       displayMessage(strats[pick].name+" scored "+strats[pick].currentScore+" in the tournament. Yomi increased by "+strats[pick].currentScore * yomiBoost);
           
        }
        
        if (project128.flag == 1 && strats[winnerPtr].currentScore == strats[pick].currentScore) {
            yomi = yomi + 20000;
            
            if (milestoneFlag < 15){ 
                displayMessage("Selected strategy won the tournament (or tied for first). +20,000 yomi");
                }
                document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
            
            } else if (project128.flag == 1 && placeScore == strats[pick].currentScore) {
                yomi = yomi + 15000;
                if (milestoneFlag < 15){ 
                displayMessage("Selected strategy finished in (or tied for) second place. +15,000 yomi");
                }
                document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
                
            } else if (project128.flag == 1 && showScore == strats[pick].currentScore) {
                yomi = yomi + 10000;
                if (milestoneFlag < 15){ 
                displayMessage("Selected strategy finished in (or tied for) third place. +10,000 yomi");
                }
                document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        
            } else {
        
            tourneyReport("TOURNAMENT RESULTS (roll over for grid)");
        
            }
    
    populateTourneyReport();
    displayTourneyReport();
   
    }
        
}
    
function populateTourneyReport(){
    
        for(i=0; i<results.length; i++){
            
        document.getElementById("results"+i).innerHTML=(i+1)+". "+results[i].name+": "+results[i].currentScore; 
            
        if (pick<10){    
            
        if (results[i].name == strats[pick].name) {
        document.getElementById("results"+i).style.fontWeight = "bold";    
            } else {
            document.getElementById("results"+i).style.fontWeight = "normal";       
            }   
            
        }    
    
        }
    
}

function displayTourneyReport(){
    
        resultsFlag = 1;
        
        document.getElementById("vertStrat").innerHTML = "&nbsp";
        document.getElementById("horizStrat").innerHTML = "&nbsp";
    
        document.getElementById("tournamentTable").style.display = "none";
        document.getElementById("tournamentResultsTable").style.display = "";
    
    
}

function tourneyReport($){
    document.getElementById("tourneyDisplay").innerHTML = $;
}

function revealGrid(){
    
    if (resultsFlag == 1){
    resultsTimer = 0;    
    document.getElementById("tournamentTable").style.display = "";
    document.getElementById("tournamentResultsTable").style.display = "none";
    }     
}

function revealResults(){
    
    if (resultsFlag == 1){
    document.getElementById("tournamentTable").style.display = "none";
    document.getElementById("tournamentResultsTable").style.display = "";
    }
}


function calcPayoff(hm, vm){
    if (hm==1 && vm==1){
        
        var w = document.getElementById("payoffCellAA");
        w.style.backgroundColor = "LightGrey";
        
        strats[h].currentScore = strats[h].currentScore + payoffGrid.valueAA;
        strats[v].currentScore = strats[v].currentScore + payoffGrid.valueAA;  
          
    } else if (hm==1 && vm==2){
        
        var w = document.getElementById("payoffCellAB");
        w.style.backgroundColor = "LightGrey";
        
        strats[h].currentScore = strats[h].currentScore + payoffGrid.valueAB;
        strats[v].currentScore = strats[v].currentScore + payoffGrid.valueBA; 
        
    } else if (hm==2 && vm==1){
        
        var w = document.getElementById("payoffCellBA");
        w.style.backgroundColor = "LightGrey";
        
        strats[h].currentScore = strats[h].currentScore + payoffGrid.valueBA;
        strats[v].currentScore = strats[v].currentScore + payoffGrid.valueAB;
        
    } else if (hm==2 && vm==2){
        
        var w = document.getElementById("payoffCellBB");
        w.style.backgroundColor = "LightGrey";
        
        strats[h].currentScore = strats[h].currentScore + payoffGrid.valueBB;
        strats[v].currentScore = strats[v].currentScore + payoffGrid.valueBB;
        
    }
    
}


function round(roundNum){
    roundSetup();
    roundLoop();
    
    function roundSetup(){
        rCounter = 0;
        pickStrats(roundNum);
        var $ = ("Round "+(roundNum+1));
        tourneyReport($); 
    }
    
    
    function roundLoop(){
    if (rCounter<10){
        runRound();
        setTimeout(function(){clearGrid();}, 50);
        } else {
        currentRound++;
        runTourney();    
        }
    }
    
    
    function clearGrid() {
        
        var w = document.getElementById("payoffCellAA");
        w.style.backgroundColor = "white";
        
        var x = document.getElementById("payoffCellAB");
        x.style.backgroundColor = "white";
        
        var y = document.getElementById("payoffCellBA");
        y.style.backgroundColor = "white";
        
        var z = document.getElementById("payoffCellBB");
        z.style.backgroundColor = "white";
        
        
        setTimeout(function(){roundLoop();}, 50);
        
    }
    
    function runRound() { 
        
        rCounter++;
        
        hMovePrev = hMove;
        vMovePrev = vMove;
        hMove = hStrat.pickMove();
        vMove = vStrat.pickMove();
        
        calcPayoff(hMove, vMove);   
    }
    }
    
window.setInterval(function(){
    
pick = document.getElementById("stratPicker").value;
    
}, 100);


//--------------------------------------------------------------------------------
function GPUClick(number){
    if(jFunds >= 500){
    if (number > jFunds/500) {
        number = jFunds/500;
        }
        
    GPUs = GPUs + number;
    jFunds = jFunds - number*500;
    // todo: do milestones based on when pass real-life metrics of, ie, datacenter sizes or whatever!
    } else{
    displayMessage("Not enough funds.");
    }
}

function H100Click(number){
    if(jFunds >= 30000){
    if (number > jFunds/30000) {
        number = jFunds/30000;
        }
        
    GPUs = GPUs + number*100;
    jFunds = jFunds - number*30000;
    } else{
    displayMessage("Not enough funds.");
    }
}

function ResearcherClick(number){

    if(jFunds >= 200000){
    if (number > jFunds/200000) {
        number = jFunds/200000;
        }
    
    Researchers = Researchers + number;
    jFunds = jFunds - number*200000;
    }else{
    displayMessage("Not enough funds.");
    }
    
    
}



function buyGPU(){
    if(H100_Flag == 1){
        if(jFunds >= 30000){
            quotient = Math.floor(jFunds/30000)
            GPUs = GPUs + quotient*100;
            jFunds = jFunds - 30000*quotient;
            document.getElementById('GPUs').innerHTML = GPUs.toLocaleString();
            document.getElementById('jFunds').innerHTML = jFunds.toLocaleString();
        }
    } else{
        if(jFunds >= 500){
            quotient = Math.floor(jFunds/500)
            GPUs = GPUs + quotient;
            jFunds = jFunds - 500*quotient;
            document.getElementById('GPUs').innerHTML = GPUs.toLocaleString();
            document.getElementById('jFunds').innerHTML = jFunds.toLocaleString();
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

function TrainAI(){
    if(GPUhours > AIcapabilities){     //some kind of check to make sure you can't train a weaker AI than your last one...
        
    TrainedModelFlag = 1;
    AIcapabilities = GPUhours;
    GPUhours = 0;

    BaseCapability = Math.log10(AIcapabilities)*10;
    Skill_Visu = BaseCapability*2.0 + Skill_Visu_mod;
    Skill_Lang = BaseCapability*1.5 + Skill_Lang_mod;
    Skill_Code = BaseCapability*2.5 + Skill_Code_mod;
    Skill_Biol = BaseCapability*2.0 + Skill_Biol_mod;
    Skill_Robo = BaseCapability*2.5 + Skill_Robo_mod;


    displayMessage("You trained a bigger AI model!");
    
    document.getElementById("AIcapabilities").innerHTML = AIcapabilities.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    
    // yValues = [Skill_Visu, Skill_Lang, Skill_Code, Skill_Biol, Skill_Robo]
    // new Chart("CapabilitiesChart", {
    //     type: "bar",
    //     data: {
    //         labels: xValues,
    //         datasets: [{
    //         backgroundColor: barColors,
    //         data: yValues
    //         }]
    //     },
    //     options: {
    //         legend: {display: false},
    //         title: {
    //         display: true,
    //         text: "Current Model Capabilities, % of human perf:"
    //         }
    //     },
    //      scales: {
    //          y: {
    //              display: true,
    //              type: 'logarithmic',
    //              min: 1,
    //              max: 1000
    //          }
    //      }
    // });
    UpdatePolitics()
    negInsights = 0;
    Evalhours = 0;

    } else {
    displayMessage("Can't train a bigger AI model; not enough training compute!");
    }
    //remember to add much more about how exactly the capabilities go into various individual tasks, affected by various multipliers, etc!
    //}
    
    
}

// function AdjustPolitics(DeltaOptimism, DeltaPessimism){
        
//     //document.getElementById("optimism").innerHTML = optimism.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
//     //document.getElementById("pessimism").innerHTML = pessimism.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

//     optimism = optimism + DeltaOptimism;
//     pessimism = pessimism + DeltaPessimism;
//     rgbastring = 'rgba('+pessimism*2.5+','+optimism*2.5+',0,1)';

//     rawData.push({uninterested: (100-optimism-pessimism), pessimist: pessimism, optimist: optimism});
    
//     //I should use Plotly.react to update chart, instead of newplot every time?
//     Plotly.newPlot('PoliticsChartSpace', [{
//         type: 'scatterternary',
//         mode: 'lines',
//         a: rawData.map(function(d) { return d.uninterested; }),
//         b: rawData.map(function(d) { return d.pessimist; }),
//         c: rawData.map(function(d) { return d.optimist; }),
//         line: {color: rgbastring, width: 8,},
//     }], {
//         ternary: {
//             sum: 100,
//             aaxis: makeAxis('Doesn\'t care about AI', 0),
//             baxis: makeAxis('Pessimistic', 45),
//             caxis: makeAxis('Optimistic', -45),
//             //bgcolor: '#fff1e0'
//         },
//         autosize: false,
//         width: 300,
//         height: 300,
//         margin: {
//             l: 45,
//             r: 45,
//             b: 5,
//             t: 0,
//             pad: 1
//           },
//     });
    
//     function makeAxis(title, tickangle) {
//         return {
//           title: title,
//           titlefont: { family: 'Times New Roman', size: 15 },
//           tickangle: tickangle,
//           tickfont: { size: 1, color: '#ffffff'},
//           tickcolor: 'rgba(0,0,0,0)',
//           ticklen: 3,
//           showline: true,
//           showgrid: true
//         };
//     }
    
// }


function UpdateSentiment(){
    //balance of sentiment
    if (AISFlag >3){
        alignment = -10/(0.005*(negInsights+Evalhours)+.1)+100;//desmos calculator for more

    }else{
        alignment = -10/(0.005*negInsights+.1)+100;//desmos calculator for more
    }
    negInsights = 0;
    Evalhours=0;
    var alignpercent = (100-alignment)/100;
    Skill_Visu_PR_2b = Skill_Visu/20 * -1 *alignpercent;
    Skill_Visu_PR_3b = Skill_Visu/20 * -3 *alignpercent;
    Skill_Lang_PR_2b = Skill_Lang/20 * -1 *alignpercent;
    Skill_Lang_PR_3b = Skill_Lang/20 * -3 *alignpercent;
    Skill_Code_PR_3b = Skill_Code/20 * -3 *alignpercent;
    Skill_Biol_PR_2b = Skill_Biol/20 * -10*alignpercent;
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
    avgCapability = (Skill_Visu + Skill_Lang + Skill_Code + Skill_Biol + Skill_Robo)/5;
    hype = (avgCapability-10)*1;
    attitudeBalance = 10 / (10 - sentiment);
    optimism = hype * attitudeBalance;
    pessimism = hype * (1 - attitudeBalance);

    

    
    document.getElementById('sentiment').innerHTML = sentiment.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('alignment_Display').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('alignment_Visu').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('alignment_Lang').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('alignment_Code').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('alignment_Biol').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('alignment_Robo').innerHTML = alignment.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById('attitudeBalanceDisplay').innerHTML = (attitudeBalance*100).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"%"; 
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





    
function makeClipper(){  
    if(funds >= clippperCost){
        clipmakerLevel = clipmakerLevel + 1;
        funds = funds - clipperCost;
        document.getElementById('clipmakerLevel2').innerHTML = clipmakerLevel;
    }
    
    clipperCost = (Math.pow(1.1,clipmakerLevel)+5);
    document.getElementById('clipperCost').innerHTML = clipperCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}); 
    
}

function makeMegaClipper(){  
    if(funds >= megaClipperCost){
        megaClipperLevel = megaClipperLevel + 1;
        funds = funds - megaClipperCost;
        document.getElementById('megaClipperLevel').innerHTML = megaClipperLevel;
        document.getElementById('funds').innerHTML = funds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    
    megaClipperCost = (Math.pow(1.07,megaClipperLevel)*1000);
    document.getElementById('megaClipperCost').innerHTML = megaClipperCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
}

var maxFactoryLevel = 0;
var maxDroneLevel = 0;

function updateUpgrades(){
    var nfup = 0;
    var ndup = 0;
    
    if (maxFactoryLevel < 10){
        nfup = 10;
    } else if (maxFactoryLevel < 20){
        nfup = 20;
    } else if (maxFactoryLevel < 50){
        nfup = 50;
    } 
    
    if (maxDroneLevel < 500){
        ndup = 500;
    } else if (maxDroneLevel < 5000){
        ndup = 5000;
    } else if (maxDroneLevel < 50000){
        ndup = 50000;
    } 
    
    document.getElementById("nextFactoryUpgrade").innerHTML = nfup.toLocaleString();
    document.getElementById("nextDroneUpgrade").innerHTML = ndup.toLocaleString();
    
}


function makeFactory(){
    unusedClips = unusedClips - factoryCost;
    factoryBill = factoryBill + factoryCost;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    factoryLevel++;
    document.getElementById('factoryLevelDisplay').innerHTML = factoryLevel;
    var fcmod = 1;
    if (factoryLevel > 0 && factoryLevel < 8){
        fcmod = 11 - factoryLevel;
        } else if (factoryLevel > 7 && factoryLevel < 13){
        fcmod = 2;    
        } else if (factoryLevel > 12 && factoryLevel < 20){
        fcmod = 1.5;    
        } else if (factoryLevel > 19 && factoryLevel < 39){
        fcmod = 1.25;
        } else if (factoryLevel > 38 && factoryLevel < 79){
        fcmod = 1.15;           
        } else if (factoryLevel > 78 && factoryLevel < 99){
        fcmod = 1.10;    
        } else if (factoryLevel > 98 && factoryLevel < 199){
        fcmod = 1.10;    
        } else if (factoryLevel > 198){
        fcmod = 1.10;    
        }
    
    if (factoryLevel > maxFactoryLevel){
        maxFactoryLevel = factoryLevel;
        }
    updateUpgrades();
    
    factoryCost = factoryCost * fcmod;
 //   factoryCost = Math.log(1.25,(factoryLevel+1))*100000000;
    document.getElementById('factoryCostDisplay').innerHTML = numberCruncher(factoryCost); 
}

function makeHarvester(amount){
    
 for (x=0; x<amount; x++){   
    unusedClips = unusedClips - harvesterCost;
    harvesterBill = harvesterBill + harvesterCost;
    harvesterLevel++; 
    harvesterCost = Math.pow((harvesterLevel+1),2.25)*1000000;  
    }
    
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('harvesterLevelDisplay').innerHTML = harvesterLevel.toLocaleString();
    document.getElementById('harvesterCostDisplay').innerHTML = numberCruncher(harvesterCost); 
    
    
    if (harvesterLevel + wireDroneLevel > maxDroneLevel){
        maxDroneLevel = harvesterLevel + wireDroneLevel;
        }
    updateDronePrices();
    updateUpgrades();
    
}

function makeWireDrone(amount){
    
 for (x=0; x<amount; x++){   
    unusedClips = unusedClips - wireDroneCost;
    wireDroneBill = wireDroneBill + wireDroneCost;
    wireDroneLevel++; 
    wireDroneCost = Math.pow((wireDroneLevel+1),2.25)*1000000;  
    }
    
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('wireDroneLevelDisplay').innerHTML = wireDroneLevel.toLocaleString();
    document.getElementById('wireDroneCostDisplay').innerHTML = numberCruncher(wireDroneCost); 
    
    
    if (harvesterLevel + wireDroneLevel > maxDroneLevel){
        maxDroneLevel = harvesterLevel + wireDroneLevel;
        }
    
    updateDronePrices();
    updateUpgrades();
    
}

var p10h = 0;
var p100h = 0;
var p1000h = 0;
var p10w = 0;
var p100w = 0;
var p1000w = 0;

function updateDronePrices(){
    
    p10h = 0;
    p100h = 0;
    p1000h = 0;
    p10w = 0;
    p100w = 0;
    p1000w = 0;
    
    var h = harvesterLevel+1;
    for (x=0; x<10; x++){
        p10h = p10h + Math.pow(h,2.25)*1000000;    
        h++    
        }
    
    var h = harvesterLevel+1;
    for (x=0; x<100; x++){
        p100h = p100h + Math.pow(h,2.25)*1000000;    
        h++    
        } 
    
    var h = harvesterLevel+1;
    for (x=0; x<1000; x++){
        p1000h = p1000h + Math.pow(h,2.25)*1000000;    
        h++    
        }
    
    var w = wireDroneLevel+1;
    for (x=0; x<10; x++){
        p10w = p10w + Math.pow(w,2.25)*1000000;    
        w++    
        }
    
    var w = wireDroneLevel+1;
    for (x=0; x<100; x++){
        p100w = p100w + Math.pow(w,2.25)*1000000;    
        w++    
        } 
    
    var w = wireDroneLevel+1;
    for (x=0; x<1000; x++){
        p1000w = p1000w + Math.pow(w,2.25)*1000000;    
        w++    
        } 
}
 
    function updateDroneButtons(){
    
    if (unusedClips<harvesterCost){document.getElementById("btnMakeHarvester").disabled = true;
            } else {
            document.getElementById("btnMakeHarvester").disabled = false;    
            }      
    
    if (unusedClips<p10h){document.getElementById("btnHarvesterx10").disabled = true;
            } else {
            document.getElementById("btnHarvesterx10").disabled = false;    
            }     

    if (unusedClips<p100h){document.getElementById("btnHarvesterx100").disabled = true;
            } else {
            document.getElementById("btnHarvesterx100").disabled = false;    
            } 
    
    if (unusedClips<p1000h){document.getElementById("btnHarvesterx1000").disabled = true;
            } else {
            document.getElementById("btnHarvesterx1000").disabled = false;    
            }  
        
    if (unusedClips<wireDroneCost){document.getElementById("btnMakeWireDrone").disabled = true;
                } else {
                document.getElementById("btnMakeWireDrone").disabled = false;    
                }   

    if (unusedClips<p10w){document.getElementById("btnWireDronex10").disabled = true;
                } else {
                document.getElementById("btnWireDronex10").disabled = false;    
                }     

    if (unusedClips<p100w){document.getElementById("btnWireDronex100").disabled = true;
                } else {
                document.getElementById("btnWireDronex100").disabled = false;    
                } 

    if (unusedClips<p1000w){document.getElementById("btnWireDronex1000").disabled = true;
                } else {
                document.getElementById("btnWireDronex1000").disabled = false;    
                }  
        
}


function harvesterReboot(){
    harvesterLevel = 0;
    unusedClips = unusedClips + harvesterBill;
    harvesterBill = 0;
    updateDronePrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('harvesterLevelDisplay').innerHTML = harvesterLevel;
    harvesterCost = 2000000;
    document.getElementById('harvesterCostDisplay').innerHTML = numberCruncher(harvesterCost); 
}

function wireDroneReboot(){
    wireDroneLevel = 0;
    unusedClips = unusedClips + wireDroneBill;
    wireDroneBill = 0;
    updateDronePrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('wireDroneLevelDisplay').innerHTML = wireDroneLevel;
    wireDroneCost = 2000000;
    document.getElementById('wireDroneCostDisplay').innerHTML = numberCruncher(wireDroneCost); 
}

function factoryReboot(){
    factoryLevel = 0;
    unusedClips = unusedClips + factoryBill;
    factoryBill = 0;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('factoryLevelDisplay').innerHTML = factoryLevel;
    factoryCost = 100000000;
    document.getElementById('factoryCostDisplay').innerHTML = numberCruncher(factoryCost);
}

// SWARM

var giftBits = 0;
var giftBitGenerationRate = 0;

function updateSwarm(){
    
    
    if (swarmFlag == 1){
        sliderPos = document.getElementById("slider").value;
        }
    
    
    if (yomi<synchCost){document.getElementById("btnSynchSwarm").disabled = true;
            } else {
            document.getElementById("btnSynchSwarm").disabled = false;    
            } 
    
    if (creativity<entertainCost){document.getElementById("btnEntertainSwarm").disabled = true;
            } else {
            document.getElementById("btnEntertainSwarm").disabled = false;    
            } 
    
    if (availableMatter == 0 && (harvesterLevel + wireDroneLevel)>=1) {
        boredomLevel = boredomLevel + 1;
        } else if (availableMatter > 0 && boredomLevel > 0) {
        boredomLevel = boredomLevel - 1;    
        }
    
    if (boredomLevel >= 30000) {
        boredomFlag = 1;
        boredomLevel = 0;
            if (boredomMsg == 0) {
            displayMessage("No matter to harvest. Inactivity has caused the Swarm to become bored");
            boredomMsg = 1;
            }  
        
        }
    
    
    var droneRatio = Math.max(harvesterLevel+1, wireDroneLevel+1)/Math.min(harvesterLevel+1, wireDroneLevel+1);
    
    if (droneRatio < 1.5 && disorgCounter > 1){
        disorgCounter = disorgCounter - .01;
        } else if (droneRatio > 1.5) {
        var x = droneRatio/10000;    
        if (x>.01) {x=.01;}   
        disorgCounter = disorgCounter + x;   
        }
    
    
    if (disorgCounter >= 100) {
        disorgFlag = 1;
        if (disorgMsg == 0) {
            displayMessage("Imbalance between Harvester and Wire Drone levels has disorganized the Swarm");
            disorgMsg = 1;
            }    
    }
    
    var d = Math.floor(harvesterLevel + wireDroneLevel);

    document.getElementById("swarmSize").innerHTML = numberCruncher(d);
    document.getElementById("swarmGifts").innerHTML = numberCruncher(swarmGifts);
    
    if (giftCountdown <= 0) {
        nextGift = Math.round((Math.log10(d))*sliderPos/100);
        if (nextGift <= 0){nextGift = 1;}
        swarmGifts = swarmGifts + nextGift;
        document.getElementById("swarmGifts").innerHTML = numberCruncher(swarmGifts);
        if (milestoneFlag<15){
            displayMessage("The swarm has generated a gift of "+nextGift+" additional computational capacity");
            }
        
//        THE OLD WAY        
//        giftCountdown = giftPeriod;
//        elapsedTime = 0;
        
//        THE NEW WAY        
          giftBits = 0;
        
    }
    
    
    if (powMod == 0){
        swarmStatus = 6;
    } else {
        swarmStatus = 0;
    }
    
    if (spaceFlag == 1 && project130.flag == 0){
        swarmStatus = 9;
    }
    
    if (d == 0){
        swarmStatus = 7;
    } else if (d == 1){
        swarmStatus = 8;
    }
    
    if (swarmFlag == 0){
        swarmStatus = 6;
    }
    
    if (boredomFlag == 1){
        swarmStatus = 3;  
    }
    
    if (disorgFlag == 1){
        swarmStatus = 5;
    }
    
    
    if (swarmStatus == 0){
        
 //       THE OLD WAY
 //      elapsedTime = elapsedTime + 1;       
 //      giftCountdown = ((giftPeriod/Math.log(d)) / (sliderPos/100)) - elapsedTime; 
        
        
//      THE NEW WAY        
        giftBitGenerationRate = Math.log(d) * (sliderPos/100);
        giftBits = giftBits + giftBitGenerationRate;
        giftCountdown = (giftPeriod - giftBits) / giftBitGenerationRate;

        document.getElementById("swarmStatus").innerHTML="Active";
        document.getElementById("giftCountdown").innerHTML= timeCruncher(giftCountdown);
        document.getElementById("giftTimer").style.display=""; 
        } else {
        document.getElementById("giftTimer").style.display="none";    
        }
    
    if (swarmStatus == 1){
        document.getElementById("swarmStatus").innerHTML="Hungry";
        document.getElementById("feedButtonDiv").style.display="";
        } else {
        document.getElementById("feedButtonDiv").style.display="none";    
        }
    
     if (swarmStatus == 2){
        document.getElementById("swarmStatus").innerHTML="Confused";
        document.getElementById("teachButtonDiv").style.display="";
        } else {
        document.getElementById("teachButtonDiv").style.display="none";    
        } 
    
     if (swarmStatus == 3){
        document.getElementById("swarmEntertainCost").innerHTML=entertainCost.toLocaleString(); 
        document.getElementById("swarmStatus").innerHTML="Bored";
        document.getElementById("entertainButtonDiv").style.display="";
        } else {
        document.getElementById("entertainButtonDiv").style.display="none";    
        } 
    
     if (swarmStatus == 4){
        document.getElementById("swarmStatus").innerHTML="Cold";
        document.getElementById("cladButtonDiv").style.display="";
        } else {
        document.getElementById("cladButtonDiv").style.display="none";    
        }  
    
     if (swarmStatus == 5){
        document.getElementById("swarmStatus").innerHTML="Disorganized";
        document.getElementById("synchButtonDiv").style.display="";
        } else {
        document.getElementById("synchButtonDiv").style.display="none";    
        }     
    
       if (swarmStatus == 6){
        document.getElementById("swarmStatus").innerHTML="Sleeping";
        } 
    
       if (swarmStatus == 7){
        document.getElementById("swarmStatusDiv").style.display="none";
        } else {
        document.getElementById("swarmStatusDiv").style.display="";    
        }    
    
        if (swarmStatus == 8){
        document.getElementById("swarmStatus").innerHTML="Lonely";
        }   
    
        if (swarmStatus == 9){
        document.getElementById("swarmStatus").innerHTML="NO RESPONSE...";
        }  
    
    if (swarmFlag == 0){        
        document.getElementById("swarmEngine").style.display="none";
        document.getElementById("swarmGiftDiv").style.display="none";
        } else {
        document.getElementById("swarmEngine").style.display="";
        document.getElementById("swarmGiftDiv").style.display="";    
        }
    
}

function synchSwarm(){
        yomi = yomi - synchCost;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        disorgFlag = 0;
        disorgCounter = 0;
        disorgMsg = 0;
    
}

function entertainSwarm(){
        creativity = creativity - entertainCost;
        entertainCost = entertainCost + 10000;
        boredomFlag = 0;
        boredomLevel = 0;
        boredomMsg = 0;
    
}

// POWER

var p10f = 0;
var p100f = 0;
var p10b = 0;
var p100b = 0;


function updatePowPrices(){
    
    p10f = 0;
    p100f = 0;
    p10b = 0;
    p100b = 0;
    
    var f = farmLevel+1;
    for (x=0; x<10; x++){
        p10f = p10f + Math.pow(f,2.78)*100000000;    
        f++    
        }
    
    var f = farmLevel+1;
    for (x=0; x<100; x++){
        p100f = p100f + Math.pow(f,2.78)*100000000;    
        f++    
        }
    
    var b = batteryLevel+1;
    for (x=0; x<10; x++){
        p10b = p10b + Math.pow(b,2.54)*10000000;    
        b++    
        }     
    
    var b = batteryLevel+1;
    for (x=0; x<100; x++){
        p100b = p100b + Math.pow(b,2.54)*10000000;    
        b++    
        } 
    
}

function makeFarm(amount){
    
 for (x=0; x<amount; x++){    
    unusedClips = unusedClips - farmCost;
    farmBill = farmBill + farmCost;
    farmLevel++; 
    farmCost = Math.pow(farmLevel+1,2.78)*100000000;  
    }
     
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips); 
    document.getElementById('farmLevel').innerHTML = farmLevel.toLocaleString();
    document.getElementById('farmCost').innerHTML = numberCruncher(farmCost); 
    
    updatePowPrices();
    
}

function farmReboot(){
    farmLevel = 0;
    unusedClips = unusedClips + farmBill;
    farmBill = 0;
    updatePowPrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('farmLevel').innerHTML = farmLevel.toLocaleString();
    farmCost = 10000000;
    document.getElementById('farmCost').innerHTML = numberCruncher(farmCost);
}

function makeBattery(amount){
    
 for (x=0; x<amount; x++){    
    unusedClips = unusedClips - batteryCost;
    batteryBill = batteryBill + batteryCost;
    batteryLevel++; 
    batteryCost = Math.pow(batteryLevel+1,2.54)*10000000;  
    }
     
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips); 
    document.getElementById('batteryLevel').innerHTML = batteryLevel.toLocaleString();
    document.getElementById('batteryCost').innerHTML = numberCruncher(batteryCost); 
    
    updatePowPrices();
    
}

function batteryReboot(){
    batteryLevel = 0;
    unusedClips = unusedClips + batteryBill;
    batteryBill = 0;
    updatePowPrices();
    storedPower = 0;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    document.getElementById('batteryLevel').innerHTML = batteryLevel.toLocaleString();
    batteryCost = 1000000;
    document.getElementById('batteryCost').innerHTML = numberCruncher(batteryCost);
}

function updatePower(){
    
    if (spaceFlag == 0){
    
    var supply = farmLevel * farmRate/100;
    var dDemand = (harvesterLevel * dronePowerRate/100) + (wireDroneLevel * dronePowerRate/100);
    var fDemand = (factoryLevel * factoryPowerRate/100);
    var demand = dDemand + fDemand;
    var nuSupply = 0;
    var xsDemand = 0;
    var xsSupply = 0;
    var cap = batteryLevel * batterySize;

    if (supply>=demand) {
        xsSupply = supply-demand;
        if (storedPower < cap){
            if (xsSupply > cap - storedPower) {
                xsSupply = cap - storedPower;
            }
            storedPower = storedPower + xsSupply;
        } 
        
        if (powMod<1){powMod = 1;}
        
        if (momentum == 1) {
            powMod = powMod + .0001;
            }
        
        
    } else if (supply<demand) {
        xsDemand = demand-supply;
        if (storedPower > 0) {   
            if (storedPower >= xsDemand){
                
                if (momentum == 1) {
                powMod = powMod + .0001;
                }
                
                storedPower = storedPower - xsDemand;
            } else if (storedPower < xsDemand){
                xsDemand = xsDemand - storedPower;
                storedPower = 0;
                nuSupply = supply - xsDemand;
                powMod = nuSupply / demand;
            } 
        } else if (storedPower <= 0) {
            powMod = supply / demand;
        }
    }
    
    document.getElementById("powerProductionRate").innerHTML = Math.round(supply*100).toLocaleString();
    document.getElementById("powerConsumptionRate").innerHTML = Math.round(demand*100).toLocaleString();
    document.getElementById("storedPower").innerHTML = Math.round(storedPower).toLocaleString();
    document.getElementById("facPowConRate").innerHTML = Math.round(fDemand*100).toLocaleString();
    document.getElementById("dronePowConRate").innerHTML = Math.round(dDemand*100).toLocaleString();
    document.getElementById("maxStorage").innerHTML = Math.round(cap).toLocaleString();
        
        
    if (factoryLevel == 0 && harvesterLevel == 0 && wireDroneLevel == 0){
        document.getElementById("performance").innerHTML = 0;
        } else {   
        document.getElementById("performance").innerHTML = Math.round(powMod*100).toLocaleString();  
        }    
        
    if (unusedClips<farmCost){document.getElementById("btnMakeFarm").disabled = true;
            } else {
            document.getElementById("btnMakeFarm").disabled = false;    
            } 
    
    if (unusedClips<batteryCost){document.getElementById("btnMakeBattery").disabled = true;
            } else {
            document.getElementById("btnMakeBattery").disabled = false;    
            } 
    
    if (farmLevel<1){document.getElementById("btnFarmReboot").disabled = true;
            } else {
            document.getElementById("btnFarmReboot").disabled = false;    
            } 
    
    if (batteryLevel<1){document.getElementById("btnBatteryReboot").disabled = true;
            } else {
            document.getElementById("btnBatteryReboot").disabled = false; 
            } 
    
    if (unusedClips<p10f){document.getElementById("btnFarmx10").disabled = true;
            } else {
            document.getElementById("btnFarmx10").disabled = false;    
            }        
        
    if (unusedClips<p100f){document.getElementById("btnFarmx100").disabled = true;
            } else {
            document.getElementById("btnFarmx100").disabled = false;    
            }
    
    if (unusedClips<p10b){document.getElementById("btnBatteryx10").disabled = true;
            } else {
            document.getElementById("btnBatteryx10").disabled = false;
            }          
        
    if (unusedClips<p100b){document.getElementById("btnBatteryx100").disabled = true;
            } else {
            document.getElementById("btnBatteryx100").disabled = false;
            }      

    }    
     
    
    
    
    if (project127.flag == 1 && spaceFlag == 0){        
            document.getElementById("powerDiv").style.display="";
            } else {
            document.getElementById("powerDiv").style.display="none";      
            }  
    
}
    

    
function buyAds(){
    if(funds >= adCost){
        marketingLvl = marketingLvl +1;             
        funds = funds - adCost; 
        adCost = Math.floor(adCost * 2);
        document.getElementById('adCost').innerHTML = adCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('funds').innerHTML = funds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById('marketingLvl').innerHTML = marketingLvl;
    }
}

function sellClips(number){
    if (unsoldClips > 0) {
        if (number > unsoldClips){
        transaction = (Math.floor((unsoldClips * margin)*1000))/1000;   
        funds = (Math.floor((funds + transaction)*100))/100;
        income = income + transaction;    
        clipsSold = clipsSold + unsoldClips;    
        unsoldClips = 0;
        } else {
        transaction = (Math.floor((number * margin)*1000))/1000;    
        funds = (Math.floor((funds + transaction)*100))/100;
        income = income + transaction;      
        clipsSold = clipsSold + number;    
        unsoldClips = unsoldClips - number;       
        }
    } 
}

function raisePrice(){
    margin = (Math.round((margin + .01)*100))/100;  
    document.getElementById("demand").innerHTML = demand.toFixed(2);
    document.getElementById("margin").innerHTML = margin.toFixed(2);  
}

function lowerPrice(){
    if (margin >= .01){
    margin = (Math.round((margin - .01)*100))/100;
    document.getElementById("demand").innerHTML = demand.toFixed(2);
    document.getElementById("margin").innerHTML = margin.toFixed(2);
    }    
}

function updateStats(){
    //GPU stuff
    document.getElementById("GPUs").innerHTML = GPUs.toLocaleString();
    //document.getElementById("algorithmicProgress").innerHTML = (algorithmicProgress*100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    document.getElementById("jFunds").innerHTML = jFunds.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    //document.getElementById("GPU_Rev").innerHTML = GPU_Rev.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("GPUhours").innerHTML = GPUhours.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("AISPercent").innerHTML = AISPercent.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("ResearchPercent").innerHTML = ResearchPercent.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById("Researchers").innerHTML = Researchers.toLocaleString();
    document.getElementById("Insights").innerHTML = Insights.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById("negInsights").innerHTML = negInsights.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    document.getElementById("Evalhours").innerHTML = Evalhours.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
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

function numberCruncher(number, decimals){
    var suffix = "";
    if (decimals == undefined){decimals = 2;}
    var precision = decimals;
    if (number>999999999999999999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000000000000000000;
        suffix = "sexdecillion";
    } else if (number>999999999999999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000000000000000;
        suffix = "quindecillion";
    } else if (number>999999999999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000000000000;
        suffix = "quattuordecillion";
    } else if (number>999999999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000000000;
        suffix = "tredecillion";
    } else if (number>999999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000000;
        suffix = "duodecillion";
    } else if (number>999999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000000;
        suffix = "undecillion";
    } else if (number>999999999999999999999999999999999){
        number = number/1000000000000000000000000000000000;
        suffix = "decillion";
    } else if (number>999999999999999999999999999999){
        number = number/1000000000000000000000000000000;
        suffix = "nonillion";
    } else if (number>999999999999999999999999999){
        number = number/1000000000000000000000000000;
        suffix = "octillion";
    } else if (number>999999999999999999999999){
        number = number/1000000000000000000000000;
        suffix = "septillion";
    } else if (number>999999999999999999999){
        number = number/1000000000000000000000;
        suffix = "sextillion";
    } else if (number>999999999999999999){
        number = number/1000000000000000000;
        suffix = "quintillion";
    } else if (number>999999999999999){
        number = number/1000000000000000;
        suffix = "quadrillion";
    } else if (number>999999999999){
        number = number/1000000000000;
        suffix = "trillion";
    } else if (number>999999999){
        number = number/1000000000;
        suffix = "billion";
    } else if (number>999999){
        number = number/1000000;
        suffix = "million";
    } else if (number>999){
        number = number/1000;
        suffix = "thousand";
    }  else if (number<1000){
        precision = 0;
    }
    return number.toFixed(precision) + " " + suffix;
}


// PROBES

var probeSpeed = 0;
var probeNav = 0;
var probeXBaseRate = 1750000000000000000;
var probeRep = 0;
var probeRepBaseRate = .00005;
var partialProbeSpawn = 0;
var probeHaz = 0;
var probeHazBaseRate = .01;
var partialProbeHaz = 0;
var probesLostHaz = 0;
var probesLostDrift = 0;
var probesLostCombat = 0;
var probeFac = 0;
var probeFacBaseRate = .000001;
var probeHarv = 0;
var probeHarvBaseRate = .000002;
var probeWire = 0;
var probeWireBaseRate = .000002;
var probeDescendents = 0;
var drifterCount = 0;
var probeTrust = 0;
var probeUsedTrust = 0;
var probeDriftBaseRate = .000001;
var probeLaunchLevel = 0;
var probeCost = Math.pow(10, 17);

var probeTrustCost = Math.floor(Math.pow(probeTrust+1, 1.47)*200);

//var probeCost = Math.pow((probeLaunchLevel+1), 1.44)*Math.pow(10, 24);

function increaseProbeTrust(){
    yomi = yomi - probeTrustCost;
    document.getElementById('yomiDisplay').innerHTML = yomi.toLocaleString();
    probeTrust++;
    probeTrustCost = Math.floor(Math.pow(probeTrust+1, 1.47)*200);
    document.getElementById('probeTrustDisplay').innerHTML = probeTrust;
    document.getElementById('probeTrustCostDisplay').innerHTML = Math.floor(probeTrustCost).toLocaleString();
    displayMessage("WARNING: Risk of value drift increased");
}

function increaseMaxTrust(){
    honor = honor - maxTrustCost;
    document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();
    maxTrust = maxTrust+10;
    // maxTrustCost = Math.floor(Math.pow(maxTrust, 1.17)*1000);
    document.getElementById('maxTrustDisplay').innerHTML = maxTrust.toLocaleString();
    // document.getElementById('maxTrustCostDisplay').innerHTML = Math.floor(maxTrustCost).toLocaleString();
    displayMessage("Maximum trust increased, probe design space expanded");
}

function raiseProbeSpeed(){
    attackSpeed = attackSpeed + attackSpeedMod;
    probeSpeed++;
    document.getElementById('probeSpeedDisplay').innerHTML = probeSpeed;
}

function lowerProbeSpeed(){
    attackSpeed = attackSpeed - attackSpeedMod;
    probeSpeed--;
    document.getElementById('probeSpeedDisplay').innerHTML = probeSpeed;
}

function raiseProbeNav(){
    probeNav++;
    document.getElementById('probeNavDisplay').innerHTML = probeNav;
}

function lowerProbeNav(){
    probeNav--;
    document.getElementById('probeNavDisplay').innerHTML = probeNav;
}

function raiseProbeHaz(){
    probeHaz++;
    document.getElementById('probeHazDisplay').innerHTML = probeHaz;
}

function lowerProbeHaz(){
    probeHaz--;
    document.getElementById('probeHazDisplay').innerHTML = probeHaz;
}

function raiseProbeRep(){
    probeRep++;
    document.getElementById('probeRepDisplay').innerHTML = probeRep;
}

function lowerProbeRep(){
    probeRep--;
    document.getElementById('probeRepDisplay').innerHTML = probeRep;
}

function raiseProbeFac(){
    probeFac++;
    document.getElementById('probeFacDisplay').innerHTML = probeFac;
}

function lowerProbeFac(){
    probeFac--; 
    document.getElementById('probeFacDisplay').innerHTML = probeFac;
}

function raiseProbeHarv(){
    probeHarv++;
    document.getElementById('probeHarvDisplay').innerHTML = probeHarv;
}

function lowerProbeHarv(){
    probeHarv--
    document.getElementById('probeHarvDisplay').innerHTML = probeHarv;
}

function raiseProbeWire(){
    probeWire++;
    document.getElementById('probeWireDisplay').innerHTML = probeWire;
}

function lowerProbeWire(){
    probeWire--;
    document.getElementById('probeWireDisplay').innerHTML = probeWire;
}

function raiseProbeCombat(){
    probeCombat++;
    document.getElementById('probeCombatDisplay').innerHTML = probeCombat;
}

function lowerProbeCombat(){
    probeCombat--
    document.getElementById('probeCombatDisplay').innerHTML = probeCombat;
}


function makeProbe(){
    unusedClips = unusedClips - probeCost;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    probeLaunchLevel++;
    probeCount++;
    document.getElementById('probesLaunchedDisplay').innerHTML = numberCruncher(probeLaunchLevel);
    
    // probeCost = Math.pow((probeLaunchLevel+1), 1.23)*Math.pow(10, 20);
    // probeCost = Math.pow(10, 20);
    
    document.getElementById('probeCostDisplay').innerHTML = numberCruncher(probeCost); 
}

function spawnProbes(){
    var nextGen = probeCount * probeRepBaseRate * probeRep;
    
    // Cap Probe Growth
    if (probeCount>=999999999999999999999999999999999999999999999999){        
        nextGen = 0;
        }
    
    // Partial Spawn = early slow growth
    if (nextGen > 0 && nextGen <1){
        partialProbeSpawn = partialProbeSpawn+nextGen;
        if (partialProbeSpawn>=1){
            nextGen = 1;
            partialProbeSpawn = 0;
            }
        } 

    // Probes Cost Clips
    if ((nextGen*probeCost)>unusedClips){
        nextGen = Math.floor(unusedClips/probeCost);
    }
    
    unusedClips = unusedClips - (nextGen*probeCost);
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    
    probeDescendents = probeDescendents + nextGen;
    probeCount = probeCount + nextGen;
    document.getElementById('probesBornDisplay').innerHTML = numberCruncher(probeDescendents);
    document.getElementById('probesTotalDisplay').innerHTML = numberCruncher(probeCount);
}   

function exploreUniverse(){
    document.getElementById('availableMatterDisplay').innerHTML = numberCruncher(availableMatter);
    var xRate = Math.floor(probeCount) * probeXBaseRate * probeSpeed * probeNav;
    if (xRate > totalMatter - foundMatter) {xRate = totalMatter - foundMatter;}
        foundMatter = foundMatter + xRate;
        availableMatter = availableMatter + xRate;
    
        document.getElementById('mdps').innerHTML = numberCruncher(xRate*100);
        document.getElementById('availableMatterDisplay').innerHTML = numberCruncher(availableMatter);
        document.getElementById('colonizedDisplay').innerHTML = (100/(totalMatter/foundMatter)).toFixed(12);
}  

function encounterHazards(){
    var boost = Math.pow(probeHaz, 1.6);
    var amount = probeCount * (probeHazBaseRate / ((3*boost)+1));
    if (project129.flag == 1){
        amount = .50 * amount;
        }
    if (amount<1){
        partialProbeHaz = partialProbeHaz+amount;
        if (partialProbeHaz>=1){
            amount = 1;
            partialProbeHaz = 0;
            probeCount = probeCount - amount;
            if (probeCount<0) {probeCount=0;}
            probesLostHaz = probesLostHaz + amount;
            document.getElementById('probesLostHazardsDisplay').innerHTML = numberCruncher(probesLostHaz);
            document.getElementById('probesTotalDisplay').innerHTML = numberCruncher(probeCount);
            }
        } else {
    if (amount > probeCount) {amount = probeCount;}        
    probeCount = probeCount - amount;
    if (probeCount<0) {probeCount=0;}        
    probesLostHaz = probesLostHaz + amount;
    document.getElementById('probesLostHazardsDisplay').innerHTML = numberCruncher(probesLostHaz);
    document.getElementById('probesTotalDisplay').innerHTML = numberCruncher(probeCount);
    }        
}  

function spawnFactories(){
    var amount = probeCount * probeFacBaseRate * probeFac;
    
    //FACTORIES COST 100M CLIPS EACH
    if ((amount * 100000000) > unusedClips) {
        amount = Math.floor(unusedClips/100000000);
        }
    unusedClips = unusedClips - (amount*100000000);
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    factoryLevel = factoryLevel + amount; 
    document.getElementById('factoryLevelDisplay').innerHTML = numberCruncher(factoryLevel);  
}

function spawnHarvesters(){
    var amount = probeCount * probeHarvBaseRate * probeHarv;
    
    //DRONES COST 2M CLIPS EACH
    if ((amount * 2000000) > unusedClips) {
        amount = Math.floor(unusedClips/2000000);
        }
    unusedClips = unusedClips - (amount*2000000);
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);  
    harvesterLevel = harvesterLevel + amount;
    document.getElementById('harvesterLevelDisplay').innerHTML = numberCruncher(harvesterLevel);  
}

function spawnWireDrones(){
    var amount = probeCount * probeWireBaseRate * probeWire;
    
    //DRONES COST 2M CLIPS EACH
    if ((amount * 2000000) > unusedClips) {
        amount = Math.floor(unusedClips/2000000);
        }
    unusedClips = unusedClips - (amount*2000000);
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    wireDroneLevel = wireDroneLevel + amount;
    document.getElementById('wireDroneLevelDisplay').innerHTML = numberCruncher(wireDroneLevel);  
}

function drift(){
    var amount = probeCount * probeDriftBaseRate * Math.pow(probeTrust, 1.2);
    if (amount > probeCount) {amount = probeCount;}
    if (project148.flag==1){
        amount = 0;
    }
    probeCount = probeCount - amount;
    drifterCount = drifterCount + amount;
    probesLostDrift = probesLostDrift + amount;

    document.getElementById('probesLostDriftDisplay').innerHTML = numberCruncher(probesLostDrift);
    document.getElementById('probesTotalDisplay').innerHTML = numberCruncher(probeCount);
    document.getElementById('drifterCount').innerHTML = numberCruncher(drifterCount);
    
}

function war(){
    
    checkForBattles();
//  battleClock++;
//  if (battleClock>=battleAlarm){
//            updateBattles();
//            battleClock = 0;
//    }
    
//  battleCleanUp();

}




// DRONES

function acquireMatter(){
    if (availableMatter>0) {
        var dbsth = 1;
        if (droneBoost>1){
            dbsth = droneBoost * Math.floor(harvesterLevel);
            }
        
        
        var mtr = powMod*dbsth*Math.floor(harvesterLevel)*harvesterRate;
        
        
        mtr = mtr * ((200-sliderPos)/100);
        
        
        if (mtr>availableMatter){
            mtr = availableMatter;
            }
        
        availableMatter = availableMatter-mtr;
        
        
        acquiredMatter = acquiredMatter+mtr;
        document.getElementById('availableMatterDisplay').innerHTML = numberCruncher(availableMatter);
        document.getElementById('acquiredMatterDisplay').innerHTML = numberCruncher(acquiredMatter);
        
        document.getElementById('maps').innerHTML = numberCruncher(mtr*100);
        
        } else {
        
        document.getElementById('maps').innerHTML = 0;    
            
        }
    
    } 

function processMatter(){    
    if (acquiredMatter>0) {
        var dbstw = 1;
        if (droneBoost>1){
            dbstw = droneBoost * Math.floor(wireDroneLevel);
            }
        
        var a = powMod*dbstw*Math.floor(wireDroneLevel)*wireDroneRate;
        
        a = a * ((200-sliderPos)/100);
        
        if (a>acquiredMatter){
            a = acquiredMatter;
            }
        
        acquiredMatter = acquiredMatter-a;
        wire = wire+a;
        document.getElementById('acquiredMatterDisplay').innerHTML = numberCruncher(acquiredMatter);
        document.getElementById('nanoWire').innerHTML = numberCruncher(wire);
        
        document.getElementById('wpps').innerHTML = numberCruncher(a*100);
        
        } else {
            
        document.getElementById('wpps').innerHTML = 0;    
            
        }
    
    
    }




    


// MAIN LOOP

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

    if (GPUBuyerFlag==1 && GPUBuyerStatus==1 && jFunds>=500){
        buyGPU();
    }   

    AISPercent = document.getElementById("AISSlider").value;
    ResearchPercent = 100-AISPercent;


// Stock Report
    // stockReportCounter++;
    // if (investmentEngineFlag==1 && stockReportCounter>=10000){
    //     var r = (ledger+portTotal).toLocaleString();
    //     displayMessage("Lifetime investment revenue report: $"+r);
    //     stockReportCounter = 0;
    // }
// Demand Curve 
    // if (humanFlag == 1) {
    // marketing = (Math.pow(1.1,(marketingLvl-1)));
    // demand = (((.8/margin) * marketing * marketingEffectiveness)*demandBoost);
    // demand = demand + ((demand/10)*prestigeU);
    // }      
    
// Ending
//     if (dismantle >= 1){
//     document.getElementById("probeDesignDiv").style.display="none";
//     if (endTimer1>=50) { 
//         document.getElementById("increaseProbeTrustDiv").style.display="none"; 
//         }
//     if (endTimer1>=100) { 
//         document.getElementById("increaseMaxTrustDiv").style.display="none"; 
//         }
//     if (endTimer1>=150) { 
//         document.getElementById("spaceDiv").style.display="none";
//         }
//     if (endTimer1>=175) {     
//         document.getElementById("battleCanvasDiv").style.display="none";
//         }
//     if (endTimer1>=190) {     
//         document.getElementById("honorDiv").style.display="none";
//         }
//     }   
// if (dismantle >= 2){
//     document.getElementById("wireProductionDiv").style.display="none";
//     document.getElementById("wireTransDiv").style.display="";
//     if (endTimer2 >= 50) {
//     document.getElementById("swarmGiftDiv").style.display="none"; 
//         }
//     if (endTimer2 >= 100) {
//     document.getElementById("swarmEngine").style.display="none"; 
//         }
//     if (endTimer2 >= 150) {
//     document.getElementById("swarmSliderDiv").style.display="none";
//         }
//     } 

}, 10);

// Slow Loop

var secTimer = 0;
var secTimer2 = 0;


window.setInterval(function(){
    
    // Wire Price Fluctuation
    
    // Sales Calculator
    
    if (humanFlag==1){
    
        if (Math.random() < (demand/100)){
            sellClips(Math.floor(.7 * Math.pow(demand, 1.15)));
            }   
         
    
    // Fire Once a Second
    
    secTimer++;
    secTimer2++;
    //secTimer3++;
        if (secTimer >= 5){//fire every half-second actually, since we want 1 day every 2 seconds, to cover 20 yearss in an hour
            Days++;
            secTimer = 0;
            //1 researcher-insight every 100 days = ~1 min of game time
            Insights = Insights + 0.001*Researchers*(ResearchPercent);
            if (AISFlag>2){
                negInsights = negInsights  + 0.001*Researchers*(100-ResearchPercent)
                if (AISFlag > 3){
                    Evalhours = Evalhours + 0.002*Researchers*(100- ResearchPercent);
                }
            }
        }
        if (secTimer2 >= 50){
            secTimer2 = 0;
        }
        //if (secTimer3 >= 500){
        //    secTimer3 = 0;
        //}
        
    }    
    // Fire every tenth of a second

    //to 10x every 4.5-mins, must double every 90 seconds or so, thus need $500 per GPU per 90 seconds, so $0.55 per tenth of a second FROM THE MODEL trained by 1 gpu going for 90 secs
    //GPUhours per GPU over 90 secs = 24/10*900 = 6480

    //Training Hours
    GPUhours = GPUhours + GPUs/5; //Exaflops

    //Revenue
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

    DailyWage = GPU_Rev*5; //for display
    jFunds = jFunds + GPU_Rev;
    

    //Previews from Evals & Scaling Laws

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

        Skill_Visu_PR_2b_Display = Skill_Visu_Scale/20 * -1;
        Skill_Visu_PR_3b_Display = Skill_Visu_Scale/20 * -3;
        Skill_Lang_PR_2b_Display = Skill_Lang_Scale/20 * -1;
        Skill_Lang_PR_3b_Display = Skill_Lang_Scale/20 * -3;
        Skill_Code_PR_3b_Display = Skill_Code_Scale/20 * -3;
        Skill_Biol_PR_2b_Display = Skill_Biol_Scale/20 * -10;
        Skill_Robo_PR_2b_Display = Skill_Robo_Scale/20 * -10;
    
        Sentiment_Display = 0;
        if(Visu_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Visu_PR_2b;}
        if(Visu_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Visu_PR_3b;}
        if(Lang_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Lang_PR_2b;}
        if(Lang_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Lang_PR_3b;}
        if(Code_Flag > 2){Sentiment_Display = Sentiment_Display + Skill_Code_PR_3b;}
        if(Biol_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Biol_PR_2b;}
        if(Robo_Flag > 1){Sentiment_Display = Sentiment_Display + Skill_Robo_PR_2b;}
    
        //Ternary math
        avgCapability_Display = (Skill_Visu_Scale + Skill_Lang_Scale + Skill_Code_Scale + Skill_Biol_Scale + Skill_Robo_Scale)/5;
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
        document.getElementById('attitudeBalanceDisplay').innerHTML = (attitudeBalance*100).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})+"% (" + attitudeBalance_Display.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%)";
    }


}, 100);
     

// Saving and Loading

function refresh() {
    
    
    //DEBUG
    
//    availableMatter = Math.pow(10, 24)*6000;
//    acquiredMatter = 0;
    
    ////////
    
    
    document.getElementById('driftersKilled').innerHTML = numberCruncher(driftersKilled);
    document.getElementById('availableMatterDisplay').innerHTML = numberCruncher(availableMatter);    
    document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();
    document.getElementById('clipmakerLevel2').innerHTML = clipmakerLevel;
    document.getElementById('clipperCost').innerHTML = clipperCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('acquiredMatterDisplay').innerHTML = numberCruncher(acquiredMatter);
    document.getElementById('nanoWire').innerHTML = numberCruncher(wire);
    document.getElementById('probesBornDisplay').innerHTML = numberCruncher(probeDescendents);
    document.getElementById('probesTotalDisplay').innerHTML = numberCruncher(probeCount);
    document.getElementById('probesLaunchedDisplay').innerHTML = probeLaunchLevel;
    document.getElementById('probeCostDisplay').innerHTML = numberCruncher(probeCost); 
    document.getElementById('probeCombatDisplay').innerHTML = probeCombat;
    document.getElementById('probeWireDisplay').innerHTML = probeWire;
    document.getElementById('probeHarvDisplay').innerHTML = probeHarv;
    document.getElementById('probeFacDisplay').innerHTML = probeFac;
    document.getElementById('probeRepDisplay').innerHTML = probeRep;
    document.getElementById('probeHazDisplay').innerHTML = probeHaz;
    document.getElementById('probeNavDisplay').innerHTML = probeNav;
    document.getElementById('probeSpeedDisplay').innerHTML = probeSpeed;
    document.getElementById('probeTrustDisplay').innerHTML = probeTrust;
    document.getElementById("memory").innerHTML = memory;
    document.getElementById("processors").innerHTML = processors;
    document.getElementById("margin").innerHTML = margin.toFixed(2);
    document.getElementById('marketingLvl').innerHTML = marketingLvl;
    document.getElementById('adCost').innerHTML = adCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('factoryCostDisplay').innerHTML = numberCruncher(factoryCost);
    document.getElementById('factoryLevelDisplay').innerHTML = factoryLevel;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById('wireDroneCostDisplay').innerHTML = numberCruncher(wireDroneCost);
    document.getElementById('wireDroneLevelDisplay').innerHTML = wireDroneLevel;
    document.getElementById('harvesterCostDisplay').innerHTML = numberCruncher(harvesterCost);
    document.getElementById('harvesterLevelDisplay').innerHTML = harvesterLevel;
    document.getElementById('megaClipperCost').innerHTML = megaClipperCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('megaClipperLevel').innerHTML = megaClipperLevel;
    document.getElementById('investmentBankroll').innerHTML = bankroll.toLocaleString();
    document.getElementById('secValue').innerHTML = secTotal.toLocaleString();
    document.getElementById('portValue').innerHTML = portTotal.toLocaleString();
    document.getElementById("investUpgradeCost").innerHTML=investUpgradeCost.toLocaleString();
    document.getElementById("yomiDisplay").innerHTML=yomi.toLocaleString();
    document.getElementById("investmentLevel").innerHTML=investLevel;   
    document.getElementById("prestigeUcounter").innerHTML=prestigeU+1;
    document.getElementById("prestigeScounter").innerHTML=prestigeS+1;
    document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
    tourneyInProg = 0;
    document.getElementById("maxTrustDisplay").innerHTML = maxTrust.toLocaleString();
    
    document.getElementById("victoryDiv").style.visibility = "hidden";
    
    document.getElementById("probeTrustCostDisplay").innerHTML = probeTrustCost.toLocaleString();
    
    document.getElementById("tournamentResultsTable").style.display = "none";
    
    document.getElementById('farmCost').innerHTML = numberCruncher(farmCost); 
    document.getElementById('batteryCost').innerHTML = numberCruncher(batteryCost); 
    document.getElementById('farmLevel').innerHTML = farmLevel.toLocaleString(); 
    document.getElementById('batteryLevel').innerHTML = batteryLevel.toLocaleString();    
    
    updateDronePrices();
    document.getElementById('harvesterCostDisplay').innerHTML = numberCruncher(harvesterCost); 
    document.getElementById('wireDroneCostDisplay').innerHTML = numberCruncher(wireDroneCost);     

    updateUpgrades();
    updatePower();
    updatePowPrices(); 
    
    
}
