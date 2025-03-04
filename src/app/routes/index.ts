import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoute } from "../modules/student/student.route";
import { AcademicSemisterRoute } from "../modules/academicSemister/academicSemister.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { DepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { CourseRoutes } from "../modules/courses/course.route";


const router = Router();


const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoute
    },
    {
        path: '/academic-semister',
        route: AcademicSemisterRoute
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/academic-departments',
        route: DepartmentRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router