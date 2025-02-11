import { Link, useLoaderData } from "react-router-dom";
import { TbFlagExclamation } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react"; // Import useState for search functionality

const HomeLostFound = () => {
    // Get the latest 6 items using the loader data
    const items = useLoaderData();

    // State for search query
    const [searchQuery, setSearchQuery] = useState("");

    // Sort items by the most recent date (assuming `dateLost` is in ISO format)
    const sortedItems = items.sort((a, b) => new Date(b.dateLost) - new Date(a.dateLost));

    // Filter items based on search query
    const filteredItems = sortedItems.filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Select only the first 6 items
    const latestItems = filteredItems.slice(0, 6);

    return (
        <div className="container mx-auto my-10">
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-8 md:py-20 rounded-lg text-center shadow-lg mb-8">
                <h1 className="text-4xl font-bold">
                    <Typewriter 
                        words={['Latest Lost & Found Items']} 
                        loop={0} 
                        cursor 
                        cursorColor="gray"
                    />
                </h1>
                <p className="mt-2 text-lg">
                    Browse through the latest reported items.
                </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
            </div>

            {/* Item Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {latestItems.length > 0 ? (
                    latestItems.map((item) => (
                        <div
                            key={item._id}
                            className="card bg-white shadow-lg rounded-lg border transition-transform hover:scale-105 duration-200"
                        >
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
                                    <TbFlagExclamation className="text-purple-600" />{" "}
                                    {item.title || "Untitled Item"}
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
                                        {item.dateLost
                                            ? new Date(item.dateLost).toLocaleDateString()
                                            : "No Date Provided"}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-700 mt-3">
                                    <strong>Description:</strong>{" "}
                                    {item.description?.slice(0, 80) || "No description available."}
                                </p>

                                {/* Dotted Line Separator */}
                                <div className="border-t-2 border-dashed mt-4"></div>

                                {/* Action Buttons */}
                                <div className="mt-4 flex gap-3">
                                    <Link to={`/LostDetails/${item._id}`} className="w-full">
                                        <button className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 bg-transparent font-semibold hover:bg-blue-600 hover:text-white transition-colors w-full">
                                            View Details
                                        </button>
                                    </Link>
                                    <Link to={`/updateLost-found/${item._id}`} className="w-full">
                                        <button className="px-4 py-2 rounded-full border border-purple-600 text-purple-600 bg-transparent font-semibold hover:bg-purple-600 hover:text-white transition-colors w-full">
                                            Update
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-600">
                        No items found matching your search.
                    </div>
                )}
            </div>

            {/* See All Button */}
            <div className="text-center mt-8">
                <Link to="/allLostFound">
                    <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
                        See All Items
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomeLostFound;