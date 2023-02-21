<template>
    <v-dialog v-model="dialog" width="450">
        <template v-slot:activator="{ props }">
            <v-btn variant="flat" color="primary" v-bind="props">Create user</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-sheet class="mx-auto">
                    <div class="text-h5 mb-5">Create User</div>
                    <v-form validate-on="submit" @submit.prevent="submit">
                        <v-text-field v-model="user.login" label="Login" />
                        <v-text-field v-model="user.name" label="Name" />
                        <v-text-field v-model="user.password" label="Password" type="password" />
                        <v-text-field v-model="user.passwordRepeat" label="Password Repeat" type="password" />
                        <v-btn type="submit" color="primary" block class="mt-2">Submit</v-btn>
                    </v-form>
                </v-sheet>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
import { statuses } from '@/store/modules/users';
export default {
    data() {
        const initialUser = {
                login: '',
                name: '',
                password: '',
                passwordRepeat: '',};
        const submit = () => {
            const newUser = {
                id: Date.now(),
                login: this.userLogin,
                name: this.userName,
                password: this.userPassword,
            };
            this.$store.dispatch(statuses.ADD_USER, newUser);
            this.user = { ...initialUser }
            this.dialog = false;
        };
        return {
            user: { ...initialUser },
            dialog: false,
            submit,
        }
    },
}
</script>