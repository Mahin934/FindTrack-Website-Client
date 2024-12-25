import React from 'react';
import { easeOut, motion } from "framer-motion";

const HowToReport = () => {
    return (
        <div className="border-[12px] mb-16 border-[rgba(0,0,0,0.1)] rounded-lg shadow-[0px_0px_0px_1px_rgba(255,255,255,0.7)]">
            <div className="hero bg-gradient-to-r from-[#DDEFFF] via-white to-[#FFEAD5] py-24 rounded-[4px]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-sky-600 text-center mb-10">
                        How to Report Lost Items
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <motion.img
                                src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/12/how-to-write-a-report.jpeg"
                                alt="Step 1"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl mb-6"
                            />
                            <motion.div
                                className="bg-sky-100 p-6 rounded-lg border-4 border-sky-300 shadow-xl text-center transition-transform transform hover:scale-105"
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: -50 }}
                                transition={{ duration: 1, ease: easeOut }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                                    Step 1: Describe Your Lost Item
                                </h3>
                                <p className="text-gray-700">
                                    Provide a detailed description of the lost item, including its type, color, and any distinguishing features.
                                </p>
                            </motion.div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <motion.img
                                src="https://cdn.prod.website-files.com/66bf05dee8c5f0991d608526/670400ba15b6db95be6248df_Summary%20Report%20Method.png"
                                alt="Step 2"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                                className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl mb-6"
                            />
                            <motion.div
                                className="bg-sky-100 p-6 rounded-lg border-4 border-sky-300 shadow-xl text-center transition-transform transform hover:scale-105"
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: -50 }}
                                transition={{ duration: 1, ease: easeOut }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                                    Step 2: Upload a Photo
                                </h3>
                                <p className="text-gray-700">
                                    Upload a clear photo of the item to help others identify it more easily. The photo will be visible to those browsing found items.
                                </p>
                            </motion.div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <motion.img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST17xGvhAej9G6csKWZKElzy37eohbsSjDRQ&s"
                                alt="Step 3"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 2, delay: 1, repeat: Infinity }}
                                className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl mb-6"
                            />
                            <motion.div
                                className="bg-sky-100 p-6 rounded-lg border-4 border-sky-300 shadow-xl text-center transition-transform transform hover:scale-105"
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: -50 }}
                                transition={{ duration: 1, ease: easeOut }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                                    Step 3: Wait for Updates
                                </h3>
                                <p className="text-gray-700">
                                    Once your report is submitted, you'll be notified if someone finds your item or if there are any updates regarding your lost item.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToReport;
