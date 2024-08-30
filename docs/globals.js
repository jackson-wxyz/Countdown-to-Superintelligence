var Researchers = 0;
var Insights = 0;
var negInsights = 0;
var Evalhours = 0;
var alignment = 0;

var AISFlag = 0;
var AISPercent = 0;
var ResearchPercent = 100;

var Days = 0;
var GPUs = 0;
var jFunds = 1000;

var GPUhours = 0;
var AIcapabilities = 0; // find some way of turning "gpuhours" into an actual metric like FLOPs, to enable greater realism
var GPU_Rev = 0;
var DailyWage = 0;


var GPU_Flag = 0;
var H100_Flag = 0;
var GPUBuyerFlag = 0;
var GPUBuyerStatus = 0;

var TrainedModelFlag = 0;
var PoliticsFlag = 0;
var ScalingFlag = 0;

var Visu_Flag = 0;
var Lang_Flag = 0;
var Code_Flag = 0;
var Biol_Flag = 0;
var Robo_Flag = 0;

var BaseCapability = 0;
var Skill_Visu = 0;
var Skill_Lang = 0;
var Skill_Code = 0;
var Skill_Biol = 0;
var Skill_Robo = 0;
var Skill_Visu_mod = -15;
var Skill_Lang_mod = -20;
var Skill_Code_mod = -75;
var Skill_Biol_mod = -60;
var Skill_Robo_mod = -100;

var Skill_Visu_bad_mod = 0;
var Skill_Lang_bad_mod = 0;
var Skill_Code_bad_mod = 0;
var Skill_Biol_bad_mod = 0;
var Skill_Robo_bad_mod = 0;

//Politics stuff
var hype = 0;
var sentiment = 0;
var attitudeBalance = 0;
var Skill_Visu_PR_2b = -1;
var Skill_Visu_PR_3b = -3;
var Skill_Lang_PR_2b = -1;
var Skill_Lang_PR_3b = -3;
var Skill_Code_PR_3b = -3;
var Skill_Biol_PR_2b = -10;
var Skill_Robo_PR_2b = -10;


var Skill_Visu_Scale = 0;
var Skill_Lang_Scale = 0;
var Skill_Code_Scale = 0;
var Skill_Biol_Scale = 0;
var Skill_Robo_Scale = 0;



//1 unit of profit = 1 90-second doubling time, currently.
//gotta start applying this to the square root of capabilities in order to give myself room to give more bonuses, etc?
var Profit_Visu_1 = 1;
var Profit_Visu_1_Display = 0;
var Profit_Visu_2 = 1.5;
var Profit_Visu_2_Display = 0;
var Profit_Visu_3 = 3.5;
var Profit_Visu_3_Display = 0;

var Profit_Lang_1 = 1.5;
var Profit_Lang_1_Display = 0;
var Profit_Lang_2 = 2;
var Profit_Lang_2_Display = 0;
var Profit_Lang_3 = 6;
var Profit_Lang_3_Display = 0;

var Profit_Code_1 = 2;
var Profit_Code_1_Display = 0;
var Profit_Code_2 = 4;
var Profit_Code_2_Display = 0;
var Profit_Code_3 = 8;
var Profit_Code_3_Display = 0;

var Profit_Biol_1 = 1.5;
var Profit_Biol_1_Display = 0;
var Profit_Biol_2 = 6;
var Profit_Biol_2_Display = 0;

var Profit_Robo_1 = 8;
var Profit_Robo_1_Display = 0;
var Profit_Robo_2 = 16;
var Profit_Robo_2_Display = 0;

//CapabilityChart
var xValues = ["Images", "Language", "Coding", "Bio"];
var yValues = [];
var barColors = ["orange", "brown","blue","green"];

//PoliticsChart
var optimism = 0;
var pessimism = 0

var rawData = [
    {uninterested:100,pessimist:0,optimist:0},
    //{uninterested:75,pessimist:25,optimist:0},
    //{uninterested:65,pessimist:25,optimist:10},
];;


