var attractor;

var center_gravity;

var particles = [];
var maxparticles;
var generationspeed;
var generationposition;
var particlesAlpha;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, 'webgl');
  center_gravity.x = width / 2;
  center_gravity.y = height / 2;
  attractor.updateCenter(center_gravity);
  background(0);
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  phoneDetect();

  generationposition = random(width * 0.35, width * 0.75);
  center_gravity = createVector(width / 2, height / 2);

  attractor = new Attractor(center_gravity);

  topspeed = 10 + Math.random() * 20;
  numpoints = 1024;
  pointsdimension = 0.5 + Math.random();
  center_gravity = createVector(width / 2, height / 2);

  background(0);
}

function draw() {
  fill(0, 40);
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height / 2, width, height);

  if (frameRate() > 31 && particles.length < maxparticles && frameCount % generationspeed === 0) {
    var p = new Particle(generationposition, width);
    particles.push(p);
  }

  for (var i = 0; i < particles.length; i++) {
    var force = attractor.attract(particles[i]);
    particles[i].applyForce(force);
    particles[i].update();
    particles[i].display(particlesAlpha);

    if (particles[i].dead) {
      particles.splice(i, 1);
    }
  }
}

function move() {
  for (var i = 0; i < particles.length; i++) {
    acceleration[i] = p5.Vector.sub(center_gravity, particles[i]);
    acceleration[i].normalize();
    acceleration[i].mult(0.5);
    velocity[i].add(acceleration[i]);
    velocity[i].limit(topspeed);
    particles[i].add(velocity[i]);
  }
}

function view() {
  for (var i = 0; i < particles.length; i++) {
    stroke(255, flash);
    strokeWeight(5);
    point(particles[i].x, particles[i].y);
  }
}

function phoneDetect() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    maxparticles = 2000;
    generationspeed = 2;
    particlesAlpha = 255;
  } else {
    maxparticles = 4000;
    generationspeed = 1;
    particlesAlpha = 150;
  }
}
