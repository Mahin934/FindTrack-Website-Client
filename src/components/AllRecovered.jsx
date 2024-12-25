import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Typewriter } from "react-simple-typewriter";
import { FaTh, FaTable, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const AllRecovered = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const recoveredItems = useLoaderData();

    // Filter recovered items for the logged-in user
    const userRecoveredItems = recoveredItems.filter(
        (item) => item.recoveredBy?.email === userEmail
    );

    // State to toggle between table and card view
    const [isTableView, setIsTableView] = useState(true);
    const [recoveredData, setRecoveredData] = useState(userRecoveredItems);

    // Toggle view between table and card
    const toggleView = () => {
        setIsTableView((prevState) => !prevState);
    };

    // Delete handler
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
                    const response = await axios.delete(`https://findtrack-server.vercel.app/recovered/${id}`);
                    if (response.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "The item has been removed.", "success");
                        setRecoveredData((prevData) => prevData.filter((item) => item._id !== id));
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire("Error", "Failed to delete the item. Please try again.", "error");
                }
            }
        });
    };

    return (
        <div>
            {/* Banner Section with Gradient Background */}
            <div className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-lg py-10 px-6 text-white mb-10 text-center shadow-lg">
                <h1 className="text-4xl font-bold mb-4">
                    <Typewriter
                        words={["My Recovered Items", "All Items You Recovered"]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </h1>
                <p className="text-lg">View all the items you’ve successfully recovered.</p>
            </div>

            {/* Toggle Button for View Mode */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={toggleView}
                    className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600"
                >
                    {isTableView ? (
                        <FaTh className="inline-block mr-2" />
                    ) : (
                        <FaTable className="inline-block mr-2" />
                    )}
                    {isTableView ? "Switch to Card View" : "Switch to Table View"}
                </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto my-10 md:mb-20">
                {recoveredData.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">
                        You haven't recovered any items yet.
                    </p>
                ) : isTableView ? (
                    // Table View
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Type</th>
                                    <th className="border border-gray-300 px-4 py-2">Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Recovered By</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recoveredData.map((item) => (
                                    <tr key={item._id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.recoveredLocation}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(item.recoveredDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {item.recoveredBy?.name} ({item.recoveredBy?.email})
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Card View
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recoveredData.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={item.recoveredBy?.image}
                                        alt={item.recoveredBy?.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <p className="text-xl font-semibold">{item.recoveredBy?.name}</p>
                                        <p className="text-sm text-gray-500">{item.recoveredBy?.email}</p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.type}</h3>
                                <p className="text-gray-600 mb-2">
                                    <strong>Location:</strong> {item.recoveredLocation}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Recovered On:</strong> {new Date(item.recoveredDate).toLocaleDateString()}
                                </p>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRecovered;
