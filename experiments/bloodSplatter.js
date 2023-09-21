let v = [];
let particles = [];
let flowField;
let scl = 40;
let cols, rows;
let inc = 0.01;
let zoff = 0.001;
let paused = false;
const weight = 1.7;

const synth = new Tone.Synth().toDestination();
const now = Tone.now();
let timeLastPlayed;
const devilScale = ['C4', 'C#3', 'E3', 'F#4', 'G4', 'A4'];
const noteLength = ['2n', '4n', '8n'];
let velocity;

function setup() {
  createCanvas(500, 500);
  cols = floor(innerWidth / scl);
  rows = floor(innerHeight / scl);
  fr = createP('');
  timeLastPlayed = 0;
  flowField = new Array(cols * rows);

  const reverb = new Tone.Reverb(1).toDestination();
  const dist = new Tone.Distortion(1)
  const dist2 = new Tone.Distortion(1)
  const crusher = new Tone.BitCrusher(1);
  const vol = new Tone.Volume(-30).toDestination();
  const autoWah = new Tone.AutoWah(50, 5, 0).toMaster();
  synth.oscillator.type = 'sawtooth';
  synth.connect(autoWah);
  synth.connect(dist);
  synth.connect(dist2);
  synth.connect(crusher);
  synth.connect(reverb);
  synth.connect(vol);
  velocity = 0.05;

  for (var i = 0; i < 15; i++) {
    particles[i] = new Particle();
  }

  background(255);
}

function draw() {
  let yoff = 0.002;
 
  if(timeLastPlayed%9==0){
    synth.envelope.velocity = velocity;
    synth.triggerAttackRelease(devilScale[(floor(random(0,5)))], noteLength[floor(random(0,2))]);
    velocity += 0.05;
    velocity = velocity%1;
  }
  timeLastPlayed++;


  for (let y = 0; y < rows; y++) {
    let xoff = 0.001;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      xoff += inc;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
    }
    yoff += inc;
    zoff += 0.0005;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

setTimeout(() => {
  noLoop();
}, 15000);

class Particle {

  constructor(_pos, _vel, _acc) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(random(80,255), 10, random(0,10), 255);
    strokeWeight(weight*random(0.05,5));
    if(floor(random(1,4)) == 1){
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
}

function keyPressed() {
  if (keyCode === 82) {
    clear();
    background(255);
  }
  if (keyCode === 32 && paused == false) {
    noLoop();
    paused = true;
  } else {
    loop();
    paused = false;
  }
}
