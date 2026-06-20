import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createCradleFrame } from "../graphics/Frame";

export const scene = new THREE.Scene();
const sizes = { width: window.innerWidth, height: window.innerHeight };

export const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  300,
);
camera.position.set(0, 10, 30);
scene.add(camera);

const canvas = document.querySelector(".webgl");
export const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

export const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Add a physical floor
const floorGeo = new THREE.PlaneGeometry(30, 30);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x333333,
  roughness: 0.8,
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);
// ... inside your setup code ...
const cradleFrame = createCradleFrame();
scene.add(cradleFrame);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
