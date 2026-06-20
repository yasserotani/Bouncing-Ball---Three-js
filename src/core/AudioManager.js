export class AudioManager {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  playBounce() {
    if (this.audioCtx.state === "suspended") this.audioCtx.resume();
    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      100,
      this.audioCtx.currentTime + 0.1,
    );

    gainNode.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioCtx.currentTime + 0.1,
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    oscillator.start();
    oscillator.stop(this.audioCtx.currentTime + 0.1);
  }
}
