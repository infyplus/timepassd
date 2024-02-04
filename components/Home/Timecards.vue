
<script setup lang="ts">
const dataStore = useDateStore()
let timeCards = computed(() => dataStore.getTimecards)
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
</script>
<template>
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
                            <VDatePicker v-model="data.date" :popover="{ placement: 'right' }" mode="dateTime" isRequired>
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
                            <div class="text-xs text-gray-500">
                                {{ timeCard.upcomingText }}
                            </div>
                        </div>

                    </UCard>
                </NuxtLink>
            </div>
        </div>
    </UCard>
</template>