import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider"; // Replace with your Auth context file path
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { motion } from "framer-motion";

const MyLostFound = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user from Auth context
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://findtrack-server.vercel.app/lostFound", {
                    withCredentials: true, // Include cookies for authentication
                });
                if (response.data.length === 0) {
                    // No posts found for the user
                    Swal.fire({
                        icon: "info",
                        title: "No Data Found",
                        text: "You have no posts associated with your account.",
                    });
                }
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);

                // Check if the error is due to unauthorized access
                if (error.response?.status === 403 || error.response?.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Unauthorized",
                        text: "Please log in with a verified email to view your posts or Allow Third-Party Cookies",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An unexpected error occurred. Please try again later.",
                    });
                }
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `https://findtrack-server.vercel.app/lostFound/${id}`,
                        {
                            withCredentials: true, // Include cookies for authentication
                        }
                    );
                    if (response.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "The item has been deleted.", "success");
                        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire("Error", "Failed to delete the item. Please try again later.", "error");
                }
            }
        });
    };

    return (
        <div className="container mx-auto pb-10">
            {/* Banner Section */}
            <div className="relative bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-lg py-16 px-6 text-white mb-10 text-center shadow-lg overflow-hidden">
                {/* Animated Background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-700 via-teal-600 to-blue-700 opacity-50"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />
                <h1 className="text-4xl font-bold mb-2 relative z-10">
                    <Typewriter
                        words={["Manage Your Posts", "Lost Something? Found Something?", "Track Your Items"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />
                </h1>
                <p className="text-lg relative z-10">View, update, or delete your posts easily.</p>
            </div>

            {/* Posts Table */}
            {posts.length > 0 ? (
                <div className="overflow-x-auto md:my-10">
                    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                                <th className="px-6 py-4 text-left">Title</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Location</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => (
                                <motion.tr
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                                >
                                    <td className="px-6 py-4 border-b border-gray-200">{post.title}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{post.category}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{post.location}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        <div className="flex gap-4 justify-center">
                                            {/* Update Button */}
                                            <Link
                                                to={`/updateLost-found/${post._id}`}
                                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                                title="Update"
                                            >
                                                <FaEdit />
                                            </Link>
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                            {/* See More Button */}
                                            <Link
                                                to={`/lostDetails/${post._id}`}
                                                className="text-purple-500 hover:text-purple-700 flex items-center gap-1 transition-colors"
                                                title="See More"
                                            >
                                                <FaInfoCircle /> See More
                                            </Link>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6 md:my-32">
                    You haven't added any posts yet.
                </p>
            )}
        </div>
    );
};

export default MyLostFound;