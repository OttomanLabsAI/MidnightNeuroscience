/* What each region does, and which layer of the brain it belongs to.

   The three layers are MacLean's triune scheme — reptilian core, limbic
   midbrain, neocortex. It is a useful way to stack a brain map and a poor
   account of how brains actually evolved: the "reptilian" structures are not
   reptilian, and every one of these layers is present in every vertebrate
   with a brain. It is kept here because it reads well as a stack, not
   because the evolutionary story holds up. The functions below are the part
   that does.

   Keyed by AAL base name, so it lines up with MN_ATLAS.REGIONS. */
window.MN_NOTES = (function(){

var TIERS = [
  {id:"cerebrum",  label:"Cerebrum",
   sub:"the neocortical sheet — perception, language, planning, deliberate action"},
  {id:"midbrain",  label:"Midbrain &middot; limbic",
   sub:"memory, emotion and the body's inner report"},
  {id:"reptilian", label:"Reptilian core",
   sub:"the deep machinery — relay, habit, balance and timing"}
];

var NOTES = {
  /* ── cerebrum ─────────────────────────────────────────────────────── */
  Precentral:        {tier:"cerebrum", fn:"The primary motor strip. Sends the command that moves the body, mapped along its length from the tongue at the bottom to the foot at the top."},
  Frontal_Sup:       {tier:"cerebrum", fn:"Superior frontal gyrus. Working memory and the holding of a plan while it is carried out; its medial face belongs to the default network."},
  Frontal_Sup_Orb:   {tier:"cerebrum", fn:"The orbital surface of the superior frontal gyrus, weighing the value of an option against what else is on offer."},
  Frontal_Mid:       {tier:"cerebrum", fn:"Middle frontal gyrus, most of the dorsolateral prefrontal cortex. Holds a goal, checks progress against it, and switches when the goal changes."},
  Frontal_Mid_Orb:   {tier:"cerebrum", fn:"Orbital middle frontal cortex, part of the reward-valuation surface sitting above the eye sockets."},
  Frontal_Inf_Oper:  {tier:"cerebrum", fn:"Pars opercularis — with pars triangularis this is Broca's area on the left, assembling speech before it is spoken."},
  Frontal_Inf_Tri:   {tier:"cerebrum", fn:"Pars triangularis. The other half of Broca's area; on the right it does more of the work of inhibiting an action already begun."},
  Frontal_Inf_Orb:   {tier:"cerebrum", fn:"Orbital inferior frontal cortex, at the junction of language territory and the valuation surface."},
  Rolandic_Oper:     {tier:"cerebrum", fn:"The operculum folded over the insula, carrying mouth and throat sensation and the motor control of speech."},
  Supp_Motor_Area:   {tier:"cerebrum", fn:"Supplementary motor area. Prepares and sequences movement — it fires before a self-initiated action, not after it."},
  Frontal_Sup_Medial:{tier:"cerebrum", fn:"The medial wall of the superior frontal gyrus. Self-referential thought, and the core of the default network that quiets when a task takes over."},
  Heschl:            {tier:"cerebrum", fn:"Heschl's gyrus, the primary auditory cortex. First cortical stop for sound, mapped by pitch from one end to the other."},
  Temporal_Sup:      {tier:"cerebrum", fn:"Superior temporal gyrus. Works sound up into speech; its posterior left portion is Wernicke's territory, where speech becomes meaning."},
  Temporal_Mid:      {tier:"cerebrum", fn:"Middle temporal gyrus. Association cortex for understood speech and for what things mean, as distinct from how they sound."},
  Temporal_Inf:      {tier:"cerebrum", fn:"Inferior temporal gyrus, the far end of the ventral visual stream, where seeing becomes recognising."},
  Postcentral:       {tier:"cerebrum", fn:"The primary somatosensory strip. Receives touch, pressure and limb position, mapped body-part by body-part alongside the motor strip."},
  Parietal_Sup:      {tier:"cerebrum", fn:"Superior parietal lobule. Holds where things are relative to the body, and keeps that map current as the body moves."},
  Parietal_Inf:      {tier:"cerebrum", fn:"Inferior parietal lobule. Binds sight, sound and touch into one scene, and supports the sense of a body owning it."},
  SupraMarginal:     {tier:"cerebrum", fn:"Supramarginal gyrus. Phonological working memory — holding a sound in mind long enough to repeat it — and part of the temporoparietal junction."},
  Angular:           {tier:"cerebrum", fn:"Angular gyrus. Where written words, numbers and meaning meet; damage on the left disrupts reading and calculation."},
  Precuneus:         {tier:"cerebrum", fn:"Precuneus. Mental imagery, autobiographical memory and the sense of a self placed in a scene. One of the most metabolically active regions at rest."},
  Paracentral_Lobule:{tier:"cerebrum", fn:"The paracentral lobule, over the midline: sensation and motor control for the legs, feet and pelvic floor."},
  Calcarine:         {tier:"cerebrum", fn:"Calcarine cortex — the primary visual cortex, V1. Every conscious sight starts here, mapped point for point onto the retina."},
  Cuneus:            {tier:"cerebrum", fn:"Cuneus. Early visual cortex above the calcarine sulcus, handling the lower half of the visual field."},
  Lingual:           {tier:"cerebrum", fn:"Lingual gyrus. Early visual cortex below the calcarine sulcus, carrying the upper visual field, colour and word form."},
  Occipital_Sup:     {tier:"cerebrum", fn:"Superior occipital gyrus, an early station on the dorsal stream that tracks where things are and how they move."},
  Occipital_Mid:     {tier:"cerebrum", fn:"Middle occipital gyrus. Motion and form, and the junction where the dorsal and ventral visual streams part company."},
  Occipital_Inf:     {tier:"cerebrum", fn:"Inferior occipital gyrus, feeding the ventral stream that turns shapes into recognised objects."},
  Fusiform:          {tier:"cerebrum", fn:"Fusiform gyrus. Recognises faces, and on the left the visual form of written words."},

  /* ── midbrain · limbic ────────────────────────────────────────────── */
  Olfactory:         {tier:"midbrain", fn:"Olfactory cortex. Smell is the one sense that reaches the cortex without passing through the thalamus first."},
  Frontal_Med_Orb:   {tier:"midbrain", fn:"Medial orbitofrontal cortex. Puts a value on an outcome, and updates it when the outcome changes."},
  Rectus:            {tier:"midbrain", fn:"Gyrus rectus, on the underside of the frontal lobe alongside the olfactory tract; part of the ventromedial prefrontal territory tied to social judgement."},
  Insula:            {tier:"midbrain", fn:"Insula, folded away under the operculum. Reads the state of the body — heartbeat, breath, gut, pain — and turns it into feeling. Its anterior end flags what matters now."},
  Cingulum_Ant:      {tier:"midbrain", fn:"Anterior cingulate. Registers conflict, effort and error, and prices how much a thing is costing to do."},
  Cingulum_Mid:      {tier:"midbrain", fn:"Middle cingulate. Links pain and negative outcomes to the actions that would avoid them."},
  Cingulum_Post:     {tier:"midbrain", fn:"Posterior cingulate. Hub of the default network, and the region whose activity most reliably marks a mind turned inwards."},
  Hippocampus:       {tier:"midbrain", fn:"Hippocampus. Lays down new episodic memory and maps space; without it, experience stops being recorded."},
  ParaHippocampal:   {tier:"midbrain", fn:"Parahippocampal gyrus. The corridor into the hippocampus, and where the scene around you is recognised as a place."},
  Amygdala:          {tier:"midbrain", fn:"Amygdala. Detects threat and emotional significance, and stamps a memory with how much it mattered."},
  Temporal_Pole_Sup: {tier:"midbrain", fn:"Superior temporal pole. Paralimbic cortex binding sound and language to emotion and social meaning."},
  Temporal_Pole_Mid: {tier:"midbrain", fn:"Middle temporal pole. Semantic memory for people and concepts, and one of the first regions lost in semantic dementia."},

  /* ── reptilian core ───────────────────────────────────────────────── */
  Caudate:           {tier:"reptilian", fn:"Caudate nucleus. Learns which action leads to which outcome, and is the striatal end of the loops that start and stop behaviour."},
  Putamen:           {tier:"reptilian", fn:"Putamen. Turns a practised sequence into a habit that runs without supervision."},
  Pallidum:          {tier:"reptilian", fn:"Globus pallidus. The basal ganglia's output gate — it holds movement in check, and releases what is selected."},
  Thalamus:          {tier:"reptilian", fn:"Thalamus. Almost everything the cortex knows arrives through here; it relays and gates, and decides what gets through at all."},
  Cerebelum_Crus1:   {tier:"reptilian", fn:"Cerebellar Crus I. Connected to prefrontal cortex — this part of the cerebellum works on thought and language, not movement."},
  Cerebelum_Crus2:   {tier:"reptilian", fn:"Cerebellar Crus II. With Crus I, the cognitive cerebellum, tied to working memory and language."},
  Cerebelum_3:       {tier:"reptilian", fn:"Cerebellar lobule III. Part of the anterior lobe, working on the limbs and posture."},
  Cerebelum_4_5:     {tier:"reptilian", fn:"Cerebellar lobules IV–V. The anterior sensorimotor cerebellum, refining the timing and force of movement."},
  Cerebelum_6:       {tier:"reptilian", fn:"Cerebellar lobule VI. Sensorimotor and cognitive both, and heavily involved in speech."},
  Cerebelum_7b:      {tier:"reptilian", fn:"Cerebellar lobule VIIb, on the cognitive side of the cerebellum's division of labour."},
  Cerebelum_8:       {tier:"reptilian", fn:"Cerebellar lobule VIII. A second sensorimotor map, mirroring the anterior lobe's."},
  Cerebelum_9:       {tier:"reptilian", fn:"Cerebellar lobule IX. Vestibular and default-network connected, tied to balance and to self-motion."},
  Cerebelum_10:      {tier:"reptilian", fn:"Cerebellar lobule X, the flocculonodular lobe — the oldest part, holding the eyes steady as the head moves."},
  Vermis_1_2:        {tier:"reptilian", fn:"Vermis I–II, at the top of the midline strip that runs between the two cerebellar hemispheres."},
  Vermis_3:          {tier:"reptilian", fn:"Vermis III. Midline cerebellum, working on the trunk rather than the limbs."},
  Vermis_4_5:        {tier:"reptilian", fn:"Vermis IV–V. Posture and the muscles that hold the body upright."},
  Vermis_6:          {tier:"reptilian", fn:"Vermis VI. Eye movement and the coordination of gaze."},
  Vermis_7:          {tier:"reptilian", fn:"Vermis VII. Part of the oculomotor vermis, tuning the accuracy of a saccade."},
  Vermis_8:          {tier:"reptilian", fn:"Vermis VIII. Midline cerebellum for gait and the rhythm of walking."},
  Vermis_9:          {tier:"reptilian", fn:"Vermis IX. Vestibular midline, tied to balance and to the sense of which way is up."},
  Vermis_10:         {tier:"reptilian", fn:"Vermis X, the nodulus. Vestibular processing at the cerebellum's oldest core."}
};

return { TIERS: TIERS, NOTES: NOTES };
})();
