import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import registerLottie from "../assets/lottie/signUp.json";
import Lottie from "lottie-react";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

    // State for error messages and password visibility
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        // Password validation
        if (!/[A-Z]/.test(password)) {
            setErrorMessage("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrorMessage("Password must contain at least one lowercase letter.");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        // Clear error message if validation passes
        setErrorMessage("");

        // Create a new user
        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({
                    displayName: name,
                    photoURL: photo,
                }).then(() => {
                    navigate("/"); // Redirect to the homepage
                });
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    // Google Sign-In Handler
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate("/"); // Redirect to the homepage after successful login
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-20 gap-10">
            {/* Register Form */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-center text-2xl pt-8 font-bold">Register your account</h1>
                <div className="divider px-8 mb-0"></div>
                <form onSubmit={handleSubmit} className="card-body">
                    {/* Name input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Your Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* Photo URL input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Your Photo URL"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* Email input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email address</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* Password input with toggle */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full pr-10"
                                required
                            />
                            <span
                                className="absolute top-4 right-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Display error message if exists */}
                    {errorMessage && (
                        <p className="text-red-500 text-xs text-center">{errorMessage}</p>
                    )}

                    <div className="form-control mt-6">
                        <button className="btn bg-[#403F3F] text-white">Register</button>
                    </div>

                    {/* Google Sign-In button */}
                    <div className="form-control mt-4">
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-outline bg-blue-500 text-white"
                        >
                            Sign Up with Google
                        </button>
                    </div>

                    <p className="text-center pt-4 text-xs">
                        Already Have An Account?{" "}
                        <Link className="text-red-500" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex justify-center">
                <Lottie animationData={registerLottie} style={{ maxWidth: "700px" }} />
            </div>
        </div>
    );
};

export default Register;
