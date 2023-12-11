<script setup lang="ts">
import { onMounted } from 'vue';
const optionsStore = useOptionsStore()
let options = computed(() => optionsStore.getBarOptions)
const startDate = ref(new Date('1947-08-15'));
const endDate = ref(new Date());
const dayjs = useDayjs()

const dataStore = useDateStore()
let timeCards = computed(() => dataStore.getTimecards)


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

const toast = useToast()
// add time card
let showModal = ref(false)

let data = ref({
    title: '',
    description: '',
    date: new Date(),
    preference: 0
})
async function onSubmitAdd() {

    const res = await dataStore.addTimeCard(data.value)
    if (res == true) {
        await dataStore.fetchTimeCards()
        showModal.value = false
        toast.add({ title: 'Time card added' })

    } else {
        toast.add({ title: 'Error adding time card' })
    }
}

definePageMeta({
    title: 'Home',
    // middleware: "auth",
});
</script>
<template>
    <div class="h-full">
        <UCard class="p-3 h-96 flex flex-col justify-center">
            <div class="">
                <DurationOption />
            </div>
            <div class=" flex justify-center items-center flex-col gap-3">
                <div class="flex justify-center items-center flex-col gap-3">
                    <VDatePicker v-model="startDate" :popover="{ placement: 'bottom' }" mode="dateTime" isRequired
                        v-if="options.startTime == true">
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">start date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                        </template>
                    </VDatePicker>
                    <VDatePicker v-model="startDate" :popover="{ placement: 'bottom' }" isRequired v-else>
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">start date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-28" />
                        </template>
                    </VDatePicker>
                    <div class="">
                        <div class="text-sky-500 italic" v-if="startDate.toLocaleDateString() == '15/08/1947'"> Independence
                            Day &#x1F1EE;&#x1F1F3;</div>
                    </div>
                </div>
                <div class="flex justify-center items-center flex-col gap-3" v-if="options.endDate == true">
                    <VDatePicker v-model="endDate" :popover="{ placement: 'bottom' }" mode="dateTime" isRequired
                        v-if="options.endTime == true">
                        <template #default="{ inputValue, inputEvents }">
                            <div class=" text-center">end date</div>
                            <UInput color="blue" :value="inputValue" v-on="inputEvents" class="w-44" />
                        </template>
                    </VDatePicker>
                    <VDatePicker v-model="endDate" :popover="{ placement: 'bottom' }" isRequired v-else>
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
        <UCard class="mt-3">
            <template #header>
                <div class="flex justify-between">
                    <div class="text-sky-500 font-bold text-xl">
                        Time Cards ({{ timeCards.length }})
                    </div>
                    <div class="">
                        <UButton label="add" color="blue" @click="showModal = true" />
                    </div>
                </div>
                <UModal v-model="showModal">
                    <UCard @submit.prevent="onSubmitAdd">
                        <template #header>
                            <div class="text-sky-500 font-bold text-xl">
                                Add Time Card
                            </div>
                        </template>
                        <div class="flex flex-col gap-3">
                            <UFormGroup label="Title">
                                <UInput v-model="data.title" placeholder="enter title" required />
                            </UFormGroup>
                            <UFormGroup label="date">
                                <div class="py-2">
                                    {{ data.date ? new Date(data.date).toLocaleString()
                                        : `no date selected` }}
                                </div>
                                <VDatePicker v-model="data.date" :popover="{ placement: 'right' }" mode="dateTime"
                                    isRequired>
                                    <template #default="{ togglePopover }">
                                        <UButton @click="togglePopover" icon="i-heroicons-calendar" color="blue" />
                                    </template>
                                </VDatePicker>

                            </UFormGroup>
                            <UFormGroup label="description">
                                <UTextarea v-model="data.description" placeholder="enter description(optional)" />
                            </UFormGroup>
                            <UFormGroup label="notification preference">
                                <USelect v-model="data.preference" placeholder="enter preference"
                                    :options="[{ label: 'Days', value: 1 }, { label: 'Weeks', value: 2 }, { label: 'Years', value: 3 }]"
                                    required />
                            </UFormGroup>
                        </div>
                        <template #footer>
                            <div class="flex justify-end">
                                <UButton label="add" type="submit" color="blue" />
                            </div>
                        </template>
                    </UCard>
                </UModal>
                <div class="">
                    select time card to view or edit
                </div>
            </template>
            <div class="h-56 overflow-y-auto">
                <div class="flex flex-col" v-for="timeCard, key in timeCards" :key="key">
                    <NuxtLink :to="`/timecards/${timeCard.id}`">
                        <UCard class="my-3">
                            <div class="text-sky-500 font-semibold">
                                {{ timeCard.title }}
                            </div>
                            <div class="flex justify-between">
                                <div class="">
                                    {{ new Date(timeCard.date).toLocaleString() }}
                                </div>
                                <div class="text-sm text-gray-500">
                                    {{ timeCard.upcomingText }}
                                </div>
                            </div>

                        </UCard>
                    </NuxtLink>
                </div>
            </div>
        </UCard>
    </div>
</template>