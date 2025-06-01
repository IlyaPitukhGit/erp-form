<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="[
            'v-button',
            `v-button--${variant}`,
            { 'v-button--disabled': disabled },
        ]"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup>
defineOptions({
    name: "v-button",
});

const props = withDefaults(
    defineProps<{
        type?: "button" | "submit";
        disabled?: boolean;
        variant?: "primary" | "secondary" | "danger" | "cancel";
    }>(),
    {
        type: "button",
        disabled: false,
        variant: "primary",
    }
);
</script>

<style scoped>
.v-button {
    padding: 1.0625rem 1rem;
    border-radius: 0.75rem;
    background: var(--Primary, #5570f1);
    color: #fff;
    text-align: center;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100%;
    transition: background-color 0.3s ease 0s;
}

.v-button--primary {
    background: var(--Primary, #5570f1);
}

.v-button--primary:hover,
.v-button--primary:active {
    background: #5b6ec6;
}

.v-button--secondary {
    background: var(--Green, #32936f);
    color: #fff;
}

.v-button--secondary:hover,
.v-button--secondary:active {
    background: #458b71;
}

.v-button--danger {
    background: var(--Danger, #f57e77);
}

.v-button--danger:hover,
.v-button--danger:active {
    background: #c95f58;
}

.v-button--cancel {
    background: transparent;
    border: 1px solid var(--Grey, #dde2e5);
    color: var(--Primary, #5570f1);

    border: 2px solid var(--Primary, #5570f1);
}
.v-button--cancel:hover,
.v-button--cancel:active {
    border: 2px solid #5b6ec6;
}

.v-button--disabled {
    opacity: 0.6;
    pointer-events: none;
}
</style>
