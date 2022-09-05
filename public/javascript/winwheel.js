let wheelSpinning = false;

//function to create and style wheel
const wheel = new Winwheel({
    'numSegments'    : 4,
    'outerRadius'    : 212,
    'textFontSize'   : 28,
    'segments'       :
    [
      {'fillStyle' : '#eae56f', 'text' : 'Dishes'},
      {'fillStyle' : '#89f26e', 'text' : 'Vaccum'},
      {'fillStyle' : '#7de6ef', 'text' : 'Clean Bathroom'},
      {'fillStyle' : '#e7706f', 'text' : 'Yardwork'}
    ],
    'animation' :
    {
      'type'     : 'spinToStop',
      'duration' : 5,
      'spins'    : 8
    }
  });

//function to handle onClick event
function startSpin() {
    if (wheelSpinning === false) {
        wheel.startAnimation();
    } else
    wheelSpinning = true;
    return;
}

function resetWheel() {
    wheel.stopAnimation(false);
    wheel.rotationAngel = 0;
    wheel.draw();

    wheelSpinning = false;
}