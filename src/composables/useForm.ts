import { reactive, ref } from "vue";
import { validateForm } from "./useValidation";
import type { FormErrors } from "./useValidation";
import type { UserFormModel } from "@/types/user-form.types";
import { postUserForm } from "@/utils/fakeApi";

export function useForm() {
    const form = reactive<UserFormModel>({
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        permissions: {
            warehouse: [],
            categories: [],
            characteristics: [],
        },
        mainPage: "",
        secondShift: false,
    });

    const errors = ref<FormErrors>({});
    const touched = reactive<Record<keyof UserFormModel, boolean>>({
        firstName: false,
        lastName: false,
        login: false,
        password: false,
        permissions: false,
        mainPage: false,
        secondShift: false,
    });

    const isSubmitting = ref(false);
    const loaderVisible = ref(false);
    const loaderStatus = ref<"loading" | "success" | "error">("loading");

    function trimFormFields() {
        form.firstName = form.firstName.trim();
        form.lastName = form.lastName.trim();
        form.login = form.login.trim();
        form.password = form.password.trim();
        form.mainPage = form.mainPage.trim();
    }

    function validate(): boolean {
        const validationErrors = validateForm(form);
        errors.value = validationErrors;
        return Object.keys(validationErrors).length === 0;
    }

    function validateField(field: keyof UserFormModel) {
        const validationErrors = validateForm(form);
        if (validationErrors[field]) {
            errors.value[field] = validationErrors[field];
        } else {
            delete errors.value[field];
        }
    }

    function validateTouchedField(field: keyof UserFormModel) {
        const trimmedFieldValue = form[field];
        const partialForm = { ...form, [field]: trimmedFieldValue };

        const fieldError = validateForm(partialForm)[field];
        if (fieldError) {
            errors.value[field] = fieldError;
        } else {
            delete errors.value[field];
        }
    }

    function onBlur(field: keyof UserFormModel) {
        touched[field] = true;
        validateField(field);
    }

    async function handleSubmit(): Promise<void> {
       
        trimFormFields();

        const isValid = validate();
      

        if (!isValid) {
            loaderVisible.value = false;
            return;
        }

        isSubmitting.value = true;
        loaderVisible.value = true;
        loaderStatus.value = "loading";

        try {
            await postUserForm({ ...form });
            loaderStatus.value = "success";
            resetForm();
        } catch (error) {
            console.error("API error:", error);
            loaderStatus.value = "error";
        } finally {
            isSubmitting.value = false;
            setTimeout(() => {
                loaderVisible.value = false;
            }, 2000);
        }
    }

    function resetForm() {
        form.firstName = "";
        form.lastName = "";
        form.login = "";
        form.password = "";
        form.permissions = {
            warehouse: [],
            categories: [],
            characteristics: [],
        };
        form.mainPage = "";
        form.secondShift = false;
        errors.value = {};

        for (const key in touched) {
            touched[key as keyof UserFormModel] = false;
        }
    }

    return {
        form,
        errors,
        touched,
        isSubmitting,
        loaderVisible,
        loaderStatus,
        handleSubmit,
        resetForm,
        onBlur,
        validateTouchedField,
    };
}
