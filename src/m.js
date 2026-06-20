import { scene, camera, renderer, controls } from "./graphics/SceneSetup.js";
import { createBall } from "./graphics/Spheres.js";
import { setupLighting } from "./graphics/Lighting.js";
import { PhysicsMath } from "./physics/PhysicsMath.js";
import { CollisionEngine } from "./physics/CollisionEngine.js";
import { syncVisuals } from "./animation/StateSync.js";
import { AnimationController } from "./animation/AnimationController.js";
import { TimeManager } from "./core/TimeManager.js";
import { AudioManager } from "./core/AudioManager.js";
import { UIManager } from "./core/UIManager.js";
// 1. Initialize Graphics
setupLighting(scene);
const ballMesh = createBall(2);
scene.add(ballMesh);

// 2. Initialize Physics Engine
const physics = new PhysicsMath(100);
const collider = new CollisionEngine(0.85);

// 3. Initialize Core Systems
const timeManager = new TimeManager();
const audioManager = new AudioManager();

// ui manager
const uiManager = new UiManager(physics, collider, controls);

const animController = new AnimationController();
uiManager.init();
// 4. The main loop
function tick() {
  const dt = timeManager.getDelta();

  // math
  physics.update(dt);
  // check collision
  const didHitFloor = collider.handleFloorCollision(physics.ball);

  if (didHitFloor) {
    audioManager.playBounce();
    uiManager.updateBounceCount();

    animController.triggerSquish(ballMesh, physics.ball.velocity);
  }

  //sycn the changes
  syncVisuals(ballMesh, physics);

  //rednder
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
