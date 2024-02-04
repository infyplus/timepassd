<script setup lang="ts">
const optionsStore = useOptionsStore()

let durationOption = ref(0)
let durationOptions = computed(() => optionsStore.durationOptions)

const emits = defineEmits(['changeDuration', 'todayReset', 'shareDate'])
function changeDurationOption(value) {
    optionsStore.$patch({ durationOption: value })

}
</script>
<template>
    <div class="">
        <div class="flex items-center justify-end gap-3">
            <div class="text-sm text-sky-500 flex justify-center items-center gap-2 font-bold cursor-pointer"
                @click="emits('todayReset')">
                Today
                <UIcon name="i-heroicons-arrow-path" />
            </div>
            <USelect v-model="durationOption" :options="durationOptions" class="w-24"
                @update:model-value="changeDurationOption" />
            <UButton @click="emits('shareDate')" icon="i-heroicons-share" color="blue" />
        </div>
    </div>
</template>