<template>
    <label class="v-radio" :class="{ 'is-checked': isChecked }">
        <input
            class="v-radio__control"
            type="radio"
            :value="value"
            :checked="modelValue === value"
            @change="handleChange"
        />
        <span class="v-radio__custom-border">
            <span class="v-radio__custom-fill"> </span>
        </span>
        <span class="v-radio__label">{{ label }}</span>
    </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
    name: "v-radio",
});

const props = defineProps<{
    modelValue: string;
    value: string;
    label: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "blur"): void;
}>();

const isChecked = computed(() => props.modelValue === props.value);

function handleChange() {
    emit("update:modelValue", props.value);
    emit("blur");
}
</script>

<style scoped>
.v-radio {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    cursor: pointer;
    position: relative;
    user-select: none;
}
.v-radio__control {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.v-radio__custom-border {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
    border-radius: 50%;
    border: 1px solid #6d7dcd;
}

.v-radio__custom-fill {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: background-color 0.15s ease 0s;
}

.v-radio.is-checked .v-radio__custom-fill {
    background-color: var(--Primary, #5570f1);
}

.v-radio__icon {
    width: 12px;
    height: 12px;
    color: #b0cad9;
}

.v-radio__label {
    color: var(--Black-5, #2b2f32);

    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
