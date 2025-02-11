import React from "react";
import { motion } from "framer-motion";

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            name: "John Doe",
            story: "I was able to recover my lost wallet thanks to this platform! The person who found it contacted me through the site, and we met up to return it.",
            location: "New York, NY",
            avatar: "https://i.pravatar.cc/150?img=1", // Example avatar URL
        },
        {
            id: 2,
            name: "Alice Smith",
            story: "I found a pair of glasses in the park and posted it here. Within hours, the owner contacted me and I was able to return them. It feels great to help others!",
            location: "Chicago, IL",
            avatar: "https://i.pravatar.cc/150?img=2", // Example avatar URL
        },
        {
            id: 3,
            name: "David Johnson",
            story: "I lost my phone while traveling. This site helped me find someone who had found it, and we were able to coordinate its return. I’m so grateful!",
            location: "Los Angeles, CA",
            avatar: "https://i.pravatar.cc/150?img=3", // Example avatar URL
        },
    ];

    return (
        <section className="py-16 px-4 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg relative overflow-hidden">
            {/* Background Animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-20"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            />

            <h2 className="text-4xl font-bold text-center text-white mb-8">
                Success Stories
            </h2>

            <div className="flex justify-center">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            className="bg-white rounded-lg shadow-2xl p-6 relative overflow-hidden transform transition-all duration-300 hover:shadow-3xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                        >
                            {/* User Avatar */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={story.avatar}
                                    alt={story.name}
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                                />
                                <div className="ml-4">
                                    <motion.h3
                                        className="text-xl font-bold text-gray-800"
                                        animate={{ x: [20, 0], opacity: [0, 1] }}
                                        transition={{
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {story.name}
                                    </motion.h3>
                                    <motion.p
                                        className="text-sm text-gray-500"
                                        animate={{ opacity: [0, 1] }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.4,
                                        }}
                                    >
                                        {story.location}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Story Text */}
                            <motion.p
                                className="text-md text-gray-600 mt-4"
                                animate={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 1,
                                    delay: 0.4,
                                }}
                            >
                                "{story.story}"
                            </motion.p>

                            {/* Read More Button */}
                            <motion.button
                                className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Read More
                            </motion.button>

                            {/* Glowing Hover Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300"
                                style={{ zIndex: -1 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;