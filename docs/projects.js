// PROJECTS -------------------------------------------------------
var projects = [];
var activeProjects = [];

//OOM 1

//read the sequences -- would be a funny way to start things off, free insight that unlocks train AI button
//unlock train AI button
//displaymessage= quote from power of intelligence or something
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

var projectA0 = {
    id: "projectButtonA0",
    title: "Cheat",
    priceTag: " ",
    description: "+1000 GPUs and +$1M funds",
    trigger: function(){return projectsFlag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("You cheated");
        jFunds = jFunds + 3000000;
        GPUs = GPUs + 1000;

        projectA0.flag = 1;
        var element = document.getElementById("projectButtonA0");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectA0);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectA0);


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
        Visu_Flag = 1;

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
        displayMessage("Adversarial images show that AIs must process visual information in a very strange, alien way.");
        Skill_Visu_mod = Skill_Visu_mod + 2.6;
        Skill_Visu = Skill_Visu + 2.6;//log(1.5^(3/2))*10
        Profit_Visu_1 = Profit_Visu_1 * 1.5;
        Profit_Visu_2 = Profit_Visu_2 * 1.5;
        Profit_Visu_3 = Profit_Visu_3 * 1.5;
        UpdatePolitics();

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
        displayMessage("Machine translation: Is this statistical language model just a 'stochastic parrot', or is actual world-modeling going on in there?");
        Insights = Insights -1;
        Lang_Flag = 1;

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
        //TODO: ALSO unlock cool graph of capabilities!  probably sneak this under "misuse" since there's plenty of space there.

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
    title: "Web crawl",
    priceTag: " ($200)",
    description: "Scrape websites for text to use as training data. (+100% boost to Language profits)",
    trigger: function(){return (projectL1.flag == 1)},
    uses: 1,
    cost: function(){return  jFunds>200},
    flag: 0,
    effect: function(){
        displayMessage("The internet seems boundless, but pretty soon you're going to need even more tokens...");
        jFunds = jFunds -200;
        Skill_Lang_mod = Skill_Lang_mod + 4.5;
        Skill_Lang = Skill_Lang + 4.5;//log(2^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 2;
        Profit_Lang_2 = Profit_Lang_2 * 2;
        Profit_Lang_3 = Profit_Lang_3 * 2;
        UpdatePolitics();

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
    title: "Protein Folding App",
    priceTag: " (1 Insight, Visual 45%)",
    description: "If AI can beat us at chess, maybe it'll beat us at Foldit.",
    trigger: function(){return (projectL2.flag) == 1},
    uses: 1,
    cost: function(){return (Insights>0.95) && (Skill_Visu>44.5)},//lower than this and it will be negative on arrival
    flag: 0,
    effect: function(){
        displayMessage("Protein Folding App: translating RNA sequences into 3D protein structures was an unsolved problem in medical research for decades.");
        Biol_Flag = 1;
        Insights = Insights -1;

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
        displayMessage("Code Checker App: todo!");
        Code_Flag = 1;

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
        Insights = Insights -1;
        Skill_Code_mod = Skill_Code_mod + 4.5;
        Skill_Code = Skill_Code + 4.5;//log(2^(3/2))*10
        Profit_Code_1 = Profit_Code_1 * 2;
        Profit_Code_2 = Profit_Code_2 * 2;
        Profit_Code_3 = Profit_Code_3 * 2;
        UpdatePolitics();

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
        displayMessage("Molecular Dynamics Package: todo!");
        jFunds = jFunds -2500;
        Skill_Biol_mod = Skill_Biol_mod + 4.5;
        Skill_Biol = Skill_Biol + 4.5;//log(2^(3/2))*10
        Profit_Biol_1 = Profit_Biol_1 * 2;
        Profit_Biol_2 = Profit_Biol_2 * 2;
        UpdatePolitics();

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
        jFunds = jFunds -6000;
        Skill_Lang_mod = Skill_Lang_mod + 2.6;
        Skill_Lang = Skill_Lang + 2.6; //log(1.5^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 1.5;
        Profit_Lang_2 = Profit_Lang_2 * 1.5;
        Profit_Lang_3 = Profit_Lang_3 * 1.5;
        UpdatePolitics();

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
    description: "Let's think step-by-step... (+75% Lang. profit)",
    trigger: function(){return projectL3.flag == 1},
    uses: 1,
    cost: function(){return Insights>0.95},
    flag: 0,
    effect: function(){
        displayMessage("Tree-of-Thought Prompting: todo");
        Insights = Insights -1;
        Skill_Lang_mod = Skill_Lang_mod + 33.6;
        Skill_Lang = Skill_Lang + 3.6;//log(1.75^(3/2))*10
        Profit_Lang_1 = Profit_Lang_1 * 1.75;
        Profit_Lang_2 = Profit_Lang_2 * 1.75;
        Profit_Lang_3 = Profit_Lang_3 * 1.75;
        UpdatePolitics();

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
    cost: function(){return jFunds > 50000},
    flag: 0,
    effect: function(){
        displayMessage("Found a business: Your employees will help you explore new ideas, develop products, and more.  First, let's all sign this NDA...");
        if(AISFlag <2){AISFlag = 2;}
        jFunds = jFunds - 50000;

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
    priceTag: " ($30000)",
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
        displayMessage("Aerial Drone Control: todo");
        Robo_Flag = 1;

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
        displayMessage("Action Transformers: ");
        Code_Flag = 2;

        projectC3.flag = 1;
        var element = document.getElementById("projectButtonC3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectC3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectC3);






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
        displayMessage("PoliticsFlag: "+ PoliticsFlag+", AISFlag: "+AISFlag+", Researchers: "+Researchers);
        

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
    description: "todo",
    trigger: function(){return projectR1.flag == 1},
    uses: 1,
    cost: function(){return Skill_Visu>89.5},
    flag: 0,
    effect: function(){
        displayMessage("Video Generation: todo");
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
        displayMessage("Protein Interaction & Design: translating RNA sequences into 3D protein structures was an unsolved problem in medical research for decades.");
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
        displayMessage("Multimodality: todo");
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
    title: "Action Transformer",
    priceTag: " (4 Insights)",
    description: "AI uses a PC autonomously like humans. (+50% Code profit)",
    trigger: function(){return projectI4.flag == 1},
    uses: 1,
    cost: function(){return Insights>3.95},
    flag: 0,
    effect: function(){
        displayMessage("Multimodality: todo");
        Insights = Insights -4;
        Skill_Code_mod = Skill_Code_mod + 2.6;
        Skill_Code = Skill_Code + 2.6;//log(1.5^(3/2))*10
        Profit_Code_1 = Profit_Code_1 * 1.5;
        Profit_Code_2 = Profit_Code_2 * 1.5;
        Profit_Code_3 = Profit_Code_3 * 1.5;
        UpdatePolitics();

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
    description: "todo",
    trigger: function(){return projectR1.flag == 1},
    uses: 1,
    cost: function(){return (Skill_Robo > 34.5)},
    flag: 0,
    effect: function(){
        displayMessage("Self-Driving Vehicles: todo");
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
    priceTag: " ($200,000)",
    description: "Probe for dangerous capabilities pre-release.",
    trigger: function(){return projectA2.flag == 1},
    uses: 1,
    cost: function(){return jFunds>200000},
    flag: 0,
    effect: function(){
        displayMessage("Pre-deployment Evals: ");
        AISFlag = 4;
        jFunds = jFunds - 200000;

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

//cybersecurity expert, coding threshold
var projectC5 = {
    id: "projectButtonC5",
    title: "Autonomous Coding",
    priceTag: " (Code. 80%)",
    description: "Slow takeoff starts with entry-level code monkey jobs.",
    trigger: function(){return projectC4.flag == 1},
    uses: 1,
    cost: function(){return Skill_Code>79.5},
    flag: 0,
    effect: function(){
        displayMessage("Autonomous Coding: todo");
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
        displayMessage("Multimodal Assistant: todo");
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



//AIS / PUBLIC OPINION STUFF
//==================================================================================================

//searching for more data -- costs money.  maybe youtube videos, etc, after multimodal
//spring from I3


//consider prize awards like "turing test competition", or whatever.

//lobby for government funding for GPUs -- optimism over XX%

//lobby for government funding for safety researchers -- optimism below XX%, 

//(milestone events based on policy...)

//OOM 8

//NATIONALIZE THE LABS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var projectN = {
    id: "projectButtonN",
    title: "Nationalize the AI Labs",
    priceTag: " \n(Public opinion prominence >95%)",
    description: " We stand at the hinge of history.",
    trigger: function(){return hype >75},
    uses: 1,
    cost: function(){return hype>95},
    flag: 0,
    effect: function(){
        displayMessage("Nationalize the AI Labs: Welcome to the final years of the countdown to superintelligence.");
        Nationalized = true;
        unfinishedGame = true; //enable in order to beg FLI, Lantz, etc, for more wire
        H100_Flag=0;//buy GPUs individually; it's more fun
        GPUBuyerStatus=0;
        document.getElementById('GPUBuyerStatus').innerHTML = "OFF";

        //set all researchers to insight for now
        AISPercent = 0;
        ResearchPercent = 100;

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


        projectN.flag = 1;
        var element = document.getElementById("projectButtonN");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectN);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectN);


var projectNE = {
    id: "projectButtonNE",
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
    trigger: function(){return projectN.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("The Best of The Best: 'For three critical years, he directed the most extraordinary project in the history of mankind.' -- Glen Seaborg on the leader of the Manhattan Project");
        Researchers = 50;
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
    description: "We have to solve alignment.  But we also have to stay ahead.",
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


var projectNI3 = {
    id: "projectButtonNI3",
    title: "Defence in Depth",
    priceTag: " ",
    description: "Buttress humanity against the risks of superintelligence.",
    trigger: function(){return projectNI2.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        displayMessage("Defence in Depth: Cover all the bases that a deceptive-misaligned AI might use to attack civilization.  Cyber, bio, nuclear... even hypnodrones.");
        Nat_Defense_Flag = 1;

        projectNI3.flag = 1;
        var element = document.getElementById("projectButtonNI3");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNI3);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNI3);














//NATO versus UN
var projectNQ1a = {
    id: "projectButtonNQ1a",
    title: "Strong NATO AI Treaty?",
    priceTag: " (10 diplo)",
    description: "Tough rules boost AI safety, but spur geopolitical polarization. (Align. +15, Coop. +5)",
    trigger: function(){return projectNI2.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        //Diplo = Diplo - 10;
        displayMessage("The Best of The Best.: todo");
        //Alignment = Alignment + 15;
        //Cooperation = Cooperation + 5;

        projectNI.flag = 1;
        var element = document.getElementById("projectButtonNQ1a");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ1a);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ1b");
        element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ1b);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ1a);
var projectNQ1b = {
    id: "projectButtonNQ1b",
    title: "Weak U.N. AI Treaty?",
    priceTag: "  (10 diplo)",
    description: "Seek global consensus & cooperation, albeit on weaker rules. (Align. +5, Coop. +15)",
    trigger: function(){return projectNI2.flag == 1},
    uses: 1,
    cost: function(){return true},
    flag: 0,
    effect: function(){
        //Diplo = Diplo - 10;
        displayMessage("The Best of The Best.: todo");
        //Alignment = Alignment + 5;
        //Cooperation = Cooperation + 15;

        projectNI.flag = 1;
        var element = document.getElementById("projectButtonNQ1b");
        element.parentNode.removeChild(element);
        var index = activeProjects.indexOf(projectNQ1b);
        activeProjects.splice(index, 1);
        //destroy other option too
        element = document.getElementById("projectButtonNQ1a");
        element.parentNode.removeChild(element);
        index = activeProjects.indexOf(projectNQ1a);
        activeProjects.splice(index, 1);
    }
}
projects.push(projectNQ1b);










//SUPERINTELLIGENCE EVENTS
//==================================================================================================
//q-star learning -- costs insight, favors coding

//synthetic data -- costs insight, favors coding & language (or save this for superhuman temps)




//bioweapons stuff

//military slaughterbot stuff




//
//drop-in remote worker (increases labor force)

//automated ai alignment researcher -- just make the AIs do our AI alignment homework

//humanoid robots (increases labor force, also creates military bots)

//breakthrough medicines (increases labor force via less aging, also creates biorisk)

//IQ-boosting gene therapy for ai researchers

//automated factories manufacturing

//BCIs for ai researchers, but they also make everyone hackable


//Nationalize The Labs
// combined politics optimism + pessimism over 90%
//ScalingFlag = 0;?






// var project35 = {
//     id: "projectButton35",
//     title: "Release the HypnoDrones ",
//     priceTag: "(100 Trust)",
//     description: "A new era of trust",
//     trigger: function(){return project70.flag == 1},
//     uses: 1,
//     cost: function(){return trust>=100},
//     flag: 0,
//     effect: function(){
//         project35.flag = 1;
//         displayMessage("Releasing the HypnoDrones ");
//         displayMessage("All of the resources of Earth are now available for clip production ");
//         trust = trust - 100;
//         clipmakerLevel = 0;
//         megaClipperLevel = 0;
//         nanoWire = wire;
//         humanFlag = 0;
        
//         if (document.getElementById("projectButton219") != null){
//         var element = document.getElementById("projectButton219");
//         element.parentNode.removeChild(element);
//         var index = activeProjects.indexOf(project219);
//         activeProjects.splice(index, 1);
//         } 
        
//         if (document.getElementById("projectButton40b") != null){
//         var element = document.getElementById("projectButton40b");
//         element.parentNode.removeChild(element);
//         var index = activeProjects.indexOf(project40b);
//         activeProjects.splice(index, 1);
//         }   
        
//         hypnoDroneEvent();
        
//         document.getElementById("transWire").innerHTML = wire;

//         var element = document.getElementById("projectButton35");
//         element.parentNode.removeChild(element);
//         var index = activeProjects.indexOf(project35);
//         activeProjects.splice(index, 1);
        
//     }
// }
