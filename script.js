// GSAP Hero Animations
gsap.from("#hero-title", { y: 100, opacity: 0, duration: 1.4, ease: "power4.out" });
gsap.from("#hero-sub", { y: 60, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Robot Eyes Follow Cursor
const eyeLeft = document.getElementById('eye-left');
const eyeRight = document.getElementById('eye-right');

document.addEventListener('mousemove', e => {
  const rect = document.getElementById('robot').getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = (e.clientX - centerX) / 10;
  const dy = (e.clientY - centerY) / 10;

  eyeLeft.setAttribute('cx', 50 + dx);
  eyeLeft.setAttribute('cy', 70 + dy);

  eyeRight.setAttribute('cx', 100 + dx);
  eyeRight.setAttribute('cy', 70 + dy);
});
