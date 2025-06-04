<script setup>
import { ref } from 'vue';

let size = ref(0);

const incr = () => {
    size.value++;
}

let wordbox = {
  
}
</script>

<template>
    <div class="container">
        <div class="craft">
          <button @click="incr">up</button>
          <div class="rectangle" :style="{ top: size + 'px' }">{{ size }}</div>
        </div>
        <div class="select">
        </div>
    </div>
</template>

<style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;
    }

    .container {
      display: flex;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    .craft {
      flex: 0 0 80vw;
      background-color: #fafafa;
      padding: 0.5%;
    }

    .select {
      box-sizing: border-box;
      flex: 0 0 20vw;
      background-color: #e7e3fc;
      border-left: 1px solid gray;
      padding: 1%;
      float: right;
    }
    .rectangle {
      width: 2.5vw;
      height: 2vh;
      background-color: #ffd67a;
      border: 1px solid black;
      position: relative;
    }
</style>