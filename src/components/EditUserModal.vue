<template>
    <v-dialog v-model="dialog" width="450">
        <template v-slot:activator="{ props }">
            <v-btn color="warning" class="mr-3" v-bind="props">Edit</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-sheet class="mx-auto">
                    <div class="text-h5 mb-5">Edit User</div>
                    <v-form validate-on="submit" @submit.prevent="submit">
                        <v-text-field v-model="user.login" label="Login" />
                        <v-text-field v-model="user.name" label="Name" />
                        <v-text-field v-model="user.oldPassword" label="Old Password" type="password" />
                        <v-text-field v-model="user.password" label="New Password" type="password" />
                        <v-text-field v-model="user.passwordRepeat" label="New Password Repeat" type="password" />
                        <v-btn type="submit" color="primary" block class="mt-2">Submit</v-btn>
                    </v-form>
                </v-sheet>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
import axios from 'axios';
export default {
    props: ['id'],
    methods: {
        async fetchUser() {
            const { data: { login, name } } = await axios.get(`http://localhost:8001/users/${this.id}`);
            this.user = { login, name };
        }
    },
    data() {
        const initialUser = {
            login: '',
            name: '',
            password: '',
            passwordRepeat: '',
        };
        const submit = () => {
            const { login, name, password, passwordRepeat } = this.user;
            const newUser = {
                id: this.id,
                login,
                name,
                password,
            };
            this.$store.dispatch('updateUser', newUser);
            this.fetchUser();
            this.dialog = false;
        };
        return {
            user: { ...initialUser },
            dialog: false,
            submit,
        }
    },
    mounted() {
        this.fetchUser();
    }
}
</script>