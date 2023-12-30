<template>
    <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
        <img src="/logo.png" class="w-32 mx-auto p-3" />
        <UVerticalNavigation :links="links">
            <template #default="{ link }" :ui="{ icon: { base: 'flex-shrink-0 w-5 h-5' } }">
                <span v-if="isOpen">
                    <span class="relative p-2 text-md">{{ link.label }}</span>
                </span>
            </template>
        </UVerticalNavigation>
        <div class="flex justify-center">
            <UIcon class="fixed bottom-0 mb-3 w-9 h-9 text-green-500 cursor-pointer" :class="{ 'toggle-icon': !isOpen }" name="i-heroicons-arrow-right-circle-20-solid" @click="isOpen = !isOpen" />
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(true)

const links = [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/'
    },
    {
        label: 'Users',
        icon: 'i-heroicons-user',
        to: '/users'
    }
]
</script>

<style>
.sidebar {
    width: 4rem;
    padding: 0.75rem;
    transition: width 0.3s ease-in-out, padding 0.3s ease-in-out, visibility 0.3s ease-in-out;
    height: 100%;
}

.sidebar-open {
    width: 15rem;
    padding: 0.75rem;
    visibility: visible;
    height: 100%;
}

.sidebar.closed {
    visibility: hidden;
}

.toggle-icon {
    transform: rotate(180deg);
}

</style>