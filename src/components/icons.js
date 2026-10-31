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
    faFilm,
    faBoxesStacked,
    faGlobe,
    faBookOpenReader,
    faBullhorn,
    faEarthEurope,
    faGamepad,
    faMessage,
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
    "panel": faGamepad,
    "docker": faDocker,
    "film": faFilm,
    "boxes-stacked": faBoxesStacked,
    "book-open-reader": faBookOpenReader,
    "bullhorn": faBullhorn,
    "earth-europe": faEarthEurope,
    "chat": faMessage
};

export const iconFor = (name) => ICON_MAP[name] || faGlobe;
