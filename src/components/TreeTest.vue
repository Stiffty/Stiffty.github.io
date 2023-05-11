<template>
  <div id = "rend"/>
  <q-btn @click="render123" color="white" text-color="black" label="Standard" />
</template>

<script >
export default {
  name: "TreeTest"
}
</script>


<script  setup>


  import * as THREE from 'three';




function render123() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();



  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const cube = new THREE.Mesh(geometry, material);
  renderer.setSize(window.innerWidth, window.innerHeight);


  document.getElementById("rend").appendChild(renderer.domElement);


  scene.add(cube);

  camera.position.z = 5;

  animate();

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
}


</script>

<style scoped>

</style>