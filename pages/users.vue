<template>
    <div>
        <UBreadcrumb :links="links" />
        <div class="my-6">
            <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between">
                <UInput v-model="q" placeholder="Search..." />
                <div class="px-5">
                    <UButton label="Add User" class="px-3" @click="isOpen = true" />
                </div>
            </div>
            <UTable v-model:sort="sort" :rows="rows" :columns="columns" :loading="isLoading" :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }">
                <template #empty-state>
                    <div class="flex flex-col items-center justify-center py-6 gap-3">
                        <span class="italic text-sm">Not found!</span>
                    </div>
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="people.length" />
            </div>
        </div>
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Add user
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup label="Title" name="title">
                        <UInput v-model="state.title" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput v-model="state.email" />
                    </UFormGroup>

                    <UFormGroup label="Role" name="role">
                        <USelectMenu v-model="state.role" :options="roles" />
                    </UFormGroup>

                    <UButton type="submit" label="Submit" />
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
const q = ref('')
const isOpen = ref(false)
const isLoading = ref(true)
const toast = useToast()

const links = [
    {
        label: 'Home',
        icon: 'i-heroicons-home',
        to: '/'
    },
    {
        label: 'Users',
        icon: 'i-heroicons-user'
    }
]

const sort = ref({
    column: 'id',
    direction: 'asc'
})

const columns = [
    {
        key: 'id',
        label: 'ID',
        sortable: true
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true
    },
    {
        key: 'title',
        label: 'Title'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'role',
        label: 'Role'
    },
    {
        key: 'actions',
        label: 'Action'
    }
]

const people = reactive([
    {
        id: 1,
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member'
    },
    {
        id: 2,
        name: 'Courtney Henry',
        title: 'Designer',
        email: 'courtney.henry@example.com',
        role: 'Admin'
    },
    {
        id: 3,
        name: 'Tom Cook',
        title: 'Director of Product',
        email: 'tom.cook@example.com',
        role: 'Member'
    },
    {
        id: 4,
        name: 'Whitney Francis',
        title: 'Copywriter',
        email: 'whitney.francis@example.com',
        role: 'Admin'
    },
    {
        id: 5,
        name: 'Leonard Krasner',
        title: 'Senior Designer',
        email: 'leonard.krasner@example.com',
        role: 'Owner'
    },
    {
        id: 6,
        name: 'Floyd Miles',
        title: 'Principal Designer',
        email: 'floyd.miles@example.com',
        role: 'Member'
    }
])

const items = (row) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => onEdit(row)
    }, {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => onDelete(row)
    }]
]

const roles = ["Admin", "Member"]

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
    if (!q.value) {
        setTimeout(() => {
            isLoading.value = false;
        }, 1000);
        
        return people.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    }

    return people.filter((person) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

const state = reactive({
    id: undefined,
    name: undefined,
    title: undefined,
    email: undefined,
    role: undefined
})

const validate = (state) => {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Please provide name of user' })
    if (!state.title) errors.push({ path: 'title', message: 'Please provide title' })
    if (!state.email) errors.push({ path: 'email', message: 'Please provide email address' })
    if (!state.role) errors.push({ path: 'role', message: 'Please select appropriate role' })
    return errors
}

function onDelete(data) {
    const index = people.findIndex((obj) => obj.id === data.id);
    people.splice(index, 1)
    toast.add({ title: 'User deleted successfully!' })
}

async function onEdit(data) {
    state.id = data.id
    state.name = data.name
    state.title = data.title
    state.email = data.email
    state.role = data.role
    isOpen.value = true
}

async function onSubmit(event) {
    if (state.id) {
        const index = people.findIndex(obj => obj.id === state.id);
        if (index === -1) {
            toast.add({ title: 'Something went wrong, please try again later' })
        } else {
            people[index] = {
                ...people[index],
                ...event.data,
            };
            isOpen.value = false
            toast.add({ title: 'User updated successfully!' })
        }
    }
    else {
        const maxId = Math.max(...people.map(obj => obj.id));
        event.data['id'] = maxId + 1
        const formData = { ...event.data, id: maxId + 1 };
        people.push(formData);
        isOpen.value = false
        toast.add({ title: 'User added successfully!' })
    }
    state.id = undefined
    state.name = undefined
    state.title = undefined
    state.email = undefined
    state.role = undefined
}
</script>
