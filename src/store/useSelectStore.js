import { defineStore } from 'pinia'

export const useSelectStore = defineStore('selectStore', {
    state: () => ({
        boxList: [
            { title: "불", emoji: "🔥", id: Math.random() },
            { title: "물", emoji: "💧", id: Math.random() },
            { title: "땅", emoji: "🟫", id: Math.random() },
            { title: "공기", emoji: "🌬️", id: Math.random() }]
    }),

    getters: {},

    actions: {
        addBox(item) {
            const check = this.boxList.some(check => check.title === item.title && check.emoji === item.emoji)

            if (!check) {
                this.boxList.push(item)
            }
        }
    },
})