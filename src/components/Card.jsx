import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Card({ title, link }) {
    const [image, setImage] = useState("");

    useEffect(() => {
        const getImage = async () => {
            const response = await fetch("https://api.miarma.net/v1/screenshot?url=" + link);
            const blob = await response.blob();
            const imageURL = URL.createObjectURL(blob);
            setImage(imageURL);
        }
        getImage();
    }, [link]);

    return (
        <div className={"col-md-6 col-lg-3"}>
            <div className={"card"}>
                <div className="card-header text-center bg-light">
                    <h5 className={"card-title m-0"}>{title}</h5>
                </div>
                <div className={"card-body p-0 text-center"}>
                    <img src={image} className={"card-img-top"} alt={title}></img>
                </div>
                <div className="card-footer p-0">
                    <a href={link} className={"btn btn-primary w-100"}>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={"me-2"} />
                        Link
                    </a>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onHoverStart: PropTypes.func,
    onHoverEnd: PropTypes.func,
}