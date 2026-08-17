/* Brain states as network reconfigurations.

   One fixed cast of regions, and per state the couplings that strengthen and
   the ones that fall quiet. The regions keep their ring position and their
   colour in every state, so switching states moves the threads and nothing
   else — that is the whole point of drawing them this way.

   These are composites read off the imaging literature, not measured
   connectomes. Each state carries its own sources. Shared by the Networks
   page and the Network Atlas so the two can never drift apart. */
window.MN_NET = (function(){

var GROUPS = [
  {id:"dmn",     label:"Default mode"},
  {id:"exec",    label:"Executive"},
  {id:"sal",     label:"Salience"},
  {id:"attn",    label:"Attention"},
  {id:"reward",  label:"Reward"},
  {id:"arousal", label:"Arousal · Limbic"},
  {id:"motor",   label:"Motor"}
];

/* What each region does, in any state. What it does in a particular state is
   the state's business, and lives in that state's notes. */
var NODES = [
  {id:"mPFC", group:"dmn",  full:"Medial prefrontal cortex",
   role:"Self-reference and value — the running commentary the brain keeps about itself."},
  {id:"PCC",  group:"dmn",  full:"Posterior cingulate cortex",
   role:"The default network's hub, tied to internally directed attention and autobiographical memory."},
  {id:"dlPFC",group:"exec", full:"Dorsolateral prefrontal cortex",
   role:"Working memory and deliberate control — holding a goal and checking progress against it."},
  {id:"AI",   group:"sal",  full:"Anterior insula",
   role:"Interoception and salience — what in the body and the world is worth attention now."},
  {id:"dACC", group:"sal",  full:"Dorsal anterior cingulate",
   role:"Conflict, effort and error — how hard this is, and whether it is going wrong."},
  {id:"FEF",  group:"attn", full:"Frontal eye fields",
   role:"Top-down attention — pointing the eyes, and the spotlight, where the goal requires."},
  {id:"IPS",  group:"attn", full:"Intraparietal sulcus",
   role:"Spatial and feature attention, and the maps that hold external focus."},
  {id:"VStr", group:"reward", full:"Ventral striatum / accumbens",
   role:"Reward prediction and wanting — the engine of pursuit."},
  {id:"Put",  group:"reward", full:"Putamen",
   role:"Habit and automaticity — sequences that run without supervision."},
  {id:"VTA",  group:"reward", full:"Ventral tegmental area",
   role:"The dopamine source feeding the reward system."},
  {id:"LC",   group:"arousal", full:"Locus coeruleus",
   role:"Noradrenaline — arousal, vigilance, and the gain on everything else."},
  {id:"Amy",  group:"arousal", full:"Amygdala",
   role:"Threat detection and emotional salience."},
  {id:"SMA",  group:"motor", full:"Supplementary motor area",
   role:"Action sequencing and preparation."},
  {id:"Cb",   group:"motor", full:"Cerebellum",
   role:"Prediction and refinement — of movement, and of thought."}
];

/* the site palette: bright, low-saturation, in the familiar hue order */
var PALETTE = [
  "#FEAEA4","#E6CF51","#85DD93","#85D0FE","#DCB2FB","#FBB476","#3ADFE0",
  "#FCA9CD","#ABC5FE","#ACD774","#FEB192","#40DBFB","#F7A5EF","#5AE2B5"
];

var STATES = [

{ id:"flow", label:"Flow", title:"The Flow State",
  anno:"challenge meets skill",
  blurb:"Not a network but a state — a reconfiguration across networks when challenge meets skill. The threads show which couplings strengthen and which fall quiet.",
  source:"Composite after Ulrich et al. (2014), Huskey et al. (2018) and Dietrich's transient-hypofrontality account (2004).",
  down:["mPFC","PCC","dlPFC","Amy"],
  links:[
    {s:"AI",t:"dACC",w:.55},{s:"AI",t:"VStr",w:.50},{s:"dACC",t:"FEF",w:.45},
    {s:"FEF",t:"IPS",w:.55},{s:"IPS",t:"SMA",w:.40},{s:"SMA",t:"Cb",w:.50},
    {s:"Put",t:"SMA",w:.50},{s:"VTA",t:"VStr",w:.55},{s:"VTA",t:"Put",w:.40},
    {s:"LC",t:"dACC",w:.40},{s:"VStr",t:"Put",w:.35},{s:"AI",t:"IPS",w:.35},
    {s:"mPFC",t:"PCC",w:.55,quiet:true},{s:"AI",t:"mPFC",w:.45,quiet:true},
    {s:"mPFC",t:"Amy",w:.45,quiet:true},{s:"Amy",t:"LC",w:.35,quiet:true},
    {s:"dlPFC",t:"SMA",w:.40,quiet:true},{s:"dlPFC",t:"mPFC",w:.35,quiet:true},
    {s:"PCC",t:"IPS",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"Quiets — Ulrich et al. found reduced medial prefrontal activity; the inner narrator stands down.",
    PCC:"The default-mode core decouples — self-referential mind-wandering drops away with the sense of self-consciousness.",
    dlPFC:"Dietrich's transient hypofrontality — explicit self-monitoring goes offline as practised skill takes over.",
    AI:"The salience switchboard holds the task in focus and gates the default mode down.",
    dACC:"Effort and monitoring — frontal-midline theta rises with deep task absorption.",
    FEF:"Top-down attention locks to the task; the dorsal attention network stays engaged throughout.",
    IPS:"External focus replaces internal chatter.",
    VStr:"Intrinsic reward — Huskey's work ties flow to frontostriatal coupling; the task becomes its own payoff.",
    Put:"Ulrich's other key finding — putamen activity rises as performance turns automatic.",
    VTA:"Tonic dopamine feeding the autotelic quality of flow.",
    LC:"Noradrenaline tuned to the sweet spot — neither bored nor anxious.",
    Amy:"Threat response quiets; performance anxiety switches off.",
    SMA:"Action runs in fluent, pre-assembled sequences rather than deliberate steps.",
    Cb:"Automaticity's engine — practised movement executed without conscious correction."
  }
},

{ id:"rest", label:"Rest", title:"Rest and Mind-Wandering",
  anno:"the default network ascendant",
  blurb:"The state the brain falls into when nothing is asked of it. The default network talks to itself, and the task-positive networks idle — the arrangement against which every other state here is a departure.",
  source:"After Raichle's default-mode account (2001, 2015), Greicius et al. (2003) and Fox et al.'s anticorrelated networks (2005).",
  down:["FEF","IPS","AI","dACC"],
  links:[
    {s:"mPFC",t:"PCC",w:.65},{s:"mPFC",t:"Amy",w:.45},{s:"PCC",t:"IPS",w:.45},
    {s:"dlPFC",t:"mPFC",w:.35},{s:"PCC",t:"dlPFC",w:.30},{s:"Amy",t:"LC",w:.35},
    {s:"AI",t:"dACC",w:.45,quiet:true},{s:"FEF",t:"IPS",w:.50,quiet:true},
    {s:"dACC",t:"FEF",w:.40,quiet:true},{s:"AI",t:"IPS",w:.35,quiet:true},
    {s:"IPS",t:"SMA",w:.35,quiet:true},{s:"Put",t:"SMA",w:.35,quiet:true},
    {s:"SMA",t:"Cb",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"The narrator has the floor — self-referential thought is what the resting brain mostly does.",
    PCC:"The hub of the default network, and the region whose activity most reliably marks internally directed attention.",
    dlPFC:"Loosely coupled to the midline; control is available but not called on.",
    AI:"Idle. With nothing salient to flag, the switchboard sits quiet.",
    dACC:"Little conflict to register and little effort to price.",
    FEF:"The dorsal attention network idles — the spotlight has nowhere it must point.",
    IPS:"Its coupling to the posterior cingulate is the seam where the default network meets parietal attention.",
    VStr:"Quiet in the absence of anything to pursue.",
    Put:"No sequence to run.",
    VTA:"Tonic background firing.",
    LC:"Low, steady arousal — the level that lets the mind drift.",
    Amy:"Coupled to the midline, colouring spontaneous thought with feeling.",
    SMA:"No action prepared.",
    Cb:"Predicting nothing in particular."
  }
},

{ id:"focus", label:"Focused attention", title:"Focused Attention",
  anno:"externally directed task engagement",
  blurb:"Deliberate work on something outside yourself. The dorsal attention network takes over, the salience network gates the default mode down, and control stays switched on — this is flow's effortful cousin, and the difference is that here the effort is felt.",
  source:"After Corbetta and Shulman (2002), Fox et al. (2005) and Menon and Uddin's salience-switching account (2010).",
  down:["mPFC","PCC"],
  links:[
    {s:"FEF",t:"IPS",w:.65},{s:"dACC",t:"FEF",w:.55},{s:"AI",t:"dACC",w:.55},
    {s:"AI",t:"IPS",w:.45},{s:"dlPFC",t:"SMA",w:.45},{s:"IPS",t:"SMA",w:.45},
    {s:"dlPFC",t:"dACC",w:.50},{s:"dlPFC",t:"IPS",w:.45},{s:"LC",t:"dACC",w:.45},
    {s:"SMA",t:"Cb",w:.40},
    {s:"mPFC",t:"PCC",w:.50,quiet:true},{s:"AI",t:"mPFC",w:.45,quiet:true},
    {s:"PCC",t:"IPS",w:.35,quiet:true},{s:"mPFC",t:"Amy",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"Suppressed — the deeper the external focus, the further the midline falls.",
    PCC:"Deactivates with task load; its failure to deactivate is the signature of a wandering mind.",
    dlPFC:"Fully engaged. Unlike flow, control is doing visible work, and the effort is felt as effort.",
    AI:"Switching — the insula is what tips activity from the default network to the task-positive one.",
    dACC:"Pricing the effort and catching the errors, moment by moment.",
    FEF:"The dorsal attention network's frontal pole, driving the spotlight top-down.",
    IPS:"Holding the maps that keep attention where the task needs it.",
    VStr:"Engaged only as far as the task carries a reward.",
    Put:"Supporting whatever of the task has become routine.",
    VTA:"Motivational tone, sustaining the effort.",
    LC:"Noradrenergic gain raised — the physiology of concentrating.",
    Amy:"Uninvolved unless the task turns threatening.",
    SMA:"Preparing the actions the task requires.",
    Cb:"Refining the timing of those actions."
  }
},

{ id:"threat", label:"Threat", title:"Threat and Anxiety",
  anno:"the vigilance configuration",
  blurb:"Arousal without the sweet spot. The amygdala and the noradrenergic system drive the state, salience is stuck on high, and the prefrontal coupling that would normally damp the alarm weakens instead — the inverse of the arrangement flow depends on.",
  source:"After Etkin et al. (2011) on prefrontal–amygdala regulation, Kim et al. (2011) and Robertson and Garavan on locus-coeruleus arousal.",
  down:["dlPFC"],
  links:[
    {s:"Amy",t:"LC",w:.65},{s:"AI",t:"dACC",w:.60},{s:"Amy",t:"dACC",w:.50},
    {s:"AI",t:"Amy",w:.50},{s:"LC",t:"dACC",w:.50},{s:"dACC",t:"FEF",w:.40},
    {s:"Amy",t:"Put",w:.35},
    {s:"mPFC",t:"Amy",w:.55,quiet:true},{s:"dlPFC",t:"Amy",w:.50,quiet:true},
    {s:"dlPFC",t:"mPFC",w:.35,quiet:true},{s:"dlPFC",t:"SMA",w:.30,quiet:true},
    {s:"mPFC",t:"PCC",w:.35,quiet:true},{s:"VTA",t:"VStr",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"Its inhibitory grip on the amygdala loosens — the regulatory coupling that normally closes the alarm down is weaker here, not stronger.",
    PCC:"Pulled away from the midline as the state takes over.",
    dlPFC:"Control capacity is spent on the threat; the working memory available for anything else drops.",
    AI:"Stuck on high — interoceptive signals from a racing body are read as further evidence of danger.",
    dACC:"Conflict and effort registered continuously, with no resolution to end on.",
    FEF:"Attention captured by the threat rather than steered towards a goal.",
    IPS:"Scanning, but not for anything the task chose.",
    VStr:"Reward signalling blunted — anhedonia is the state's companion.",
    Put:"Defensive routines run automatically.",
    VTA:"Dopaminergic drive gives way to noradrenergic drive.",
    LC:"The state's engine. Noradrenaline past the useful range, where gain becomes jitter.",
    Amy:"Driving the configuration — threat detection with the volume up and the brake off.",
    SMA:"Braced for action that may not come.",
    Cb:"Predicting harm."
  }
},

{ id:"reward", label:"Reward pursuit", title:"Reward Pursuit",
  anno:"wanting, as distinct from liking",
  blurb:"The dopaminergic pursuit circuit at full tilt. This is wanting rather than liking — the pursuit runs on prediction, and control weakens as the cue takes hold.",
  source:"After Berridge and Robinson's incentive-salience account (2016), Haber and Knutson (2010) and Goldstein and Volkow on impaired prefrontal control (2011).",
  down:["dlPFC"],
  links:[
    {s:"VTA",t:"VStr",w:.70},{s:"VStr",t:"Put",w:.55},{s:"VTA",t:"Put",w:.50},
    {s:"AI",t:"VStr",w:.50},{s:"mPFC",t:"VStr",w:.50},{s:"dACC",t:"VStr",w:.45},
    {s:"AI",t:"dACC",w:.45},{s:"Put",t:"SMA",w:.45},{s:"Amy",t:"VStr",w:.40},
    {s:"dlPFC",t:"VStr",w:.45,quiet:true},{s:"dlPFC",t:"mPFC",w:.35,quiet:true},
    {s:"mPFC",t:"PCC",w:.35,quiet:true},{s:"PCC",t:"IPS",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"Assigning value — the cue is worth something, and the midline is where that is written down.",
    PCC:"Displaced by the pursuit.",
    dlPFC:"Weakening. The reliable finding across addiction imaging is that prefrontal control over striatal drive falls as the cue takes hold.",
    AI:"Craving is felt in the body first, and the insula is where that is read.",
    dACC:"Registering the pull, and the cost of resisting it.",
    FEF:"Attention drawn to the cue.",
    IPS:"Tracking where the reward is.",
    VStr:"The centre of the state — prediction error and incentive salience, the wanting itself.",
    Put:"Where pursuit becomes habit, and the habit outlasts the wanting.",
    VTA:"The dopamine source driving the whole configuration.",
    LC:"Arousal in support of pursuit.",
    Amy:"Attaching emotional weight to the cue.",
    SMA:"Preparing the approach.",
    Cb:"Timing it."
  }
},

{ id:"meditation", label:"Meditation", title:"Focused-Attention Meditation",
  anno:"the default network under supervision",
  blurb:"Not the absence of activity but its supervision. The default network quiets, and — unlike in flow — control regions couple more tightly to it rather than standing down: the mind is watched rather than surrendered.",
  source:"After Brewer et al. (2011) on default-network deactivation and increased control coupling in experienced meditators, and Hasenkamp et al. (2012).",
  down:["mPFC","PCC","Amy"],
  links:[
    {s:"PCC",t:"dlPFC",w:.60},{s:"dACC",t:"PCC",w:.50},{s:"AI",t:"dACC",w:.50},
    {s:"dlPFC",t:"mPFC",w:.45},{s:"FEF",t:"IPS",w:.40},{s:"AI",t:"IPS",w:.35},
    {s:"dlPFC",t:"dACC",w:.40},
    {s:"mPFC",t:"PCC",w:.50,quiet:true},{s:"mPFC",t:"Amy",w:.45,quiet:true},
    {s:"Amy",t:"LC",w:.40,quiet:true},{s:"PCC",t:"IPS",w:.30,quiet:true},
    {s:"VTA",t:"VStr",w:.30,quiet:true}
  ],
  notes:{
    mPFC:"Deactivated, and — the part that matters — held there by control regions rather than simply falling silent.",
    PCC:"Brewer's central finding: the posterior cingulate deactivates in experienced meditators, and its coupling to control regions rises at the same time.",
    dlPFC:"Coupled more tightly to the default network, not less. This is the clearest line between meditation and flow.",
    AI:"Attending to the breath and the body without being carried off by them.",
    dACC:"Noticing the wandering, which is the practice.",
    FEF:"Attention returned to the object, again and again.",
    IPS:"Narrowed to the object of focus.",
    VStr:"Quiet — nothing is being pursued.",
    Put:"Nothing to automate.",
    VTA:"Low tonic drive.",
    LC:"Arousal settled, decoupled from the amygdala.",
    Amy:"Reactivity reduced; the practice generalises to less threat response outside it.",
    SMA:"Still.",
    Cb:"Still."
  }
}

];

return { GROUPS: GROUPS, NODES: NODES, PALETTE: PALETTE, STATES: STATES };
})();
