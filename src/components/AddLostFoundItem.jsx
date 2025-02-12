import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddLostFoundItem = ({ darkMode }) => {
    const { user } = useContext(AuthContext);
    const [dateLost, setDateLost] = useState(null);
    const [useImageURL, setUseImageURL] = useState(true);
    const [imageURL, setImageURL] = useState("");

    const handleAddItem = async (e) => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const imageSource = useImageURL ? form.imageURL.value : null;
        const thumbnailURL = imageSource || "";

        const newItem = {
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

        // Save the item to the database using axios
        try {
            const response = await axios.post("https://findtrack-server.vercel.app/lostFound", newItem, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Item added successfully!",
                    icon: "success",
                    confirmButtonText: "Okay",
                });
                form.reset();
                setDateLost(null);
                setImageURL(""); // Clear image URL after successful submission
            }
        } catch (error) {
            console.error("Error adding item:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to add the item. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
        }
    };

    return (
        <div className={`md:container mx-auto mt-10 mb-10 ${darkMode ? "bg-gray-900 text-white" : "bg-[#F4F3F0] text-black"}`}>
            <div className="p-10 rounded">
                <h3 className="text-center text-3xl font-bold mb-8">Add Lost & Found Item</h3>
                <form onSubmit={handleAddItem} className="space-y-6">
                    {/* Post Type */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Post Type</label>
                        <select name="type" className="select select-bordered w-full" required>
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
                            required
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xl font-semibold mb-2">Category</label>
                        <select name="category" className="select select-bordered w-full" required>
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

                    {/* Add Post Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-xl font-semibold"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLostFoundItem;
