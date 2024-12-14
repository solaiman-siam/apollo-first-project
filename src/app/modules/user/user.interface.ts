
export type TUser = {
    id: string;
    role: 'admin' | 'student' | 'faculty';
    password: string;
    needsPasswordChange: boolean;
    status: 'in-progress' | 'block';
    isDeleted: boolean
}
