<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
      <UNotifications timeout="1000" />
    </NuxtLayout>

  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>