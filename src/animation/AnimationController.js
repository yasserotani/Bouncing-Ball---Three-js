import gsap from "gsap";

export class AnimationController {
  triggerSquish(ballGroup, velocity) {
    // 1. إيقاف أي حركات سابقة لمنع التداخل
    gsap.killTweensOf(ballGroup.mesh.scale);

    // 2. تحويل السرعة إلى قيمة موجبة لأن السرعة أثناء السقوط تكون سالبة
    const speed = Math.abs(velocity);

    // 3. حساب تأثير السرعة على الانضغاط (Dynamic Factor)
    // نقسم على 100 لتكون النسبة معقولة ولا تتشوه الكرة بالكامل
    // إذا كانت السرعة 30، فإن الفاكتور سيكون 0.3
    const squishFactor = Math.min(speed / 80, 0.6); // عملنا سقف (0.6) حتى لا تنضغط الكرة لدرجة الاختفاء

    // 4. حساب القيم الجديدة بناءً على سرعة الكرة
    const targetY = 1 - squishFactor; // ينقص الارتفاع (مثلاً: 1 - 0.3 = 0.7)
    const targetXZ = 1 + squishFactor * 0.6; // يتمدد الجانب (نضرب في 0.6 ليكون التمدد الجانبي متناسقاً)

    // 5. تشغيل الحركة بالقيم الديناميكية الجديدة
    gsap.fromTo(
      ballGroup.mesh.scale,
      {
        x: 1,
        y: 1,
        z: 1,
      },
      {
        y: targetY, // انضغاط ديناميكي يعتمد على السرعة
        x: targetXZ, // تمدد ديناميكي يعتمد على السرعة
        z: targetXZ,
        duration: 0.08 + squishFactor * 0.2, // جعل مدة الانضغاط أسرع في الاصطدامات الخفيفة وأطول قليلاً في القوية
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
    );
  }
}
