<template>
    <v-container>
        <v-toolbar class="mb-4" title="List of users">
            <v-spacer></v-spacer>
            <CreateUserModal />
        </v-toolbar>
        <v-data-table v-if="users.length" v-model:items-per-page="itemsPerPage" :headers="headers" :items="users"
            item-value="name" class="elevation-1">
            <template v-slot:item.picture="{ item }">
                <UserAvatar :user="item" />
            </template>
            <template v-slot:item.actions="{ item }">
                <EditUserModal :id="item.raw.id" />
                <v-btn @click="removeUser(item.raw.id)" :id="item.raw.id" color="error"
                    v-model="item.value.actions">Remove</v-btn>
            </template>
        </v-data-table>
        <v-container v-else>Users are not found. Please create new user</v-container>
    </v-container>
</template>

<script>
import CreateUserModal from '@/components/CreateUserModal';
import { mapActions, mapState } from 'vuex';
import { statuses } from '@/store/modules/users';
import EditUserModal from '@/components/EditUserModal.vue';
import UserAvatar from "@/components/UserAvatar.vue";

export default {
    name: 'UsersList',
    created() {
        this.$store.dispatch(statuses.LOAD_USERS);
    },
    methods: {
        ...mapActions({
            authAs: 'authAs',
            removeUser: 'removeUser',
        }),
    },
    computed: {
        ...mapState({
            users: state => state.users.data,
        }),
    },
    components: {
        CreateUserModal,
        UserAvatar,
        EditUserModal,
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