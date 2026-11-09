import { useAuth } from "@/hooks/useAuth";

const LOGIN = "https://id.killobyte.es";

const UserBadge = () => {
    const { authenticated, user, groups } = useAuth();

    if (!authenticated || !user) {
        return <a className="session" href={LOGIN}>identificarse</a>;
    }

    return (
        <span className="session" title={groups.length ? `grupos: ${groups.join(", ")}` : undefined}>
            sesión: <a href={LOGIN} target="_blank" rel="noopener noreferrer">@{user}</a>
        </span>
    );
};

export default UserBadge;
