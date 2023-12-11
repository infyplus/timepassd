<script setup lang="ts">
const route = useRoute()
const router = useRouter()
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
                <UCard>
                    <template #header>
                        <div class="text-lg font-bold">
                            Upcoming Highlights
                        </div>
                    </template>
                </UCard>
            </template>
        </UCard>
    </div>
</template>