<template>
    <div class="second-shift">
        <v-checkbox aria-label="Second shift" v-model="localModel"
            >Second Shift</v-checkbox
        >
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineOptions({
    name: "second-shift-checkbox",
});

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const localModel = computed({
    get: () => props.modelValue,
    set: (val: boolean) => {
        emit("update:modelValue", val);
    },
});
</script>

<style scoped></style>
