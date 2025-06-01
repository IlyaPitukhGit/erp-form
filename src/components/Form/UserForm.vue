<template>
    <form class="user-form" @submit.prevent="handleSubmit">
        <h2 class="user-form__title">User Settings</h2>

        <section class="user-form__section">
            <h3 class="user-form__section-title">Personal Information</h3>
            <div class="user-form__grid-container">
                <v-input
                    v-model="form.firstName"
                    label="First Name"
                    :error="errors.firstName"
                    placeholder="Your First Name"
                    @blur="handleBlur('firstName')"
                />
                <v-input
                    v-model="form.lastName"
                    label="Last Name"
                    :error="errors.lastName"
                    placeholder="Your Last Name"
                    @blur="handleBlur('lastName')"
                />
                <v-input
                    v-model="form.login"
                    label="Email"
                    :error="errors.login"
                    placeholder="Your Email Address"
                    @blur="handleBlur('login')"
                />
                <v-input
                    v-model="form.password"
                    label="Password"
                    type="password"
                    :show-password-toggle="true"
                    :error="errors.password"
                    placeholder="Your Password"
                    @blur="handleBlur('password')"
                />
            </div>
        </section>

        <!-- Permissions -->
        <section class="user-form__section">
            <h3 class="user-form__section-title">Operations</h3>
            <permissions-section
                v-model="form.permissions"
                :error="errors.permissions"
                @blur="handleBlur('permissions')"
            />
        </section>

        <!-- Main Page -->
        <section class="user-form__section">
            <h3 class="user-form__section-title">Main page</h3>
            <main-page-selector
                v-model="form.mainPage"
                :error="errors.mainPage"
                @blur="handleBlur('mainPage')"
            />
        </section>

        <!-- Second Shift -->
        <section class="user-form__section">
            <h3 class="user-form__section-title">Second Shift Assignment</h3>
            <second-shift-checkbox v-model="form.secondShift" />
        </section>

        <!-- Buttons -->
        <div class="user-form__button-container">
            <section class="user-form__section">
                <v-button
                    type="submit"
                    variant="primary"
                    :disabled="isSubmitting"
                    >Save</v-button
                >
            </section>
            <section class="user-form__section">
                <v-button
                    type="button"
                    variant="cancel"
                    :disabled="isSubmitting"
                    @click="resetForm"
                    >Cancel</v-button
                >
            </section>
        </div>

        <!-- Loader -->
        <v-loader v-model="loaderVisible" :status="loaderStatus" />
    </form>
</template>

<script lang="ts" setup>
import { useForm } from "@/composables/useForm";
import type { UserFormModel } from "@/types/user-form.types";

const {
    form,
    errors,
    isSubmitting,
    loaderVisible,
    loaderStatus,
    handleSubmit,
    resetForm,
    onBlur,
} = useForm();

function handleBlur(field: keyof UserFormModel) {
    onBlur(field);
}
</script>

<style scoped>
.user-form {
    border-radius: 1.25rem;
    border: 1px solid var(--Grey, #dde2e5);
    background: #fff;
    padding: 2.3125rem 2.6875rem;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
}

.user-form__title {
    color: var(--Black-5, #2b2f32);
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 2.5rem;
}

.user-form__section-title {
    color: var(--Black-5, #2b2f32);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 1.5rem;
}

.user-form__grid-container,
.user-form__button-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    column-gap: 2.75rem;
    row-gap: 1.5rem;
}

.user-form__button-container {
    row-gap: 1.25rem;
}

@media (max-width: 768px) {
    .user-form__grid-container,
    .user-form__button-container {
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
}

@media (max-width: 480px) {
    .user-form {
        padding: 1.75rem;
    }

    .user-form__grid-container,
    .user-form__button-container {
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    }
}

@media (max-width: 374px) {
    .user-form {
        padding: 1.5rem;
    }
}
</style>
