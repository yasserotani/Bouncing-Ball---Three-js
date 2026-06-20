import * as THREE from "three";

export function createBall(radius) {
  // 1. Create the invisible parent group
  const ballGroup = new THREE.Group();

  // 2. Create the actual visual mesh
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: "#0becb4",
    roughness: 0.2,
    metalness: 0.3,
  });

  // We attach the mesh to the group property so we can easily find it later
  ballGroup.mesh = new THREE.Mesh(geometry, material);

  // 3. Put the mesh inside the group
  ballGroup.add(ballGroup.mesh);

  // Return the group to the main file
  return ballGroup;
}
