# 🧩 User Management Module

> A flexible, form-driven Vue 3 + TypeScript component for user creation and access management, with full UX-aware validation and test coverage.

---

## 🔍 Project Overview

The **User Management Module** is a highly modular and reusable Vue 3 component suite designed to handle user creation workflows with a focus on usability, accessibility, and developer experience. The module includes granular permission control, conditional UI behavior, real-time validation feedback, and complete test coverage.

---

## 🚀 Key Features

-   **Dynamic validation system** that reacts to user input and blur events (UX-focused).
-   **Custom UI component integration** (`v-input`, `v-checkbox`, `v-radio`, `v-loader`, `v-button`).
-   **Scoped permissions assignment** for multiple domains (Warehouse, Categories, Characteristics).
-   **Controlled state management** using Composition API + reactive forms.
-   **Second shift assignment toggle** with clear Boolean state feedback.
-   **Home page selector** to define user default landing area.
-   **Form reset and loader feedback on submission**.
-   **Complete test suite** using Vue Testing Library + Vitest.

---

## 🧠 UX Considerations

-   Error messages appear only after field interaction (blur), never before.
-   All inputs are accessible via `aria-label`, enabling screen reader support.
-   Logical keyboard navigation order.
-   Form disables submit during loading.
-   Responsive layout with logical grouping (`Personal Info`, `Permissions`, `Main Page`, `Second Shift`).

---

## ⚙️ Technologies Used

-   Vue 3 (Composition API)
-   TypeScript
-   SCSS Modules
-   Vitest + Vue Testing Library

---

## 📦 Installation

```bash
git clone https://github.com/your-org/user-management-form.git
cd user-management-form
npm install
npm run dev
```

---

## ✅ Running Tests

```bash
npm run test
```

Test suite includes:

-   **Required Field Validation**  
    Ensures all required fields trigger validation errors when left empty.

-   **Form Submission Flow**  
    Simulates successful user input, submission, and automatic form reset.

-   **Email Format Validation**  
    Triggers validation message on blur for invalid emails.

-   **Password Strength Validation**  
    Displays error if password does not meet security criteria.

-   **Blur-Triggered Revalidation**  
    Errors are dynamically cleared once the field is corrected and blurred.

-   **No Error Clearance Without Blur**  
    Ensures that simply changing the field value does not hide errors until the user blurs the input.

-   **Input Trimming Before Submission**  
    Validates that leading/trailing whitespaces are removed before data submission.

-   **Cancel Button Behavior**  
    Clicking "Cancel" resets all form fields and validation errors.

---

## 📁 File Structure

```
src/
├── components/
│   ├── UserForm.vue
│   ├── UI/
│   │   ├── VInput.vue
│   │   ├── VCheckbox.vue
│   │   ├── VRadio.vue
│   │   ├── VButton.vue
│   │   └── VLoader.vue
│   ├── PermissionsSection.vue
│   ├── MainPageSelector.vue
│   └── SecondShiftCheckbox.vue
├── composables/
│   └── useForm.ts
├── types/
│   └── user-form.types.ts
├── utils/
│   └── fakeApi.ts
└── __tests__/
    └── UserForm.test.ts
```

---

## 📌 Sample Usage

```vue
<script setup lang="ts">
import UserForm from "@/components/UserForm.vue";

function handleSubmit(userData) {
    console.log("Submit:", userData);
}
</script>

<template>
    <UserForm @submit="handleSubmit" />
</template>
```

---

## 📄 License

MIT License

---

## 💡 Final Thoughts

This module showcases clean UI architecture, modular componentization, and robust test-driven development practices. Built with hiring managers in mind, it demonstrates:

-   Mastery of Vue 3 Composition API
-   Type-safe form control
-   UX-first engineering
-   Real-world testing workflows

> "Form UX is not just about validation — it's about trust, clarity, and guidance."

---
