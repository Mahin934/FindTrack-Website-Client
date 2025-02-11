import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LostDetails = () => {
    const item = useLoaderData(); // Data for the specific lost/found item
    const { _id, thumbnail, title, type, description, category, location, dateLost, status } = item;
    const { user } = useContext(AuthContext); // Authenticated user info

    const [showModal, setShowModal] = useState(false);
    const [recoveredLocation, setRecoveredLocation] = useState("");
    const [recoveredDate, setRecoveredDate] = useState(new Date());

    const navigate = useNavigate(); // For navigation

    const checkUserPreviousSubmission = () => {
        return fetch(`http://localhost:5000/recovered?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                // Check if the user has already recovered this item
                if (data.some((item) => item.itemId === _id)) {
                    Swal.fire({
                        title: "Already Submitted",
                        text: "You have already marked this item as recovered.",
                        icon: "info",
                        confirmButtonText: "Okay",
                    });
                    return true; // Item is already submitted
                }
                return false; // Item has not been submitted by this user
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong while checking previous submissions.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
                console.error(error);
                return true; // Assuming error means user can't proceed
            });
    };

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

        // Check if the user has already recovered the item
        checkUserPreviousSubmission().then((alreadySubmitted) => {
            if (!alreadySubmitted) {
                setShowModal(true); // Show the modal for recovery information
            }
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        // Prepare the recovery data
        const recoveryInfo = {
            type,
            itemId: _id,
            recoveredLocation,
            recoveredDate: recoveredDate.toISOString(),
            recoveredBy: {
                email: user?.email,
                name: user?.displayName,
                image: user?.photoURL,
            },
            status: "recovered", // Mark the status as recovered
        };

        // Send the data to the server
        fetch("http://localhost:5000/recovered", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoveryInfo),
        })
            .then((res) => {
                return res.json(); // Convert to JSON
            })
            .then((data) => {
                if (data) {
                    Swal.fire({
                        title: "Item Recovered Successfully",
                        text: "This item has been marked as recovered.",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    setShowModal(false); // Close the modal

                    // Optionally, update the status locally to reflect the change without a page reload
                    item.status = "recovered";
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
                console.error("Error submitting recovery:", err); // Log the error
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
                <h1 className="text-4xl font-bold text-white">Lost & Found Details</h1>
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
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 border text-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 border bg-blue-600 text-white rounded-lg"
                            >
                                Submit Recovery
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LostDetails;
