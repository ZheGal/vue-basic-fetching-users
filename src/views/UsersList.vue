<template>
    <v-container>
        <v-toolbar class="mb-4" title="List of users">
            <v-spacer></v-spacer>
            <CreateUserModal />
        </v-toolbar>
        <!-- <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
            class="elevation-1"></v-data-table> -->
    </v-container>
</template>

<script>
import CreateUserModal from '@/components/CreateUserModal';
export default {
    name: 'UsersList',
    updated() {
        console.log(this.$store.state.users.data);
    },
    components: {
        CreateUserModal
    }
}
</script>