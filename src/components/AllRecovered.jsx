import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Typewriter } from "react-simple-typewriter"; 

const AllRecovered = () => {
    const { user } = useContext(AuthContext); 
    const userEmail = user?.email; 
    const recoveredItems = useLoaderData(); 

    // Filter recovered items for the logged-in user
    const userRecoveredItems = recoveredItems.filter(
        (item) => item.recoveredBy?.email === userEmail
    );

    return (
        <div>
            {/* Banner Section with Gradient Background */}
            <div className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-lg py-10 px-6 text-white mb-10 text-center shadow-lg">
                <h1 className="text-4xl font-bold mb-4">
                    <Typewriter
                        words={['My Recovered Items', 'All Items You Recovered']}
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

            {/* Main Content */}
            <div className="container mx-auto my-10 md:mb-20">
                {userRecoveredItems.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">
                        You haven't recovered any items yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Type</th>
                                    <th className="border border-gray-300 px-4 py-2">Location</th>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Recovered By</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userRecoveredItems.map((item) => (
                                    <tr key={item._id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {item.recoveredLocation}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(item.recoveredDate).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {item.recoveredBy?.name} ({item.recoveredBy?.email})
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className="text-green-600 font-semibold">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRecovered;
