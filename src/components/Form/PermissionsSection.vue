<template>
    <div class="permissions-section">
        <div class="permissions-section__actions">
            <v-button
                class="permissions-button"
                variant="secondary"
                @click="selectAll"
            >
                Select All
            </v-button>
            <v-button
                class="permissions-button"
                variant="danger"
                @click="clearAll"
            >
                Clear All
            </v-button>
        </div>

        <div
            class="permissions-scroll"
            :class="{ 'has-error': error }"
            role="group"
            aria-labelledby="permissions-title"
            :aria-describedby="error ? 'permissions-error' : undefined"
        >
            <h3 id="permissions-title" class="sr-only">User Permissions</h3>

            <div
                v-for="group in groupedPermissions"
                :key="group.name"
                class="permissions-group"
            >
                <h4 class="permissions-group__title">{{ group.label }}</h4>

                <ul class="permissions-group__list">
                    <li
                        v-for="option in group.options"
                        :key="option.value"
                        class="permissions-group__item"
                        :class="{
                            'is-checked': localModel[group.name].includes(
                                option.value
                            ),
                        }"
                    >
                        <v-checkbox
                            :value="option.value"
                            v-model="localModel[group.name]"
                            :aria-label="`${group.label} - ${option.label}`"
                        >
                            {{ option.label }}
                        </v-checkbox>
                    </li>
                </ul>
            </div>
        </div>

        <error-message
            class="permissions__error"
            v-if="error"
            id="permissions-error"
            :text="error"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ErrorMessage from "../UI/ErrorMessage.vue";
import VButton from "../UI/VButton.vue";
import type { PermissionGroup } from "@/types/user-form.types";

defineOptions({ name: "permissions-section" });

const props = defineProps<{
    modelValue: PermissionGroup;
    error?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: PermissionGroup): void;
}>();

const localModel = computed({
    get: () => props.modelValue,
    set: (val: PermissionGroup) => emit("update:modelValue", val),
});

function selectAll() {
    const updated: PermissionGroup = {
        warehouse: groupedPermissions
            .find((g) => g.name === "warehouse")!
            .options.map((opt) => opt.value),
        categories: groupedPermissions
            .find((g) => g.name === "categories")!
            .options.map((opt) => opt.value),
        characteristics: groupedPermissions
            .find((g) => g.name === "characteristics")!
            .options.map((opt) => opt.value),
    };
    emit("update:modelValue", updated);
}

function clearAll() {
    emit("update:modelValue", {
        warehouse: [],
        categories: [],
        characteristics: [],
    });
}

type PermissionKey = keyof PermissionGroup;

const groupedPermissions: {
    label: string;
    name: PermissionKey;
    options: { label: string; value: string }[];
}[] = [
    {
        label: "Warehouse",
        name: "warehouse",
        options: [
            { label: "Create", value: "create" },
            { label: "Update", value: "update" },
            { label: "Move", value: "move" },
            { label: "Delete", value: "delete" },
        ],
    },
    {
        label: "Categories",
        name: "categories",
        options: [
            { label: "Create", value: "create" },
            { label: "Update", value: "update" },
            { label: "Delete", value: "delete" },
        ],
    },
    {
        label: "Characteristics",
        name: "characteristics",
        options: [
            { label: "Create", value: "create" },
            { label: "Update", value: "update" },
            { label: "Delete", value: "delete" },
        ],
    },
];
</script>

<style scoped>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
}

.permissions-button {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    width: auto;
    min-width: 100px;
}

.permissions-section {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
}

.permissions-section__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    position: absolute;
    right: 0;
    top: -1rem;
    transform: translate(0, -100%);
}

.permissions-scroll {
    max-height: 320px;
    overflow-y: auto;
    padding-right: 0.5rem;
    border: 2px solid var(--Input-focusBackground, rgba(233, 236, 248, 0.9));
    border-radius: 0.5rem;
}

.permissions-scroll.has-error {
    border: 1px solid var(--Danger, #f57e77);
}

.permissions-group {
    padding: 0.5rem;
    background: var(--Input-defaultBackground, rgba(239, 241, 249, 0.6));
}

.permissions-group__title {
    margin-bottom: 0.75rem;
    color: var(--Black-5, #2b2f32);
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.permissions-group__list {
    display: flex;
    flex-direction: column;
}

.permissions-group__item {
    padding: 0.625rem;
}

.permissions-group__item.is-checked {
    background: var(--Input-focusBackground, rgba(233, 236, 248, 0.9));
}

.permissions__error {
    color: var(--Danger, #f57e77);
    font-size: 0.75rem;
}

@media (max-width: 480px) {
    .permissions-section__actions {
        position: static;
        transform: translate(0, 0);
    }

    .permissions-button {
        font-size: 0.875rem;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        width: 100%;
        min-width: 100px;
        margin-bottom: 1rem;
    }
}
</style>
