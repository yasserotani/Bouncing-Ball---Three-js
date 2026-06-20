export function syncVisuals(threeMesh, physicsData) {
  // 1. Sync Position
  threeMesh.position.y = physicsData.ball.y;

  // 2. Sync Size (The original 3D sphere has a radius of 2. We scale it based on the new math radius)
  const scaleFactor = physicsData.ball.radius / 2;
  threeMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
}
