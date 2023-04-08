import CourseListPage from "../pages/User/CourseListPage";
import Registration from "../pages/User/Registration";
import Profile from "../pages/User/Profile";
import CourseDetailPage from "../pages/User/CourseDetailPage";
import UserCourses from "../pages/User/UserCourses";
import Lesson from "../pages/User/Lesson";
import CategoryPage from "../pages/User/CategoryPage";
import TeacherCourses from "../pages/Teacher/TeacherCourses";
import CreateCourse from "../pages/Teacher/CreateCourse";
import UpdateCourse from "../pages/Teacher/UpdateCourse";
import CreateTheme from "../pages/Teacher/CreateTheme";
import UpdateTheme from "../pages/Teacher/UpdateTheme";
import CreateLesson from "../pages/Teacher/CreateLesson";
import UpdateLesson from "../pages/Teacher/UpdateLesson";
import CreateExercise from "../pages/Teacher/CreateExercise";
import UpdateExercise from "../pages/Teacher/UpdateExercise";

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
    {path: '/course/:id/lesson/:lesson_id', element: <Lesson/>},
    {path: '/teacher/courses', element: <TeacherCourses/>},
    {path: '/teacher/course/create', element: <CreateCourse/>},
    {path: '/teacher/course/:id', element: <UpdateCourse/>},
    {path: '/teacher/theme/create/:id', element: <CreateTheme/>},
    {path: '/teacher/theme/:id', element: <UpdateTheme/>},
    {path: '/teacher/lesson/create/:id', element: <CreateLesson/>},
    {path: '/teacher/lesson/:id', element: <UpdateLesson/>},
    {path: '/teacher/exercise/create/:id', element: <CreateExercise/>},
    {path: '/teacher/exercise/:id', element: <UpdateExercise/>},
]