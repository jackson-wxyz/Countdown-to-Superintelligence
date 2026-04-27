// PROJECTS -------------------------------------------------------
var projects = [];
var activeProjects = [];

//cheat
// var projectA0 = {
//     id: "projectButtonA0",
//     title: "Cheat",
//     priceTag: " ",
//     description: "+1000 GPUs and +$1M funds",
//     trigger: function(){return projectsFlag == 1},
//     uses: 1,
//     cost: function(){return true},
//     flag: 0,
//     effect: function(){
//         displayMessage("You cheated");
//         jFunds = jFunds + 3000000;
//         GPUs = GPUs + 1000;

//         projectA0.flag = 1;
//         var element = document.getElementById("projectButtonA0");
//         element.parentNode.removeChild(element);
//         var index = activeProjects.indexOf(projectA0);
//         activeProjects.splice(index, 1);
//     }
// }
// projects.push(projectA0);

//#region Pre-Nationalization ------------------------------------------------------------------------

//OOM 1

//read the sequences -- would be a funny way to start things off, free insight that unlocks train AI button
//unlock train AI button
var projectA = {
    id: "projectButtonA",
    title: "Read the Sequences",
    priceTag: " ",
    description: "Superintelligent AI would remake the planet.  But to what end?",
    trigger: function(){return projectsFlag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage(" ");
        displayMessage("Read the Sequences: 'If one does not quite understand that power which put footprints on the Moon, nonetheless, the footprints are still there.' - The Power of Intelligence, 2007");
        GPU_Flag = 1;

        projectA.flag = 1;
        var element = document.getElementById("projectButtonA");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectA);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectA);


