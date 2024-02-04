<script setup lang="ts">
import { onMounted } from 'vue';
const optionsStore = useOptionsStore()
let options = computed(() => optionsStore.getBarOptions)
const startDate = ref(new Date('1947-08-15'));
const endDate = ref(new Date());
const dayjs = useDayjs()

const dataStore = useDateStore()



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

onMounted(async () => {
    await dataStore.fetchTimeCards()
})



let durationOption = computed(() => optionsStore.getDurationOption)

let text = computed(() => {
    let texts = ['day(s)', 'week(s)', 'month(s)', 'year(s)', 'hour(s)', '']
    if (options.value.endDate == false) {
        return texts[durationOption.value] + ' ago'
    }
    return texts[durationOption.value]
})

// Share
let showShareModal = ref(false)

definePageMeta({
    title: 'Home',
    // middleware: "auth",
});
</script>
<template>
    <div class="h-full">
        <UCard class="p-3 h-96 flex flex-col justify-center">
            <div class="py-3">
                <DurationOption @todayReset="startDate = new Date()" @shareDate="showShareModal = true" />
            </div>
            <div class=" flex justify-center items-center flex-col gap-3">
                <div class="flex justify-center items-center flex-col gap-3">
                    <VDatePicker v-model="startDate" :popover="{ placement: 'bottom' }" mode="dateTime"
                        :max-date="new Date()" isRequired v-if="options.startTime == true">
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">start date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                        </template>
                    </VDatePicker>
                    <VDatePicker v-model="startDate" :popover="{ placement: 'bottom' }" :max-date="new Date()" isRequired
                        v-else>
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">start date</div>

                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-28" />


                        </template>
                    </VDatePicker>
                    <div class="">
                        <div class="text-sky-500 italic" v-if="startDate.toLocaleDateString() == '15/08/1947'"> Independence
                            Day &#x1F1EE;&#x1F1F3; </div>
                    </div>
                </div>
                <div class="flex justify-center items-center flex-col gap-3" v-if="options.endDate == true">
                    <VDatePicker v-model="endDate" :popover="{ placement: 'bottom' }" mode="dateTime" isRequired
                        v-if="options.endTime == true" :min-date="startDate">
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">end date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                        </template>
                    </VDatePicker>
                    <VDatePicker v-model="endDate" :popover="{ placement: 'bottom' }" isRequired v-else
                        :min-date="startDate">
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">end date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-28" />
                        </template>
                    </VDatePicker>
                </div>
                <div class="">
                    <div class="" v-if="options.endDate == true">
                        <div class="text-center font-bold text-xl">
                            there are <br> <span class="text-sky-500 text-3xl">{{ duration }}</span> <br>
                            {{ text }}
                        </div>
                    </div>
                    <div class="text-center font-bold text-xl" v-else>
                        was <br> <span class="text-sky-500 text-3xl">{{ duration }}</span> <br> {{ text }}
                    </div>

                </div>
            </div>


        </UCard>
        <div class="">
            <OptionsBar />
        </div>
        <HomeTimecards />
        <UModal v-model="showShareModal" fullscreen>
            <ShareModal :startDate="startDate" :endDate="endDate" @close="showShareModal = false" />
        </UModal>
    </div>
</template>