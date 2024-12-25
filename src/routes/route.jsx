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
import MyLostFound from "../components/MyLostFound";
import PrivateRoute from "./PrivateRoute";
import AllRecovered from "../components/AllRecovered";



const route = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch("https://findtrack-server.vercel.app/lostFound")
            },
            {
                path: "allLostFound",
                element: <AllLostFound></AllLostFound>,
                loader: () => fetch("https://findtrack-server.vercel.app/lostFound")
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
                element: <PrivateRoute><AddLostFoundItem></AddLostFoundItem></PrivateRoute>,
            },
            {
                path: "updateLost-found/:id",
                element: <PrivateRoute><UpdateLostFoundItem></UpdateLostFoundItem></PrivateRoute>,
                loader: ({ params }) => fetch(`https://findtrack-server.vercel.app/lostFound/${params.id}`),
            },
            {
                path: "lostDetails/:id",
                element: <PrivateRoute><LostDetails></LostDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://findtrack-server.vercel.app/lostFound/${params.id}`)
            },
            {
                path: "myPosts",
                element: <PrivateRoute><MyLostFound></MyLostFound></PrivateRoute>,
                loader: () => fetch("https://findtrack-server.vercel.app/lostFound")
                
            },
            {
                path: "allRecovered",
                element: <PrivateRoute><AllRecovered></AllRecovered></PrivateRoute>,
                loader: () => fetch("https://findtrack-server.vercel.app/recovered")
                
            },
        ]
    },
]);

export default route;