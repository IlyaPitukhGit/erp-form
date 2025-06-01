export interface PermissionGroup {
    warehouse: string[];
    categories: string[];
    characteristics: string[];
}

export interface UserFormModel {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    permissions: PermissionGroup;
    mainPage: string;
    secondShift: boolean;
}
