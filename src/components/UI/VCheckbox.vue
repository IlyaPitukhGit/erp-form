<template>
    <label class="v-checkbox" :class="{ 'is-checked': isChecked }">
        <input
            type="checkbox"
            class="v-checkbox__control"
            :value="value"
            :checked="isChecked"
            @change="handleChange"
            :aria-label="ariaLabel"
        />
        <span class="v-checkbox__custom-border">
            <span class="v-checkbox__custom-fill">
                <CheckIcon v-if="isChecked" iconClass="v-checkbox__icon" />
            </span>
        </span>
        <span class="v-checkbox__label">
            <slot />
        </span>
    </label>
</template>

<script lang="ts" setup>
import { CheckIcon } from "@/icons";
import { computed } from "vue";

defineOptions({
    name: "v-checkbox",
});

const props = defineProps<{
    modelValue: boolean | unknown[];
    value?: unknown;
    ariaLabel?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean | unknown[]): void;
}>();

const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
    } else {
        return props.modelValue;
    }
});

function handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (Array.isArray(props.modelValue)) {
        const current = [...props.modelValue];
        if (checked) {
            if (!current.includes(props.value)) current.push(props.value);
        } else {
            const index = current.indexOf(props.value);
            if (index !== -1) current.splice(index, 1);
        }
        emit("update:modelValue", current);
    } else {
        emit("update:modelValue", checked);
    }
}
</script>

<style scoped>
.v-checkbox {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    cursor: pointer;
    position: relative;
    user-select: none;
}
.v-checkbox__control {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.v-checkbox__custom-border {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.125rem;
    border-radius: 8px;
    border: 1px solid #6d7dcd;
}

.v-checkbox__custom-fill {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    transition: background-color 0.15s ease 0s;
}

.v-checkbox.is-checked .v-checkbox__custom-fill {
    background-color: var(--Primary, #5570f1);
}

.v-checkbox__icon {
    width: 12px;
    height: 12px;
    color: #b0cad9;
}

.v-checkbox__label {
    color: var(--Black-5, #2b2f32);

    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>
