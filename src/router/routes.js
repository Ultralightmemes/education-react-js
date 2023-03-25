import CourseListPage from "../pages/CourseListPage";
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";

export const publicRoutes = [
    {path: '/courses', element: <CourseListPage/>},
    {path: '/register', element: <Registration/>},
    {path: '/profile', element: <Profile/>},
]