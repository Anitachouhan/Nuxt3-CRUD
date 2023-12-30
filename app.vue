<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>

<style>
.page-enter-active, .page-leave-active { transition: all 0.4s; }
.page-enter-from, .page-leave-to { opacity: 0; filter: blur(1rem);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>