import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: '/', element: <About />},
    {path: '/about', element: <About />},
    {path: '/posts', element: <Posts />},
    {path: '/posts/:id', element: <PostIdPage />},
    {path: '*', element: <About />},
]

export const publicRoutes = [
    {path: '*', element: <Login />},
    {path: '/login', element: <Login />}
]