import React from "react";
import { motion } from "framer-motion";

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            name: "John Doe",
            story: "I was able to recover my lost wallet thanks to this platform! The person who found it contacted me through the site, and we met up to return it.",
            location: "New York, NY",
        },
        {
            id: 2,
            name: "Alice Smith",
            story: "I found a pair of glasses in the park and posted it here. Within hours, the owner contacted me and I was able to return them. It feels great to help others!",
            location: "Chicago, IL",
        },
        {
            id: 3,
            name: "David Johnson",
            story: "I lost my phone while traveling. This site helped me find someone who had found it, and we were able to coordinate its return. I’m so grateful!",
            location: "Los Angeles, CA",
        },
    ];

    return (
        <section className="py-16 px-4 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Success Stories</h2>
            <div className="flex justify-center">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: [50, 0],
                                y: [50, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                rotate: 2,
                            }}
                        >
                            {/* Background Animation */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-50"
                                animate={{
                                    x: [0, 10, 0],
                                    opacity: [0.2, 0.6, 0.2],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut",
                                }}
                            />
                            
                            <motion.h3
                                className="text-xl font-bold text-gray-800"
                                animate={{ y: [20, 0], opacity: [0, 1] }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeOut",
                                }}
                            >
                                {story.name}
                            </motion.h3>

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

                            <motion.p
                                className="text-sm text-gray-500 mt-2"
                                animate={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.6,
                                }}
                            >
                                Location: {story.location}
                            </motion.p>

                            {/* Dynamic 3D Hover Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-lg bg-white opacity-10"
                                style={{ zIndex: -1 }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
