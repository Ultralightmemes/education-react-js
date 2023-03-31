import CourseListPage from "../pages/CourseListPage";
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";
import CourseDetailPage from "../pages/CourseDetailPage";
import UserCourses from "../pages/UserCourses";
import Lesson from "../components/Lesson";
import CategoryPage from "../pages/CategoryPage";

export const publicRoutes = [
    {path: '/courses', element: <CourseListPage/>},
    {path: '/registration', element: <Registration/>},
    {path: '/preview/:id', element: <CourseDetailPage/>},
    {path: '/category/:id', element: <CategoryPage/>}
]

export const privateRoutes = [
    {path: '/profile', element: <Profile/>},
    {path: '/profile/courses', element: <UserCourses/>},
    {path: '/course/:id/lesson', element: <Lesson/>},
]