import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const UpdateLostFoundItem = () => {
    const { user } = useContext(AuthContext); // Get logged-in user details
    const navigate = useNavigate();
    const itemData = useLoaderData(); // Get pre-loaded item data from loader

    const [dateLost, setDateLost] = useState(new Date(itemData.dateLost));
    const [useImageURL, setUseImageURL] = useState(true); // Default to using URL
    const [imageURL, setImageURL] = useState(itemData.thumbnail || ""); // Pre-fill the image URL

    useEffect(() => {
        setDateLost(new Date(itemData.dateLost));
        setImageURL(itemData.thumbnail);
    }, [itemData]);

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const imageSource = useImageURL ? form.imageURL.value : null;
        const thumbnailURL = imageSource || ""; // Use provided URL directly if available

        const updatedItem = {
            type,
            thumbnail: thumbnailURL,
            title,
            description,
            category,
            location,
            dateLost,
            contact: {
                email: user?.email,
                name: user?.displayName,
            },
        };

        // Update the item in the database using axios
        try {
            const response = await axios.put(`http://localhost:5000/lostFound/${itemData._id}`, updatedItem, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.modifiedCount) {
                Swal.fire({
                    title: "Success!",
                    text: "Item updated successfully!",
                    icon: "success",
                    confirmButtonText: "Okay",
                });
                // Redirect to /allLostFound after successful update
                navigate("/allLostFound"); 
            }
        } catch (error) {
            console.error("Error updating item:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to update the item. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
        }
    };

    return (
        <div className="md:container mx-auto mt-10 mb-10">
            <div className="bg-[#F4F3F0] p-10 rounded">
                <h3 className="text-center text-3xl font-bold mb-8">Update Lost & Found Item</h3>
                <form onSubmit={handleUpdateItem} className="space-y-6">
                    {/* Post Type */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Post Type</label>
                        <select name="type" className="select select-bordered w-full" defaultValue={itemData.type} required>
                            <option value="">Select Type</option>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Thumbnail (Image URL)</label>
                        {useImageURL && (
                            <input
                                type="url"
                                name="imageURL"
                                placeholder="Enter image URL"
                                className="input input-bordered w-full"
                                defaultValue={imageURL}
                                required
                            />
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter item title"
                            className="input input-bordered w-full"
                            defaultValue={itemData.title}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter item description"
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            defaultValue={itemData.description}
                            required
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Category</label>
                        <select name="category" className="select select-bordered w-full" defaultValue={itemData.category} required>
                            <option value="">Select Category</option>
                            <option value="Pets">Pets</option>
                            <option value="Documents">Documents</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location where item was lost"
                            className="input input-bordered w-full"
                            defaultValue={itemData.location}
                            required
                        />
                    </div>

                    {/* Date Lost */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Date Lost</label>
                        <DatePicker
                            selected={dateLost}
                            onChange={(date) => setDateLost(date)}
                            className="input input-bordered w-full"
                            placeholderText="Select date"
                            required
                        />
                    </div>

                    {/* Contact Information */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Contact Information</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={user?.displayName || ""}
                                readOnly
                                className="input input-bordered w-full bg-gray-200"
                            />
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="input input-bordered w-full bg-gray-200"
                            />
                        </div>
                    </div>

                    {/* Update Post Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-xl font-semibold"
                        >
                            Update Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateLostFoundItem;
