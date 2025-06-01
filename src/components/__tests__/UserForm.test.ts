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
});
