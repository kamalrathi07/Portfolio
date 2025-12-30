// ================= GSAP INTRO =================
document.addEventListener("DOMContentLoaded", () => {

  gsap.from(".hero h1", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });

  gsap.from(".hero p", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power4.out"
  });

  gsap.from(".social a", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.6,
    ease: "power3.out"
  });

  gsap.from("#robot-container", {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power3.out"
  });

});

// ================= THREE.JS ROBOT =================
let scene, camera, renderer, robot;

const container = document.getElementById("robot-container");

// Scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

// Renderer
renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// Load GLB (ROOT PATH)
const loader = new THREE.GLTFLoader();
loader.load(
  "robot.glb",
  (gltf) => {
    robot = gltf.scene;
    robot.scale.set(1.2, 1.2, 1.2);
    robot.position.set(0, -0.5, 0);
    scene.add(robot);
  },
  undefined,
  (error) => {
    console.error("GLB load error:", error);
  }
);

// Cursor follow
document.addEventListener("mousemove", (e) => {
  if (!robot) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 1.2;
  const y = (e.clientY / window.innerHeight - 0.5) * 1.2;

  robot.rotation.y = x;
  robot.rotation.x = y;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (robot) robot.rotation.y += 0.002; // idle motion
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
