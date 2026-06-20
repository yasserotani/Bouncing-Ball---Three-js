export class CollisionEngine {
  constructor(restitution = 0.8) {
    this.restitution = restitution; // How much energy is kept (0 to 1)
  }

  handleFloorCollision(ball) {
    if (ball.y - ball.radius <= 0) {
      // Floor is at y = 0
      ball.y = ball.radius; // Prevent sinking
      ball.velocity = Math.abs(ball.velocity) * this.restitution; // Bounce up

      // Return true only if it's a hard bounce, preventing infinite micro-bounces
      if (ball.velocity > 1.0) return true;
    }
    return false;
  }
}
