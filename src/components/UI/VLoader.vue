<template>
    <transition name="fade">
        <div class="v-loader" v-if="visible">
            <div class="v-loader__content">
                <span
                    class="v-loader__icon"
                    :class="{ spinning: status === 'loading' }"
                >
                    <component :is="iconComponent" />
                </span>
                <p class="v-loader__text">{{ textMessage }}</p>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import SpinnerIcon from "@/icons/SpinnerIcon.vue";
import SuccessIcon from "@/icons/SuccessIcon.vue";
import ErrorIcon from "@/icons/ErrorIcon.vue";

defineOptions({ name: "v-loader" });

const props = defineProps<{
    modelValue: boolean;
    status?: "loading" | "success" | "error";
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const visible = ref(false);

const iconComponent = computed(() => {
    switch (props.status) {
        case "success":
            return SuccessIcon;
        case "error":
            return ErrorIcon;
        default:
            return SpinnerIcon;
    }
});

const textMessage = computed(() => {
    switch (props.status) {
        case "success":
            return "Data successfully saved";
        case "error":
            return "Something went wrong";
        default:
            return "Loading...";
    }
});

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            visible.value = true;
        } else {
            setTimeout(() => {
                visible.value = false;
                emit("update:modelValue", false);
            }, 2000);
        }
    }
);
</script>

<style scoped>
.v-loader {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.v-loader__content {
    background: white;
    padding: 2rem 3rem;
    border-radius: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.v-loader__icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
}

.v-loader__icon svg {
    width: 100%;
    height: 100%;
}

.v-loader__icon.spinning {
    animation: spin 1s linear infinite;
}

.v-loader__text {
    font-size: 1.2rem;
    color: #333;
    font-weight: 500;
}

.v-loader__icon:is(.success) {
    animation: none;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
