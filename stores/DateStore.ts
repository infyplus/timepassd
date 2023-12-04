import { defineStore, acceptHMRUpdate } from "pinia"

export const useDateStore = defineStore('date', {
    state: () => ({
        data:[]
    }),
    getters: {
        
    },
    actions: {
        
    }
}
    )

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateStore, import.meta.hot))
}