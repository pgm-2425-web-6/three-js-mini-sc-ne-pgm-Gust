const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x202020);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xff5733 }));
box.position.set(-2, 0.5, 0);
scene.add(box);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshStandardMaterial({ color: 0x33ff57 }));
sphere.position.set(0, 0.5, 0);
scene.add(sphere);

const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), new THREE.MeshStandardMaterial({ color: 0x3357ff }));
cylinder.position.set(2, 0.5, 0);
scene.add(cylinder);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight, 0.3);
scene.add(lightHelper);

const particlesCount = 1000;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.set(0, 3, 8);

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.002;

    box.rotation.y += 0.01;
    box.position.y = 0.5 + Math.sin(time) * 0.5;

    sphere.rotation.y += 0.01;
    sphere.position.y = 0.5 + Math.sin(time + 1) * 0.5;

    cylinder.rotation.y += 0.01;
    cylinder.position.y = 0.5 + Math.sin(time + 2) * 0.5;

    pointLight.position.x = Math.sin(time) * 3;
    pointLight.position.z = Math.cos(time) * 3;

    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
