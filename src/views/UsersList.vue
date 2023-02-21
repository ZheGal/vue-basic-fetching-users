<template>
    <v-container>
        <v-toolbar class="mb-4" title="List of users">
            <v-spacer></v-spacer>
            <CreateUserModal />
        </v-toolbar>
        <v-data-table v-if="users.length" v-model:items-per-page="itemsPerPage" :headers="headers" :items="users"
            item-value="name" class="elevation-1">
            <template v-slot:item.picture="{ item }">
                <div class="my-3"><v-avatar size="80"><v-img :src="item.raw.picture" /></v-avatar></div>
            </template>
            <template v-slot:item.actions="{ item }">
                <!-- <v-btn color="primary" class="mr-3" v-model="item.value.actions">Auth as</v-btn> -->
                <!-- <v-btn color="warning" class="mr-3" v-model="item.value.actions">Edit</v-btn> -->
                <!-- <v-btn color="error" v-model="item.value.actions">Remove</v-btn> -->
            </template>
        </v-data-table>
        <v-container v-else>Users are not found. Please create new user</v-container>
    </v-container>
</template>

<script>
import CreateUserModal from '@/components/CreateUserModal';
import { mapActions, mapMutations, mapState } from 'vuex';
import { statuses } from '@/store/modules/users';

export default {
    name: 'UsersList',
    created() {
        this.$store.dispatch(statuses.LOAD_USERS);
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            loadUsers: statuses.LOAD_USERS_START
        }),
    },
    computed: {
        ...mapState({
            users: state => state.users.data,
        }),
    },
    components: {
        CreateUserModal
    },
    data: () => ({
        itemsPerPage: 10,
        headers: [
            {
                title: "ID",
                align: "start",
                sortable: true,
                key: 'id',
            },
            {
                title: "Login",
                align: "end",
                sortable: true,
                key: 'login',
            },
            {
                title: "Name",
                align: "end",
                sortable: true,
                key: 'name',
            },
            {
                title: "Avatar",
                align: "end",
                sortable: false,
                key: 'picture',
            },
            {
                title: "Actions",
                align: "end",
                sortable: false,
                key: 'actions'
            }
        ]
    }),
}
</script>