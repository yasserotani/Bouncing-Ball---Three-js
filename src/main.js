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
import { createCradleFrame } from "./graphics/Frame.js";
// 1. Initialize Graphics
setupLighting(scene);
const ballMesh = createBall(2);
scene.add(ballMesh);
// 2. Initialize Physics Engine
const physics = new PhysicsMath(20);
const collider = new CollisionEngine(0.85); // 0.85 means it loses 15% energy per bounce

// 3. Initialize Core Systems
const timeManager = new TimeManager();
const audioManager = new AudioManager();
// NEW: Pass the engines into the UI Manager!
const uiManager = new UIManager(physics, collider, controls);
const animController = new AnimationController();

uiManager.init();

// 4. The Main Loop
function tick() {
  const dt = timeManager.getDelta();

  // A. Do Math (Gravity)
  physics.update(dt);
  // B. Check Collisions (Floor Impact)
  const didHitFloor = collider.handleFloorCollision(physics.ball);
  if (didHitFloor) {
    audioManager.playBounce();
    uiManager.updateBounceCount();

    // NEW: نمرر سرعة الكرة الحالية هنا قبل أن يصفّرها الارتداد أو يعكسها
    animController.triggerSquish(ballMesh, physics.ball.velocity);
  }

  // C. Sync Math Coordinates to 3D Mesh
  syncVisuals(ballMesh, physics);

  // D. Render Frame
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
