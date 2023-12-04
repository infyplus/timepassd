<script setup lang="ts">
import { onMounted } from 'vue';





const date = ref(new Date('1947-01-01'));


const dayjs = useDayjs()
const duration = computed(() => dayjs(date.value.toISOString()).fromNow())
onMounted(() => {
    let today = dayjs(new Date().toISOString())
    let endDay = dayjs(date.value.toISOString())
    let days = today.diff(endDay, 'day')
    console.log(days)
})

definePageMeta({
    title: 'Home',
    // middleware: "auth",
});
</script>
<template>
    <div class="p-3">
        <div class=" flex justify-center items-center flex-col gap-3">
            <VDatePicker v-model="date" :popover="{ placement: 'bottom' }">
                <template #default="{ inputValue, inputEvents }">
                    <UInput color="blue" :value="inputValue" v-on="inputEvents" />
                </template>
            </VDatePicker>
            <div class="text-center font-bold text-3xl">
                was <br> <span class="text-sky-500">{{ duration }}</span>
            </div>

        </div>
    </div>
    <div class="">
        <OptionsBar />
    </div>
</template>