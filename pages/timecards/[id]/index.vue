<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const tabItems = [
    {
        slot: 'day',
        label: 'Daily',
    },
    {
        slot: 'week',
        label: 'Weekly',
    },
    {
        slot: 'year',
        label: 'Yearly',
    }
]
const dataStore = useDateStore()
let timeCard = computed(() => dataStore.getTimecard)
let showEditModal = ref(false)
let showDeleteModal = ref(false)
onMounted(async () => {
    await dataStore.fetchTimeCard(Number(route.params.id))
})
const toast = useToast()
async function deleteTimeCard() {
    const res = await dataStore.deleteTimeCard(timeCard.value)
    if (res == true) {
        await router.push('/')
    } else {
        toast.add({ title: 'Error deleting time card' })
    }
}
</script>
<template>
    <div class="p-5">
        <UCard>
            <template #header>
                <div class="flex justify-between">
                    <div>
                        <h1 class="text-xl font-bold">{{ timeCard.title }}</h1>

                    </div>
                    <div class="flex gap-3">
                        <UButton @click="showEditModal = true" color="blue" icon="i-heroicons-pencil" />
                        <UButton @click="showDeleteModal = true" color="red" icon="i-heroicons-trash" />
                    </div>
                    <UModal v-model="showEditModal">
                    </UModal>
                    <UModal v-model="showDeleteModal">
                        <UCard>
                            <template #header>
                                Do you want to delete this time card?
                            </template>

                            <div class="flex gap-3">
                                <UButton @click="showDeleteModal = false" color="gray">Cancel</UButton>
                                <UButton @click="deleteTimeCard" color="red">Delete</UButton>
                            </div>
                        </UCard>
                    </UModal>
                </div>
            </template>
            <p class="text-sky-700">{{ timeCard.description }}</p>
            <div class="text-xl font-bold text-center py-10 text-sky-500">
                {{ new Date(timeCard.date).toLocaleString() }}
            </div>
            <template #footer>
                <div class="flex gap-3 flex-col">
                    <UCard>
                        <template #header>
                            <div class="text-lg font-bold">
                                Today
                            </div>
                        </template>

                        <div class="flex gap-3 flex-col">
                            <UCard v-for="today in timeCard.today">

                                <div class="flex justify-between">
                                    <div class="font-bold text-xl  text-blue-400">
                                        {{ today.label }}
                                    </div>
                                    <div class="">
                                        <UButton icon="i-heroicons-share" color="blue" />
                                    </div>
                                </div>



                            </UCard>
                        </div>

                    </UCard>
                    <UCard>
                        <template #header>
                            <div class="text-lg font-bold">
                                Upcoming Highlights
                            </div>
                        </template>
                        <UTabs :items="tabItems">
                            <template #day="{ item }">
                                <div class="flex gap-3 flex-col" v-if="timeCard.upcomingDates.comingDays">
                                    <UCard v-for="day in timeCard.upcomingDates.comingDays">
                                        <template #header>
                                            <div class="font-bold">
                                                {{ day.label }}
                                            </div>
                                        </template>
                                    </UCard>
                                </div>
                            </template>
                            <template #week="{ item }">
                                <div class="flex gap-3 flex-col" v-if="timeCard.upcomingDates.comingWeeks">
                                    <UCard v-for="day in timeCard.upcomingDates.comingWeeks">
                                        <template #header>
                                            <div class="font-bold">
                                                {{ day.label }}
                                            </div>
                                        </template>
                                    </UCard>
                                </div>
                            </template>
                            <template #year="{ item }">
                                <div class="flex gap-3 flex-col" v-if="timeCard.upcomingDates.comingYears">
                                    <UCard v-for="day in timeCard.upcomingDates.comingYears">
                                        <template #header>
                                            <div class="font-bold">
                                                {{ day.label }}
                                            </div>
                                        </template>
                                    </UCard>
                                </div>
                            </template>
                        </UTabs>
                    </UCard>
                </div>
            </template>
        </UCard>
    </div>
</template>