import GUI from "lil-gui";

export class UIManager {
  constructor(physics, collider, orbitControls) {
    this.container = document.getElementById("ui-container");
    this.bounceCount = 0;

    this.physics = physics;
    this.collider = collider;
    this.orbitControls = orbitControls;

    this.cradleParams = {
      numberOfBalls: 5,
      stringLength: 10,
      distance: 2,
      startSpeed: 0,
    };

    // NEW: We create an object to hold our button actions
    this.actions = {
      restartSim: () => {
        this.physics.reset(this.cradleParams.startSpeed); // 1. Reset the math coordinates
        this.resetBounceCount(); // 2. Reset the text counter
      },
    };
  }

  init() {
    this.container.innerHTML = `
            <h3 style="margin:0 0 10px 0;">Physics Engine</h3>
            <p style="margin:0;">Floor Impacts: <strong id="bounces">0</strong></p>
        `;

    const gui = new GUI({ title: "Control Panel" });

    // NEW: Add the button to the top of the GUI
    gui.add(this.actions, "restartSim").name("إسقاط الكرة (Drop Ball)");

    const sceneFolder = gui.addFolder("التحكم بالمشهد");
    this.orbitControls.autoRotate = true;
    sceneFolder
      .add(this.orbitControls, "autoRotateSpeed", 0, 20)
      .name("سرعة الكاميرا");

    //---
    const ballsFolder = gui.addFolder("التحكم بالكرات");
    ballsFolder.add(this.physics.ball, "radius", 1, 5).name("وزن الكرات");

    ballsFolder.add(this.physics.ball, "y", 1, 50).name("hieght");
    this.cradleParams.startSpeed = 0;
    ballsFolder
      .add(this.cradleParams, "startSpeed", -50, 50)
      .name("سرعة الانطلاق");

    ballsFolder
      .add(this.collider, "restitution", 0.1, 1.2)
      .name("معامل الارتداد");
    // ballsFolder
    //   .add(this.cradleParams, "numberOfBalls", 1, 10, 1)
    //   .name("عدد الكرات");

    // ballsFolder.add(this.cradleParams, "stringLength", 5, 20).name("طول الحبل");

    // ballsFolder.add(this.cradleParams, "distance", 0, 5).name("مسافة الكرات");

    //---
    const envFolder = gui.addFolder("التحكم بالبيئة");
    envFolder.add(this.physics, "gravity", -100, -5).name("الجاذبية");
  }

  updateBounceCount() {
    this.bounceCount++;
    document.getElementById("bounces").innerText = this.bounceCount;
  }

  // NEW: Function to reset the HTML text
  resetBounceCount() {
    this.bounceCount = 0;
    document.getElementById("bounces").innerText = this.bounceCount;
  }
}
