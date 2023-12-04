
<script setup>
let isOpen = ref(true)
</script>
<template>
    <main>
        <Nav />
        <slot />
        <ClientOnly>
            <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
                class="pwa-toast flex justify-center items-center" role="alert">
                <UModal v-model="isOpen" class="">
                    <UCard class="max-w-md w-full">
                        <template #header>
                            <div class="message">
                                <span>
                                    Install PWA for better experience
                                </span>
                            </div>
                        </template>
                        <div class="flex gap-2">
                            <UButton @click="$pwa.install()">
                                Install
                            </UButton>
                            <UButton @click="$pwa.cancelInstall()">
                                Cancel
                            </UButton>
                        </div>
                    </UCard>
                </UModal>
            </div>
        </ClientOnly>
    </main>
</template>