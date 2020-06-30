// -- Define Inputs --
const posterNum = 2;
let wordToDisplay = "Joseph"
const fontSize = 180;

// -- Declare Variables --
let pg;
let pgText;
let mainFont = 'Helvetica';
let waveX;
let waveY;


// Dimensions
let posterW = 586;
let posterH = 810;
let borderX = 157;
let borderY = 46;

// Colours (defined in setup())
let bg;
let fg;
let colorBehind; // background behind poster (if you have borders)
let accent;

// Motion
let rangeX = 100;
let rangeY = 50;
let acc = 3;

// -- p5 functions --

function preload() {
  designPreload();
}

function setup() {

  setupSketch();

  createCanvas(posterW + 2 * borderX, posterH + 2 * borderY);

  // poster graphic element
  pg = createGraphics(posterW, posterH);

  // animated text graphic element
  pgText = createGraphics(pg.width, pg.height * 1.5);

  // Colours
  bg = color('#27221F');
  fg = color('#F2F1F4');
  colorBehind = color('#dddddd'); // background behind poster
  accent = color('#fcc25a');
}

function draw() {
  textFont('Helvetica');
  pgText.textFont(mainFont);
  pgText.fill(fg);
  // pgText.background(bg);
  pgText.textSize(fontSize);
  pgText.push();
  //pgText.translate(0,600);
  pgText.translate(100, 400);
  pgText.rotate(radians(45));
  pgText.textAlign(LEFT, TOP);
  pgText.text(wordToDisplay, 0, 0);
  pgText.pop();


  // Main poster

  pg.background(bg);
  addTitles(pg, posterNum);

  /*=========================
    POSTER START
    =========================*/

  // Set up grid to slice text
  let cellsX = 6;
  let cellsY = 1;

  let cellW = int(pgText.width / cellsX);
  let cellH = int(pgText.height / cellsY);


  // Grid slicing loop
  for (let y = 0; y < cellsY; y++) {
    for (let x = 0; x < cellsX; x++) {

      // MOTION

      waveX = int(map(sin(radians(frameCount * acc + ((x * 10) + (y * 10)))), -1, 1, -rangeX, rangeX));
      waveY = int(map(tan(radians(frameCount * acc + ((x * x * 10) + (y * y * 12)))) *
        tan(radians(frameCount * acc) + 13) *
        cos(radians(frameCount / 13 * acc * acc)),
        -1, 1, rangeY, -rangeY));


      // Motion uses copy() to paste text (not visible) onto poster (visible)
      // Cells are copied from coordinates that vary with motion defined above.

      // SOURCE
      let sx = x * cellW + waveX;
      let sy = y * cellH + waveY;
      let sw = cellW;
      let sh = cellH;

      // DESTINATION
      let dx = x * cellW;
      let dy = y * cellH;
      let dw = cellW;
      let dh = cellH;

      pg.push();
      pg.rotate(radians(-45));
      pg.translate(-500, 0);
      pg.copy(pgText, sx, sy, sw, sh, dx, dy, dw, dh);
      pg.pop();
      //println(frameRate);

    }
  }

  // console.log(frameRate());




  /*=========================
    POSTER END
    =========================*/




  background(colorBehind);

  push();
  translate(width / 2, height / 2);
  image(pg, 0, 0);
  pop();
}



/*==========================
  ======= FRAMEWORK ========
  ==========================*/
// Set up some standard elements. 
// !! Some of framework moved to main sketch during port from Processing. !!
// TODO: Separate framework from poster-specific elements




/* ==============================
   SETUP
   ============================== */

function setupSketch() {
  imageMode(CENTER);
  // let pg = createGraphics(posterW, posterH);
  // shapeMode(CENTER);
  // textMode(SHAPE);
  noCursor();
  noStroke();
  ellipseMode(CENTER);

}


/* ==============================
   Design 
   ============================== */

function designPreload() {
  // brandFont = loadFont('Aileron'); // 'Aileron', sans-serif

}

function addTitles(_pg, _posterNum) {

  let brandFontSize = 15;
  let brandLineHeight = brandFontSize; //11;
  let padding = brandFontSize; //11;
  let numCols = 3;

  let colWidth = round(posterW / numCols);

  _pg.textFont(mainFont);
  _pg.fill(fg);
  _pg.textFont(mainFont, brandFontSize);
  _pg.textAlign(LEFT, TOP);
  _pg.fill(fg);

  _pg.push();
  _pg.translate(colWidth * 0 + padding, padding);
  _pg.text("Joseph Hornby", 0, 0);
  //_pg.text("Design",0,brandLineHeight);
  _pg.pop();

  _pg.push();
  _pg.translate(colWidth * 1 + padding, padding);
  _pg.text("Generative Design", 0, 0);
  //_pg.text("Poster Series",0,brandLineHeight);
  _pg.text("", 0, brandLineHeight);
  _pg.pop();

  _pg.push();
  _pg.translate(colWidth * 2 + padding, padding);
  _pg.text("Poster " + nf(_posterNum, 2), 0, 0);
  _pg.pop();
}