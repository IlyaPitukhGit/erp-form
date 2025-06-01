import type { UserFormModel } from "@/types/user-form.types";

export type FormErrors = Partial<Record<keyof UserFormModel, string>>;

function isValidEmail(email: string): boolean {
    return email.includes("@") && email.includes(".");
}

function isStrongPassword(password: string): boolean {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 6 && hasLetter && hasNumber;
}

export function validateForm(form: UserFormModel): FormErrors {
    const errors: FormErrors = {};

    if (!form.firstName.trim()) {
        errors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
        errors.lastName = "Last name is required";
    }

    if (!form.login.trim()) {
        errors.login = "Login is required";
    } else if (!isValidEmail(form.login.trim())) {
        errors.login = "Invalid email format";
    }

    if (!form.password.trim()) {
        errors.password = "Password is required";
    } else if (!isStrongPassword(form.password.trim())) {
        errors.password =
            "Password must be at least 6 characters and contain a letter and a number";
    }

    const hasNoPermissions =
        form.permissions.warehouse.length === 0 &&
        form.permissions.categories.length === 0 &&
        form.permissions.characteristics.length === 0;

    if (hasNoPermissions) {
        errors.permissions = "Select at least one operation";
    }

    if (!form.mainPage.trim()) {
        errors.mainPage = "Select the home page";
    }

    return errors;
}
