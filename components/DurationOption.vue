<script setup lang="ts">
const optionsStore = useOptionsStore()

let durationOption = ref(0)
let durationOptions = computed(() => optionsStore.durationOptions)

const emits = defineEmits(['changeDuration'])
function changeDurationOption(value) {
    optionsStore.$patch({ durationOption: value })

}
</script>
<template>
    <div class="">
        <div class="flex justify-end gap-3">
            <USelect v-model="durationOption" :options="durationOptions" class="w-24"
                @update:model-value="changeDurationOption" />
        </div>
    </div>
</template>