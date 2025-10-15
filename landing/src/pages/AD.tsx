import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AD = () => {
    useEffect(() => {
    }, []);

    return (
        <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <img
                        src="https://img.freepik.com/free-psd/flat-design-shopping-mall-youtube-banner_23-2150136148.jpg?semt=ais_hybrid&w=740&q=80"
                        className="d-block w-100 h-50 object-contain"
                        alt="banner1"
                    />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img
                        src="https://thedomesticman.com/wp-content/uploads/2013/10/amazon-banner.png"
                        className="d-block w-100 h-50 object-contain"
                        alt="banner2"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="https://img.freepik.com/free-vector/flat-black-friday-twitch-cover_23-2149103021.jpg"
                        className="d-block w-100 h-50 object-contain"
                        alt="banner3"
                    />
                </div>
            </div>

            {/* Prev button */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            {/* Next button */}
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default AD;
