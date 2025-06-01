<template>
    <div class="wrapper">
        <div class="container">
            <user-form />
        </div>
    </div>
</template>

<script setup lang="ts">
import UserForm from "./components/Form/UserForm.vue";
</script>

<style scoped>
.wrapper {
    width: 100%;
    min-height: 100dvh;
    display: flex;
    align-items: center;
}

.container {
    max-width: 924px;
    margin: 0 auto;
    width: 100%;
    padding-top: 5vh;
    padding-bottom: 10vh;
}

@media (max-width: 964px) {
    .container {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        max-width: none;
    }
}
</style>
