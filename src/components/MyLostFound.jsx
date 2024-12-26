import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider"; // Replace with your Auth context file path
import Swal from "sweetalert2";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";

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
            <div className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-lg py-10 px-6 text-white mb-10 text-center shadow-lg">
                <h1 className="text-4xl font-bold mb-2">
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
                <p className="text-lg">View, update, or delete your posts easily.</p>
            </div>

            {/* Posts Table */}
            {posts.length > 0 ? (
                <div className="overflow-x-auto md:my-10">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id}>
                                    <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.category}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.location}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex gap-4 justify-center">
                                            {/* Update Button */}
                                            <Link
                                                to={`/updateLost-found/${post._id}`}
                                                className="text-blue-500 hover:text-blue-700"
                                                title="Update"
                                            >
                                                <FaEdit />
                                            </Link>
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                            {/* See More Button */}
                                            <Link
                                                to={`/lostDetails/${post._id}`}
                                                className="text-purple-500 hover:text-purple-700 flex items-center gap-1"
                                                title="See More"
                                            >
                                                <FaInfoCircle /> See More
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
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