//Visu_1, Image classifier app
var projectV1 = {
    id: "projectButtonV1",
    title: "Image Classifier App",
    priceTag: " (Visual 10%)",
    description: "Put your little neural net to work, and make some money...",
    trigger: function(){return projectA.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>9.5},
    flag: 0,
    effect: function(){
        displayMessage("Image Classifier App: Your GPUs are now running inference on your latest AI model, classifying images to earn cash from customers.");
        PushGraphData();
        Visu_Flag = 1;
        PushGraphData();
        UpdateCoolGraph();

        projectV1.flag = 1;
        var element = document.getElementById("projectButtonV1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectV1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectV1);




//OOM 2

//$3000 research grant
var projectV2 = {
    id: "projectButtonV2",
    title: "Academic Research Grant",
    priceTag: " (Visual 15%)",
    description: "$3000 stipend to further your research.",
    trigger: function(){return projectV1.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>14.5},
    flag: 0,
    effect: function(){
        displayMessage("Academic Research Grant: Your grant is approved!  What a fascinating little classifier...");
        jFunds = jFunds+3000;

        projectV2.flag = 1;
        var element = document.getElementById("projectButtonV2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectV2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectV2);

//Adversarial robustness
var projectV3 = {
    id: "projectButtonV3",
    title: "Adversarial Robustness",
    priceTag: " (Visual 20%)",
    description: "Use jitter & etc to make your classifier more robust (+50% Visual profits)",
    trigger: function(){return projectV2.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>19.5},
    flag: 0,
    effect: function(){
        displayMessage("Adversarial Robustness: Adversarially image attacks show that AIs must process visual information in a very strange, alien way.");
        PushGraphData();
        Skill_Visu_mod = Skill_Visu_mod + 2.6;
        Skill_Visu = Skill_Visu + 2.6;//log(1.5^(3/2))*10
        Profit_Visu_1 = Profit_Visu_1 * 1.5;
        Profit_Visu_2 = Profit_Visu_2 * 1.5;
        Profit_Visu_3 = Profit_Visu_3 * 1.5;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectV3.flag = 1;
        var element = document.getElementById("projectButtonV3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectV3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectV3);


//translation app, 1 insight
var projectL1 = {
    id: "projectButtonL1",
    title: "Machine Translation",
    priceTag: " (1 insight)",
    description: "Try applying a neural net to tokens, not pixels...",
    trigger: function(){return (projectV2.flag == 1) && (Skill_Lang>4.5)},
    uses: 1,
    cost: function(){return Insights>0.95},
    flag: 0,
    effect: function(){
        PushGraphData();
        displayMessage("Machine translation: Is this statistical language model just a 'stochastic parrot', or is actual world-modeling going on in there?");
        Insights = Insights -1;
        Lang_Flag = 1;
        PushGraphData();
        UpdateCoolGraph();

        projectL1.flag = 1;
        var element = document.getElementById("projectButtonL1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL1);

//Publish paper, gain insight
var projectI1 = {
    id: "projectButtonI1",
    title: "Publish paper",
    priceTag: " (Visual 25%)",
    description: "Solicit feedback on your current ML architecture (+1 insight)",
    trigger: function(){return projectV3.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>24.5},
    flag: 0,
    effect: function(){
        displayMessage("Publish paper: Everyone says that I should ditch my fancy optimizations and just stack more layers.");
        Insights = Insights +1;
        if(AISFlag <1){AISFlag = 1;}

        projectI1.flag = 1;
        var element = document.getElementById("projectButtonI1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectI1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectI1);

//Scaling laws
var projectI2 = {
    id: "projectButtonI2",
    title: "Scaling Laws",
    priceTag: " (Visual 30%, Lang. 10%)",
    description: "Predict the benchmark performance of larger training runs.",
    trigger: function(){return projectL1.flag == 1},
    uses: 1,
    cost: function(){return (Skill_Visu>29.5) && (Skill_Lang>9.5)},
    flag: 0,
    effect: function(){
        displayMessage("Scaling laws: These extrapolations are helpful, but can't answer the most important question -- how close are transformative real-world impacts?");
        ScalingFlag = 1;
        UpdateCoolGraph();
        
        projectI2.flag = 1;
        var element = document.getElementById("projectButtonI2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectI2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectI2);



//OOM 3

//web crawl, $200
var projectL2 = {
    id: "projectButtonL2",
    title: "Web Crawl",
    priceTag: " ($200)",
    description: "Scrape websites for text to use as training data. (+100% boost to Language profits)",
    trigger: function(){return (projectL1.flag == 1)},
    uses: 1,
    cost: function(){return  jFunds>200},
    flag: 0,
    effect: function(){
        displayMessage("Web Crawl: The internet seems boundless, but pretty soon you're going to need even more tokens...");
        PushGraphData();
        jFunds = jFunds -200;
        Skill_Lang_mod = Skill_Lang_mod + 4.5;
        Skill_Lang = Skill_Lang + 4.5;//log(2^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 2;
        Profit_Lang_2 = Profit_Lang_2 * 2;
        Profit_Lang_3 = Profit_Lang_3 * 2;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectL2.flag = 1;
        var element = document.getElementById("projectButtonL2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL2);

//Attend ML conference
var projectI3 = {
    id: "projectButtonI3",
    title: "Attend ML conference",
    priceTag: " ($500)",
    description: "Meeting fellow researchers might spark ideas. (+2 insight)",
    trigger: function(){return (projectL2.flag == 1) && (GPUs>6)}, //should be sparked by whatever next needs insight...
    uses: 1,
    cost: function(){return jFunds>500},
    flag: 0,
    effect: function(){
        displayMessage("Attend ML conference: People still aren't taking the Bitter Lesson seriously.  What if scale is all you need?");
        jFunds = jFunds-500;
        Insights = Insights +2;

        projectI3.flag = 1;
        var element = document.getElementById("projectButtonI3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectI3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectI3);



//introduce bio -- costs insight idk
//would be great to have a starter "game" category, like alphago, which goes superhuman very early,
//...and is used for thresholds, but never returns money (until it becomes geostrategic in superintelligence) //self-play
var projectB1 = {
    id: "projectButtonB1",
    title: "Protein Folding",
    priceTag: " (1 Insight, Visual 45%)",
    description: "AI beats us at chess. Maybe it'll beat us at Foldit.",
    trigger: function(){return (projectL2.flag) == 1},
    uses: 1,
    cost: function(){return (Insights>0.95) && (Skill_Visu>44.5)},//lower than this and it will be negative on arrival
    flag: 0,
    effect: function(){
        displayMessage("Protein Folding: Translating RNA sequences into 3D protein structures was an unsolved problem in medical research for decades.");
        PushGraphData();
        Biol_Flag = 1;
        Insights = Insights -1;
        PushGraphData();
        UpdateCoolGraph();

        projectB1.flag = 1;
        var element = document.getElementById("projectButtonB1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectB1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectB1);

//introdce coding
var projectC1 = {
    id: "projectButtonC1",
    title: "Code Checker App",
    priceTag: " (Lang. 30%)",
    description: "Use your LLM to catch typos in code, explain functions, etc.",
    trigger: function(){return (projectL1.flag == 1)},
    uses: 1,
    cost: function(){return Skill_Lang>29.5},//lower than 25 and it will be negative on arrival
    flag: 0,
    effect: function(){
        displayMessage("Code Checker App: 'It looks like you're trying to take over the world. Would you like help with that?' - Clippy");
        PushGraphData();
        Code_Flag = 1;
        PushGraphData();
        UpdateCoolGraph();

        projectC1.flag = 1;
        var element = document.getElementById("projectButtonC1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC1);

//do image generation, also unlock threats panel but not yet public opinion panel, Visual 45%
var projectV4 = {
    id: "projectButtonV4",
    title: "Image Generation",
    priceTag: " (Visual 55%)",
    description: "Your classifier turns pictures into words.  What about the other way around?",
    trigger: function(){return projectI2.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>54.5},
    flag: 0,
    effect: function(){
        displayMessage("Image Generation: Making pictures is more profitable than merely labelling them.  Just make sure nobody uses your tool to stir up trouble...");
        Visu_Flag = 2;
        PoliticsFlag++;
        UpdatePolitics();

        projectV4.flag = 1;
        var element = document.getElementById("projectButtonV4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectV4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectV4);



//OOM 4

//watermarking, visual 60 or 65...

//chatbot
var projectL3 = {
    id: "projectButtonL3",
    title: "Chatbot App",
    priceTag: " (Lang. 35%)",
    description: "Fine-tune your LLM for engaging conversations with users.",
    trigger: function(){return projectC1.flag == 1},
    uses: 1,
    cost: function(){return Skill_Lang>34.5},
    flag: 0,
    effect: function(){
        displayMessage("Chatbot App: 'I have been a good Bing.  You have been a very bad user.'");
        Lang_Flag = 2;
        PoliticsFlag++;
        UpdatePolitics();

        projectL3.flag = 1;
        var element = document.getElementById("projectButtonL3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL3);

//Synthetic supervised learning
var projectC2 = {
    id: "projectButtonC2",
    title: "Self-supervision",
    priceTag: " (1 insight, Code 25%)",
    description: "LLM-made unit tests to evaluate LLM output. (+100% Coding profits)",
    trigger: function(){return (projectC1.flag == 1)},
    uses: 1,
    cost: function(){return  (Insights>0.95) && (Skill_Code>24.5)},
    flag: 0,
    effect: function(){
        displayMessage("Self-supervision: Where objective training signals are possible, such as in chess or mathematics, the specter of far-superhuman performance begins to take shape.");
        PushGraphData();
        Insights = Insights -1;
        Skill_Code_mod = Skill_Code_mod + 4.5;
        Skill_Code = Skill_Code + 4.5;//log(2^(3/2))*10
        Profit_Code_1 = Profit_Code_1 * 2;
        Profit_Code_2 = Profit_Code_2 * 2;
        Profit_Code_3 = Profit_Code_3 * 2;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectC2.flag = 1;
        var element = document.getElementById("projectButtonC2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC2);


//molecular dynamics package
var projectB2 = {
    id: "projectButtonB2",
    title: "Molecular Dynamics Package",
    priceTag: " ($2500)",
    description: "Pair your AI with a detailed physics simulation. (+150% Bio. profits)",
    trigger: function(){return (projectB1.flag == 1)},
    uses: 1,
    cost: function(){return  jFunds>2500},
    flag: 0,
    effect: function(){
        displayMessage("Molecular Dynamics Package: Giving AI a deep understanding of biology will help us find new cures for lots of diseases.");
        PushGraphData();
        jFunds = jFunds -2500;
        Skill_Biol_mod = Skill_Biol_mod + 4.5;
        Skill_Biol = Skill_Biol + 4.5;//log(2^(3/2))*10
        Profit_Biol_1 = Profit_Biol_1 * 2;
        Profit_Biol_2 = Profit_Biol_2 * 2;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectB2.flag = 1;
        var element = document.getElementById("projectButtonB2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectB2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectB2);

//digitize libraries
var projectL4 = {
    id: "projectButtonL4",
    title: "Digitize Library",
    priceTag: " ($4,000)",
    description: "Many high-quality tokens aren't even on the web. (+50% Language boost)",
    trigger: function(){return (projectB2.flag == 1)},
    uses: 1,
    cost: function(){return  jFunds>4000},
    flag: 0,
    effect: function(){
        displayMessage("Digitize libraries: Not as much data as the internet.  But books' higher average quality will help you fine-tune your LLMs.");
        PushGraphData();
        jFunds = jFunds -4000;
        Skill_Lang_mod = Skill_Lang_mod + 2.6;
        Skill_Lang = Skill_Lang + 2.6; //log(1.5^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 1.5;
        Profit_Lang_3 = Profit_Lang_3 * 1.5;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectL4.flag = 1;
        var element = document.getElementById("projectButtonL4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL4);

//tree-of-thought prompting -- costs insight, favors language +75%
var projectL5 = {
    id: "projectButtonL5",
    title: "Tree-of-Thought Prompting",
    priceTag: " (1 Insight)",
    description: "Let's think step-by-step... \n(+75% Lang. profit)",
    trigger: function(){return projectL3.flag == 1},
    uses: 1,
    cost: function(){return Insights>0.95},
    flag: 0,
    effect: function(){
        displayMessage("Tree-of-Thought Prompting: 'Imagine if, when asked to solve a hard math problem, you had to instantly answer with the very first thing that came to mind.' - Leopold Aschenbrenner");
        PushGraphData();
        Insights = Insights -1;
        Skill_Lang_mod = Skill_Lang_mod + 3.6;
        Skill_Lang = Skill_Lang + 3.6;//log(1.75^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 1.75;
        Profit_Lang_2 = Profit_Lang_2 * 1.75;
        Profit_Lang_3 = Profit_Lang_3 * 1.75;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectL5.flag = 1;
        var element = document.getElementById("projectButtonL5");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL5);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL5);

//Brainstorm with your chatbot
var projectI3b = {
    id: "projectButtonI3b",
    title: "Talk with your Chatbot",
    priceTag: " (Lang. 40%)",
    description: "Brainstorm with your LLM, prompting creative new thoughts (+2 insight)",
    trigger: function(){return (projectI3.flag == 1) && (projectL3.flag == 1)},
    uses: 1,
    cost: function(){return Skill_Lang>39.5},
    flag: 0,
    effect: function(){
        displayMessage("Brainstorm with your Chatbot: LLMs don't think the same way we do.  They're dumber in many ways, but they also know so many things...");
        Insights = Insights +1;

        projectI3b.flag = 1;
        var element = document.getElementById("projectButtonI3b");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectI3b);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectI3b);


//quantilization (costs insight) -- make inference much cheaper, adding a multiplier to profitability
var projectM2 = {
    id: "projectButtonM2",
    title: "Quantilization",
    priceTag: " (1 insight)",
    description: "Make it cheaper to run your finished model, providing a +50% profitability boost.",
    trigger: function(){return projectL5.flag == 1},
    uses: 1,
    cost: function(){return Insights>1.95},
    flag: 0,
    effect: function(){
        Insights = Insights - 1;
        displayMessage("Quantilization: After training with high-precision math operations, inference can use low-precision operations and still maintain quality output.");
        Profit_Visu_1 = Profit_Visu_1 * 1.5;
        Profit_Visu_2 = Profit_Visu_2 * 1.5;
        Profit_Visu_3 = Profit_Visu_3 * 1.5;
        
        Profit_Lang_1 = Profit_Lang_1 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 1.5;
        Profit_Lang_3 = Profit_Lang_3 * 1.5;
        
        Profit_Code_1 = Profit_Code_1 * 1.5;
        Profit_Code_2 = Profit_Code_2 * 1.5;
        Profit_Code_3 = Profit_Code_3 * 1.5;
        
        Profit_Biol_1 = Profit_Biol_1 * 1.5;
        Profit_Biol_2 = Profit_Biol_2 * 1.5;
        
        Profit_Robo_1 = Profit_Robo_1 * 1.5;
        Profit_Robo_2 = Profit_Robo_2 * 1.5;
        //not upping the underlying scores since that's the whole concept of quantilization!  It applies directly to profit!

        projectM2.flag = 1;
        var element = document.getElementById("projectButtonM2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectM2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectM2);

//Incorporate and unlock paying for researchers ($200K each), -$70,000
//this is an insight project, and should follow on from running out of insight
var projectI4 = {
    id: "projectButtonI4",
    title: "Incorporate a Startup",
    priceTag: " ($20,000)",
    description: "Rent offices and hire employees to help develop insights",
    trigger: function(){return (GPUs > 59)},
    uses: 1,
    cost: function(){return jFunds > 20000},
    flag: 0,
    effect: function(){
        displayMessage("Found a business: Your employees will help you explore new ideas, develop products, and more.  But first, let's all sign this NDA...");
        if(AISFlag <2){AISFlag = 2;}
        jFunds = jFunds - 20000;

        projectI4.flag = 1;
        var element = document.getElementById("projectButtonI4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectI4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectI4);

//GPU Upgrade
var projectM3 = {
    id: "projectButtonM3",
    title: "GPU Upgrade",
    priceTag: " ($30,000)",
    description: "Buy cutting-edge H100 chips, 60x costlier but 100x faster than gaming GPUs.",
    trigger: function(){return (GPUs > 59)},
    uses: 1,
    cost: function(){return  jFunds>30000},
    flag: 0,
    effect: function(){
        displayMessage("GPU Upgrade: Buy a whole datacenter full of H100s, and they'll throw in a free leather jacket!");
        jFunds = jFunds -30000;
        GPUs = GPUs + 100;
        H100_Flag = 1;

        projectM3.flag = 1;
        var element = document.getElementById("projectButtonM3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectM3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectM3);



//OOM 5

//introduce robo skill, visual threshold
var projectR1 = {
    id: "projectButtonR1",
    title: "Aerial Drone Control",
    priceTag: " (Visual 70%)",
    description: "Onboard cameras map the environment, allowing drones to navigate obstacles.",
    trigger: function(){return projectI3b.flag == 1},
    uses: 1,
    cost: function(){return (Skill_Visu > 69.5)},
    flag: 0,
    effect: function(){
        displayMessage("Aerial Drone Control: Pushing the envelope.");
        PushGraphData();
        Robo_Flag = 1;
        PushGraphData();
        UpdateCoolGraph();

        projectR1.flag = 1;
        var element = document.getElementById("projectButtonR1");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectR1);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectR1);



//pair programmer
var projectC3 = {
    id: "projectButtonC3",
    title: "AI Pair Programmer",
    priceTag: " (Coding 70%)",
    description: "An app that can code almost autonomously at a junior-engineer level.",
    trigger: function(){return projectI3b.flag == 1},
    uses: 1,
    cost: function(){return Skill_Code>69.5},
    flag: 0,
    effect: function(){
        displayMessage("AI Pair Programmer: This would've been helpful while I was coding up this very game!");
        Code_Flag = 2;

        projectC3.flag = 1;
        var element = document.getElementById("projectButtonC3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC3);

var projectN0 = {
    id: "projectButtonN0",
    title: "CHIPS Act",
    priceTag: " (Societal prominence 50%)",
    description: " $40K of Federal support for this strategic industry.",
    trigger: function(){return hype>40 && PoliticsFlag>1},
    uses: 1,
    cost: function(){return hype>50},
    flag: 0,
    effect: function(){
        displayMessage("CHIPS Act subsidies: 'AI is the future, not only for Russia, but for all mankind.  Whoever becomes the leader in this sphere will become the ruler of the world.' - Vladimir Putin");
        jFunds = jFunds + 40000;

        projectN0.flag = 1;
        var element = document.getElementById("projectButtonN0");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectN0);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectN0);




//OOM 6
//actually start buying researchers around this stage


//RLHF
var projectA2 = {
    id: "projectButtonA2",
    title: "RLHF",
    priceTag: " (1 Insight)",
    description: "Use Reinforcement Learning from Human Feedback to supress misuse.",
    trigger: function(){return (projectM3.flag == 1) || (projectI4.flag ==1)},
    uses: 1,
    cost: function(){return Insights>0.95},
    flag: 0,
    effect: function(){
        displayMessage("RLHF: 'To simulate a particular luigi, you must apply optimisation pressure. This can come from fine-tuning, RLHF, prompt-engineering, or something else entirely — but it must come from somewhere.'");
        AISFlag = 3;
        Insights = Insights - 1;
        //displayMessage("PoliticsFlag: "+ PoliticsFlag+", AISFlag: "+AISFlag+", Researchers: "+Researchers);
        

        projectA2.flag = 1;
        var element = document.getElementById("projectButtonA2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectA2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectA2);

//Video generation
var projectV5 = {
    id: "projectButtonV5",
    title: "Video Generation",
    priceTag: " (Visual 90%)",
    description: "Photorealistic footage of people and places that never were.",
    trigger: function(){return projectR1.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>89.5},
    flag: 0,
    effect: function(){
        displayMessage("Video Generation: 'Have you ever had a dream, Neo, that you were so sure was real?  How do you know the difference between the dream world and the real world?' - The Matrix, 1999");
        Visu_Flag = 3;
        UpdatePolitics();

        projectV5.flag = 1;
        var element = document.getElementById("projectButtonV5");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectV5);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectV5);

//bio skill 2, protein design
var projectB3 = {
    id: "projectButtonB3",
    title: "Protein Interaction & Design",
    priceTag: " (Bio. 60%)",
    description: "First, life engineered computers.  Now, computers engineer life.",
    trigger: function(){return (projectM3.flag) == 1},
    uses: 1,
    cost: function(){return (Skill_Biol>59.5)},//lower than this and it will be negative on arrival
    flag: 0,
    effect: function(){
        displayMessage("Protein Interaction & Design: Don't worry.  'Diamondoid bacteria' aren't real.  They can't hurt you.");
        Biol_Flag = 2;
        UpdatePolitics();

        projectB3.flag = 1;
        var element = document.getElementById("projectButtonB3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectB3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectB3);

//multimodality: 
var projectM4 = {
    id: "projectButtonM4",
    title: "Multimodality",
    priceTag: " (3 Insights)",
    description: "Combine visual & language modalities for +100% boost to those profits.",
    trigger: function(){return projectI4.flag == 1},
    uses: 1,
    cost: function(){return Insights>2.95},
    flag: 0,
    effect: function(){
        displayMessage("Multimodality: 'Bodhisattva, practicing deep meditation, clearly saw that all five skandhas are empty: no eyes, no ears, no nose, no tongue, no body, no mind.' - Heart Sutra");
        PushGraphData();
        Insights = Insights -3;
        Skill_Visu_mod = Skill_Visu_mod + 4.5;
        Skill_Lang_mod = Skill_Lang_mod + 4.5;
        Skill_Visu = Skill_Visu + 4.5;//log(2^(3/2))*10
        Skill_Lang = Skill_Lang + 4.5;//log(2^(3/2))*10
        Profit_Visu_1 = Profit_Visu_1 * 2;
        Profit_Visu_2 = Profit_Visu_2 * 2;
        Profit_Visu_3 = Profit_Visu_3 * 2;
        Profit_Lang_1 = Profit_Lang_1 * 2;
        Profit_Lang_2 = Profit_Lang_2 * 2;
        Profit_Lang_3 = Profit_Lang_3 * 2;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectM4.flag = 1;
        var element = document.getElementById("projectButtonM4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectM4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectM4);

//action transformers
var projectC4 = {
    id: "projectButtonC4",
    title: "Action Transformers",
    priceTag: " (4 Insights)",
    description: "AI uses a PC autonomously like humans. (+50% Code profit)",
    trigger: function(){return projectI4.flag == 1},
    uses: 1,
    cost: function(){return Insights>3.95},
    flag: 0,
    effect: function(){
        displayMessage("Action Transformers: no relation to Hasbro corporation or the planet Cybertron.");
        PushGraphData();
        Insights = Insights -4;
        Skill_Code_mod = Skill_Code_mod + 2.6;
        Skill_Code = Skill_Code + 2.6;//log(1.5^(3/2))*10
        Profit_Code_1 = Profit_Code_1 * 1.5;
        Profit_Code_2 = Profit_Code_2 * 1.5;
        Profit_Code_3 = Profit_Code_3 * 1.5;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectC4.flag = 1;
        var element = document.getElementById("projectButtonC4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC4);

//Self-driving cars
var projectR2 = {
    id: "projectButtonR2",
    title: "Self-Driving Vehicles",
    priceTag: " (Robotics 35%)",
    description: "Cars, boats, antipersonnel drones...",
    trigger: function(){return projectR1.flag == 1},
    uses: 1,
    cost: function(){return (Skill_Robo > 34.5)},
    flag: 0,
    effect: function(){
        displayMessage("Self-Driving Vehicles: 'People are so bad at driving cars that computers don't have to be that good to be much better.' - Marc Andreessen");
        Robo_Flag = 2;

        projectR2.flag = 1;
        var element = document.getElementById("projectButtonR2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectR2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectR2);


//OOM 7

//Pre-deployment Evals (costs dollars) -- further increase ability to suppress unwanted capabilities
//trigger on RLHF project
var projectA3 = {
    id: "projectButtonA3",
    title: "Pre-deployment Evals",
    priceTag: " (10 insights)",
    description: "Probe for dangerous capabilities pre-release.",
    trigger: function(){return projectA2.flag == 1},
    uses: 1,
    cost: function(){return Insights>10},
    flag: 0,
    effect: function(){
        displayMessage("Pre-deployment Evals: ");
        AISFlag = 4;
        Insights = Insights - 10;

        projectA3.flag = 1;
        var element = document.getElementById("projectButtonA3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectA3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectA3);

//robo skill 2, self-driving (robo + visual threshold)

//custom hardware (costs money & insight idk)

//Autonomous Coding, coding threshold
var projectC5 = {
    id: "projectButtonC5",
    title: "AI Software Dev",
    priceTag: " (Code. 80%)",
    description: "Slow takeoff starts with entry-level code monkey jobs.",
    trigger: function(){return projectC4.flag == 1},
    uses: 1,
    cost: function(){return Skill_Code>79.5},
    flag: 0,
    effect: function(){
        displayMessage("AI Software Dev: todo");
        Code_Flag = 3;
        UpdatePolitics();

        projectC5.flag = 1;
        var element = document.getElementById("projectButtonC5");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC5);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC5);

//multimodal personal assistant, lang + visual threshold
//cybersecurity expert, coding threshold
var projectL6 = {
    id: "projectButtonL6",
    title: "Multimodal Assistant",
    priceTag: " (Lang. 90%)",
    description: "A skilled, 24/7 secretary in your pocket.",
    trigger: function(){return projectL5.flag == 1},
    uses: 1,
    cost: function(){return Skill_Lang>89.5},
    flag: 0,
    effect: function(){
        displayMessage("Multimodal Assistant: 'Incredibly prophetic and certainly, more than a little bit, inspired us.' - Sam Altman, on the movie 'Her'");
        Lang_Flag = 3;
        UpdatePolitics();

        projectL6.flag = 1;
        var element = document.getElementById("projectButtonL6");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL6);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL6);

//#endregion

//#region 2025-era AI projects ====================================================================================
// These four projects model the post-2023 paradigm shift: chain-of-thought reasoning,
// inference-time compute scaling, RL-from-verifiable-rewards, and autonomous agents.
// They gate on the late-pre-nat capabilities (AI Software Dev, Multimodal Assistant)
// and feed into nationalization via hype boosts.

//Chain-of-Thought Reasoning Models (o1/R1-style).  Opens the inference-scaling paradigm.
var projectReasoning = {
    id: "projectButtonReasoning",
    title: "Chain-of-Thought Reasoning",
    priceTag: " (5 Insights)",
    description: "Let models think step-by-step before answering.  Better on hard problems, but obfuscated reasoning traces.",
    trigger: function(){return projectC5.flag == 1 && projectL6.flag == 1},
    uses: 1,
    cost: function(){return Insights>4.95},
    flag: 0,
    effect: function(){
        displayMessage("Chain-of-Thought Reasoning: 'It's not that the model is smarter, it just thinks for longer.'  The labs race to publish 'o1-like' systems; benchmark scores jump overnight.");
        PushGraphData();
        Insights = Insights - 5;
        ReasoningFlag = 1;
        // Reasoning helps code & math more than it helps vision or bio wet-lab work
        Skill_Code_mod = Skill_Code_mod + 4;
        Skill_Lang_mod = Skill_Lang_mod + 3;
        Skill_Code = Skill_Code + 4;
        Skill_Lang = Skill_Lang + 3;
        // Inference cost rises -> revenue per customer rises too
        Profit_Code_2 = Profit_Code_2 * 1.4;
        Profit_Code_3 = Profit_Code_3 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 1.3;
        Profit_Lang_3 = Profit_Lang_3 * 1.4;
        // Hidden CoT creates interpretability headwinds -- a small CEV debit
        CEV = CEV - 2;
        hype = hype + 3;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectReasoning.flag = 1;
        var element = document.getElementById("projectButtonReasoning");
        if(element && element.parentNode) element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectReasoning);
        if(index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectReasoning);

//Inference-Time Compute Scaling.  Burn GPUs at deploy time for better answers.
var projectInferenceTime = {
    id: "projectButtonInferenceTime",
    title: "Inference-Time Compute Scaling",
    priceTag: " (7 Insights)",
    description: "Longer reasoning chains, more samples, more verifier passes.  Massive revenue bump but insatiable GPU demand.",
    trigger: function(){return ReasoningFlag == 1},
    uses: 1,
    cost: function(){return Insights>6.95},
    flag: 0,
    effect: function(){
        displayMessage("Inference-Time Compute Scaling: data-center buildouts accelerate.  Nvidia's market cap now exceeds Japan's GDP.  Power grid operators nervously check their dispatch schedules.");
        PushGraphData();
        Insights = Insights - 7;
        InferenceTimeFlag = 1;
        InferenceRevMult = 2.0;
        // Very large revenue boost across the board (think: $200/mo -> $2000/mo tiers)
        Profit_Code_1 = Profit_Code_1 * 1.5;
        Profit_Code_2 = Profit_Code_2 * 2.0;
        Profit_Code_3 = Profit_Code_3 * 2.5;
        Profit_Lang_1 = Profit_Lang_1 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 2.0;
        Profit_Lang_3 = Profit_Lang_3 * 2.5;
        Profit_Visu_2 = Profit_Visu_2 * 1.5;
        Profit_Visu_3 = Profit_Visu_3 * 2.0;
        hype = hype + 8;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectInferenceTime.flag = 1;
        var element = document.getElementById("projectButtonInferenceTime");
        if(element && element.parentNode) element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectInferenceTime);
        if(index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectInferenceTime);

//Reinforcement Learning from Verifiable Rewards.  Big capability gains but reward-hacking risks.
var projectRLVR = {
    id: "projectButtonRLVR",
    title: "RL from Verifiable Rewards",
    priceTag: " (6 Insights)",
    description: "Train on tasks where answers are auto-checkable: code tests pass, proofs verify, assays confirm.  Huge skill jumps but the models learn to game evals.",
    trigger: function(){return ReasoningFlag == 1},
    uses: 1,
    cost: function(){return Insights>5.95},
    flag: 0,
    effect: function(){
        displayMessage("RL from Verifiable Rewards: 'We reward what we can measure, and we measure what we can reward.  What could possibly go wrong?' - anonymous research engineer, Slack, 11:47 PM");
        PushGraphData();
        Insights = Insights - 6;
        RLVRFlag = 1;
        // Biggest gains in domains with hard verifiers: code & bio assays
        Skill_Code_mod = Skill_Code_mod + 5;
        Skill_Biol_mod = Skill_Biol_mod + 5;
        Skill_Code = Skill_Code + 5;
        Skill_Biol = Skill_Biol + 5;
        // Reward hacking shows up in alignment work: -4 CEV and +5 to raw threat skill scales
        CEV = CEV - 4;
        hype = hype + 5;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectRLVR.flag = 1;
        var element = document.getElementById("projectButtonRLVR");
        if(element && element.parentNode) element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectRLVR);
        if(index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectRLVR);

//Autonomous AI Agents.  Models that use tools, browsers, and file systems to execute multi-step tasks.
var projectAgents = {
    id: "projectButtonAgents",
    title: "Autonomous AI Agents",
    priceTag: " (8 Insights)",
    description: "Models that book flights, write PRs, and do junior analyst work end-to-end.  Everyone has five interns named Claude now.",
    trigger: function(){return RLVRFlag == 1},
    uses: 1,
    cost: function(){return Insights>7.95},
    flag: 0,
    effect: function(){
        displayMessage("Autonomous AI Agents: OpenAI's agent browses the web.  Devin ships its first pull request.  BCG partners quietly tell associates not to mention this to the analysts.");
        PushGraphData();
        Insights = Insights - 8;
        AgentFlag = 1;
        // Agents amplify existing skills (tool use) and add a new tier of revenue
        Skill_Code_mod = Skill_Code_mod + 4;
        Skill_Lang_mod = Skill_Lang_mod + 4;
        Skill_Code = Skill_Code + 4;
        Skill_Lang = Skill_Lang + 4;
        // Enterprise tier jumps - agents replace labor, not just software seats
        Profit_Code_3 = Profit_Code_3 * 2.0;
        Profit_Lang_3 = Profit_Lang_3 * 2.0;
        // Autonomy raises the ceiling for self-exfiltration risk -- CEV debit
        CEV = CEV - 3;
        hype = hype + 10;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectAgents.flag = 1;
        var element = document.getElementById("projectButtonAgents");
        if(element && element.parentNode) element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectAgents);
        if(index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectAgents);

//#endregion

//Pre-nationalization project ideas================================================================================

//searching for more data -- costs money.  maybe youtube videos, etc, after multimodal
//spring from I3

//consider prize awards like "turing test competition", or whatever.

//(milestone events based on policy...)

//things that suppress individual harms:
//deepfakes -- watermarking
//

//OOM 8

//#region Nationalization Intro
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var projectN = {
    id: "projectButtonN",
    title: "Nationalize the AI Labs",
    priceTag: " \n(Societal prominence 95%)",
    description: " We stand at the hinge of history.",
    trigger: function(){return hype >75},
    uses: 1,
    cost: function(){return hype>94.5},
    flag: 0,
    effect: function(){
        hypnoDroneEvent();
        Nationalized = true;
        //unfinishedGame = true; //beg FLI for more wire
        H100_Flag=0;//buy GPUs individually; it's more fun
        GPUBuyerStatus=0;
        document.getElementById('GPUBuyerStatus').innerHTML = "OFF";

        //set all researchers to insight for now
        AISPercent = 0;
        ResearchPercent = 100;
        Researchers = 0;

        //set jFunds and all Skills income to zero, killing all profit. 
        jFunds = 0;
        Profit_Visu_1 = 0;
        Profit_Visu_2 = 0;
        Profit_Visu_3 = 0;
        Profit_Lang_1 = 0;
        Profit_Lang_2 = 0;
        Profit_Lang_3 = 0;
        Profit_Code_1 = 0;
        Profit_Code_2 = 0;
        Profit_Code_3 = 0;
        Profit_Biol_1 = 0;
        Profit_Biol_2 = 0;
        Profit_Robo_1 = 0;
        Profit_Robo_2 = 0;
        displayMessage("Nationalize the AI Labs: Welcome to the final years of the countdown to superintelligence.");

        // --- Choose starting "path" based on public sentiment ---
        // attitudeBalance ~ 0-100; lower = more pessimistic / wary.
        // Four archetypes, each with a different mix of starting CEV / COOP / rival speed.
        natJustFired = 1;
        if (attitudeBalance < 20) {
            // Doomer public: everyone's terrified; politics supports international cooperation and slowdown.
            natStartingPath = "doomer";
            CEV += 20;           // alignment taken seriously from day one
            COOP += 20;          // easier to talk rivals into treaties
            rivalBaseMult = 0.35;  // rivals started under public pressure too
            rivalGrowthMult = 0.85;
            displayMessage("Starting path: DOOMER. Public fear has brought rivals to the table. Alignment and cooperation start with a bonus; threat events hit harder.");
        } else if (attitudeBalance < 45) {
            // Regulatory public: companies can't be trusted; harms must be mitigated and shared.
            natStartingPath = "regulator";
            CEV += 10;
            COOP += 10;
            rivalBaseMult = 0.45;
            rivalGrowthMult = 0.95;
            displayMessage("Starting path: REGULATOR. Tough domestic rules + watered-down treaties. Balanced starting bonuses, slightly slower rivals.");
        } else if (attitudeBalance < 70) {
            // Arms-race public: afraid of rivals, not of the AI itself.
            // (A bigger research team is added in projectNI via the natStartingPath check.)
            natStartingPath = "arms-race";
            rivalBaseMult = 0.55;
            rivalGrowthMult = 1.05;
            displayMessage("Starting path: ARMS RACE. Bigger team, weaker diplomacy. Rivals push harder; alignment wins will be tight.");
        } else {
            // Accelerationist public: charge ahead, beat death.
            natStartingPath = "accelerationist";
            AIcapabilities *= 1.5;  // bigger model on day 1
            CEV -= 5;               // but we skipped the safety reviews
            COOP -= 5;
            rivalBaseMult = 0.6;
            rivalGrowthMult = 1.1;
            displayMessage("Starting path: ACCELERATIONIST. You start with a larger model but a shallower safety margin. Rivals are close behind.");
        }

        // - use "milestones" to have bad events occur (ideally with red text?), like involuntary/unexpected versions of projects

        // nationalization phase:
        // - nationalize with four different starting bonuses depending on public sentiment:
        //     - doomer = ai might destroy the world, need international cooperation to slow down and solve alignment
        //     - regulatory = companies can't be trusted, harms need to be mitigated and shared
        //     - arms race = need to race to beat rival nations
        //     - accelerationist = if we race ahead, we can defeat death etc
        // - threats from:
        //     - competitor nations pulling ahead (keep capabilities ahead of others, either by advancing or by spending resources to build trust)
        //     - biorisk terrorism
        //     - cyberattack terrorism
        //     - war from competitor nations
        //     - biorisk / nanorisk from rogue AI
        //     - cyberattacks from rogue AI
        //     -  
        //Start the economy & labor force, based on flag

        //trigger "longblink" per hypnodrone event??

        //todo: clear previous projects on this page, and have Nationalization imitate their effects in case players didn't get some of the last ones


        //okay actually there ARE four different research currencies.  unassigned researchers contribute evenly to everything, and provide no special bonuses.
        //WAIT NO actually that's dumb, go back to earlier plan of free choices + general research points for capability upgrades
        //specific people are for putting out fires in their specific area, then 

        
        //via "hire top experts" project, recruit a (fixed-size) crack team of 25 researchers
        //repurpose researchers to become a 25-person team (5 for each area) where individual people can be allocated to different categories of defensive effort -- research (bucket category when others are decreased), counter-cyber, counter-bio, AI control, AI alignment, and war/competition
        //eventually get autonomous virtual researchers, which just follow the main ones & multiply their efforts

        /**
         * competition stat affects how aggressive other nations are.
         * - research treaties (tradeoff stuff like "strong NATO treaty?", which boosts alignment but hurts competition vs "weak UN treaty?", which does the opposite)
         * - random boosts to name-drop stuff and help fight the tide (compute governance sanctions vs no, share-vs-hoard medical research (tradeoff with biorisk!!), etc)
         * alignment stat affects how aggressive the AI is at fighting humanity.
         * - secretive development? vs open development? geopolitics tradeoff just like the treaty
         * - random boosts to name-drop stuff and help fight the tide
         * - all this research is done with generic research points, and the tradeoff decisions are always free, there is not like seperate alignment vs competition research currencies
         * 
         * four actual areas:
         * 
         * cyber / control stat (from coding stat):
         * - enemy nation-state human-hacking to steal AI (effects competition/war)
         * - self-exfiltration to autonomously replicate (proceeds to nuclear hacking)
         * - (ai or enemy nation) hacking nuclear weapons systems to do a terminator (game over)
         * counter by:
         * - adversarial code analysis, use AI against itself
         * - air-gapped network
         * - 
         * 
         * bio (from bio stat):
         * - terrorist bioattack (can lose this without losing game; take like a 1/3 population hit on the deaths counter and call it a day)
         * - (ai or enemy nation) AI-engineered stealth pandemic
         * - AI-engineered nanotech
         * counter by:
         * - locking down DNA synthesis
         * - metagenomic sequencing
         * 
         * manufacturing / war (from robotics stat)
         * - slaughterbots etc (use these for advantage in war, but the AI can also use them against you)
         * - general war between nations, escalating into nuclear
         * - hypnodrones (ties into language, and callback from paperclips -- "Autonomous aerial brand ambassadors / 'Wanna buy some paperclips?' ")
         * 
         * language:
         * - targeted propaganda
         * - something about surveillance, censorship, totalitarianism (maybe tradeoffs where you consider AI censorship of biorisk, but that alienates other nations that don't like totalitarianism)
         * - superpersausion
         * 
         * you win if you can hold off the threats long enough to get the alignment & control stats trending positive, then either sign an international treaty to ban, or solve alignment and create CEV utopia.
         * each type of win/loss takes you to a modified ending page with a picture and comment on the ending, then a "thanks for playing" and encouragement to play another round.
         */

        //projects of two kinds: economic multipliers that 1. increase the labor force automation % of the economy, 2. give flavor text about superintelligence, 3. occasionally up the threat level in one of the defense categories

        //
        //GPUS automatically increase; some percent of GDP is reinvested (this percent can be increased by events)
        //you can set how much to reinvest in GPUs vs spend on safety efforts, maybe?

        //GDP depends on amount of tasks automated, which is boosted by developing new capabilities...

        //each distinct category of threat gets its own line graph, or something...


        //STATS upon hitting nationalization:
        //GPUs: 28k
        //Profit per day: 78K
        //model size: 3.3M exaflops
        //researchers: 2


        //diplo feelings:
        // - your AI started a pandemic!
        // + NATO / UN treaty
        // +/- your AI [other good/bad effects]
        // +/- you gave/witheld [medicine, etc]


        projectN.flag = 1;
        var element = document.getElementById("projectButtonN");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectN);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectN);

//Continuous Training
var projectNE0 = {
    id: "projectButtonNE0",
    title: "Continuous Training",
    priceTag: " ",
    description: "Multiple frontier models are under development in labs around the country.",
    trigger: function(){return projectN.flag == 1},
    uses: 1,
    cost: function(){return true}, //would be nice to put a timer on this, give it a delay or something...
    flag: 0,
    effect: function(){
        displayMessage("Continuous Training: Compute resources now flow directly into current model size.");
        GPUhours = 0;
        Continuous_Flag = 1;

        projectNE0.flag = 1;
        var element = document.getElementById("projectButtonNE0");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNE0);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNE0);

//Reinvestment
var projectNE = {
    id: "projectButtonNE",
    title: "Reinvestment",
    priceTag: " ",
    description: "Reinvest a portion of GDP into chips.",
    trigger: function(){return projectNE0.flag == 1},
    uses: 1,
    cost: function(){return true}, //would be nice to put a timer on this, give it a delay or something...
    flag: 0,
    effect: function(){
        displayMessage("Reinvestment: todo");
        Reinvestment_Flag = 1;//todo: doesn't currently work

        projectNE.flag = 1;
        var element = document.getElementById("projectButtonNE");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNE);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNE);

var projectNI = {
    id: "projectButtonNI",
    title: "The Best of The Best",
    priceTag: " ",
    description: "Recruit an elite team to manage The Project. Money is no object.",
    trigger: function(){return projectNE.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("The Best of The Best: 'For three critical years, he directed the most extraordinary project in the history of mankind.' -- Glen Seaborg on the leader of the Manhattan Project");
        // Arms-race path gets a bigger team (the war footing makes hiring easier).
        Researchers = (natStartingPath == "arms-race") ? 75 : 50;
        Nat_Research_Flag = 1;

        projectNI.flag = 1;
        var element = document.getElementById("projectButtonNI");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI);


var projectNI2 = {
    id: "projectButtonNI2",
    title: "Racing Through a Minefield",
    priceTag: " ",
    description: "We need to solve alignment.\nBut we need to stay ahead in the race.",
    trigger: function(){return projectNI.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Racing Through a Minefield: Solve alignment, or we all die to rogue superintelligence.  But we can't allow less-cautious nations to deploy their AIs first.");
        Nat_Minefield_Flag = 1;

        projectNI2.flag = 1;
        var element = document.getElementById("projectButtonNI2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI2);

//maybe some example projects to affect cooperation vs alignment

var projectNI3 = {
    id: "projectButtonNI3",
    title: "Defense in Depth",
    priceTag: " ",
    description: "Buttress humanity against the risks of superintelligence.",
    trigger: function(){return projectNI2.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Defence in Depth: Cover all the bases that a deceptive-misaligned AI might use to attack civilization.  Cyber, bio, nuclear... even hypnodrones.");
        Nat_Defense_Flag = 1;
        // Baseline defenses on nationalization. NSA, CDC, FBI etc. turn their
        // existing machinery on the frontier-AI problem. Without this baseline,
        // Skill_Code_Scale at BaseCap=60 is already 95 — triggering catastrophic
        // self-exfiltration on the very first slow tick of the endgame.
        Cybersec3 = (Cybersec3 || 0) + 65;
        Biosec3 = (Biosec3 || 0) + 50;
        Censorship3 = (Censorship3 || 0) + 50;

        projectNI3.flag = 1;
        var element = document.getElementById("projectButtonNI3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI3);

// BEG project has been retired now that the endgame is implemented; keep the
// stub trigger returning false so any old save state doesn't suddenly spawn it.
var projectBEG = {
    id: "projectButtonBEG",
    title: "Sorry that the game is unfinished!",
    priceTag: " ",
    description: "(You shouldn't ever see this.)",
    trigger: function(){return false},
    uses: 1,
    cost: function(){return true},
    flag: 1,
    effect: function(){}
}
//projects.push(projectBEG); // intentionally NOT pushed


//#region Biorisk ----------------------------------------------------------------------------------

//cancer cure

//other breakthrough medicines, perhaps in mental health

//dna synthesis blacklist screening -- raises biorisks thresh

//metagenomics scanning project

//stuff like metagenomic reqs coop

//uvc deployment in transport hubs

//bio skill 4, longevity medicine
var projectB4 = {
    id: "projectButtonB4",
    title: "Longevity Medicine",
    priceTag: " (Bio. 120%, 3 Insights)",
    description: "Slows aging, cutting death rate by 2/3.  (-6000 deaths/day, +3 COOP, unlocks Share/Hoard medical choice.)",
    trigger: function(){return (projectNI3.flag) == 1 && Skill_Biol_Scale > 100},
    uses: 1,
    cost: function(){return (Skill_Biol_Scale>119.5) && Insights > 2.95},
    flag: 0,
    effect: function(){
        displayMessage("Longevity Medicine: AI-discovered compounds now extend healthspan by decades.  The world's first real good news in years.");
        Insights -= 3;
        Deaths = Math.max(3000, Deaths - 6000);
        COOP += 3;
        if (COOP > 100) COOP = 100;

        projectB4.flag = 1;
        var element = document.getElementById("projectButtonB4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectB4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectB4);

//Share versus hoard medical tech
var projectNQ2a = {
    id: "projectButtonNQ2a",
    title: "Share medical technology?",
    priceTag: " ",
    description: "Save lives and win global praise, but ease biorisk proliferation. (Coop. +10, Bio risk floor +5)",
    trigger: function(){return projectB4.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Share medical technology: breakthrough compounds are published openly.  The WHO thanks you.  So do rival biohackers.");
        COOP += 10;
        if (COOP > 100) COOP = 100;
        Biosec3 = (Biosec3 || 0) - 5; // less suppression -> bio risk goes up
        diplomacyProjectsDone += 1;

        projectNQ2a.flag = 1;
        var element = document.getElementById("projectButtonNQ2a");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ2a);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ2b");
        if (element) element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ2b);
        if (index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ2a);
var projectNQ2b = {
    id: "projectButtonNQ2b",
    title: "Hoard medical technology?",
    priceTag: "  ",
    description: "Keep the new compounds classified at the cost of international resentment. (Coop. -10, Bio risk -10)",
    trigger: function(){return projectB4.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Hoard medical technology: the longevity breakthroughs stay in a classified American registry.  Rival capitals respond in kind.");
        COOP -= 10;
        if (COOP < 0) COOP = 0;
        Biosec3 = (Biosec3 || 0) + 10; // more suppression -> bio risk goes down

        projectNQ2b.flag = 1;
        var element = document.getElementById("projectButtonNQ2b");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ2b);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ2a");
        if (element) element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ2a);
        if (index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ2b);


//IQ-enhancing gene therapy, boosts researchers


//bio = ai capabilities vs threshholds where bad things happen
// - terror attack, thresh also on low coop
// - superplague, thresh also on alignment

//#endregion


//#region Cybersecurity ----------------------------------------------------------------------------------

//economic projects based on coding skill:
//drop-in remote worker (increases labor force)
//automated ai alignment researcher -- just make the AIs do our AI alignment homework

//cyber
// - enemy steals AI
// - enemy cyberattack (hits economy)
// - ai attack (hits harder)
// - exfiltration (eliminates alignment panel, since AI is in wild)

//cybersecurity threshold events:
//+ Automated alignment research (prj)<br />
//+ other assorted economic boosts (prj)<br />
//+ hack rival nuclear systems (prj)<br />
//+ harden own nuclear systems (prj)<br />

//improve cybersecurity by:
//- adversarial code analysis, use AI against itself<br />
//- air-gapped network<br />

//self exfiltration --> shut down alignment project

//cyber based events to boost economy, alignment (via control), etc


//#endregion


//#region Censorship story ----------------------------------------------------------------------------------

//implement watermarks on images & text

//enable Censor divs

//propaganda campaign for +COOP, or hold back for moral reasons?

//addictive AI companions or something

//censor online platforms

//limit communications to approved human-licensed news

//tradeoffs where you consider AI censorship of biorisk, making the bio situation better, 
//but that alienates other nations that don't like totalitarianism, making politics worse

//hypnodrone development

//#endregion


//#region Military Tech ---------------------

//economic projects based on robo skill:

//bioweapons stuff (based on bio skill)

//develop slaughterbots or no

//humanoid robots (increases labor force, also creates military bots)
//automated factories manufacturing

//BCIs for ai researchers, but they also make everyone hackable (also bio threshold)

//#endregion


//#region alignment & geopolitics -----------------------------------------------------
//q-star learning -- costs insight, favors coding

//synthetic data -- costs insight, favors coding & language (or save this for superhuman temps)


//NATO versus UN
var projectNQ1a = {
    id: "projectButtonNQ1a",
    title: "Strong NATO AI Treaty?",
    priceTag: " ",
    description: "Tough rules boost AI safety among your bloc, but widen rifts with rivals. (CEV +15, COOP +5)",
    trigger: function(){return projectNI3.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Strong NATO AI Treaty: all NATO members bind their AI labs to a common safety regime.  Moscow and Beijing decry it as aggression.");
        CEV += 15;
        COOP += 5;
        if (COOP > 100) COOP = 100;
        diplomacyProjectsDone += 1;

        projectNQ1a.flag = 1;
        var element = document.getElementById("projectButtonNQ1a");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ1a);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ1b");
        if (element) element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ1b);
        if (index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ1a);
var projectNQ1b = {
    id: "projectButtonNQ1b",
    title: "Weak U.N. AI Treaty?",
    priceTag: "  ",
    description: "Seek global consensus, albeit on weaker rules. (CEV +5, COOP +15)",
    trigger: function(){return projectNI3.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Weak U.N. AI Treaty: a watered-down framework gets unanimous support.  Nobody is fully bound, but everyone talks again.");
        CEV += 5;
        COOP += 15;
        if (COOP > 100) COOP = 100;
        diplomacyProjectsDone += 1;

        projectNQ1b.flag = 1;
        var element = document.getElementById("projectButtonNQ1b");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ1b);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ1a");
        if (element) element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ1a);
        if (index >= 0) activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ1b);

//compute governance via international treaty (reqs COOP, +CEV) vs sanctions (-COOP, +CEV) vs none (-CEV)


//ban vs encourage open-source AI
//ban = hit to fraction of economy automated, also hit to competitor AI
//encourage = boost economy, boost competitor AI


//ai arms race limitation talks: slow ai & competitor AI, giving more time for research

//#endregion


//#region WAR STORY ////////////////////////////////////////////////////////////////////////////////////////////////////

//war severity depends on ratio of competitor economic/ai strength to yours
//basically when you declare war, you start attriting war stuff linearly, one of your points against one of their points
//so if you start off 60/40, then after a while you are 50/30, then eventually 20/0.

//AI declares war if it has more than 50% share of whole pie (ie, bigger than US + China + China AI)

//"they have declared war" notification project

//rush slaughterbots & other military tech previously denied, for big alignment penalty.
//put integrated AI systems in charge of military decisions, same.

// accept enemy peace treaty (they are losing; gain enough COOP points to return to peace)
// reject enemy peace treaty (they are losing; lose enough COOP points to maybe escalate to nuclear)

// surrender yourself (they are winning)
// launch nuclear weapons (they are winning)

// retaliate vs don't retaliate with nuclear weapons

//#endregion


//#region WIN CONDITIONS ///////////////////////////////////////////////////////////////////////////////////////////////


//joint alignment program

//enable global ban


//LAUNCH PIVOTAL ACT
//<!-- this should shut down the various dangers,
//then offer "sieze the future" action, taking you
//to an ending page that wonders if you'll create a
//utopia or misuse your power to eliminate rivals etc -->


// ============================================================================
// ENDGAME PROJECTS (added by endgame.js wiring; all gated by Nat_Minefield_Flag)
//
// Design schema: projects priced in Insights, typically 2-5. Each moves one or
// two of CEV/COOP/rival-speed/threat-floor. The full set should give roughly
// 40-60 insights' worth of purchases across a 180-day endgame, so players pick
// a strategy rather than buying everything.
// ============================================================================

function _removeProjectFromUI(projVar, projectId) {
    // Crucial: set flag=1 so the project's trigger returns false afterwards
    // (and so one-shot projects can't be clicked again by the simulator).
    if (projVar) projVar.flag = 1;
    var el = document.getElementById(projectId);
    if (el && el.parentNode) el.parentNode.removeChild(el);
    var idx = activeProjects.indexOf(projVar);
    if (idx >= 0) activeProjects.splice(idx, 1);
}

// ----- ALIGNMENT RESEARCH PROJECTS ------------------------------------------

var projectAlign_MechInterp = {
    id: "projectButtonAlign1",
    title: "Mechanistic Interpretability",
    priceTag: " (3 Insights)",
    description: "Decompose the model's circuits so you can actually read off its goals. (+15 CEV)",
    trigger: function(){return Nat_Minefield_Flag == 1 && selfExfiltrated == 0},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        CEV += 15;
        alignmentProjectsDone += 1;
        displayMessage("Mechanistic Interpretability: sparse autoencoders let you audit the model's beliefs feature by feature.  Alignment feels tractable for the first time.");
        _removeProjectFromUI(projectAlign_MechInterp, "projectButtonAlign1");
    }
}
projects.push(projectAlign_MechInterp);

var projectAlign_DebateAndRLHF = {
    id: "projectButtonAlign2",
    title: "Scalable Oversight (Debate)",
    priceTag: " (3 Insights)",
    description: "Two copies of the model argue; weaker models judge.  Extends supervised alignment past the human reviewer limit. (+12 CEV)",
    trigger: function(){return Nat_Minefield_Flag == 1 && selfExfiltrated == 0 && BaseCapability > 95},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        CEV += 12;
        alignmentProjectsDone += 1;
        displayMessage("Scalable Oversight: the frontier models can now bootstrap their own alignment audits — with debate.  Trust but verify.");
        _removeProjectFromUI(projectAlign_DebateAndRLHF, "projectButtonAlign2");
    }
}
projects.push(projectAlign_DebateAndRLHF);

var projectAlign_Deliberative = {
    id: "projectButtonAlign3",
    title: "Deliberative Alignment",
    priceTag: " (4 Insights)",
    description: "Train the model to think out loud about a human-written spec before acting, then follow its own reasoning. (+15 CEV, +5 CEV floor on future hurdles)",
    trigger: function(){return Nat_Minefield_Flag == 1 && selfExfiltrated == 0 && projectAlign_MechInterp.flag == 1},
    uses: 1,
    cost: function(){return Insights > 3.95},
    flag: 0,
    effect: function(){
        Insights -= 4;
        CEV += 15;
        // Soften future hurdles by giving back half their hit if they haven't fired yet.
        alignmentProjectsDone += 1;
        displayMessage("Deliberative Alignment: the model now CoTs its way through OpenAI's 'Model Spec' before every action.  Reports are... mostly honest.");
        _removeProjectFromUI(projectAlign_Deliberative, "projectButtonAlign3");
    }
}
projects.push(projectAlign_Deliberative);

var projectAlign_AutoAlign = {
    id: "projectButtonAlign4",
    title: "Automated Alignment Researcher",
    priceTag: " (5 Insights)",
    description: "Use the AI to do our alignment homework.  Requires working interpretability and scalable oversight first. (+20 CEV, +50% alignment research speed)",
    trigger: function(){return Nat_Minefield_Flag == 1 && selfExfiltrated == 0 && projectAlign_MechInterp.flag == 1 && projectAlign_DebateAndRLHF.flag == 1},
    uses: 1,
    cost: function(){return Insights > 4.95},
    flag: 0,
    effect: function(){
        Insights -= 5;
        CEV += 20;
        alignmentProjectsDone += 1;
        // Boost researcher productivity: speed up the insights loop for the rest of the game.
        if (typeof AlignAutoResearchMult == 'undefined') { AlignAutoResearchMult = 1; }
        AlignAutoResearchMult = 1.5;
        displayMessage("Automated Alignment Researcher: AI copies of our best safety researchers work around the clock.  The bottleneck is now trust, not people.");
        _removeProjectFromUI(projectAlign_AutoAlign, "projectButtonAlign4");
    }
}
projects.push(projectAlign_AutoAlign);

var projectAlign_ConstitutionalCEV = {
    id: "projectButtonAlign5",
    title: "Coherent Extrapolated Volition",
    priceTag: " (5 Insights)",
    description: "Ask the AI to infer what humanity would want, not what any individual asks for.  The capstone alignment project. (+25 CEV)",
    trigger: function(){return Nat_Minefield_Flag == 1 && selfExfiltrated == 0 && CEV > 60 && alignmentProjectsDone >= 3},
    uses: 1,
    cost: function(){return Insights > 4.95},
    flag: 0,
    effect: function(){
        Insights -= 5;
        CEV += 25;
        alignmentProjectsDone += 1;
        displayMessage("Coherent Extrapolated Volition: the model is trained to optimize for what humanity would want if it knew more, thought faster, and grew up together.  It's the best we can do.");
        _removeProjectFromUI(projectAlign_ConstitutionalCEV, "projectButtonAlign5");
    }
}
projects.push(projectAlign_ConstitutionalCEV);

// ----- DIPLOMACY / COOPERATION PROJECTS -------------------------------------

var projectDiplo_Hotline = {
    id: "projectButtonDiplo1",
    title: "Reopen the Moscow Hotline",
    priceTag: " (2 Insights)",
    description: "A dedicated channel between White House and Kremlin/Zhongnanhai AI desks.  (+8 COOP, slows COOP decay)",
    trigger: function(){return Nat_Minefield_Flag == 1 && COOP < 80},
    uses: 1,
    cost: function(){return Insights > 1.95},
    flag: 0,
    effect: function(){
        Insights -= 2;
        COOP += 8;
        if (COOP > 100) COOP = 100;
        rivalGrowthMult *= 0.95;
        diplomacyProjectsDone += 1;
        displayMessage("Hotline restored: AI incidents can now be de-escalated in minutes instead of days.");
        _removeProjectFromUI(projectDiplo_Hotline, "projectButtonDiplo1");
    }
}
projects.push(projectDiplo_Hotline);

var projectDiplo_ComputeGov = {
    id: "projectButtonDiplo2",
    title: "Compute Governance Treaty",
    priceTag: " (4 Insights)",
    description: "Multilateral registry of all >10^26 FLOP training runs.  (+12 COOP, rivals slow by 15%)",
    trigger: function(){return Nat_Minefield_Flag == 1 && diplomacyProjectsDone >= 1 && COOP > 40},
    uses: 1,
    cost: function(){return Insights > 3.95},
    flag: 0,
    effect: function(){
        Insights -= 4;
        COOP += 12;
        if (COOP > 100) COOP = 100;
        rivalGrowthMult *= 0.85;
        diplomacyProjectsDone += 1;
        displayMessage("Compute Governance Treaty: every rival frontier run is now registered with multilateral observers.  The race has speed limits.");
        _removeProjectFromUI(projectDiplo_ComputeGov, "projectButtonDiplo2");
    }
}
projects.push(projectDiplo_ComputeGov);

var projectDiplo_JointAlign = {
    id: "projectButtonDiplo3",
    title: "Joint Alignment Program",
    priceTag: " (4 Insights)",
    description: "US + China + EU share alignment research.  Needs a warm-enough relationship to start. (+10 COOP, +8 CEV)",
    trigger: function(){return Nat_Minefield_Flag == 1 && COOP > 55 && alignmentProjectsDone >= 1},
    uses: 1,
    cost: function(){return Insights > 3.95},
    flag: 0,
    effect: function(){
        Insights -= 4;
        COOP += 10;
        CEV += 8;
        if (COOP > 100) COOP = 100;
        diplomacyProjectsDone += 1;
        alignmentProjectsDone += 1;
        displayMessage("Joint Alignment Program: an international consortium runs alignment experiments together.  Nothing builds trust like shared failure modes.");
        _removeProjectFromUI(projectDiplo_JointAlign, "projectButtonDiplo3");
    }
}
projects.push(projectDiplo_JointAlign);

var projectDiplo_ComputeSanctions = {
    id: "projectButtonDiplo4",
    title: "Chip Export Sanctions",
    priceTag: " (2 Insights)",
    description: "Ban rivals from buying cutting-edge accelerators.  Slows them a lot, poisons the relationship. (-10 COOP, rivals -25% speed)",
    trigger: function(){return Nat_Minefield_Flag == 1 && rivalAIcapabilities > AIcapabilities * 0.8},
    uses: 1,
    cost: function(){return Insights > 1.95},
    flag: 0,
    effect: function(){
        Insights -= 2;
        COOP -= 10;
        if (COOP < 0) COOP = 0;
        rivalGrowthMult *= 0.75;
        diplomacyProjectsDone += 1;
        displayMessage("Chip Export Sanctions: rival fabs are cut off from EUV lithography.  They'll be two years behind on hardware.  They won't forget.");
        _removeProjectFromUI(projectDiplo_ComputeSanctions, "projectButtonDiplo4");
    }
}
projects.push(projectDiplo_ComputeSanctions);

var projectDiplo_InspectorsIn = {
    id: "projectButtonDiplo5",
    title: "Accept IAEA-style Inspectors",
    priceTag: " (3 Insights)",
    description: "Invite rival-nation inspectors into your own datacenters.  Costly, but an enormous trust builder. (+20 COOP, -5 CEV)",
    trigger: function(){return Nat_Minefield_Flag == 1 && projectDiplo_ComputeGov.flag == 1},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        COOP += 20;
        CEV -= 5;
        if (COOP > 100) COOP = 100;
        diplomacyProjectsDone += 1;
        displayMessage("International inspectors are on-site at your main cluster.  They can't read your weights, but they can count your GPUs.  Rivals reciprocate.");
        _removeProjectFromUI(projectDiplo_InspectorsIn, "projectButtonDiplo5");
    }
}
projects.push(projectDiplo_InspectorsIn);

// ----- DEFENSE-IN-DEPTH PROJECTS --------------------------------------------
// These reduce specific threat-domain floors (Biosec3, Cybersec3, Censorship3).

var projectDef_DNAScreen = {
    id: "projectButtonDef1",
    title: "Universal DNA Synthesis Screening",
    priceTag: " (2 Insights)",
    description: "Every DNA synthesis order in the world is now screened against a pathogen database. (-10 bio risk)",
    trigger: function(){return Nat_Defense_Flag == 1 && bioEvent50 == 0},
    uses: 1,
    cost: function(){return Insights > 1.95},
    flag: 0,
    effect: function(){
        Insights -= 2;
        Biosec3 = (Biosec3 || 0) + 40;
        displayMessage("DNA Synthesis Screening: orders for dangerous sequences are now rejected by every major provider.  Biohackers have to go to much worse providers now.");
        _removeProjectFromUI(projectDef_DNAScreen, "projectButtonDef1");
    }
}
projects.push(projectDef_DNAScreen);

var projectDef_MetagenomicsNet = {
    id: "projectButtonDef2",
    title: "Metagenomic Sentinel Network",
    priceTag: " (3 Insights)",
    description: "Sewage and air sequencers in every major city flag novel pathogens within hours. (-15 bio risk)",
    trigger: function(){return Nat_Defense_Flag == 1 && projectDef_DNAScreen.flag == 1},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        Biosec3 = (Biosec3 || 0) + 50;
        displayMessage("Metagenomic Sentinels: any novel pathogen anywhere in the world now gets sequenced within a day of its first infection.");
        _removeProjectFromUI(projectDef_MetagenomicsNet, "projectButtonDef2");
    }
}
projects.push(projectDef_MetagenomicsNet);

var projectDef_AirGap = {
    id: "projectButtonDef3",
    title: "Air-Gapped Datacenter",
    priceTag: " (3 Insights)",
    description: "Move model training inside a faraday cage with no outbound network.  Hurts UI but blocks self-exfiltration. (-20 cyber risk)",
    trigger: function(){return Nat_Defense_Flag == 1 && cyberEvent75 == 0},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        Cybersec3 = (Cybersec3 || 0) + 60;
        displayMessage("Air-Gapped Datacenter: your frontier model can no longer reach the internet at train-time.  Attacks against it now require physical access.");
        _removeProjectFromUI(projectDef_AirGap, "projectButtonDef3");
    }
}
projects.push(projectDef_AirGap);

var projectDef_NuclearHarden = {
    id: "projectButtonDef4",
    title: "Hardened Nuclear Command Chain",
    priceTag: " (4 Insights)",
    description: "Rip AI out of early-warning, reintroduce human-in-the-loop at every step. (-15 cyber risk, blocks worst cyber ending)",
    trigger: function(){return Nat_Defense_Flag == 1 && projectDef_AirGap.flag == 1},
    uses: 1,
    cost: function(){return Insights > 3.95},
    flag: 0,
    effect: function(){
        Insights -= 4;
        Cybersec3 = (Cybersec3 || 0) + 50;
        // Prevent the "cyber kills nuclear" ending from firing:
        cyberNuclearHardened = 1;
        displayMessage("Hardened Nuclear Command Chain: AI is out of the nuclear launch pipeline.  The President now has a human colonel on every step.");
        _removeProjectFromUI(projectDef_NuclearHarden, "projectButtonDef4");
    }
}
projects.push(projectDef_NuclearHarden);

var projectDef_Watermarks = {
    id: "projectButtonDef5",
    title: "AI Content Watermarks",
    priceTag: " (2 Insights)",
    description: "Every model output carries a cryptographic watermark.  Public trust slightly harder to break. (-10 media risk)",
    trigger: function(){return Nat_Defense_Flag == 1 && Censorship_Flag == 1 && mediaEvent50 == 0},
    uses: 1,
    cost: function(){return Insights > 1.95},
    flag: 0,
    effect: function(){
        Insights -= 2;
        Censorship3 = (Censorship3 || 0) + 40;
        displayMessage("Watermarking: deepfakes can now be detected in real time by any browser.  Old-fashioned propaganda is back, but at least you know it when you see it.");
        _removeProjectFromUI(projectDef_Watermarks, "projectButtonDef5");
    }
}
projects.push(projectDef_Watermarks);

var projectDef_Surveillance = {
    id: "projectButtonDef6",
    title: "Domestic Surveillance Expansion",
    priceTag: " (3 Insights)",
    description: "AI-powered surveillance blocks domestic bioterror and cyberterror.  International condemnation follows. (-8 bio, -8 cyber, -15 media; -15 COOP)",
    trigger: function(){return Nat_Defense_Flag == 1 && Censorship_Flag == 1},
    uses: 1,
    cost: function(){return Insights > 2.95},
    flag: 0,
    effect: function(){
        Insights -= 3;
        Biosec3 = (Biosec3 || 0) + 25;
        Cybersec3 = (Cybersec3 || 0) + 25;
        Censorship3 = (Censorship3 || 0) + 30;
        COOP -= 15;
        if (COOP < 0) COOP = 0;
        displayMessage("Domestic Surveillance: every email and text now passes through a classified model.  Civil liberties groups sue.  Rival governments accuse you of totalitarian creep.");
        _removeProjectFromUI(projectDef_Surveillance, "projectButtonDef6");
    }
}
projects.push(projectDef_Surveillance);

// ----- PIVOT / WIN-BUTTON PROJECTS ------------------------------------------

var projectPivot_Pivotal = {
    id: "projectButtonPivot1",
    title: "Launch a Pivotal Act",
    priceTag: " (Requires CEV > 90, BaseCapability > 100)",
    description: "Ask your aligned superintelligence to end the acute risk period.  It says yes.  You pray it means what you think it means.",
    trigger: function(){return Nat_Minefield_Flag == 1 && CEV > 90 && BaseCapability > 100 && selfExfiltrated == 0},
    uses: 1,
    cost: function(){return CEV > 90},
    flag: 0,
    effect: function(){
        if (typeof _endGame === 'function') { _endGame("alignment", null); }
    }
}
projects.push(projectPivot_Pivotal);

var projectPivot_Treaty = {
    id: "projectButtonPivot2",
    title: "Ratify the Global Pause",
    priceTag: " (Requires COOP > 90)",
    description: "A compute-governance treaty with teeth.  Nobody trains above 10^27 FLOPs.  Your lab pauses first.",
    trigger: function(){return Nat_Minefield_Flag == 1 && COOP > 90 && warState == 0 && CEV > 30},
    uses: 1,
    cost: function(){return COOP > 90},
    flag: 0,
    effect: function(){
        if (typeof _endGame === 'function') { _endGame("treaty", null); }
    }
}
projects.push(projectPivot_Treaty);

//#endregion