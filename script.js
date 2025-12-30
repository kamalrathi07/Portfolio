// GSAP Intro
gsap.from("#title", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
});

gsap.from("#subtitle", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "power4.out"
});

gsap.from("#robot", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

// Robot follow illusion
const robot = document.getElementById("robot");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  robot.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
