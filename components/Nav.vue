<script setup lang="ts">
const items = [
    [{
        label: 'Source Code',
        icon: 'i-heroicons-code-bracket-solid'
    }], [{
        label: 'Changelog',
        icon: 'i-heroicons-megaphone'
    }, {
        label: 'Buy Me a Coffee',
        icon: 'i-heroicons-banknotes'
    }], [{
        label: 'uses dayjs',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        disabled: true
    }],
    [{
        label: 'Made By infy.plus',
        slot: 'footer'

    }]
]
</script>
<template>
    <div class="p-5 border-b-4 border-b-blue-200 dark:border-b-blue-900 flex justify-between items-center">
        <div class="flex justify-center items-center gap-2  ">
            <div class="">
                <img src="/logo.png" alt="Timepassd logo" class="w-6" />

            </div>
            <div class="font-bold text-sky-600 text-lg">
                Timepassd
            </div>
        </div>
        <div class="">
            <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                :popper="{ placement: 'bottom-start' }">
                <div class="">
                    <UIcon name="i-heroicons-bars-3-bottom-right" class=" text-2xl text-sky-500" />
                </div>
                <template #footer="{ item }">
                    <div class="">
                        <div class="">
                            With &#x1F499; <a href="https://infy.plus" target="_blank">Infyplus</a>
                        </div>
                    </div>
                </template>
            </UDropdown>
        </div>
    </div>
</template>