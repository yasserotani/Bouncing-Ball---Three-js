import * as THREE from "three";

export function createCradleFrame() {
  // Create an invisible group to hold all frame parts together
  const frameGroup = new THREE.Group();

  // --- 1. THE WOODEN BASE ---
  // A wide, flat box: Width(x)=12, Height(y)=0.5, Depth(z)=6
  const baseGeo = new THREE.BoxGeometry(12, 0.5, 6);
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: "#8B5A2B", // Brown color
    roughness: 0.9,
  });
  const baseMesh = new THREE.Mesh(baseGeo, woodMaterial);

  // Vector math: The floor is at y=0. We push it down slightly so the balls don't clip through it.
  baseMesh.position.set(25, -0.25, 0);
  frameGroup.add(baseMesh);

  // --- 2. THE METAL PILLARS ---
  // Tall, thin cylinders: RadiusTop=0.2, RadiusBottom=0.2, Height(y)=10
  const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 10, 20);
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: "#aaaaaa",
    metalness: 0,
    roughness: 0.2,
  });

  // Left Pillar
  const leftPillar = new THREE.Mesh(pillarGeo, metalMaterial);
  // Vector math: Move left (x = -5), move up so it rests on the base (y = 5)
  leftPillar.position.set(20, 5, 0);
  frameGroup.add(leftPillar);

  // Right Pillar
  const rightPillar = new THREE.Mesh(pillarGeo, metalMaterial);
  // Vector math: Move right (x = 5), move up (y = 5)
  rightPillar.position.set(30, 5, 0);
  frameGroup.add(rightPillar);

  return frameGroup;
}
