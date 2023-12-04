<script setup lang="ts">
let active = ref({
    endDate: true,
    startTime: false,
    endTime: false,
})
</script>
<template>
    <div class="p-3 flex gap-3 justify-between w-full">
        <div class="flex gap-3 max-w-5/6 w-full overflow-x-auto">
            <UButton :icon="active.endDate ? 'i-heroicons-check-badge-solid' : ''" :color="active.endDate ? 'blue' : 'gray'"
                label="endDate" :variant="active.endDate ? 'outline' : 'solid'" />
            <UButton :icon="active.startTime ? 'i-heroicons-check-badge' : ''" :color="active.startTime ? 'blue' : 'gray'"
                label="startTime" :variant="active.startTime ? 'outline' : 'solid'" />
            <UButton :icon="active.endTime ? 'i-heroicons-check-badge' : ''" :color="active.endTime ? 'blue' : 'gray'"
                label="endTIme" :variant="active.endTime ? 'outline' : 'solid'" />
        </div>
        <div class="w-32 w-full">
            <USelect :options="[]" />
        </div>
    </div>
</template>