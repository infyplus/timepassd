<script setup lang="ts">
import { onMounted } from 'vue';
const optionsStore = useOptionsStore()
let options = computed(() => optionsStore.getBarOptions)
const startDate = ref(new Date('1947-01-01'));
const endDate = ref(new Date());
const dayjs = useDayjs()
// const duration = computed(() => dayjs(date.value.toISOString()).fromNow())
// onMounted(() => {
//     let today = dayjs(new Date().toISOString())
//     let endDay = dayjs(date.value.toISOString())
//     let days = today.diff(endDay, 'day')
//     console.log(days)
// })
let duration = computed(() => {
    let startDay = dayjs(startDate.value.toISOString())
    let endDay = dayjs(endDate.value.toISOString())
    if (durationOption.value == 0) {
        return endDay.diff(startDay, 'day')
    }
    if (durationOption.value == 1) {
        return endDay.diff(startDay, 'week')
    }
    if (durationOption.value == 2) {
        return endDay.diff(startDay, 'month')
    }
    if (durationOption.value == 3) {
        return endDay.diff(startDay, 'year')
    }
    if (durationOption.value == 4) {
        return endDay.diff(startDay, 'hour')
    }
    if (durationOption.value == 5) {
        return dayjs(startDay.toISOString()).fromNow(true)
    }
})

let durationOption = computed(() => optionsStore.getDurationOption)

let text = computed(() => {
    let texts = ['day(s)', 'week(s)', 'month(s)', 'year(s)', 'hour(s)', '']
    if (options.value.endDate == false && durationOption.value != 5) {
        return texts[durationOption.value] + 'ago'
    }
    if (durationOption.value == 5) {
        return ''
    }
    return texts[durationOption.value]
})
async function changeDurationOption() {


}



definePageMeta({
    title: 'Home',
    // middleware: "auth",
});
</script>
<template>
    <div class="min-h-screen h-full">
        <UCard class="p-3 h-96 flex flex-col justify-center">
            <div class="">
                <DurationOption @changeDuration="changeDurationOption" />
            </div>
            <div class=" flex justify-center items-center flex-col gap-3">
                <VDatePicker v-model="startDate" :popover="{ placement: 'bottom' }">
                    <template #default="{ inputValue, inputEvents }">
                        <div>start date</div>
                        <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                    </template>
                </VDatePicker>
                <VDatePicker v-model="endDate" :popover="{ placement: 'bottom' }" v-if="options.endDate == true"
                    mode="dateTime">
                    <template #default="{ inputValue, inputEvents }">
                        <div>end date</div>
                        <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                    </template>
                </VDatePicker>
                <div class="">
                    <div class="" v-if="options.endDate == true">
                        <div class="text-center font-bold text-3xl">
                            there are <br> <span class="text-sky-500">{{ duration }}</span> <br>
                            {{ text }}
                        </div>
                    </div>
                    <div class="text-center font-bold text-3xl" v-else>
                        was <br> <span class="text-sky-500">{{ duration }}</span> {{ text }}
                    </div>

                </div>
            </div>


        </UCard>
        <div class="">
            <OptionsBar />
        </div>
    </div>
</template>