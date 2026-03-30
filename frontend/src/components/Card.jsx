import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "@/css/Card.css"

const Card = ({ title, link }) => {
    const [image, setImage] = useState("");
    const [buttonContent, setButtonContent] = useState(<>{title}</>);

    useEffect(() => {
        const getImage = async () => {
            const response = await fetch("https://api.miarma.net/v1/screenshoter?url=" + link);
            const blob = await response.blob();
            const imageURL = URL.createObjectURL(blob);
            setImage(imageURL);
        }
        getImage();
    }, [link]);

    return (
        <div className={"col-md-6 col-lg-3"}>

            <div className={"card shadow-sm"}>
                <div className={"card-body p-0 text-center"}>
                    <img src={image} className={"card-img-top"} alt={title}></img>
                </div>

                <div className="card-footer border-0 p-0">
                    <div className="btn btn-primary w-100"
                        onClick={() => window.open(link, "_blank")}
                        onMouseEnter={() => setButtonContent(
                            <>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={"me-2"} />
                                Link
                            </>
                        )} 
                        onMouseLeave={() => setButtonContent(
                            <>
                                {title}
                            </>
                        )}
                    >
                        {buttonContent}
                    </div>
                </div>
            </div>

        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default Card;