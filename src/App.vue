<template>
  <div class="home">
    <dragSpot />
    <selectSpot />

  </div>
</template>

<script>
  import dragSpot from './components/dragSpot.vue';
  import selectSpot from './components/selectSpot.vue';

  export default {
    components: {
      dragSpot: dragSpot,
      selectSpot: selectSpot,
    }
  }
</script>

<style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;
    }

  .home {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>