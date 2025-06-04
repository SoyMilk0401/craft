<script setup>
    import { ref } from 'vue';

    const box = {
        id: 1,
        word: ref("ImBox"),
        left: ref(1),
        top: ref(1),
        isLoadding: false
    }

    function cli() {
      box.value[2]++;
      box.value[3]++;
      alert(box.left)
    }
</script>

<template>
    <div v-bind="{left: box.value[2] + 'px', top: box.value[3] + 'px', border: '1px solid black'}">
        {{ box.value[1] }}
    </div>

    <button @click="cli">cli</button>
    <input type="text" v-model="box.value[1]"/>
</template>