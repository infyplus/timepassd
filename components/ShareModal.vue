<script setup lang="ts">
import * as htmlToImage from 'html-to-image';
const dayjs = useDayjs()
const optionsStore = useOptionsStore()
let durationOption = ref(0)
let durationOptions = computed(() => optionsStore.durationOptions)
let option = ref('days')


let props = defineProps({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})
let topTitleOn = ref(true);
let bottomTitleOn = ref(true);
let topTitle = ref('Celebrating')
let topTitleProps = ref({
    bold: true,
    italic: false,
    size: 1
})
let bottom = ref('Your Text')
let bottomProps = ref({
    bold: false,
    italic: false,
    size: 0
})

let durationProps = ref({
    bold: true,
    italic: false,
    size: 2
})
let bg = ref('/defaultBG.png')
let exportImage = ref(null)

let hAlign = ref(1)
let vAlign = ref(1)


const convertToImage = () => {

    // Ensure the element is ready before capturing the image
    nextTick(() => {
        // Use dom-to-image library to capture the image
        htmlToImage.toPng(exportImage.value)
            .then(function (dataUrl) {
                downloadImage(dataUrl);
            });
    });
};
const downloadImage = (dataUrl) => {
    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'captured_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// set image preview

async function setImagePreview(inputFile: any) {

    // read file from path
    if (inputFile.target.files[0]) {
        const previewURL = URL.createObjectURL(inputFile.target.files[0]);
        bg.value = previewURL;
    }
}

const isOpen = ref(false)


// change duration option
function changeDurationOption(value) {
    optionsStore.$patch({ durationOption: value })
    option.value = durationOptions.value[value].label

}
let durationText = computed(() => {
    let texts = ['day(s)', 'week(s)', 'month(s)', 'year(s)', 'hour(s)', '']
    let startDay = dayjs(props.startDate.toISOString())
    let endDay = dayjs(props.endDate.toISOString())
    if (durationOption.value == 0) {
        return `${endDay.diff(startDay, 'day')} ${texts[durationOption.value]}`
    }
    if (durationOption.value == 1) {
        return `${endDay.diff(startDay, 'week')} ${texts[durationOption.value]}`
    }
    if (durationOption.value == 2) {
        return `${endDay.diff(startDay, 'month')} ${texts[durationOption.value]}`
    }
    if (durationOption.value == 3) {
        return `${endDay.diff(startDay, 'year')} ${texts[durationOption.value]}`
    }
    if (durationOption.value == 4) {
        return `${endDay.diff(startDay, 'hour')} ${texts[durationOption.value]}`
    }
    if (durationOption.value == 5) {
        return `${dayjs(startDay.toISOString()).fromNow(true)} ${texts[durationOption.value]}`
    }
})
const isNavigatorSupported = ref(!!navigator.share);
const share = async () => {
    if (navigator.share) {
        try {
            // Use the Web Share API
            await navigator.share({
                title: 'My Web Share App',
                text: 'Check out this awesome content!',
                url: 'https://example.com',
            });
            console.log('Successfully shared!');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        console.warn('Web Share API not supported in this browser.');
    }
};


</script>
<template>
    <div class="flex flex-col min-h-screen">
        <div class="h-1/5 p-3">
            <div class="flex gap-3 items-center">
                <div class="">
                    <UButton icon="i-heroicons-arrow-left" color="blue" @click="$emit('close')" variant="ghost" />
                </div>
                <div class="text-sky-500 font-bold text-xl">
                    Share
                </div>
            </div>
            <div class="flex gap-3 justify-center items-center ">
                <UPopover>
                    <UButton icon="i-heroicons-photo" color="blue" variant="ghost" label="background" />
                    <template #panel>
                        <div class="p-4">
                            <div class="py-2">Select a Custom image</div>
                            <UInput type="file" @change="setImagePreview" required color="blue" />
                        </div>
                    </template>
                </UPopover>
                <UButton icon="i-heroicons-pencil" color="blue" variant="ghost" label="text" @click="isOpen = true" />
                <UPopover>
                    <UButton icon="i-heroicons-bars-3" color="blue" variant="ghost" label="align" />
                    <template #panel>
                        <div class="p-4">
                            <div class="font-bold">
                                Align Text
                            </div>
                            <div class="pt-2 flex gap-3 justify-center items-center">
                                Horizontal:
                                <UButton icon="i-heroicons-bars-3-bottom-left" :color="hAlign == 0 ? 'blue' : 'gray'"
                                    variant="ghost" @click="hAlign = 0" />
                                <UButton icon="i-heroicons-bars-3" variant="ghost" :color="hAlign == 1 ? 'blue' : 'gray'"
                                    @click="hAlign = 1" />
                                <UButton icon="i-heroicons-bars-3-bottom-right" variant="ghost"
                                    :color="hAlign == 2 ? 'blue' : 'gray'" @click="hAlign = 2" />

                            </div>
                            <div class="pt-2 flex gap-3 justify-center items-center">
                                Vertical:
                                <UButton icon="i-heroicons-bars-arrow-up" variant="ghost"
                                    :color="vAlign == 0 ? 'blue' : 'gray'" @click="vAlign = 0" />
                                <UButton icon="i-heroicons-bars-3" variant="ghost" :color="vAlign == 1 ? 'blue' : 'gray'"
                                    @click="vAlign = 1" />
                                <UButton icon="i-heroicons-bars-arrow-down" variant="ghost"
                                    :color="vAlign == 2 ? 'blue' : 'gray'" @click="vAlign = 2" />

                            </div>
                        </div>
                    </template>
                </UPopover>
            </div>
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                        <div class="text-xl font-bold">
                            Edit Text
                        </div>
                    </template>
                    <div class="py-3 flex flex-col">
                        <div class="flex flex-col gap-6">
                            <div class="">
                                <div class="font-bold flex gap-2">
                                    <div class="">
                                        Top Text
                                    </div>
                                    <UCheckbox v-model="topTitleOn" />
                                </div>
                                <div class="py-2">
                                    <div class="flex gap-2">
                                        <UButton label="B" color="blue" :variant="topTitleProps.bold ? 'solid' : 'outline'"
                                            @click="topTitleProps.bold = !topTitleProps.bold" />
                                        <UButton label="i" color="blue"
                                            :variant="topTitleProps.italic ? 'solid' : 'outline'"
                                            @click="topTitleProps.italic = !topTitleProps.italic" />
                                        <UButton label="sm" color="blue"
                                            :variant="topTitleProps.size == 0 ? 'solid' : 'outline'"
                                            @click="topTitleProps.size = 0" />
                                        <UButton label="md" color="blue"
                                            :variant="topTitleProps.size == 1 ? 'solid' : 'outline'"
                                            @click="topTitleProps.size = 1" />
                                        <UButton label="lg" color="blue"
                                            :variant="topTitleProps.size == 2 ? 'solid' : 'outline'"
                                            @click="topTitleProps.size = 2" />
                                    </div>

                                </div>
                                <UTextarea v-model="topTitle"
                                    :style="`${topTitleProps.bold ? 'font-weight: bold;' : ''} ${topTitleProps.italic ? 'font-style: italic;' : ''} font-size: ${topTitleProps.size == 0 ? '14px' : topTitleProps.size == 1 ? '16px' : '18px'}`" />
                            </div>
                            <UDivider />
                            <div class="">
                                <div class="flex gap-2 justify-start items-center font-bold">Duration <div
                                        class="text-sm text-sky-300 cursor-pointer" @click="$emit('close')">({{
                                            startDate.toLocaleDateString()
                                        }} -
                                        {{ endDate.toLocaleDateString() }})
                                    </div>

                                </div>
                                <div class="flex gap-2">
                                    <UButton label="B" color="blue" :variant="durationProps.bold ? 'solid' : 'outline'"
                                        @click="durationProps.bold = !durationProps.bold" />
                                    <UButton label="i" color="blue" :variant="durationProps.italic ? 'solid' : 'outline'"
                                        @click="durationProps.italic = !durationProps.italic" />
                                    <UButton label="sm" color="blue"
                                        :variant="durationProps.size == 0 ? 'solid' : 'outline'"
                                        @click="durationProps.size = 0" />
                                    <UButton label="md" color="blue"
                                        :variant="durationProps.size == 1 ? 'solid' : 'outline'"
                                        @click="durationProps.size = 1" />
                                    <UButton label="lg" color="blue"
                                        :variant="durationProps.size == 2 ? 'solid' : 'outline'"
                                        @click="durationProps.size = 2" />
                                </div>
                                <div class="py-2 flex justify-between">
                                    <div class="text-sky-500"
                                        :style="`${durationProps.bold ? 'font-weight: bold;' : ''} ${durationProps.italic ? 'font-style: italic;' : ''} font-size: ${durationProps.size == 0 ? '14px' : durationProps.size == 1 ? '16px' : '18px'}`">
                                        {{ durationText }}</div>
                                    <USelect v-model="durationOption" :options="durationOptions" class="w-24"
                                        @update:model-value="changeDurationOption" />
                                </div>
                            </div>
                            <UDivider />
                            <div class="">
                                <div class="font-bold flex gap-2">
                                    <div class="">
                                        Bottom Text
                                    </div>
                                    <UCheckbox v-model="bottomTitleOn" />
                                </div>
                                <div class="py-2">
                                    <div class="flex gap-2">
                                        <UButton label="B" color="blue" :variant="bottomProps.bold ? 'solid' : 'outline'"
                                            @click="bottomProps.bold = !bottomProps.bold" />
                                        <UButton label="i" color="blue" :variant="bottomProps.italic ? 'solid' : 'outline'"
                                            @click="bottomProps.italic = !bottomProps.italic" />
                                        <UButton label="sm" color="blue"
                                            :variant="bottomProps.size == 0 ? 'solid' : 'outline'"
                                            @click="bottomProps.size = 0" />
                                        <UButton label="md" color="blue"
                                            :variant="bottomProps.size == 1 ? 'solid' : 'outline'"
                                            @click="bottomProps.size = 1" />
                                        <UButton label="lg" color="blue"
                                            :variant="bottomProps.size == 2 ? 'solid' : 'outline'"
                                            @click="bottomProps.size = 2" />
                                    </div>

                                </div>

                                <UTextarea v-model="bottom"
                                    :style="`${bottomProps.bold ? 'font-weight: bold;' : ''} ${bottomProps.italic ? 'font-style: italic;' : ''} font-size: ${bottomProps.size == 0 ? '14px' : bottomProps.size == 1 ? '16px' : '18px'}`" />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <UButton @click="isOpen = false" color="blue">OK</UButton>
                    </div>
                </UCard>
            </UModal>
        </div>
        <div class="h-full  flex flex-col  justify-center items-center">
            <div class="max-w-xs  w-full h-full" ref="exportImage">
                <div class="h-5/6  relative overflow-hidden">
                    <div class="h-full w-full">
                        <img :src="bg" alt="image" class="h-full w-full object-cover" />

                    </div>
                    <div class="absolute w-full h-full bg-black opacity-50 top-0"></div>
                    <div
                        :class="`w-full h-full flex  absolute z-10 p-3 top-0 ${hAlign == 0 ? 'justify-start text-left' : hAlign == 2 ? 'justify-end text-right' : 'justify-center text-center'}  ${vAlign == 0 ? ' items-start' : vAlign == 2 ? ' items-end' : 'items-center'}`">
                        <div class="">
                            <div class="  text-white" v-if="topTitleOn === true"
                                :style="`${topTitleProps.bold ? 'font-weight: bold;' : ''} ${topTitleProps.italic ? 'font-style: italic;' : ''} font-size: ${topTitleProps.size == 0 ? '18px' : topTitleProps.size == 1 ? '24px' : topTitleProps.size == 2 ? '32px' : ''}`">
                                {{ topTitle }}
                            </div>
                            <div class="text-sky-500"
                                :style="`${durationProps.bold ? 'font-weight: bold;' : ''} ${durationProps.italic ? 'font-style: italic;' : ''} font-size: ${durationProps.size == 0 ? '18px' : durationProps.size == 1 ? '24px' : durationProps.size == 2 ? '32px' : ''}`">
                                {{ durationText }}
                            </div>
                            <div class="text-orange-400" v-if="bottomTitleOn === true"
                                :style="`${bottomProps.bold ? 'font-weight: bold;' : ''} ${bottomProps.italic ? 'font-style: italic;' : ''} font-size: ${bottomProps.size == 0 ? '18px' : bottomProps.size == 1 ? '24px' : bottomProps.size == 2 ? '32px' : ''}`">

                                {{ bottom }}
                            </div>
                        </div>
                    </div>

                </div>
                <div class="h-1/6 bg-gray-900 flex justify-center items-center gap-3">
                    <div class="">
                        <NuxtImg src="/logo.png" alt="logo" class="w-8 h-8 object-cover" />
                    </div>
                    <div class="">
                        <div class="text-sky-500">https://timepassd.vercel.app</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-1/6 ">
            <div class="flex justify-center items-start">
                <div class="flex gap-3 justify-end">
                    <UButton icon="i-heroicons-share" color="blue" v-if="isNavigatorSupported" @click="share" />
                    <UButton icon="i-heroicons-arrow-down-tray" color="blue" @click="convertToImage" />
                </div>
            </div>
        </div>
    </div>
</template>

