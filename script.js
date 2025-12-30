/*************************
 * GSAP INTRO ANIMATIONS
 *************************/
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
    delay: 0.9,
    ease: "power3.out"
  });

});

/*************************
 * THREE.JS 3D ROBOT
 *************************/
let scene, camera, renderer, robot;
const container = document.getElementById("robot-container");

// SCENE
scene = new THREE.Scene();

// CAMERA (temporary, auto-adjusted later)
camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.01,
  1000
);

// RENDERER
renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// LIGHTING (strong + safe)
scene.add(new THREE.AmbientLight(0xffffff, 1));

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// LOAD GLB FROM ROOT
const loader = new THREE.GLTFLoader();
loader.load(
  "robot.glb",
  (gltf) => {
    console.log("✅ GLB LOADED");

    robot = gltf.scene;
    scene.add(robot);

    // AUTO CENTER MODEL
    const box = new THREE.Box3().setFromObject(robot);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    robot.position.sub(center);

    // AUTO SCALE
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    robot.scale.setScalar(scale);

    // AUTO CAMERA FIT
    camera.position.set(0, size.y * 1.2, maxDim * 3);
    camera.lookAt(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error("❌ GLB LOAD ERROR:", error);
  }
);

// CURSOR FOLLOW
document.addEventListener("mousemove", (e) => {
  if (!robot) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 0.8;
  const y = (e.clientY / window.innerHeight - 0.5) * 0.8;

  robot.rotation.y = x;
  robot.rotation.x = y;
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  if (robot) robot.rotation.y += 0.003; // idle motion
  renderer.render(scene, camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
