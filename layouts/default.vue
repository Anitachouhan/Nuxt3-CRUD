<template>
    <div class="flex h-screen">
        <div class="py-3 bg-white">
            <AppSidebar />
        </div>
        <div class="flex-1 overflow-hidden h-full p-3 bg-gray-100">
            <AppHeader />
            <div class="px-2 py-5">
                <slot />
            </div>
        </div>
    </div>
</template>
