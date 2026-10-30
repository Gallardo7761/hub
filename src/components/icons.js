import {
    faIdBadge,
    faNetworkWired,
    faWallet,
    faPaste,
    faHeartPulse,
    faShieldHalved,
    faCodeBranch,
    faBook,
    faHardDrive,
    faImages,
    faSliders,
    faSquareRootVariable,
    faGaugeHigh,
    faFilm,
    faBoxesStacked,
    faBrain,
    faGlobe,
    faBookOpenReader,
    faBullhorn,
    faEarthEurope,
} from "@fortawesome/free-solid-svg-icons";
import { faDocker } from "@fortawesome/free-brands-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons/faMobile";

const ICON_MAP = {
    "id-badge": faIdBadge,
    "network-wired": faNetworkWired,
    "wallet": faWallet,
    "paste": faPaste,
    "heart-pulse": faHeartPulse,
    "shield-halved": faShieldHalved,
    "code-branch": faCodeBranch,
    "book": faBook,
    "hard-drive": faHardDrive,
    "images": faImages,
    "sliders": faSliders,
    "square-root-variable": faSquareRootVariable,
    "docker": faDocker,
    "gauge-high": faGaugeHigh,
    "film": faFilm,
    "boxes-stacked": faBoxesStacked,
    "brain": faBrain,
    "book-open-reader": faBookOpenReader,
    "bullhorn": faBullhorn,
    "earth-europe": faEarthEurope
};

export const iconFor = (name) => ICON_MAP[name] || faGlobe;
