import { useAuth } from "@/hooks/useAuth";
import "@/css/UserBadge.css";

const UserBadge = () => {
    const { authenticated, user, groups } = useAuth();

    if (!authenticated || !user) return null;

    return (
        <a
            className="user-badge"
            href="https://id.miarma.net"
            target="_blank"
            rel="noopener noreferrer"
            title={groups.length ? `grupos: ${groups.join(", ")}` : "sesión activa"}
        >
            <span className="user-badge__dot" aria-hidden="true"></span>
            <span className="user-badge__name">@{user}</span>
        </a>
    );
};

export default UserBadge;