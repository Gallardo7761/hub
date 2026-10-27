import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useConfig } from "@/hooks/useConfig";
import LoadingIcon from "@/components/LoadingIcon";
import UserBadge from "@/components/UserBadge";
import Mosaic from "@/components/mosaic/Mosaic";
import "@/css/Home.css";

const Home = () => {
    const { config, configLoading } = useConfig();
    const { authenticated, authLoading } = useAuth();

    const pages = useMemo(() => config?.pages ?? [], [config]);
    const visible = useMemo(
        () => pages.filter((p) => !p.requiresAuth || authenticated),
        [pages, authenticated]
    );

    if (configLoading || authLoading) return <LoadingIcon />;

    return (
        <main className="home">
            <header className="home__header">
                <a className="home__brand" href="https://www.miarma.net">
                    <img src={config.logo} alt="" width={40} height={40} />
                    <span>
                        <h1 className="home__title">
                            miarma<span className="accent">.</span>net
                        </h1>
                        <span className="home__tag">er çentro · {visible.length} servicios</span>
                    </span>
                </a>
                <UserBadge />
            </header>

            <Mosaic pages={visible} hiddenCount={pages.length - visible.length} />
        </main>
    );
};

export default Home;
