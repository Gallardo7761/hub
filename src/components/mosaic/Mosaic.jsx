import PropTypes from "prop-types";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Tile from "@/components/mosaic/Tile";
import { iconFor } from "@/components/icons";
import "@/css/Mosaic.css";

const LOGIN = "https://id.killobyte.es";

const hostOf = (link) => {
    try { return new URL(link).hostname; } catch { return link; }
};

const Mosaic = ({ pages, hiddenCount = 0 }) => {
    const items = pages.map((p) => ({
        href: p.link,
        icon: iconFor(p.icon),
        title: p.title,
        subtitle: hostOf(p.link),
        locked: p.requiresAuth,
    }));
    if (hiddenCount > 0) {
        items.push({
            href: LOGIN,
            icon: faRightToBracket,
            title: `+${hiddenCount} privados`,
            subtitle: "identifícate",
            variant: "login",
        });
    }

    return (
        <section className="mosaic" aria-label="Servicios">
            {items.map((item, i) => (
                <Tile key={item.href + item.title} {...item} index={i} />
            ))}
        </section>
    );
};

Mosaic.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            icon: PropTypes.string,
            requiresAuth: PropTypes.bool,
        })
    ).isRequired,
    hiddenCount: PropTypes.number,
};

export default Mosaic;
