import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiMapPin, FiPackage } from "react-icons/fi";

const AboutUs = () => {
    return (
        <div className="min-h-screen my-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center"
                >
                    <img 
                        src="https://i.ibb.co.com/cS7fWW7b/Screenshot-2025-01-31-141801.png" 
                        alt="FindTrack Logo"
                        className="w-32 h-32 mb-6 animate-float"
                    />
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        About FindTrack
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Connecting lost items with their owners through community power and smart technology
                    </p>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-10"></div>
                        <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                At FindTrack, we believe every lost item tells a story. Our platform combines community 
                                collaboration with advanced technology to reunite people with their belongings. 
                                Whether it's a cherished heirloom or everyday essentials, we're here to help.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <FiCheckCircle className="text-blue-400 text-2xl" />
                                    <span>Trusted Community</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FiUsers className="text-purple-400 text-2xl" />
                                    <span>Secure Platform</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                            <FiPackage className="text-4xl text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">100,000+</h3>
                            <p className="text-gray-400">Items Recovered</p>
                        </div>
                        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                            <FiUsers className="text-4xl text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">50,000+</h3>
                            <p className="text-gray-400">Happy Users</p>
                        </div>
                        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                            <FiMapPin className="text-4xl text-pink-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">200+</h3>
                            <p className="text-gray-400">Cities Covered</p>
                        </div>
                        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                            <FiCheckCircle className="text-4xl text-green-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">95%</h3>
                            <p className="text-gray-400">Success Rate</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Smart Matching System",
                            description: "Advanced AI compares lost and found reports for automatic matches",
                            icon: "🔍"
                        },
                        {
                            title: "Community Alerts",
                            description: "Instant notifications to nearby users when items are reported",
                            icon: "📢"
                        },
                        {
                            title: "Secure Verification",
                            description: "Multi-step verification process to ensure safe returns",
                            icon: "🔒"
                        },
                    ].map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-br from-blue-800/30 to-purple-800/30 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 hover:shadow-2xl transition-all"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-2xl mx-auto px-4"
                >
                    <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
                    <p className="text-gray-300 mb-8">
                        Be part of the movement that's changing how we handle lost and found items
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all">
                        Get Started
                    </button>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutUs;