import { defineStore } from 'pinia'

export const useBoxStore = defineStore('boxStore', {

    state: () => ({
        boxList: [{
            title: "불",
            emoji: "🔥",
            left: 0,
            top: 0,
            isLoading: false,
            id: Math.random() }
        ]
    }),

    getters: {},

    actions: {
      addBox(item, left, top) {
        this.boxList.push({
          title: item.title,
          emoji: item.emoji,
          left: left,
          top: top,
          isLoading: false,
          id: Math.random()
        });
      }
    },
  })