var clips = 0;
var unusedClips = 0;
var clipRate = 0;
var clipRateTemp = 0;
var prevClips = 0;
var clipRateTracker = 0;
var clipmakerRate = 0;
var clipmakerLevel = 0;
var clipmakerLevel2 = 0;
var clipperCost = 5;
var unsoldClips = 0;
var funds = 0;
var margin = .25;
var wire = 1000;
var wireCost = 20;
var adCost = 100;
var demand = 5;
var clipsSold = 0;
var avgRev = 0;
var income = 0;
var incomeTracker = [0];
var ticks = 0;
var marketing = 1;
var marketingLvl = 1;
var x = 0;
var clippperCost = 5;
var processors = 1;
var memory = 1;
var operations = 0;
var trust = 2;
var nextTrust = 3000;
var transaction = 1;
var clipperBoost = 1;
var blinkCounter = 0;
var creativity = 0;
var creativityOn = false;
var safetyProjectOn = false;
var boostLvl = 0;
var wirePurchase = 0;
var wireSupply = 1000;
var marketingEffectiveness = 1;
var marketingEffectiveness = 1;
var milestoneFlag = 0;
var bankroll = 0;
var fib1 = 2;
var fib2 = 3;
var strategyEngineFlag = 0;
var investmentEngineFlag = 0;
var revPerSecFlag = 0;
var compFlag = 0;
var projectsFlag = 0;
var autoClipperFlag = 0;
var megaClipperFlag = 0;
var megaClipperCost = 500;
var megaClipperLevel = 0;
var megaClipperBoost = 1;
var creativitySpeed = 1;
var creativityCounter = 0;
var wireBuyerFlag = 0;
var demandBoost = 1;
var humanFlag = 1;
var trustFlag = 1;
var nanoWire = 0;
var creationFlag = 0;
var wireProductionFlag = 0;
var spaceFlag = 0;
var factoryFlag = 0;
var harvesterFlag = 0;
var wireDroneFlag = 0;
var factoryLevel = 0;
var factoryBoost = 1;
var droneBoost = 1;
var availableMatter = Math.pow(10, 24)*6000;
var acquiredMatter = 0;
var processedMatter = 0;
var harvesterLevel = 0;
var wireDroneLevel = 0;
var factoryCost = 100000000;
var harvesterCost = 1000000;
var wireDroneCost = 1000000;
var factoryRate = 1000000000;
var harvesterRate = 26180337;
var wireDroneRate = 16180339;
var harvesterBill = 0;
var wireDroneBill = 0;
var factoryBill = 0;
var probeCount = 0;
var totalMatter = Math.pow(10, 54)*30;
var foundMatter = availableMatter;
var qFlag = 0;
var qClock = 0;
var qChipCost = 10000;
var nextQchip = 0;
var bribe = 1000000;
var battleFlag = 0;

var prestigeU = 0;
var prestigeS = 0;

var autoTourneyFlag = 0;
var egoFlag = 0;
var tothFlag = 0;

var wirePriceCounter = 0;
var wireBasePrice = 20;

var farmRate = 50;
var batterySize = 10000;
var factoryPowerRate = 200;
var dronePowerRate = 1;
var farmLevel = 0;
var batteryLevel = 0;
var farmCost = 10000000;
var batteryCost = 1000000;
var storedPower = 0;
var powMod = 0;
var farmBill = 0;
var batteryBill = 0;
var momentum = 0;

var swarmFlag = 0;
var swarmStatus = 7;
var swarmGifts = 0;
var nextGift = 0;
var giftPeriod = 125000;
var giftCountdown = giftPeriod;
var elapsedTime = 0;

var honor = 0;
var maxTrust = 20;
var maxTrustCost = 91117.99;
var disorgCounter = 0;
var disorgFlag = 0;
var synchCost = 5000;
var disorgMsg = 0;
var threnodyCost = 50000;

var entertainCost = 10000;
var boredomLevel = 0;
var boredomFlag = 0;
var boredomMsg = 0;

var wireBuyerStatus = 1;
var wirePriceTimer = 0;
var qFade = 1;
var autoTourneyStatus = 1;
var driftKingMessageCost = 1;
var sliderPos = 0;
var tempOps = 0;
var standardOps = 0;
var opFade = 0;

var opFadeTimer = 0;
var opFadeDelay = 800;

var dismantle = 0;
var endTimer1 = 0;
var endTimer2 = 0;
var endTimer3 = 0;
var endTimer4 = 0;
var endTimer5 = 0;
var endTimer6 = 0;

var testFlag = 0;
var finalClips = 0;

var resetFlag = 2;
var threnodyAudio = new Audio();
var threnodyLoadedBool = false; 













