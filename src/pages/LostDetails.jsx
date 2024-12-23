import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typewriter } from "react-simple-typewriter"; // Importing Typewriter

const LostDetails = () => {
    const item = useLoaderData(); // Data for the specific lost/found item
    const { _id, thumbnail, title, type, description, category, location, dateLost, status } = item;
    const { user } = useContext(AuthContext); // Authenticated user info

    const [showModal, setShowModal] = useState(false);
    const [recoveredLocation, setRecoveredLocation] = useState("");
    const [recoveredDate, setRecoveredDate] = useState(new Date());

    const navigate = useNavigate(); // For navigation

    const handleRecover = () => {
        if (status === "recovered") {
            Swal.fire({
                title: "Item Already Recovered",
                text: "This item has already been marked as recovered.",
                icon: "info",
                confirmButtonText: "Okay",
            });
            return;
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        const recoveryInfo = {
            itemId: _id,
            recoveredLocation,
            recoveredDate: recoveredDate.toISOString(),
            recoveredBy: {
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
            },
        };

        fetch("https://your-api-endpoint/recoverItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoveryInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.updated) {
                    Swal.fire({
                        title: "Item Recovered Successfully",
                        text: "This item has been marked as recovered.",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    setShowModal(false);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Could not mark the item as recovered. Please try again.",
                        icon: "error",
                        confirmButtonText: "Okay",
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            });
    };

    return (
        <div>
            {/* Banner Section */}
            <div className="bg-[rgb(149,56,226)] py-16 text-center rounded-b-lg">
                <h1 className="text-4xl font-bold text-white">
                    <Typewriter
                        words={["Lost & Found Details", "Helping You Reconnect", "Find What You Lost"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
                <p className="text-white mt-3">
                    View all the details of the lost or found item and take the necessary action.
                </p>
            </div>

            {/* Item Details Section */}
            <div className="container mx-auto my-10">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image Section */}
                        <img
                            src={thumbnail || "https://via.placeholder.com/300?text=No+Image+Available"}
                            alt={title || "Lost & Found Item"}
                            className="w-full lg:w-1/3 rounded-lg"
                        />

                        {/* Details Section */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                            <p className="text-gray-600 mt-2">
                                <strong>Type:</strong> {type}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Category:</strong> {category}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Location:</strong> {location}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Date:</strong>{" "}
                                {dateLost ? new Date(dateLost).toLocaleDateString() : "Unknown"}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <strong>Description:</strong> {description}
                            </p>

                            {/* Status */}
                            <p
                                className={`mt-4 font-semibold ${
                                    status === "recovered" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                Status: {status === "recovered" ? "Recovered" : "Not Recovered"}
                            </p>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-col gap-4">
                                <button
                                    onClick={handleRecover}
                                    className={`px-6 py-3 border md:w-1/3 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors ${
                                        status === "recovered" ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    disabled={status === "recovered"}
                                >
                                    {type === "Lost" ? "Found This!" : "This is Mine!"}
                                </button>
                                <button
                                    onClick={() => navigate("/allLostFound")}
                                    className="px-6 py-3 md:w-1/3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    Go to AllLostFound Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Recovery Information */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 lg:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Recovery Information</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">
                                Recovered Location
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter the recovered location"
                                value={recoveredLocation}
                                onChange={(e) => setRecoveredLocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">
                                Recovered Date
                            </label>
                            <ReactDatePicker
                                selected={recoveredDate}
                                onChange={(date) => setRecoveredDate(date)}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-3 border border-gray-600 text-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LostDetails;
