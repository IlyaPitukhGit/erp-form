import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import UserForm from "../Form/UserForm.vue";

import VInput from "@/components/UI/VInput.vue";
import VCheckbox from "@/components/UI/VCheckbox.vue";
import VRadio from "@/components/UI/VRadio.vue";
import VButton from "@/components/UI/VButton.vue";
import VLoader from "@/components/UI/VLoader.vue";
import PermissionsSection from "@/components/Form/PermissionsSection.vue";
import MainPageSelector from "@/components/Form/MainPageSelector.vue";
import SecondShiftCheckbox from "@/components/Form/SecondShiftCheckbox.vue";

vi.mock("@/utils/fakeApi", () => ({
    postUserForm: vi.fn(() => Promise.resolve({ status: "success" })),
}));

const globalComponents = {
    components: {
        VInput,
        VCheckbox,
        VRadio,
        VButton,
        VLoader,
        PermissionsSection,
        MainPageSelector,
        SecondShiftCheckbox,
    },
};

describe("UserForm.vue", () => {
    it("shows validation errors when required fields are empty", async () => {
        render(UserForm, { global: globalComponents });

        const saveButton = screen.getByText(/save/i);
        await fireEvent.click(saveButton);

        expect(
            await screen.findByText(/First name is required/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Login is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Select at least one operation/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Select the home page/i)).toBeInTheDocument();
    });

    it("submits form successfully and resets fields", async () => {
        render(UserForm, { global: globalComponents });

        await fireEvent.update(
            screen.getByPlaceholderText(/your first name/i),
            "John"
        );
        await fireEvent.update(
            screen.getByPlaceholderText(/your last name/i),
            "Doe"
        );
        await fireEvent.update(
            screen.getByPlaceholderText(/your email address/i),
            "john@example.com"
        );
        await fireEvent.update(
            screen.getByPlaceholderText(/your password/i),
            "abc123"
        );

        const permissionCheckbox = screen.getByRole("checkbox", {
            name: /warehouse - create/i,
        });
        await fireEvent.click(permissionCheckbox);

        const radioWarehouse = screen.getByRole("radio", {
            name: /warehouse/i,
        });
        await fireEvent.click(radioWarehouse);

        const secondShiftCheckbox = screen.getByRole("checkbox", {
            name: /second shift/i,
        });
        await fireEvent.click(secondShiftCheckbox);

        const saveButton = screen.getByText(/save/i);
        await fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/your first name/i)).toHaveValue(
                ""
            );
            expect(screen.getByPlaceholderText(/your last name/i)).toHaveValue(
                ""
            );
            expect(
                screen.getByPlaceholderText(/your email address/i)
            ).toHaveValue("");
            expect(screen.getByPlaceholderText(/your password/i)).toHaveValue(
                ""
            );
        });
    });

    it("shows error for invalid email format on blur", async () => {
        render(UserForm, { global: globalComponents });

        const emailInput = screen.getByPlaceholderText(/your email address/i);
        await fireEvent.update(emailInput, "invalidemail");
        await fireEvent.blur(emailInput);

        expect(
            await screen.findByText(/invalid email format/i)
        ).toBeInTheDocument();
    });

    it("clears email error after valid input on blur", async () => {
        render(UserForm, { global: globalComponents });

        const emailInput = screen.getByPlaceholderText(/your email address/i);
        await fireEvent.update(emailInput, "wrong");
        await fireEvent.blur(emailInput);
        expect(
            await screen.findByText(/invalid email format/i)
        ).toBeInTheDocument();

        await fireEvent.update(emailInput, "correct@email.com");
        await fireEvent.blur(emailInput);

        await waitFor(() => {
            expect(
                screen.queryByText(/invalid email format/i)
            ).not.toBeInTheDocument();
        });
    });

    it("shows password strength error", async () => {
        render(UserForm, { global: globalComponents });

        const passwordInput = screen.getByPlaceholderText(/your password/i);
        await fireEvent.update(passwordInput, "123");
        await fireEvent.blur(passwordInput);

        expect(
            await screen.findByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
    });

    it("does not clear error until blur", async () => {
        render(UserForm, { global: globalComponents });

        const passwordInput = screen.getByPlaceholderText(/your password/i);
        await fireEvent.update(passwordInput, "123");
        await fireEvent.blur(passwordInput);

        expect(
            await screen.findByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();

        await fireEvent.update(passwordInput, "abc123");
        expect(
            screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
    });

    it("trims whitespace from text fields before submit", async () => {
        const { getByPlaceholderText, getByText } = render(UserForm, {
            global: globalComponents,
        });

        await fireEvent.update(
            getByPlaceholderText(/your first name/i),
            "  John  "
        );
        await fireEvent.update(
            getByPlaceholderText(/your last name/i),
            "  Doe  "
        );
        await fireEvent.update(
            getByPlaceholderText(/your email address/i),
            "  john@example.com  "
        );
        await fireEvent.update(
            getByPlaceholderText(/your password/i),
            "  abc123  "
        );

        const checkbox = screen.getByRole("checkbox", {
            name: /warehouse - create/i,
        });
        await fireEvent.click(checkbox);

        const radio = screen.getByRole("radio", { name: /warehouse/i });
        await fireEvent.click(radio);

        await fireEvent.click(getByText(/save/i));

        const { postUserForm } = await import("@/utils/fakeApi");
        expect(postUserForm).toHaveBeenCalledWith(
            expect.objectContaining({
                firstName: "John",
                lastName: "Doe",
                login: "john@example.com",
                password: "abc123",
            })
        );
    });

    it("resets form when Cancel button is clicked", async () => {
        render(UserForm, { global: globalComponents });

        await fireEvent.update(
            screen.getByPlaceholderText(/your first name/i),
            "ToBeReset"
        );

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        await fireEvent.click(cancelButton);

        expect(screen.getByPlaceholderText(/your first name/i)).toHaveValue("");
    });
});
