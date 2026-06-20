export class PhysicsMath {
  constructor(y = 15) {
    this.gravity = -30.0;
    this.y = y;
    this.ball = { y: this.y, velocity: 0, radius: 2 };
  }

  // NEW: The reset function
  reset(initSpeed = 0) {
    this.ball.velocity = initSpeed; // Accept the speed from the UI!
    this.ball.y = this.y; // Teleport back to the top
  }

  update(dt) {
    //𝑎=Δ𝑣/Δ𝑡  => Δ𝑣 = a.Δ𝑡 => v(new) = v(old) + a.Δ𝑡
    this.ball.velocity = this.ball.velocity + this.gravity * dt;
    //𝑣=Δ𝑥/Δ𝑡  => Δ𝑥 = v·Δ𝑡 => x(new) = x(old) + v·Δ𝑡
    this.ball.y = this.ball.y + this.ball.velocity * dt;
  }
}
