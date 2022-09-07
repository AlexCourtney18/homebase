let theWheel = new Winwheel({
    'outerRadius': 110,
    'centerX': 200,
    'centerY': 201,
    'numSegments': 6,
    'textFontFamily': 'Lucida',
    'segments':
      [
        { 'fillStyle': '#e3f1e2', 'text': 'Sweep' },
        { 'fillStyle': '#6BBC83', 'text': 'Laundry' },
        { 'fillStyle': '#D2DCD3', 'text': 'Lawncare' },
        { 'fillStyle': '#91BFBC', 'text': 'Bathroom' },
        { 'fillStyle': '#badabf', 'text': 'Groceries' },
        { 'fillStyle': '#41635E', 'text': 'Dishes' },
      ],
    'animation':                   // Note animation properties passed in constructor parameters.
    {
      'type': 'spinToStop',  // Type of animation.
      'duration': 5,             // How long the animation is to take in seconds.
      'spins': 8              // The number of complete 360 degree rotations the wheel is to do.
    }
});