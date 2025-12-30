// GSAP Intro Animation
gsap.from("#hero-title", { y: 100, opacity: 0, duration: 1.4, ease: "power4.out" });
gsap.from("#hero-sub", { y: 60, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
gsap.from(".social-icons a", { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.8 });

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
