import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function Card({ image, title, description, link, onHoverStart, onHoverEnd }) {
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
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onHoverStart: PropTypes.func,
    onHoverEnd: PropTypes.func,
}