<template>
  <draggable class="selectSpot" :list="boxList" :group="{ name: 'boxcontainer', pull: 'clone', put: false }" :sort="false">
    <template #item="{ element }">
      <v-btn class="ma-1" cols="auto" color="#F5F5F5" size="large">{{ element.title }}{{ element.emoji }}</v-btn>
    </template>
  </draggable>
</template>
  
<script>
import { useSelectStore } from '@/store/useSelectStore';
import draggable from 'vuedraggable'

export default {
  name: "selectSpot",

  setup() {
    const store = useSelectStore()
    return {
      boxList: store.boxList
    }
  },
  components: {
    draggable
  },
}

</script>
  
<style>
  .selectSpot {
    box-sizing: border-box;
    flex: 0 0 20vw;
    border-left: 1px solid gray;
    padding: 1%;
    float: right;
  }
</style>