<template>
    <div>
        <EditUserModal :id="userId" />
        <v-btn @click="removeUser(userId)" color="error">Remove</v-btn>
    </div>
</template>
  
<script>
export default {
    props: {
        userId: String,
    },
    methods: {
        removeUser(id) {
            this.$emit("remove-user", id);
        },
    },
};
</script>