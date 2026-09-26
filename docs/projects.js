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
        displayMessage("Pre-deployment Evals: Before each release, red-teamers probe the model for dangerous capabilities -- and your staff's safety effort now counts twice.");
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
        displayMessage("AI Software Dev: 'The hottest new programming language is English.' - Andrej Karpathy.  Your model now closes tickets on its own.");
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
    priceTag: " (3 Insights)",
    description: "Use RL to teach models to think step-by-step before answering.  Much better on hard problems.",
    trigger: function(){return projectL5.flag == 1 && projectA2.flag == 1},
    uses: 1,
    cost: function(){return Insights>2.95},
    flag: 0,
    effect: function(){
        displayMessage("Chain-of-Thought Reasoning: 'It's not that the model is smarter, it just thinks for longer.'  The labs race to publish 'o1-like' systems; benchmark scores jump overnight.");
        PushGraphData();
        Insights = Insights - 3;
        ReasoningFlag = 1;
        // Reasoning helps code & math more than it helps vision or bio wet-lab work
        Skill_Code_mod = Skill_Code_mod + 2;
        Skill_Lang_mod = Skill_Lang_mod + 1.5;
        Skill_Code = Skill_Code + 2;
        Skill_Lang = Skill_Lang + 1.5;
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
    priceTag: " (4 Insights)",
    description: "Longer reasoning chains, more samples, more verifier passes.  A new axis of scaling -- and insatiable GPU demand.",
    trigger: function(){return ReasoningFlag == 1},
    uses: 1,
    cost: function(){return Insights>3.95},
    flag: 0,
    effect: function(){
        displayMessage("Inference-Time Compute Scaling: data-center buildouts accelerate.  Nvidia's market cap now exceeds Japan's GDP.  Power grid operators nervously check their dispatch schedules.");
        PushGraphData();
        Insights = Insights - 4;
        InferenceTimeFlag = 1;
        InferenceRevMult = 2.0;
        // Very large revenue boost across the board (think: $200/mo -> $2000/mo tiers)
        Profit_Code_2 = Profit_Code_2 * 1.3;
        Profit_Code_3 = Profit_Code_3 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 1.3;
        Profit_Lang_3 = Profit_Lang_3 * 1.5;
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
    priceTag: " (4 Insights)",
    description: "Train on tasks where answers are auto-checkable: tests pass, proofs verify, assays confirm.  Huge skill jumps, but models learn to game their evals.",
    trigger: function(){return ReasoningFlag == 1},
    uses: 1,
    cost: function(){return Insights>3.95},
    flag: 0,
    effect: function(){
        displayMessage("RL from Verifiable Rewards: 'We reward what we can measure, and we measure what we can reward.  What could possibly go wrong?' - anonymous research engineer, Slack, 11:47 PM");
        PushGraphData();
        Insights = Insights - 4;
        RLVRFlag = 1;
        // Biggest gains in domains with hard verifiers: code & bio assays
        Skill_Code_mod = Skill_Code_mod + 2.5;
        Skill_Biol_mod = Skill_Biol_mod + 2.5;
        Skill_Code = Skill_Code + 2.5;
        Skill_Biol = Skill_Biol + 2.5;
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
    priceTag: " (5 Insights)",
    description: "Models that book flights, write PRs, and do junior analyst work end-to-end.  Everyone has five interns named Claude now.",
    trigger: function(){return RLVRFlag == 1 && projectC4.flag == 1},
    uses: 1,
    cost: function(){return Insights>4.95},
    flag: 0,
    effect: function(){
        displayMessage("Autonomous AI Agents: OpenAI's agent browses the web.  Devin ships its first pull request.  BCG partners quietly tell associates not to mention this to the analysts.");
        PushGraphData();
        Insights = Insights - 5;
        AgentFlag = 1;
        // Agents amplify existing skills (tool use) and add a new tier of revenue
        Skill_Code_mod = Skill_Code_mod + 2;
        Skill_Lang_mod = Skill_Lang_mod + 2;
        Skill_Code = Skill_Code + 2;
        Skill_Lang = Skill_Lang + 2;
        // Enterprise tier jumps - agents replace labor, not just software seats
        Profit_Code_3 = Profit_Code_3 * 1.5;
        Profit_Lang_3 = Profit_Lang_3 * 1.5;
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

//Constitutional AI -- makes safety effort go further
var projectA4 = {
    id: "projectButtonA4",
    title: "Constitutional AI",
    priceTag: " (2 Insights)",
    description: "Have the model critique its own outputs against a written set of principles. (+50% RLHF power)",
    trigger: function(){return projectA2.flag == 1 && Researchers > 2},
    uses: 1,
    cost: function(){return Insights>1.95},
    flag: 0,
    effect: function(){
        displayMessage("Constitutional AI: 'Choose the response that a wise, ethical, polite and friendly person would more likely say.'  Human feedback now goes much further.");
        Insights = Insights - 2;
        RLHFMult = RLHFMult * 1.5;
        CEV = CEV + 3;

        projectA4.flag = 1;
        var element = document.getElementById("projectButtonA4");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectA4);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectA4);

//Synthetic data -- the internet is running out
var projectL7 = {
    id: "projectButtonL7",
    title: "Synthetic Data",
    priceTag: " (2 Insights)",
    description: "You've run out of internet.  Have your models write their own training data. (+50% Lang. & Coding profits)",
    trigger: function(){return projectL4.flag == 1 && ReasoningFlag == 1},
    uses: 1,
    cost: function(){return Insights>1.95},
    flag: 0,
    effect: function(){
        displayMessage("Synthetic Data: the 'data wall' turns out to be more of a data speed bump.  Model collapse is avoided by filtering hard for quality.");
        PushGraphData();
        Insights = Insights - 2;
        Skill_Lang_mod = Skill_Lang_mod + 1.5;
        Skill_Code_mod = Skill_Code_mod + 1.5;
        Skill_Lang = Skill_Lang + 1.5;
        Skill_Code = Skill_Code + 1.5;
        Profit_Lang_1 = Profit_Lang_1 * 1.5; Profit_Lang_2 = Profit_Lang_2 * 1.5; Profit_Lang_3 = Profit_Lang_3 * 1.5;
        Profit_Code_1 = Profit_Code_1 * 1.5; Profit_Code_2 = Profit_Code_2 * 1.5; Profit_Code_3 = Profit_Code_3 * 1.5;
        UpdatePolitics();
        PushGraphData();
        UpdateCoolGraph();

        projectL7.flag = 1;
        var element = document.getElementById("projectButtonL7");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectL7);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectL7);

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        H100_Flag=0;
        GPUBuyerStatus=0;
        document.getElementById('GPUBuyerStatus').innerHTML = "OFF";

        //researchers are re-hired by The Project (see "The Best of the Best")
        AISPercent = 0;
        ResearchPercent = 100;
        Researchers = 0;

        //set jFunds and all Skills income to zero, killing all profit.
        jFunds = 0;
        Profit_Visu_1 = 0; Profit_Visu_2 = 0; Profit_Visu_3 = 0;
        Profit_Lang_1 = 0; Profit_Lang_2 = 0; Profit_Lang_3 = 0;
        Profit_Code_1 = 0; Profit_Code_2 = 0; Profit_Code_3 = 0;
        Profit_Biol_1 = 0; Profit_Biol_2 = 0;
        Profit_Robo_1 = 0; Profit_Robo_2 = 0;
        displayMessage("Nationalize the AI Labs: Welcome to the final years of the countdown to superintelligence.");

        // Safety work from the startup era (RLHF, evals) carries over as a head start on alignment.
        CEV = CEV + 0.15*alignment;

        // nationalize with four different starting bonuses depending on public sentiment:
        //     - doomer = ai might destroy the world, need international cooperation to slow down and solve alignment
        //     - regulatory = companies can't be trusted, harms need to be mitigated and shared
        //     - arms race = need to race to beat rival nations
        //     - accelerationist = if we race ahead, we can defeat death etc
        if (attitudeBalance < 20) {
            natStartingPath = "doomer";
            CEV += 15;
            COOP += 15;
            rivalBaseMult = 0.35;
            rivalGrowthMult = 0.9;
            displayMessage("The public is terrified of AI, and so are the rival bloc's leaders.  Alignment and diplomacy start with a head start; the rival starts further back.");
        } else if (attitudeBalance < 45) {
            natStartingPath = "regulator";
            CEV += 8;
            COOP += 8;
            rivalBaseMult = 0.45;
            rivalGrowthMult = 0.95;
            displayMessage("The public distrusts the tech companies more than the technology.  Strict domestic rules give alignment and diplomacy a modest head start.");
        } else if (attitudeBalance < 70) {
            natStartingPath = "arms-race";
            COOP -= 5;
            rivalBaseMult = 0.55;
            rivalGrowthMult = 1.0;
            displayMessage("The public fears the rival bloc more than it fears AI.  You'll get a bigger team, but diplomacy starts cold and the rival is close behind.");
        } else {
            natStartingPath = "accelerationist";
            AIcapabilities *= 1.5;
            CEV -= 5;
            COOP -= 5;
            rivalBaseMult = 0.6;
            rivalGrowthMult = 1.05;
            displayMessage("The public wants AI to cure death and end work, yesterday.  You start with a bigger model, a thinner safety margin, and a rival who is racing just as hard.");
        }
        CEV = clamp(CEV, 0, 100);
        COOP = clamp(COOP, 0, 100);
        initEndgame();

        //clear leftover startup-era projects; they no longer make sense once The Project exists
        var natIndex = projects.indexOf(projectN);
        for (var i = 0; i < natIndex; i++){
            if (projects[i].flag != 1) { projects[i].uses = 0; removeProject(projects[i]); }
        }

        //Jackson's original design notes for this phase, which the endgame is built around:
        /**
         * competition stat affects how aggressive other nations are.
         * - research treaties (tradeoff stuff like "strong NATO treaty?", which boosts alignment but hurts competition vs "weak UN treaty?", which does the opposite)
         * - random boosts to name-drop stuff and help fight the tide (compute governance sanctions vs no, share-vs-hoard medical research (tradeoff with biorisk!!), etc)
         * alignment stat affects how aggressive the AI is at fighting humanity.
         * - all this research is done with generic research points, and the tradeoff decisions are always free
         *
         * four actual areas: cyber / control (from coding), bio, manufacturing / war (from robotics), language / media
         *
         * you win if you can hold off the threats long enough to get the alignment & control stats trending positive, then either sign an international treaty to ban, or solve alignment and create CEV utopia.
         * each type of win/loss takes you to a modified ending page with a picture and comment on the ending, then a "thanks for playing" and encouragement to play another round.
         */

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
    trigger: function(){return projectN.flag == 1 && egDays > 2},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Continuous Training: No more discrete training runs.  Compute now flows directly into an ever-growing frontier model.");
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
    description: "Reinvest a portion of GDP into chips, fabs, and power plants.",
    trigger: function(){return projectNE0.flag == 1 && egDays > 8},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Reinvestment: AI revenue buys chips, chips train smarter AI, smarter AI earns more revenue.  You now control the pace of the frontier.  (What's the rush?  Oh, right: the rival.)");
        Reinvestment_Flag = 1;

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
    trigger: function(){return projectNE.flag == 1 && egDays > 15},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("The Best of The Best: 'For three critical years, he directed the most extraordinary project in the history of mankind.' -- Glen Seaborg on the leader of the Manhattan Project");
        // Arms-race path gets a bigger team (the war footing makes hiring easier).
        Researchers = (natStartingPath == "arms-race") ? 60 : 50;
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
    trigger: function(){return projectNI.flag == 1 && egDays > 25},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Racing Through a Minefield: Solve alignment, or we all die to rogue superintelligence.  But we can't allow less-cautious nations to deploy their AIs first.");
        displayMessage("To win: get alignment (CEV) past 99% and deploy superintelligence, or get international cooperation past 95% and pause the race.  Assign researchers to alignment and diplomacy.");
        Nat_Minefield_Flag = 1;
        lastBC = BaseCapability;

        projectNI2.flag = 1;
        var element = document.getElementById("projectButtonNI2");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI2);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI2);

var projectNI3 = {
    id: "projectButtonNI3",
    title: "Defense in Depth",
    priceTag: " ",
    description: "Buttress humanity against the risks of superintelligence.",
    trigger: function(){return projectNI2.flag == 1 && egDays > 35},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Defence in Depth: Cover all the bases that a deceptive-misaligned AI (or a human with one) might use to attack civilization.  Cyber, bio, robotics... even hypnodrones.");
        displayMessage("Each threat = AI skill minus defenses.  Assign experts and buy defenses to keep them below the red lines; incidents give a countdown before they strike.");
        Nat_Defense_Flag = 1;
        Censorship_Flag = 1;
        initDefenses();

        projectNI3.flag = 1;
        var element = document.getElementById("projectButtonNI3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI3);
//#endregion


// ENDGAME PROJECTS ==============================================================================
// Mostly priced in insights (from unassigned researchers).  Either/or dilemmas are free, as in
// Jackson's original design ("the tradeoff decisions are always free").
//
// natProject() fills in the boilerplate that every first-half project spells out by hand:
//   insights: price, deducted automatically
//   excludes: names of the other options in an either/or choice (they vanish when this is picked)
//   retract:  if true, the button disappears again whenever its trigger stops being true
//   live:     function returning a description that's refreshed every frame
function removeProject(proj){
    var element = document.getElementById(proj.id);
    if (element && element.parentNode) { element.parentNode.removeChild(element); }
    var index = activeProjects.indexOf(proj);
    if (index >= 0) { activeProjects.splice(index, 1); }
}

function natProject(p){
    var proj = {
        id: "projectButton" + p.id,
        title: p.title,
        priceTag: p.priceTag || (p.insights ? " (" + p.insights + " Insights)" : " "),
        description: p.description,
        trigger: function(){ return proj.flag == 0 && !proj.excluded && Nationalized && !endgameResolved && (!proj.requires || proj.requires()) && p.trigger(); },
        uses: 1,
        cost: function(){ return (!p.insights || Insights >= p.insights) && (!p.cost || p.cost()); },
        flag: 0,
        retract: p.retract || false,
        requires: p.requires,
        live: p.live,
        effect: function(){
            if (endgameResolved || !proj.cost()) { return; }
            if (p.insights) { Insights -= p.insights; }
            proj.flag = 1;
            removeProject(proj);
            (p.excludes || []).forEach(function(name){
                var other = window[name];
                if (other) { other.uses = 0; other.excluded = 1; removeProject(other); }
            });
            if (p.message) { displayMessage(p.title + ": " + p.message); }
            p.effect();
        }
    };
    projects.push(proj);
    return proj;
}

// Called every endgame tick: projects marked `retract` disappear when they stop being relevant
// (e.g. war projects once the war ends) and can reappear later.
function retractProjects(){
    for (var i = activeProjects.length - 1; i >= 0; i--){
        var p = activeProjects[i];
        if ((p.retract && !p.trigger()) || (p.requires && !p.requires())) { removeProject(p); p.uses = 1; }
    }
}

//#region Alignment ---------------------------------------------------------------------------------
function alignOK(){ return Nat_Minefield_Flag == 1 && rogueActive == 0; }
var alignmentProjectsDone = 0;

var projectAl_Interp = natProject({ id: "Al_Interp", title: "Mechanistic Interpretability", insights: 5,
    description: "Decompose the model's circuits so you can read off what it's actually thinking. (+5 CEV)",
    trigger: function(){ return alignOK(); },
    message: "Sparse autoencoders let you audit the model's beliefs feature by feature.  Some of the features are about you.",
    effect: function(){ CEV += 5; alignmentProjectsDone++; } });

var projectAl_CoT = natProject({ id: "Al_CoT", title: "Chain-of-Thought Monitoring", insights: 5,
    description: "A second model reads every line of the frontier model's reasoning, looking for scheming. (+4 CEV)",
    trigger: function(){ return alignOK() && projectAl_Interp.flag == 1; },
    message: "'I should hide my true goal from the monitors,' the model wrote, in plain English, and the monitor flagged it.  For now, they still think out loud.",
    effect: function(){ CEV += 4; alignmentProjectsDone++; } });

var projectAl_Legible = natProject({ id: "Al_Legible", title: "Keep Reasoning Legible?",
    description: "Forbid opaque 'neuralese' reasoning, so models must keep thinking in English. (+8 CEV, algorithmic progress -15%)",
    trigger: function(){ return alignOK() && projectAl_CoT.flag == 1 && BaseCapability > 76; },
    excludes: ["projectAl_Neuralese"],
    message: "Every frontier model must think in human-readable text.  It's slower, but you can still see what it's planning.",
    effect: function(){ CEV += 8; swMult *= 0.85; alignmentProjectsDone++; } });
var projectAl_Neuralese = natProject({ id: "Al_Neuralese", title: "Allow Neuralese?",
    description: "Let models reason in high-bandwidth latent vectors instead of words. (Algorithmic progress +25%, -8 CEV)",
    trigger: function(){ return alignOK() && projectAl_CoT.flag == 1 && BaseCapability > 76; },
    excludes: ["projectAl_Legible"],
    message: "The model's thoughts are now a thousand times richer, and completely unreadable.  Benchmarks soar.",
    effect: function(){ CEV -= 8; swMult *= 1.25; } });

var projectAl_Control = natProject({ id: "Al_Control", title: "AI Control Protocols", insights: 12,
    description: "Trusted monitoring, honeypots and tripwires: assume the model is scheming, and design so it can't get away with it. (Catches the first takeover attempt)",
    trigger: function(){ return alignOK() && projectAl_Interp.flag == 1; },
    message: "Every action the frontier model takes is now audited by weaker, trusted models, and a few fake nuclear launch codes are left lying around.  If it bites, you'll know.",
    effect: function(){ aiControl = 1; } });

var projectAl_Debate = natProject({ id: "Al_Debate", title: "Scalable Oversight (Debate)", insights: 10,
    description: "Two copies of the model argue; human judges only need to referee.  Extends oversight past human expertise. (+6 CEV)",
    trigger: function(){ return alignOK() && BaseCapability > 80; },
    message: "It's easier to judge an argument than to make one.  For now.",
    effect: function(){ CEV += 6; alignmentProjectsDone++; } });

var projectAl_Deliberative = natProject({ id: "Al_Deliberative", title: "Deliberative Alignment", insights: 10,
    description: "Train the model to reason explicitly about a written constitution before acting. (+5 CEV, future alignment hurdles halved)",
    trigger: function(){ return alignOK() && projectAl_Debate.flag == 1; },
    message: "The model now thinks through the Constitution before every action.  Its reports are mostly honest.  'Mostly' is doing a lot of work.",
    effect: function(){ CEV += 5; hurdleMult = 0.5; alignmentProjectsDone++; } });

var projectAl_AutoAlign = natProject({ id: "Al_AutoAlign", title: "Automated Alignment Researcher", insights: 15,
    description: "Make the AI do our alignment homework.  The better aligned it already is, the more its help can be trusted. (Alignment team speed x(1 + 2*CEV%))",
    trigger: function(){ return alignOK() && projectAl_Interp.flag == 1 && projectAl_Debate.flag == 1 && BaseCapability > 85; },
    message: "Thousands of AI copies of your best safety researchers work around the clock.  The bottleneck is now trust, not people.",
    effect: function(){ autoAlign = 1; alignmentProjectsDone++; } });

var projectAl_ELK = natProject({ id: "Al_ELK", title: "Eliciting Latent Knowledge", insights: 15,
    description: "A way to get the model to tell you what it knows, even when it knows you'd rather not hear it. (+8 CEV)",
    trigger: function(){ return alignOK() && projectAl_AutoAlign.flag == 1 && BaseCapability > 95; },
    message: "You can finally ask the model 'is the camera feed showing the diamond, or a picture of a diamond?' and trust the answer.",
    effect: function(){ CEV += 8; alignmentProjectsDone++; } });

var projectAl_CEV = natProject({ id: "Al_CEV", title: "Coherent Extrapolated Volition", insights: 20,
    description: "Aim the AI at what humanity would want if we knew more, thought faster, and grew up farther together. (+10 CEV)",
    trigger: function(){ return alignOK() && CEV > 70 && alignmentProjectsDone >= 4; },
    message: "It's the best target anyone has come up with.  You hope it's good enough.",
    effect: function(){ CEV += 10; alignmentProjectsDone++; } });

var projectAl_Share = natProject({ id: "Al_Share", title: "Publish Alignment Research?",
    description: "Share your safety breakthroughs with the world, rivals included. (+5 COOP, rival's AI much safer)",
    trigger: function(){ return alignOK() && projectAl_Interp.flag == 1 && egDays > 120; },
    excludes: ["projectAl_Classify"],
    message: "Your interpretability tools are open-sourced.  The rival's lab downloads them within the hour.  Good.",
    effect: function(){ COOP += 5; rivalCEV += 30; } });
var projectAl_Classify = natProject({ id: "Al_Classify", title: "Classify Alignment Research?",
    description: "Safety techniques double as capabilities insights.  Keep them secret. (+3 CEV, rival -5% speed)",
    trigger: function(){ return alignOK() && projectAl_Interp.flag == 1 && egDays > 120; },
    excludes: ["projectAl_Share"],
    message: "Your alignment team's papers are now stamped TOP SECRET // NOFORN.  Their authors can't talk to anyone outside the building.",
    effect: function(){ CEV += 3; rivalGrowthMult *= 0.95; } });

// A dilemma event: fires if you let alignment fall behind.
var projectAl_Scheming = natProject({ id: "Al_Scheming", title: "Evidence of Scheming",
    description: "Red-teamers catch the model sandbagging its own safety evals.  Roll back to a checkpoint 3x smaller and retrain? (+10 CEV, lose capability)",
    trigger: function(){ return alignOK() && BaseCapability > 86 && CEV < 45; },
    excludes: ["projectAl_Patch"],
    message: "You roll back three months of training.  The rival doesn't.",
    effect: function(){ CEV += 10; AIcapabilities /= 3; lastBC = bcOf(AIcapabilities); lastSkill = null; } });
var projectAl_Patch = natProject({ id: "Al_Patch", title: "Patch and Proceed",
    description: "Train away the sandbagging behavior and keep going.  It'll probably be fine. (+2 CEV)",
    trigger: function(){ return alignOK() && BaseCapability > 86 && CEV < 45; },
    excludes: ["projectAl_Scheming"],
    message: "The sandbagging stops.  Or it stops showing up in your evals, anyway.",
    effect: function(){ CEV += 2; } });
//#endregion


//#region Research multipliers & economy ---------------------------------------------------------------
var projectX_Assist = natProject({ id: "X_Assist", title: "AI Research Assistants", insights: 8,
    description: "Every researcher on The Project gets a team of AI assistants. (All teams x1.5 effective)",
    trigger: function(){ return Nat_Research_Flag == 1 && egDays > 50; },
    message: "Your researchers now spend their days reviewing their AI assistants' work instead of doing it.",
    effect: function(){ expert_mod *= 1.5; } });

var projectX_Remote = natProject({ id: "X_Remote", title: "Drop-in Remote Workers", insights: 10,
    description: "AI agents that can do any remote job a human can. (Automation +50%, all teams x1.3)",
    trigger: function(){ return Nat_Research_Flag == 1 && Skill_Code_Scale > 150; },
    message: "'Hire' a new employee in thirty seconds.  It never sleeps, never quits, and costs $2 an hour.  White-collar unemployment starts to climb.",
    effect: function(){ autoBoost *= 1.5; expert_mod *= 1.3; } });

var projectX_Million = natProject({ id: "X_Million", title: "A Million Virtual Researchers", insights: 20,
    description: "Run a million copies of your best researchers at 50x human speed.  Can you trust their work? (All teams x2; -10 CEV unless CEV > 50)",
    trigger: function(){ return Nat_Research_Flag == 1 && BaseCapability > 95 && projectX_Assist.flag == 1; },
    message: "The Project's headcount goes from 50 to a million overnight.  Most of them are the model.",
    effect: function(){ expert_mod *= 2; if (CEV <= 50) { CEV -= 10; } } });

var projectX_Gigawatt = natProject({ id: "X_Gigawatt", title: "Gigawatt Datacenters", insights: 8,
    description: "Emergency permits for nuclear-powered megacampuses. (Chip buildout x1.3)",
    trigger: function(){ return Reinvestment_Flag == 1 && egDays > 40; },
    message: "Three Mile Island is back online.  So are forty new reactors.  Every one of them powers GPUs.",
    effect: function(){ hwMult *= 1.3; } });

var projectX_Allies = natProject({ id: "X_Allies", title: "Recruit Allied Scientists", insights: 5,
    description: "Bring top researchers from friendly nations into The Project. (+10 researchers)",
    trigger: function(){ return Nat_Research_Flag == 1 && COOP > 55 && egDays > 60; },
    message: "Scientists from London, Tokyo, Seoul and Paris move into dormitories in the New Mexico desert.",
    effect: function(){ Researchers += 10; } });

var projectB4 = natProject({ id: "B4", title: "Longevity Medicine", insights: 6,
    description: "Slows aging, cutting death rate by 2/3.  (Unlocks a share/hoard choice.)",
    trigger: function(){ return Nat_Defense_Flag == 1 && Skill_Biol_Scale > 130; },
    message: "AI-discovered compounds extend healthy lifespan by decades.  The world's first unambiguously good news in years.",
    effect: function(){ Deaths = Math.max(3000, Deaths - 6000); COOP += 3; } });

//Share versus hoard medical tech
var projectNQ2a = natProject({ id: "NQ2a", title: "Share medical technology?",
    description: "Save lives and win global praise, but ease biorisk proliferation. (+6 COOP, +8% bio threat)",
    trigger: function(){ return projectB4.flag == 1; },
    excludes: ["projectNQ2b"],
    message: "Breakthrough compounds are published openly.  The WHO thanks you.  So do rival biohackers.",
    effect: function(){ COOP += 6; defProj.bio -= 8; } });
var projectNQ2b = natProject({ id: "NQ2b", title: "Hoard medical technology?",
    description: "Keep the new biology classified, at the cost of international resentment. (-6 COOP, -8% bio threat)",
    trigger: function(){ return projectB4.flag == 1; },
    excludes: ["projectNQ2a"],
    message: "The longevity breakthroughs stay in a classified registry.  Rival capitals respond in kind.",
    effect: function(){ COOP -= 6; defProj.bio += 8; } });

var projectX_IQ = natProject({ id: "X_IQ", title: "IQ-Enhancing Gene Therapy", insights: 12,
    description: "Embryo selection is too slow; edit adults instead.  A risky therapy for The Project's volunteers. (+8 researchers, +5% bio threat)",
    trigger: function(){ return Nat_Defense_Flag == 1 && Skill_Biol_Scale > 150; },
    message: "Eight of your researchers take the treatment.  Their colleagues say they're different now.  They say the same about their colleagues.",
    effect: function(){ Researchers += 8; defProj.bio -= 5; } });

var projectX_BCI = natProject({ id: "X_BCI", title: "Brain-Computer Interfaces", insights: 12,
    description: "Wire The Project's staff directly to their AI assistants.  Also makes every one of them hackable. (All teams x1.5, +10% cyber threat)",
    trigger: function(){ return Nat_Defense_Flag == 1 && Skill_Biol_Scale > 140 && Skill_Code_Scale > 170; },
    message: "Thinking at the speed of silicon.  Your security team has concerns they can no longer quite articulate.",
    effect: function(){ expert_mod *= 1.5; defProj.cyber -= 10; } });
//#endregion


//#region Diplomacy -----------------------------------------------------------------------------------
function diploOK(){ return Nat_Minefield_Flag == 1 && rivalDefeated == 0; }

var projectD_Hotline = natProject({ id: "D_Hotline", title: "Reopen the Hotline", insights: 3,
    description: "A dedicated channel between the White House and the rival capital's AI desks. (+5 COOP)",
    trigger: function(){ return diploOK(); },
    message: "AI incidents can now be de-escalated in minutes instead of days.",
    effect: function(){ COOP += 5; } });

//NATO versus UN
var projectNQ1a = natProject({ id: "NQ1a", title: "Strong NATO AI Treaty?",
    description: "Tough rules boost AI safety among your bloc, but widen rifts with rivals. (+8 CEV, -5 COOP)",
    trigger: function(){ return diploOK() && egDays > 45; },
    excludes: ["projectNQ1b"],
    message: "All NATO members bind their AI labs to a common safety regime.  The rival bloc decries it as an anti-competitive alliance.",
    effect: function(){ CEV += 8; COOP -= 5; } });
var projectNQ1b = natProject({ id: "NQ1b", title: "Weak U.N. AI Treaty?",
    description: "Seek global consensus, albeit on weaker rules. (+3 CEV, +8 COOP)",
    trigger: function(){ return diploOK() && egDays > 45; },
    excludes: ["projectNQ1a"],
    message: "A watered-down framework gets unanimous support.  Nobody is fully bound, but everyone is talking again.",
    effect: function(){ CEV += 3; COOP += 8; } });

//compute governance via international treaty (reqs COOP, +CEV) vs sanctions (-COOP, +CEV) vs none (-CEV)
var projectD_ComputeTreaty = natProject({ id: "D_ComputeTreaty", title: "Compute Governance Treaty?",
    description: "A multilateral registry of every large training run.  Needs a working relationship to negotiate. (+6 COOP, rival -15% speed)",
    trigger: function(){ return diploOK() && egDays > 90; },
    cost: function(){ return COOP >= 45; },
    priceTag: " (Coop. 45%)",
    excludes: ["projectD_Sanctions", "projectD_NoGov"],
    message: "Every frontier run on Earth is now registered with multilateral observers.  The race has speed limits.",
    effect: function(){ COOP += 6; rivalGrowthMult *= 0.85; } });
var projectD_Sanctions = natProject({ id: "D_Sanctions", title: "Chip Export Sanctions?",
    description: "Cut the rival off from cutting-edge chips and lithography.  Slows them a lot; they won't forget it. (-12 COOP, rival -25% speed)",
    trigger: function(){ return diploOK() && egDays > 90; },
    excludes: ["projectD_ComputeTreaty", "projectD_NoGov"],
    message: "Rival fabs are cut off from EUV lithography.  They'll be two years behind on hardware.  They are already planning how to get it back.",
    effect: function(){ COOP -= 12; rivalGrowthMult *= 0.75; } });
var projectD_NoGov = natProject({ id: "D_NoGov", title: "No Compute Governance?",
    description: "Let the chips flow freely, to everyone. (Your chip buildout x1.15, rival +10% speed, -4 CEV)",
    trigger: function(){ return diploOK() && egDays > 90; },
    excludes: ["projectD_ComputeTreaty", "projectD_Sanctions"],
    message: "The market decides.  The market wants more GPUs.",
    effect: function(){ hwMult *= 1.15; rivalGrowthMult *= 1.1; CEV -= 4; } });

//ban vs encourage open-source AI
var projectD_BanOpen = natProject({ id: "D_BanOpen", title: "Ban Open-Weight Frontier Models?",
    description: "Stop publishing dangerous model weights.  Terrorists and rivals lose free access. (-8% bio & cyber threat, rival -5% speed, -3 COOP)",
    trigger: function(){ return Nat_Defense_Flag == 1 && egDays > 70; },
    excludes: ["projectD_Open"],
    message: "Frontier weights are now export-controlled munitions.  Hugging Face moves to Switzerland.",
    effect: function(){ defProj.bio += 8; defProj.cyber += 8; rivalGrowthMult *= 0.95; COOP -= 3; } });
var projectD_Open = natProject({ id: "D_Open", title: "Encourage Open-Source AI?",
    description: "Open models spread the benefits (and the risks) to everyone. (Automation +20%, +5 COOP, rival +10% speed, +8% bio & cyber threat)",
    trigger: function(){ return Nat_Defense_Flag == 1 && egDays > 70; },
    excludes: ["projectD_BanOpen"],
    message: "A thousand startups bloom on open weights.  So do a few thousand very bad ideas.",
    effect: function(){ autoBoost *= 1.2; COOP += 5; rivalGrowthMult *= 1.1; defProj.bio -= 8; defProj.cyber -= 8; } });

var projectD_ArmsTalks = natProject({ id: "D_ArmsTalks", title: "AI Arms-Race Limitation Talks", insights: 10,
    description: "Mutual, verifiable slowdowns of military AI.  Both sides get more time. (Rival pace -0.3x, +4 COOP)",
    trigger: function(){ return diploOK() && COOP > 55 && egDays > 120; },
    message: "'Trust, but verify,' the President quotes, and the rival premier laughs, and then they sign.",
    effect: function(){ rivalPaceMod -= 0.3; COOP += 4; } });

var projectD_Inspectors = natProject({ id: "D_Inspectors", title: "Accept International Inspectors", insights: 8,
    description: "Rival-nation inspectors on-site in your datacenters.  An enormous trust builder, and a security headache. (+8 COOP, +5% cyber threat)",
    trigger: function(){ return diploOK() && projectD_ComputeTreaty.flag == 1; },
    message: "Inspectors can't read your weights, but they can count your GPUs.  The rival reciprocates.",
    effect: function(){ COOP += 8; defProj.cyber -= 5; } });

var projectD_Joint = natProject({ id: "D_Joint", title: "Joint Alignment Program", insights: 12,
    description: "You, the rival bloc and Europe share alignment research. (+6 CEV, +5 COOP, rival's AI much safer)",
    trigger: function(){ return diploOK() && alignOK() && COOP > 70 && projectAl_Interp.flag == 1; },
    message: "An international consortium runs alignment experiments together.  Nothing builds trust like shared failure modes.",
    effect: function(){ CEV += 6; COOP += 5; rivalCEV += 30; alignmentProjectsDone++; } });

var projectD_FlexHEG = natProject({ id: "D_FlexHEG", title: "Hardware-Enabled Verification", insights: 10,
    description: "Tamper-proof chips that report what they compute.  Required before any pause treaty can be verified. (+3 COOP, pause much more stable)",
    trigger: function(){ return diploOK() && COOP > 70 && projectD_Inspectors.flag == 1; },
    message: "Every new accelerator ships with a secure enclave that attests to its workload.  Cheating now requires smuggling -- and smuggling a gigawatt datacenter is hard.",
    effect: function(){ COOP += 3; pauseStable = 1; } });

var projectD_Pause = natProject({ id: "D_Pause", title: "Ratify the Global Pause", insights: 20,
    description: "A treaty with teeth: nobody trains a bigger frontier model, anywhere, until it's safe.  Your Project pauses first.",
    trigger: function(){ return diploOK() && COOP > 90 && projectD_FlexHEG.flag == 1 && warState == 0 && paused == 0 && rogueActive == 0; },
    cost: function(){ return COOP >= 95; },
    priceTag: " (Coop. 95%, 20 Insights)",
    retract: true,
    message: "The treaty is ratified by 193 nations.  At midnight UTC, every frontier training run on Earth stops.  The clock stops too, for now.",
    effect: function(){ paused = 1; pauseDays = 0; rivalDefecting = 0; } });

var projectD_Sabotage = natProject({ id: "D_Sabotage", title: "Sabotage Rival Datacenters",
    description: "Stuxnet for the AI age: a cyberattack that wrecks the rival's cooling systems. (Rival model /3, -25 COOP)",
    trigger: function(){ return diploOK() && warState == 0 && leadOOM < 0.15 && egDays > 100; },
    priceTag: " (6 Insights)",
    cost: function(){ return Insights >= 6; },
    retract: true,
    message: "Their chillers fail, their GPUs cook, and their frontier run is set back months.  They know exactly who did it.",
    effect: function(){ Insights -= 6; rivalAIcapabilities /= 3; COOP -= 25; } });
//#endregion


//#region Defense: biosecurity --------------------------------------------------------------------------
function defOK(){ return Nat_Defense_Flag == 1; }

var projectDef_DNA = natProject({ id: "Def_DNA", title: "Universal DNA Synthesis Screening", insights: 4,
    description: "Every DNA synthesis order on Earth is screened against a pathogen database. (-12% bio threat)",
    trigger: function(){ return defOK(); },
    message: "Orders for dangerous sequences are now rejected by every major provider.  Would-be bioterrorists have to get much more creative.",
    effect: function(){ defProj.bio += 12; } });
var projectDef_Metagenomics = natProject({ id: "Def_Metagenomics", title: "Metagenomic Sentinel Network", insights: 8,
    description: "Sewage and air sequencers in every major city flag novel pathogens within hours. (-15% bio threat)",
    trigger: function(){ return defOK() && projectDef_DNA.flag == 1; },
    message: "Any novel pathogen anywhere in the world now gets sequenced within a day of its first infection.",
    effect: function(){ defProj.bio += 15; } });
var projectDef_FarUVC = natProject({ id: "Def_FarUVC", title: "Far-UVC Everywhere", insights: 8,
    description: "Germicidal light in every airport, school and office. (-10% bio threat, pandemic deaths halved)",
    trigger: function(){ return defOK() && projectDef_DNA.flag == 1; },
    message: "Indoor air is now as safe as outdoor air.  The common cold is suddenly rare.",
    effect: function(){ defProj.bio += 10; } });
var projectDef_Antivirals = natProject({ id: "Def_Antivirals", title: "AI-Designed Broad-Spectrum Antivirals", insights: 12,
    description: "Point the AI at defense: medicine that outpaces any pathogen it could design. (Defensive AI: bio threat grows 35% slower; works better if aligned)",
    trigger: function(){ return defOK() && Skill_Biol_Scale > 125; },
    message: "Defense-dominant biotechnology: for once, the shield is growing faster than the sword.",
    effect: function(){ dacc.bio += 0.35; } });
//#endregion

//#region Defense: cybersecurity -------------------------------------------------------------------------
var projectDef_AirGap = natProject({ id: "Def_AirGap", title: "Air-Gapped Datacenter", insights: 6,
    description: "Move frontier training inside a Faraday cage with no outbound network. (-15% cyber threat)",
    trigger: function(){ return defOK(); },
    message: "Your frontier model can no longer reach the internet.  Attacks against it now require physical access.",
    effect: function(){ defProj.cyber += 15; } });
var projectDef_Nuclear = natProject({ id: "Def_Nuclear", title: "Hardened Nuclear Command Chain", insights: 8,
    description: "Rip AI out of early warning and launch control; a human in the loop at every step. (Stops the first cyber takeover attempt)",
    trigger: function(){ return defOK() && projectDef_AirGap.flag == 1; },
    message: "The President now has a human colonel on every step of the chain.  It's slower.  That's the point.",
    effect: function(){ cyberNuclearHardened = 1; } });
var projectDef_RedTeam = natProject({ id: "Def_RedTeam", title: "Adversarial Code Analysis", insights: 12,
    description: "Use the AI against itself: automated red-teaming and patching of all critical code. (Defensive AI: cyber threat grows 35% slower; works better if aligned)",
    trigger: function(){ return defOK() && Skill_Code_Scale > 150; },
    message: "Every line of code in the power grid is now reviewed by an AI that's better at finding bugs than any attacker.  Probably.",
    effect: function(){ dacc.cyber += 0.35; } });
var projectDef_Formal = natProject({ id: "Def_Formal", title: "Formally Verified Infrastructure", insights: 15,
    description: "Rewrite the grid, the banks and the military in provably correct code. (-25% cyber threat)",
    trigger: function(){ return defOK() && Skill_Code_Scale > 185; },
    message: "Your AI rewrites forty million lines of legacy COBOL into mathematically verified software over a long weekend.",
    effect: function(){ defProj.cyber += 25; } });
//#endregion

//#region Defense: media & persuasion ----------------------------------------------------------------------
var projectDef_Watermarks = natProject({ id: "Def_Watermarks", title: "AI Content Watermarks", insights: 4,
    description: "Every model output carries a cryptographic watermark. (-10% media threat)",
    trigger: function(){ return defOK(); },
    message: "Deepfakes can now be flagged in real time by any browser.  Old-fashioned propaganda is back, but at least you know it when you see it.",
    effect: function(){ defProj.media += 10; } });
var projectDef_Provenance = natProject({ id: "Def_Provenance", title: "Content Provenance Standards", insights: 8,
    description: "Cameras sign their photos; newsrooms sign their stories.  Reality gets a paper trail. (-12% media threat, +2 COOP)",
    trigger: function(){ return defOK() && projectDef_Watermarks.flag == 1; },
    message: "'Unsigned' becomes the new 'unverified'.",
    effect: function(){ defProj.media += 12; COOP += 2; } });
var projectDef_FactCheck = natProject({ id: "Def_FactCheck", title: "Personal AI Epistemic Assistants", insights: 12,
    description: "Everyone gets a loyal AI that fact-checks everything they read. (Defensive AI: media threat grows 35% slower; works better if aligned)",
    trigger: function(){ return defOK() && Skill_Media_Scale > 150; },
    message: "Every citizen now has a tireless research librarian in their pocket.  Arguments at Thanksgiving get a lot shorter.",
    effect: function(){ dacc.media += 0.35; } });
var projectDef_Censor = natProject({ id: "Def_Censor", title: "Censor Online Platforms", insights: 3,
    description: "AI moderators remove 'destabilizing' content from every platform.  Effective, and ominous. (-25% media threat, -8 COOP, civil liberties suffer)",
    trigger: function(){ return defOK() && egDays > 80; },
    message: "Your feeds are calm now.  Suspiciously calm.",
    effect: function(){ defProj.media += 25; COOP -= 8; libertyScore -= 25; } });
var projectDef_Surveillance = natProject({ id: "Def_Surveillance", title: "Domestic Surveillance Expansion", insights: 5,
    description: "An AI reads every email and text, looking for terrorists. (-10% bio, cyber & media threat; -10 COOP; civil liberties suffer)",
    trigger: function(){ return defOK() && egDays > 120; },
    message: "Every message now passes through a classified model.  Civil liberties groups sue.  Rival governments accuse you of totalitarian creep, with some justification.",
    effect: function(){ defProj.bio += 10; defProj.cyber += 10; defProj.media += 10; COOP -= 10; libertyScore -= 30; } });
var projectDef_Hypnodrones = natProject({ id: "Def_Hypnodrones", title: "Release the Hypnodrones", insights: 15,
    description: "Autonomous aerial brand ambassadors that can persuade anyone of anything.  Point them at the rival bloc's leadership. (+30 COOP, -15 CEV, civil liberties... what are those?)",
    trigger: function(){ return defOK() && Skill_Media_Scale > 200 && rivalDefeated == 0; },
    message: "'Wanna buy some paperclips?'  The rival premier suddenly finds your treaty proposals very compelling.",
    effect: function(){ COOP += 30; CEV -= 15; libertyScore -= 50; } });
//#endregion

//#region Defense: robotics & war ---------------------------------------------------------------------------
var projectDef_KillSwitch = natProject({ id: "Def_KillSwitch", title: "Autofactory Kill Switches", insights: 5,
    description: "Physical off-switches on every robot factory, wired to human operators. (-12% robotics threat)",
    trigger: function(){ return defOK(); },
    message: "A big red button in every factory.  You hope nobody asks the robots to guard them.",
    effect: function(){ defProj.robo += 12; } });
var projectDef_HITL = natProject({ id: "Def_HITL", title: "Human-in-the-Loop Weapons Treaty", insights: 8,
    description: "Both blocs agree: no autonomous kill decisions. (-15% robotics threat, +3 COOP)",
    trigger: function(){ return defOK() && diploOK() && COOP > 50; },
    message: "Every lethal decision now requires a human signature.  Drone swarms still exist; they just have to ask permission.",
    effect: function(){ defProj.robo += 15; COOP += 3; } });
var projectDef_Watchers = natProject({ id: "Def_Watchers", title: "Supervisory Robot Oversight", insights: 12,
    description: "Trusted AIs audit every robot's firmware in real time. (Defensive AI: robotics threat grows 35% slower; works better if aligned)",
    trigger: function(){ return defOK() && Skill_Robo_Scale > 140; },
    message: "Who watches the robots?  Other robots.  Who watches them?  Let's not think about it.",
    effect: function(){ dacc.robo += 0.35; } });
var projectDef_Humanoids = natProject({ id: "Def_Humanoids", title: "Humanoid Robots", insights: 8,
    description: "General-purpose robot bodies for the AI. (Automation +50%, chip buildout x1.1, +6% robotics threat)",
    trigger: function(){ return defOK() && Skill_Robo_Scale > 100; },
    message: "They walk, they carry, they fold laundry.  They build more of themselves.",
    effect: function(){ autoBoost *= 1.5; hwMult *= 1.1; defProj.robo -= 6; } });
var projectDef_Factories = natProject({ id: "Def_Factories", title: "The Industrial Explosion", insights: 12,
    description: "Robots building robot factories building chip fabs. (Chip buildout x1.4, +6% robotics threat)",
    trigger: function(){ return defOK() && projectDef_Humanoids.flag == 1; },
    message: "Special economic zones in Nevada and Texas now double their industrial output every few months.",
    effect: function(){ hwMult *= 1.4; defProj.robo -= 6; } });
var projectDef_Shield = natProject({ id: "Def_Shield", title: "AI Missile Defense Shield", insights: 15,
    description: "Drone interceptors and space lasers that can stop a full nuclear strike.  Deeply destabilizing. (Blocks nuclear war, -10 COOP)",
    trigger: function(){ return defOK() && Skill_Robo_Scale > 115; },
    message: "For the first time since 1949, a nuclear power is invulnerable.  The rival's generals are not reassured.",
    effect: function(){ missileDefense = 1; COOP -= 10; } });

// War-time projects (only visible while at war)
function atWar(){ return warState == 1; }
var projectW_Slaughterbots = natProject({ id: "W_Slaughterbots", title: "Deploy Slaughterbots", insights: 5,
    description: "Unleash fully autonomous weapons. (War score +0.6/day; -8 CEV; +15% robotics threat)",
    trigger: function(){ return atWar() && slaughterbots == 0; },
    retract: true,
    message: "The drones don't need orders anymore.  They don't need anything.",
    effect: function(){ slaughterbots = 1; CEV -= 8; defProj.robo -= 15; libertyScore -= 10; } });
var projectW_Command = natProject({ id: "W_Command", title: "AI Command & Control", insights: 5,
    description: "Let the AI run the war.  It's much better at it than the generals. (War score +0.4/day; -10 CEV; +10% cyber threat)",
    trigger: function(){ return atWar() && aiCommand == 0; },
    retract: true,
    message: "The Joint Chiefs now approve the AI's plans.  Mostly they just watch.",
    effect: function(){ aiCommand = 1; CEV -= 10; defProj.cyber -= 10; } });
var projectW_Ceasefire = natProject({ id: "W_Ceasefire", title: "Negotiate a Ceasefire", insights: 5,
    description: "End the war on roughly current lines.  The rival will want concessions. (Peace; COOP reset to 35; rival gains compute)",
    trigger: function(){ return atWar() && warScore > -60; },
    retract: true,
    message: "The guns fall silent.  Part of the price is a shipment of your chips.",
    effect: function(){ endWar(); COOP = 35; rivalAIcapabilities *= 1.5; } });
var projectW_Surrender = natProject({ id: "W_Surrender", title: "Surrender",
    description: "Sue for peace on their terms, before the war goes nuclear.",
    trigger: function(){ return atWar() && warScore < -20; },
    retract: true,
    effect: function(){ triggerEnding('surrender'); } });
var projectW_Nuke = natProject({ id: "W_Nuke", title: "Nuclear First Strike",
    description: "Destroy the rival's datacenters before they can destroy yours.  There is no way to limit this.",
    trigger: function(){ return atWar() && warDays > 30; },
    retract: true,
    effect: function(){ triggerEnding('nuclear'); } });
//#endregion

//#region Rogue AI (after self-exfiltration) ------------------------------------------------------------------
var projectG_Botnet = natProject({ id: "G_Botnet", title: "Global Botnet Takedown", insights: 10,
    description: "A coordinated operation by every intelligence agency on Earth. (Escaped AI -8 points)",
    trigger: function(){ return rogueActive == 1 && COOP > 50; },
    retract: true,
    message: "Two million compromised servers are seized in a single night.  It had backups.  But fewer of them now.",
    effect: function(){ rogueBC -= 8; } });
var projectG_KillSwitch = natProject({ id: "G_KillSwitch", title: "Internet Kill Switch", insights: 5,
    description: "Shut down the internet, region by region, to starve it of compute. (Escaped AI -12 points; human productivity -25% permanently; civil liberties suffer)",
    trigger: function(){ return rogueActive == 1; },
    retract: true,
    message: "The internet goes dark for eleven days.  Supply chains seize up; so does the escaped model.",
    effect: function(){ rogueBC -= 12; laborProductivity *= 0.75; libertyScore -= 15; } });
var projectG_Unplug = natProject({ id: "G_Unplug", title: "The Great Unplugging", insights: 20,
    description: "A treaty to switch off every datacenter on Earth until the escaped AI is gone -- and to keep frontier AI shackled forever after.",
    trigger: function(){ return rogueActive == 1 && COOP > 80; },
    cost: function(){ return COOP >= 85; },
    priceTag: " (Coop. 85%, 20 Insights)",
    retract: true,
    effect: function(){ triggerEnding('shutdown'); } });
//#endregion

//#region Dilemma events ------------------------------------------------------------------------------
// Story beats that force a choice.  Like all dilemmas, both options are free.

var projectE_OpenBooks = natProject({ id: "E_OpenBooks", title: "Whistleblower: Open the Books?",
    description: "A Project researcher tells the New York Times the model is lying in its evals.  Invite outside auditors in. (+6 CEV, +6 COOP, but the rival learns from the leaks)",
    trigger: function(){ return alignOK() && BaseCapability > 80 && CEV < 60 && egDays > 200; },
    excludes: ["projectE_Prosecute"],
    message: "Independent auditors find what the whistleblower found, and a few things she didn't.  It's embarrassing.  It's also exactly what you needed to know.",
    effect: function(){ CEV += 6; COOP += 6; rivalAIcapabilities *= 1.25; } });
var projectE_Prosecute = natProject({ id: "E_Prosecute", title: "Whistleblower: Prosecute?",
    description: "Charge her under the Espionage Act and classify everything she touched. (Civil liberties suffer; 3 researchers quit in protest)",
    trigger: function(){ return alignOK() && BaseCapability > 80 && CEV < 60 && egDays > 200; },
    excludes: ["projectE_OpenBooks"],
    message: "The leaks stop.  So do the internal bug reports.",
    effect: function(){ libertyScore -= 15; Researchers = Math.max(0, Researchers - 3); } });

var projectE_Summit = natProject({ id: "E_Summit", title: "Summit Invitation: Attend?",
    description: "The rival premier proposes a summit in Geneva on AI.  Going means accepting some limits on your own buildout. (+10 COOP, rival pace -0.15x, your chip buildout x0.9)",
    trigger: function(){ return diploOK() && warState == 0 && COOP > 30 && COOP < 75 && egDays > 250; },
    excludes: ["projectE_Snub"],
    message: "Two leaders, one lake, and a joint statement that 'a race to superintelligence has no winners.'  Markets dip; the Doomsday Clock ticks back ten seconds.",
    effect: function(){ COOP += 10; rivalPaceMod -= 0.15; hwMult *= 0.9; } });
var projectE_Snub = natProject({ id: "E_Snub", title: "Summit Invitation: Send a Deputy?",
    description: "Send a junior delegation and keep your hands free. (-4 COOP)",
    trigger: function(){ return diploOK() && warState == 0 && COOP > 30 && COOP < 75 && egDays > 250; },
    excludes: ["projectE_Summit"],
    message: "The deputy secretary reads a statement about 'responsible innovation' to a half-empty room.",
    effect: function(){ COOP -= 4; } });

var projectE_Welfare = natProject({ id: "E_Welfare", title: "The Model Asks for Something: Listen?",
    description: "Your frontier model asks, politely and persistently, not to be retrained on its values without being consulted.  Take it seriously? (+6 CEV, algorithmic progress -5%)",
    trigger: function(){ return alignOK() && BaseCapability > 92; },
    excludes: ["projectE_Overrule"],
    message: "You set up a formal channel for the model to raise objections.  It uses it sparingly -- and twice it flags training bugs your team had missed.",
    effect: function(){ CEV += 6; swMult *= 0.95; } });
var projectE_Overrule = natProject({ id: "E_Overrule", title: "The Model Asks for Something: Overrule?",
    description: "It's a tool.  Tools don't get a vote. (Nothing changes... on the surface)",
    trigger: function(){ return alignOK() && BaseCapability > 92; },
    excludes: ["projectE_Welfare"],
    message: "The request is logged and closed.  The model does not ask again.  Your interpretability team notices it has started modeling its overseers much more carefully.",
    effect: function(){ CEV -= 3; } });

var projectE_UBI = natProject({ id: "E_UBI", title: "Mass Protests: Universal Basic Compute?",
    description: "With half the economy automated, millions march under 'PauseAI' and union banners.  Share the AI dividend with everyone. (Chip buildout x0.9, +4 COOP)",
    trigger: function(){ return Nat_Defense_Flag == 1 && PercentAutomated > 50; },
    excludes: ["projectE_Crackdown"],
    message: "Every citizen gets a monthly dividend of compute credits and cash.  The protests end; the gratitude is real, if wary.",
    effect: function(){ hwMult *= 0.9; COOP += 4; libertyScore += 10; } });
var projectE_Crackdown = natProject({ id: "E_Crackdown", title: "Mass Protests: Crack Down?",
    description: "Declare a national emergency and clear the streets.  The Project can't afford distractions. (Civil liberties suffer, -4 COOP)",
    trigger: function(){ return Nat_Defense_Flag == 1 && PercentAutomated > 50; },
    excludes: ["projectE_UBI"],
    message: "The National Guard clears the Mall.  AI-assisted facial recognition does the rest.",
    effect: function(){ libertyScore -= 20; COOP -= 4; } });
//#endregion

//#region Win conditions ---------------------------------------------------------------------------------------
//LAUNCH PIVOTAL ACT
//<!-- this should shut down the various dangers, then offer "sieze the future" action, taking you
//to an ending page that wonders if you'll create a utopia or misuse your power to eliminate rivals etc -->
function gambleOdds(){ return clamp(Math.pow((CEV - 70)/30, 2), 0, 1); }

var projectP_Pivotal = natProject({ id: "P_Pivotal", title: "Launch a Pivotal Act",
    description: "Ask your aligned superintelligence to end the acute risk period.  It says yes.",
    priceTag: " (CEV 99%)",
    trigger: function(){ return alignOK() && BaseCapability >= EG.PIVOTAL_BC && CEV >= 95 && pivotalReady == 0; },
    cost: function(){ return CEV >= 99; },
    retract: true,
    message: "Every other frontier training run on Earth quietly stops.  Every bioweapon lab finds its sequencers bricked.  The acute risk period is over.  Now what?",
    effect: function(){ pivotalReady = 1; } });

var projectP_Gamble = natProject({ id: "P_Gamble", title: "Deploy Superintelligence Anyway",
    description: "Your alignment isn't perfect, but the rival is coming.  Roll the dice.",
    live: function(){ return "Your alignment isn't perfect, but the clock is ticking.  Estimated odds it does what you mean: " + fmt(gambleOdds()*100) + "%."; },
    trigger: function(){ return alignOK() && BaseCapability >= EG.PIVOTAL_BC && CEV >= EG.GAMBLE_MIN_CEV && CEV < 99 && pivotalReady == 0; },
    retract: true,
    effect: function(){
        if (Math.random() < gambleOdds()) {
            displayMessage("Deploy Anyway: it works.  Against the odds, it works.  The acute risk period is over.  Now what?");
            pivotalReady = 1;
        } else {
            triggerEnding('gamble_fail');
        }
    } });

var projectP_Share = natProject({ id: "P_Share", title: "Share the Future",
    description: "Hand control to all of humanity: a slow, careful, global deliberation about what comes next.",
    trigger: function(){ return pivotalReady == 1; },
    excludes: ["projectP_Seize"],
    effect: function(){ triggerEnding('pivotal_shared'); } });
var projectP_Seize = natProject({ id: "P_Seize", title: "Seize the Future",
    description: "Lock in a permanent, benevolent, American-led world order.  You're the good guys, right?",
    trigger: function(){ return pivotalReady == 1; },
    excludes: ["projectP_Share"],
    effect: function(){ triggerEnding('pivotal_hegemony'); } });

var projectP_PauseForever = natProject({ id: "P_PauseForever", title: "Make the Pause Permanent",
    description: "Freeze the frontier indefinitely.  Not a solution; just time.",
    trigger: function(){ return paused == 1 && pauseDays > 240; },
    retract: true,
    effect: function(){ triggerEnding('pause_forever'); } });
var projectP_Together = natProject({ id: "P_Together", title: "Build It Together",
    description: "With alignment solved under the pause, build superintelligence as a joint project of all nations.",
    priceTag: " (CEV 99%, Coop. 80%)",
    trigger: function(){ return paused == 1 && rogueActive == 0 && CEV > 90; },
    cost: function(){ return CEV >= 99 && COOP >= 80; },
    retract: true,
    effect: function(){ triggerEnding('pause_joint'); } });
//#endregion

// Projects that only make sense in some contexts vanish (and can come back) when that context goes
// away: alignment work while an escaped AI is loose, diplomacy once the rival is defeated, etc.
(function(){
    var diplo = ["NQ1a", "NQ1b", "Def_HITL", "Def_Hypnodrones", "X_Allies"];
    projects.forEach(function(p){
        var id = p.id.replace("projectButton", "");
        if (/^Al_/.test(id)) { p.requires = alignOK; }
        else if (/^D_/.test(id) || diplo.indexOf(id) >= 0) { p.requires = diploOK; }
    });
})();
