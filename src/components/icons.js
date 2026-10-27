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
} from "@fortawesome/free-solid-svg-icons";
import { faDocker } from "@fortawesome/free-brands-svg-icons";

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
};

export const iconFor = (name) => ICON_MAP[name] || faGlobe;
