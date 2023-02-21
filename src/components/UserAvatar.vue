<template>
    <div class="my-3">
        <v-avatar size="80">
            <v-img :src="userPicture" />
        </v-avatar>
    </div>
</template>
  
<script>
export default {
    props: {
        user: Object,
    },
    computed: {
        userPicture() {
            return this.user.raw.picture;
        },
    },
};
</script>