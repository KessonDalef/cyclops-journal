// The Nature of Code
// Daniel Shiffman
// http:/natureofcode.com

function Particle(gp, w) {

  //this.position = createVector(random(width*0.25, width*0.35), random(height*0.35, height*0.375));
  //this.position = createVector(random(width*0.4, width*0.6), b);
  //this.position = createVector(width/2, b);
  this.position = createVector(gp + random(width*0.1), random(height*0.35, height*0.375));
  this.velocity = createVector(random(-4, -2),0);
  this.acceleration = createVector(0,0);
  this.mass = random(4, 8);
  this.dead = false;
  this.psize = w/1920;

  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.display = function(alpha) {
    stroke(255, alpha);
    strokeWeight(this.psize);
    noFill();
    point(this.position.x,this.position.y);
  }

  this.checkEdges = function() {

    if (position.x > width || position.x < 0) {
      this.dead = true;
    }

    if (position.y > height) {
      velocity.y *= -1;
      position.y = height;
    }
  }
}
