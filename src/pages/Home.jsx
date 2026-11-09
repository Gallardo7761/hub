import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useConfig } from "@/hooks/useConfig";
import UserBadge from "@/components/UserBadge";
import Services from "@/components/Services";

const Home = () => {
    const { config, configLoading, configError } = useConfig();
    const { authenticated, authLoading } = useAuth();

    const pages = useMemo(() => config?.pages ?? [], [config]);
    const visible = useMemo(
        () => pages.filter((p) => !p.requiresAuth || authenticated),
        [pages, authenticated]
    );

    const loading = configLoading || authLoading;

    return (
        <>
            <kb-header
                href="https://www.killobyte.es"
                tag={loading ? "er çentro" : `er çentro · ${visible.length} servicios`}
            >
                {!loading && <UserBadge />}
            </kb-header>

            <main className="kb-container">
                <h1>er çentro</h1>
                <p>
                    Índice de los servicios que corren en el servidor de killobyte.es.
                    Los marcados como <i>privados</i> necesitan sesión en KID.
                </p>

                {loading && <p className="kb-muted">Cargando…</p>}
                {!loading && configError && <p>No se ha podido leer la configuración del hub. Recarga en un rato.</p>}
                {!loading && !configError && (
                    <Services pages={visible} hiddenCount={pages.length - visible.length} />
                )}
            </main>
        </>
    );
};

export default Home;
