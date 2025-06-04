<template>
  <draggable class="dragSpot" :list="boxList" :group="{ name: 'boxcontainer', pull: false, put: true }" @end="onDropEnd">
    <template #item="{ element }">
      <v-btn class="ma-1" cols="auto" color="#F5F5F5" size="large">{{ element.title }}{{ element.emoji }}</v-btn>
    </template>
  </draggable>
</template>

<script>
import { useBoxStore } from '@/store/useBoxStore';
import { useSelectStore } from '@/store/useSelectStore';
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
  name: "dragSpot",

  setup() {
    const store = useBoxStore()
    const selStore = useSelectStore()

    return {
      boxList: store.boxList,
      selStore
    }
  },
  components: {
    draggable,
  },

  methods: {
    async onDropEnd(event) {
      const { oldIndex, newIndex } = event;
      if (oldIndex !== newIndex) {
        const draggedElement = this.boxList[oldIndex];
        const droppedElement = this.boxList[newIndex];

        const isLoading = {
            title: `Loading`,
            emoji: `⏳`,
          };

        this.boxList.splice(oldIndex, 1, isLoading);
        this.boxList.splice(newIndex, 1, isLoading);

        try {
          const response = await axios.post('http://localhost:3000/generate', {
            first: draggedElement.title,
            second: droppedElement.title
          });

          const genResult = response.data;

          const newElement = {
            title: `${genResult.title}`,
            emoji: `${genResult.emoji}`
          };

          // 기존 요소 제거 및 새로운 요소 삽입
          this.boxList.splice(Math.min(oldIndex, newIndex), 2, newElement);
          this.selStore.addBox(newElement);

        } catch(error) {
          console.error('에러 발생:', error);
        }
      }
    },
  }
}
</script>

<style>
  .dragSpot {
    flex: 0 0 80vw;
    padding: 0.5%;
  }

</style>