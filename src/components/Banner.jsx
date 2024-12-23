
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Fade } from "react-awesome-reveal"; // Importing the Fade animation

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-b from-sky-100 via-white to-sky-50 my-5">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="h-[500px] rounded-lg shadow-lg"
            >
                {/* Slide 1 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://www.shutterstock.com/image-vector/upset-passenger-lose-suitcase-2d-260nw-2247883745.jpg"
                        alt="Report Lost Items"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Lost Something? We Can Help!</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Report your lost items easily and let others help you find them.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTveSStaK2af4uWdqVru2x2Y28EAT686SDTCA&s"
                        alt="Browse Found Items"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Browse Found Items</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Check out items found by others and reconnect with your belongings.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="relative">
                    <img
                        src="https://www.shutterstock.com/image-vector/lost-found-office-website-landing-260nw-1843146619.jpg"
                        alt="Community Support"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
                        <Fade bottom>
                            <h1 className="text-4xl font-bold">Join a Helping Community</h1>
                        </Fade>
                        <Fade bottom delay={200}>
                            <p className="mt-4 text-lg">
                                Connect with a community of people working together to reunite items with their owners.
                            </p>
                        </Fade>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
