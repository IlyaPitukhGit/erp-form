<template>
    <div class="v-input">
        <div
            :class="[
                'v-input__wrapper',
                { 'is-focused': isFocused, 'v-input__control--error': !!error },
            ]"
        >
            <label class="v-input__label" v-if="label" :for="inputId">{{
                label
            }}</label>
            <input
                :id="inputId"
                :type="currentInputType"
                :placeholder="placeholder"
                :value="modelValue"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                :aria-invalid="!!error"
                :aria-describedby="error ? `${inputId}-error` : undefined"
                :class="['v-input__control']"
            />
            <button
                v-if="props.type === 'password' && props.showPasswordToggle"
                type="button"
                class="v-input__toggle"
                @click="isPasswordVisible = !isPasswordVisible"
                aria-label="Show password"
            >
                <component :is="isPasswordVisible ? EyeOff : EyeOn" />
            </button>
        </div>

        <p v-if="error" :id="`${inputId}-error`" class="v-input__error">
            {{ error }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import EyeOn from "@/icons/EyeOn.vue";
import EyeOff from "@/icons/EyeOff.vue";

defineOptions({
    name: "v-input",
});

const props = defineProps<{
    modelValue: string;
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    label?: string;
    error?: string;
    showPasswordToggle?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const inputId = computed(
    () => `input-${Math.random().toString(36).slice(2, 10)}`
);

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
}

const isFocused = ref(false);
const isPasswordVisible = ref(false);

function onFocus() {
    isFocused.value = true;
}

function onBlur() {
    isFocused.value = false;
}

const currentInputType = computed(() => {
    if (props.type === "password" && props.showPasswordToggle) {
        return isPasswordVisible.value ? "text" : "password";
    }
    return props.type ?? "text";
});
</script>

<style scoped>
.v-input {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
}

.v-input__wrapper {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: var(--Input-defaultBackground, rgba(239, 241, 249, 0.6));
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    transition: all 0.15s ease 0s;
    position: relative;
}

.v-input__wrapper.is-focused {
    background: var(--Input-focusBackground, rgba(233, 236, 248, 0.9));
}

.v-input__wrapper.v-input__control--error {
    background: var(--Input-errorBackground, rgba(252, 243, 242, 0.7));
}

.v-input__label {
    color: var(--Black-4, #5e6366);
    /* Input/Label */
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.v-input__wrapper.is-focused .v-input__label {
    color: var(--Primary, #5570f1);
}

.v-input__wrapper.v-input__control--error .v-input__label {
    color: var(--Danger, #f57e77);
}

.v-input__control {
    color: var(--Black-4, #5e6366);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
}

.v-input__control::placeholder {
    color: var(--Black-2, #abafb1);
}

.v-input__error {
    color: var(--Danger, #f57e77);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.v-input__toggle {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--Black-4, #5e6366);
}
</style>
