<template>
    <p class="error-message" v-if="text">
        {{ text }}
    </p>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
    text: string;
}>();
</script>

<style scoped>
.error-message {
    color: var(--Danger, #f57e77);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
