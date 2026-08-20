/* The wheel zooms a 3D view.

   The viewer's own wheel handling moves the 2D pan zoom, which a box showing
   nothing but a render has no use for — so over a 3D box the wheel appeared
   to do nothing. This drives the 3D scale directly instead, and cancels the
   page scroll so the two do not fight.

   The listener is attached on the capture phase: the viewer stops the event
   propagating from its own canvas, so a listener waiting for the bubble
   would never hear it.

     MN_WHEEL.attach({ stage: <.mri-stage>, nv: <Niivue>, onZoom: fn });

   onZoom, if given, is handed the new scale — a page carrying its own zoom
   slider can follow along. */
window.MN_WHEEL = (function(){

var MIN = 0.3, MAX = 4, STEP = 1.12;

function attach(o){
  var stage = o.stage, nv = o.nv;
  if (!stage || !nv) return null;

  stage.addEventListener("wheel", function(e){
    e.preventDefault();
    if (!nv.scene) return;
    var now = Number(nv.scene.volScaleMultiplier) || 1;
    var next = e.deltaY > 0 ? now / STEP : now * STEP;
    next = Math.max(MIN, Math.min(MAX, next));
    if (next === now) return;
    nv.scene.volScaleMultiplier = next;
    nv.drawScene();
    if (o.onZoom) o.onZoom(next);
  }, {capture: true, passive: false});

  return {
    set: function(v){
      var next = Math.max(MIN, Math.min(MAX, Number(v) || 1));
      nv.scene.volScaleMultiplier = next;
      nv.drawScene();
      return next;
    }
  };
}

return { attach: attach, MIN: MIN, MAX: MAX };
})();
