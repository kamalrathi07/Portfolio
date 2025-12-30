document.addEventListener("DOMContentLoaded", () => {

  gsap.from("#title", {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  });

  gsap.from("#subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3
  });

  gsap.from("#robot", {
    scale: 0.5,
    opacity: 0,
    duration: 0.8,
    delay: 0.6
  });

  const robot = document.getElementById("robot");

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 20;
    const y = (window.innerHeight / 2 - e.clientY) / 20;
    robot.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });

});
