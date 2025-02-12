import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { TbFlagExclamation } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const AllLostFound = () => {
    const initialItems = useLoaderData();
    const [items, setItems] = useState(initialItems);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

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
                    const response = await axios.delete(`https://findtrack-server.vercel.app/lostFound/${id}`);
                    if (response.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "The item has been deleted.", "success");
                        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire("Error", "Failed to delete the item. Please try again later.", "error");
                }
            }
        });
    };

    // Sorting Functions
    const sortAscending = () => {
        const sortedItems = [...items].sort((a, b) => new Date(a.dateLost) - new Date(b.dateLost));
        setItems(sortedItems);
    };

    const sortDescending = () => {
        const sortedItems = [...items].sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost));
        setItems(sortedItems);
    };

    // Filter items based on search term
    const filteredItems = items.filter(
        (item) =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!filteredItems || filteredItems.length === 0) {
        return (
            <div className="text-center my-10 md:my-60">
                <p className="text-4xl">No items found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-8 md:py-20 rounded-lg text-center shadow-lg mb-8">
                <h1 className="text-4xl font-bold">
                    <Typewriter words={['Lost & Found Items']} loop={0} cursor cursorColor="gray" />
                </h1>
                <p className="mt-2 text-lg">
                    Browse through all reported items. Total items: <span className="font-bold">{filteredItems.length}</span>
                </p>
            </div>

            {/* Search and Sorting Controls */}
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-md w-full md:w-1/3"
                />

                <div className="flex gap-3">
                    <button
                        onClick={sortAscending}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Sort by Date ↑
                    </button>
                    <button
                        onClick={sortDescending}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Sort by Date ↓
                    </button>
                </div>
            </div>

            {/* Item Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredItems.map((item) => (
                    <div key={item._id} className="card bg-white shadow-lg rounded-lg border transition-transform hover:scale-105 duration-200">
                        {/* Image Section */}
                        <figure className="px-5 pt-5">
                            <img
                                src={item.thumbnail || "https://via.placeholder.com/300?text=No+Image+Available"}
                                alt={item.title || "Lost & Found Item"}
                                className="rounded-lg w-full h-64 md:h-72 object-cover"
                            />
                        </figure>

                        <div className="card-body p-5">
                            <h3 className="card-title flex items-center gap-2 text-lg font-bold text-gray-800">
                                <TbFlagExclamation className="text-purple-600" /> {item.title || "Untitled Item"}
                            </h3>

                            {/* Item Type and Location */}
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-600">
                                    <strong>Type:</strong> {item.type || "N/A"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Location:</strong> {item.location || "Unknown"}
                                </p>
                            </div>

                            {/* Date Lost */}
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <FiCalendar className="text-blue-500" />
                                    <strong>Date Lost:</strong>{" "}
                                    {item.dateLost ? new Date(item.dateLost).toLocaleDateString() : "No Date Provided"}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-700 mt-3">
                                <strong>Description:</strong> {item.description?.slice(0, 80) || "No description available."}
                            </p>

                            {/* Dotted Line Separator */}
                            <div className="border-t-2 border-dashed mt-4"></div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                                <Link to={`/lostDetails/${item._id}`}>
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-blue-600 text-blue-600 bg-transparent font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                                        <AiOutlineEye className="text-lg" />
                                        View Details
                                    </button>
                                </Link>

                                <Link to={`/updateLost-found/${item._id}`}>
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-600 bg-transparent font-semibold hover:bg-purple-600 hover:text-white transition-colors">
                                        <AiOutlineEdit className="text-lg" />
                                        Update
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-red-600 text-red-600 bg-transparent font-semibold hover:bg-red-600 hover:text-white transition-colors"
                                >
                                    <AiOutlineDelete className="text-lg" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllLostFound;
