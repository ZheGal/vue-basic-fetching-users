<template>
    <v-container>
        <v-card style="width: 550px; margin: 0 auto;" class="px-5 py-5">
            <v-form validate-on="submit" @submit.prevent="login">
                <v-text-field v-model="username" label="Login" />
                <v-text-field v-model="password" label="Password" type="password" />
                <v-btn type="submit" color="primary" block class="mt-2">Login</v-btn>
            </v-form></v-card>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            const credentials = {
                username: this.username,
                password: this.password
            }
            this.$store.dispatch('login', credentials);
            // this.$router.push('/')
        }
    }
}
</script>