/* Cut the volume render open, and look inside.

   A 3D render shows the outside of the head. This adds three cuts through
   it — one per anatomical plane — so the scan inside can be seen where the
   surface has been taken away. The sliders sit in the 3D box itself rather
   than in the rail beside it, so the cut and the control that makes it are
   in the same frame.

   Shared by every page carrying a volume render, so the tool behaves the
   same wherever it appears. Wire one up with:

     MN_SLICE.attach({ stage: <.mri-stage>, tools: <.view-tools>, nv: <Niivue> });

   Meshes are not clipped by this — clip planes act on the volume only —
   so a page whose 3D view is a tractogram gets nothing useful from it. */
window.MN_SLICE = (function(){

/* Each cut is a plane whose normal is fixed by an azimuth and elevation;
   the slider moves it along that normal. Named for the plane the cut
   exposes, which is what someone reading a scan expects. */
var AXES = [
  {id:"sag", label:"Sagittal", aziElev:[ 90,  0], hint:"left – right"},
  {id:"cor", label:"Coronal",  aziElev:[  0,  0], hint:"front – back"},
  {id:"ax",  label:"Axial",    aziElev:[  0, 90], hint:"top – bottom"}
];

/* A slider at the open end contributes no plane at all, so a cut has to be
   asked for rather than being on by default the moment the tool opens. */
var OPEN = 1, SHUT = -1, STEP = 0.02;

function attach(o){
  var stage = o.stage, tools = o.tools, nv = o.nv;
  if (!stage || !tools || !nv) return null;

  var depths = AXES.map(function(){ return OPEN; });
  var on = false;

  /* The viewer paints a translucent sheet over the cut face by default,
     which is the opposite of the point — the cut is there to show the scan
     underneath it, so the sheet is made fully transparent. */
  try{ nv.setClipPlaneColor([0, 0, 0, 0]); }catch(e){}

  var panel = document.createElement("div");
  panel.className = "slice-panel";

  var rows = AXES.map(function(ax, i){
    var name = document.createElement("span");
    name.className = "ax"; name.textContent = ax.label;

    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(SHUT); slider.max = String(OPEN); slider.step = String(STEP);
    slider.value = String(OPEN);
    slider.setAttribute("aria-label", ax.label + " cut, " + ax.hint);

    var val = document.createElement("span");
    val.className = "val"; val.textContent = "open";

    slider.addEventListener("input", function(){
      depths[i] = Number(slider.value);
      val.textContent = depths[i] >= OPEN - 1e-9 ? "open" : depths[i].toFixed(2);
      apply();
    });

    panel.appendChild(name); panel.appendChild(slider); panel.appendChild(val);
    return {slider: slider, val: val};
  });

  stage.appendChild(panel);

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ts-btn slice-btn";
  btn.textContent = "Slice";
  btn.setAttribute("aria-pressed", "false");
  /* before the Centre planes button, which holds the right-hand end */
  var centre = tools.querySelector(".centre-btn");
  if (centre) tools.insertBefore(btn, centre); else tools.appendChild(btn);

  function planes(){
    if (!on) return [];
    var out = [];
    for (var i = 0; i < AXES.length; i++){
      if (depths[i] >= OPEN - 1e-9) continue;      /* this cut is not asked for */
      out.push([depths[i], AXES[i].aziElev[0], AXES[i].aziElev[1]]);
    }
    return out;
  }

  function apply(){
    try{ nv.setClipPlanes(planes()); }
    catch(e){ /* an older viewer without multi-plane clipping simply does nothing */ }
  }

  function setOn(next){
    on = next;
    panel.classList.toggle("on", on);
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
    apply();
  }

  btn.addEventListener("click", function(){ setOn(!on); });

  return {
    open: function(){ setOn(true); },
    close: function(){ setOn(false); },
    reset: function(){
      depths = AXES.map(function(){ return OPEN; });
      rows.forEach(function(r){ r.slider.value = String(OPEN); r.val.textContent = "open"; });
      apply();
    }
  };
}

return { attach: attach, AXES: AXES };
})();
