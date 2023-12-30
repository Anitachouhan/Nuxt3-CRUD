<template>
    <div>
        <div class="w-full p-2">
            <div class="flex justify-end">
                <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                    :popper="{ placement: 'bottom-start' }">
                    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" class="shadow-md border rounded-full"
                        size="lg" alt="Avatar" />
                    <div class="ml-3">
                        <p class="text-gray-600 font-semibold text-sm mt-1">Ben Graham</p>
                        <p class="text-sm text-gray-400">Managing Director</p>
                    </div>

                    <template #account="{ item }">
                        <div class="text-left">
                            <p>
                                Signed in as
                            </p>
                            <p class="truncate font-medium text-gray-900 dark:text-white">
                                {{ item.label }}
                            </p>
                        </div>
                    </template>

                    <template #item="{ item }">
                        <span class="truncate">{{ item.label }}</span>
                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                    </template>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
const items = [
    [{
        label: 'ben@example.com',
        slot: 'account',
        disabled: true
    }],
    [{
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth'
    },
    {
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle'
    }]
]
</script>