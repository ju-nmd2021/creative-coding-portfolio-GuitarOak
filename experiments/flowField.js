let v = [];
let particles = [];
let flowField;
let scl = 10;
let cols, rows;
let inc = 0.1;
let zoff = 0.001;
let paused = false;
const weight = 1.7;
const synth = new Tone.Synth().toDestination();
const bass = new Tone.Synth().toDestination();
const counter = new Tone.Synth().toDestination();
const now = Tone.now();
let timeLastPlayed;
let bar;
const bMScale = ['B4', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4','B3', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A5'];

function setup() {
  bar = 1;
  createCanvas(500, 500);
  cols = floor(innerWidth / scl);
  rows = floor(innerHeight / scl);
  fr = createP('');
  
  timeLastPlayed = 0; 
  const reverb = new Tone.Reverb(0.75).toDestination();
  const bassEQ = new Tone.EQ3(10,3,-20);
  const bassDist = new Tone.Distortion(0.8);
  const volume = new Tone.Volume(-10);
  synth.oscillator.type = 'sawtooth';
  bass.oscillator.type = 'sawtooth';
  counter.oscillator.type = 'square';


  bass.connect(bassDist);
  bass.connect(bassEQ);
  bass.connect(reverb);
  synth.connect(reverb);
  counter.connect(reverb);
  counter.connect(volume);
  flowField = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }

  background(201);
}

function draw() {
  let yoff = 0;
  timeLastPlayed++;
 
  if (timeLastPlayed % 10 == 0) {
    synth.triggerAttackRelease(bMScale[floor(random(0, 13))], '8n');
  }
  if(timeLastPlayed%40 == 0){
    counter.triggerAttackRelease(bMScale[floor(random(6, 13))], '16n');
  }
  if(timeLastPlayed%80==0){
    if(bar==1){
      bass.triggerAttackRelease('B1', '2n'); 
    }if(bar==2){
      bass.triggerAttackRelease('D2', '2n');
    }if(bar==3){
      bass.triggerAttackRelease('A1', '2n'); 
    }if(bar==4){
      bass.triggerAttackRelease('G2', '2n'); 
      bar = 0;
    }
    bar++;
  }

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
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
}, 50000);

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
    stroke(1, 1, random(0, (frameRate() * random(1, 8)) % 255), 4);
    strokeWeight(weight);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
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
    background(201);
  }
  if (keyCode === 32 && paused == false) {
    noLoop();
    paused = true;
  } else {
    loop();
    paused = false;
  }
}
