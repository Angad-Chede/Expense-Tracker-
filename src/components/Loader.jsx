import Lottie from "lottie-react";
import animation from "../assets/Sandy Loading.json";

function Loader() {
    return (
        <div className="loader">
            <Lottie animationData={animation} loop={true} />
        </div>
    );
}

export default Loader;