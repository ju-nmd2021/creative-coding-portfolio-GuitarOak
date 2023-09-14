let tree = [];
let leaves = [];
let note;
const bMScale = ['B4', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4','B3', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A5'];
const synth = new Tone.Synth().toDestination();
class Branch {
  constructor(startPos, velocity, timerStart) {
    this.start = startPos.copy();
    this.end = startPos.copy();
    this.vel = velocity.copy();
    this.timerStart = timerStart;
    this.timer = this.timerStart;
    this.growing = true;
  }

  update() {
    if (this.growing) {
      this.end.add(this.vel);
    }
  }

  show() {
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);

  }

  timeToBranch() {
    this.timer--;
    if (this.timer < 0 && this.growing) {
      this.growing = false;
      return true;
    } else {
      return false;
    }
  }

  branch(angle) {
    let theta = this.vel.heading();
    let mag = this.vel.mag();
    theta += radians(angle);
    let newVel = p5.Vector.fromAngle(theta);
    newVel.setMag(mag);
    
    return new Branch(this.end, newVel, this.timerStart * 0.66);
 
  }
}
class Leaf {
  constructor(position) {
    this.pos = position.copy();
  }

  show() {
    noStroke();
    fill(50, 100);
    circle(this.pos.x, this.pos.y, 4);
  }
}

function setup() {
  note = 0;
  createCanvas(640, 240);
  background(255);
  let start = createVector(width / 2, height);
  let dir = createVector(0, -1);

  let b = new Branch(start, dir, 80);
  synth.oscillator.type = 'sawtooth';
  synth.triggerAttackRelease(bMScale[note],'16n');
  note++;
  
  tree.push(b);
}

function draw() {
  background(255);

  for (let i = tree.length - 1; i >= 0; i--) {
    let b = tree[i];
    b.update();
    b.show();
    
    if (b.timeToBranch()) {
      if (tree.length < 1024) {
        synth.triggerAttackRelease(bMScale[note],'16n');
        if(note<13){
          note++;
        }
        tree.push(b.branch(30)); 
        tree.push(b.branch(-25)); 
      } else {
        leaves.push(new Leaf(b.end));
      }
    }
  }

  for (let leaf of leaves) {
    leaf.show();
  }
}
