import { defineStore, acceptHMRUpdate } from "pinia"

export const useOptionsStore = defineStore('options', {
    state: () => ({
        durationOptions: [
            { label: 'days', value: 0 },
    { label: 'weeks', value: 1 },
    { label: 'months', value: 2 },
    { label: 'years', value: 3 },
            { label: 'hours', value: 4 },
            { label: 'auto', value: 5 }
        ],
        durationOption: 0,
        barOptions: {
            endDate: false,
            startTime: false,
            endTime: false,
        }
    }),
    getters: {
        getBarOptions: (state) => state.barOptions,
        getDurationOptions: (state) => state.durationOptions,
        getDurationOption: (state) => state.durationOption
    },
    actions: {
        async toggleEndDate() {
            this.barOptions.endDate = !this.barOptions.endDate
            this.barOptions.endTime = false
         
        },
        async toggleStartTime() {
            this.barOptions.startTime = !this.barOptions.startTime
        },
        async toggleEndTime() {
            this.barOptions.endTime = !this.barOptions.endTime
        },
    }
}
    )

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}