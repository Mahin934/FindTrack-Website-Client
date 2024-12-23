import {
    createBrowserRouter,
} from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Errorpage from "../pages/Errorpage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddLostFoundItem from "../components/AddLostFoundItem";
import UpdateLostFoundItem from "../components/UpdateLostFoundItem";
import AllLostFound from "../pages/AllLostFound ";
import LostDetails from "../pages/LostDetails";



const route = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch("http://localhost:5000/lostFound")
            },
            {
                path: "allLostFound",
                element: <AllLostFound></AllLostFound>,
                loader: () => fetch("http://localhost:5000/lostFound")
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
            {
                path: "addLost-found",
                element: <AddLostFoundItem></AddLostFoundItem>,
            },
            {
                path: "updateLost-found/:id",
                element: <UpdateLostFoundItem></UpdateLostFoundItem>,
                loader: ({ params }) => fetch(`http://localhost:5000/lostFound/${params.id}`),
            },
            {
                path: "lostDetails/:id",
                element: <LostDetails></LostDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/lostFound/${params.id}`)
            },
        ]
    },
]);

export default route;