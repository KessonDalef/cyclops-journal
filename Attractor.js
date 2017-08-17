// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A class for a draggable attractive body in our world

function Attractor(p) {
  this.mass = 20;    // Mass, tied to size
  this.G = 1;      // Gravitational Constant
  this.position = createVector(p.x, p.y);   // position
  this.dragging = false; // Is the object being dragged?
  this.rollover = false; // Is the mouse over the ellipse?
  this.dragOffset = createVector(0.0,0.0);  // holds the offset for when object is clicked on

  this.attract = function(m) {
    var force = p5.Vector.sub(this.position, m.position);   // Calculate direction of force
    var d = force.mag();                              // Distance between objects
    d = constrain(d,5.0,25.0);                          // Limiting the distance to eliminate "extreme" results for very close or very far objects
    force.normalize();                                  // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    var strength = (this.G * this.mass * m.mass) / (d * d);     // Calculate gravitional force magnitude
    force.mult(strength);     // Get force vector --> magnitude * direction
    return force;
  }

  this.updateCenter = function(p) {
    this.position = p;
  }
}
