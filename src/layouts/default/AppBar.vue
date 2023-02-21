<template>
  <v-app-bar>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      List of Users
    </v-app-bar-title>
    <v-app-bar-title>
      <v-container class="text-right">
        <div v-if="user">
          <v-app-bar-nav-icon>
            <v-avatar>
              <v-img :src="user.picture" />
            </v-avatar>
          </v-app-bar-nav-icon>
          <span v-if="user">{{ user.login }}</span>
          <v-btn @click="logout" color="error">Logout</v-btn>
        </div>
        <div v-else>
          <router-link to="/login">
            <v-btn color="primary">Login</v-btn>
          </router-link>
        </div>
      </v-container>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>
