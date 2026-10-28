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

    const loading = configLoading || authLoading;

    return (
        <>
            <miarma-header
                href="https://www.miarma.net"
                tag={loading ? "er çentro" : `er çentro · ${visible.length} servicios`}
            >
                {!loading && <UserBadge />}
            </miarma-header>

            <main className="home miarma-container">
                {loading
                    ? <LoadingIcon />
                    : <Mosaic pages={visible} hiddenCount={pages.length - visible.length} />}
            </main>
        </>
    );
};

export default Home;
