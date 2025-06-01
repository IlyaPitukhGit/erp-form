<template>
    <div
        class="main-page"
        role="radiogroup"
        aria-label="Main page selection"
        :aria-describedby="error ? 'main-page-error' : undefined"
    >
        <div class="main-page__scroll" :class="{ 'has-error': error }">
            <ul class="main-page__list">
                <li
                    v-for="option in options"
                    :key="option.value"
                    class="main-page__item"
                    :class="{ 'is-checked': localModel === option.value }"
                >
                    <v-radio
                        :value="option.value"
                        :label="option.label"
                        v-model="localModel"
                    />
                </li>
            </ul>
        </div>

        <error-message
            class="main-page__error"
            v-if="error"
            id="main-page-error"
            :text="error"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ErrorMessage from "../UI/ErrorMessage.vue";

defineOptions({ name: "main-page-selector" });

const props = defineProps<{
    modelValue: string;
    error?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const localModel = computed({
    get: () => props.modelValue,
    set: (val: string) => emit("update:modelValue", val),
});

const options = [
    { label: "Warehouse", value: "warehouse" },
    { label: "Categories", value: "categories" },
    { label: "Features", value: "features" },
    { label: "Products", value: "products" },
    { label: "Operations", value: "operations" },
];
</script>

<style scoped>
.main-page {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
}

.main-page__scroll {
    max-height: 240px;
    overflow-y: auto;
    padding-right: 0.5rem;
    border: 2px solid var(--Input-focusBackground, rgba(233, 236, 248, 0.9));
    border-radius: 0.5rem;
}

.main-page__scroll.has-error {
    border: 1px solid var(--Danger, #f57e77);
}

.main-page__list {
    display: flex;
    flex-direction: column;
}

.main-page__item {
    padding: 0.625rem;
    background: var(--Input-defaultBackground, rgba(239, 241, 249, 0.6));
}

.main-page__item.is-checked {
    background: var(--Input-focusBackground, rgba(233, 236, 248, 0.9));
}

.main-page__error {
    color: var(--Danger, #f57e77);
    font-size: 0.75rem;
}
</style>
