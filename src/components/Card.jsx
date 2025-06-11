import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Card({ title, description, link, onHoverStart, onHoverEnd }) {
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
                <div className={"card-body text-center"}>
                    <img src={image} className={"card-img-top mb-3"}></img>
                    <h5 className={"card-title"}>{title}</h5>
                    <p className={"card-text"}>{description}</p>
                    <a
                        href={link}
                        className={"btn btn-primary text-dark"}
                        onMouseEnter={() => onHoverStart?.()}
                        onMouseLeave={() => onHoverEnd?.()}
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={"me-2"} />
                        Ir
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