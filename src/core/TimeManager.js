import * as THREE from "three";

export class TimeManager {
  constructor() {
    this.clock = new THREE.Clock();
  }
  getDelta() {
    // Capping at 0.1 prevents the physics from exploding if you switch browser tabs
    return Math.min(this.clock.getDelta(), 0.1);
  }
}
