import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { User } from "./user.model";

const findLastStudent = async () => {
    const lastStudent = await User.findOne(
        { role: 'student' },
        { id: 1, _id: 0 }
    )
    .sort({ createdAt: -1 })
    .lean();

    return lastStudent?.id ?? undefined;  // Return full ID
};

export const generateStudentId = async (payload: TAcademicSemister) => {
    let currentId = "0000";  // Default 4-digit number

    const lastStudentId = await findLastStudent();

    if (lastStudentId) {
        const lastStudentSemisterYear = lastStudentId.substring(0, 4);
        const lastStudentSemisterCode = lastStudentId.substring(4, 6);

        if (lastStudentSemisterYear === payload.year && lastStudentSemisterCode === payload.code) {
            currentId = lastStudentId.substring(6);  // Get the last 4 digits
        }
    }

    let newId;
    let isUnique = false;
    let attempt = 0;

    // Retry if ID already exists
    while (!isUnique && attempt < 5) {
        const incrementId = (Number(currentId) + 1 + attempt).toString().padStart(4, '0');
        newId = `${payload.year}${payload.code}${incrementId}`.trim();

        const existingUser = await User.findOne({ id: newId });
        if (!existingUser) {
            isUnique = true;
        } else {
            attempt++;  // Try the next ID
        }
    }

    if (!isUnique) {
        throw new Error("Failed to generate a unique student ID after multiple attempts.");
    }

    return newId;
};
