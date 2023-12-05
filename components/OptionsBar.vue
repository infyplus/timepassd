<script setup lang="ts">
const optionStore = useOptionsStore()
let active = computed(() => optionStore.getBarOptions)

</script>
<template>
    <div class="p-3 py-5 flex gap-3 justify-center w-full bg-blue-100 dark:bg-gray-900" v-if="active">
        <div class="flex gap-3 justify-center max-w-5/6 w-full overflow-x-auto">
            <UButton :icon="active.endDate ? 'i-heroicons-check-badge-solid' : ''" :color="active.endDate ? 'blue' : 'gray'"
                label="endDate" :variant="active.endDate ? 'outline' : 'solid'" @click="optionStore.toggleEndDate" />
            <UButton :icon="active.startTime ? 'i-heroicons-check-badge-solid' : ''"
                :color="active.startTime ? 'blue' : 'gray'" label="startTime"
                :variant="active.startTime ? 'outline' : 'solid'" @click="optionStore.toggleStartTime" />
            <UButton :icon="active.endTime ? 'i-heroicons-check-badge-solid' : ''" :color="active.endTime ? 'blue' : 'gray'"
                label="endTIme" :variant="active.endTime ? 'outline' : 'solid'" @click="optionStore.toggleEndTime"
                :disabled="active.endDate == false" />
        </div>

    </div>
</template>