import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NetworkGraph from "@/components/graph/NetworkGraph";
import { useConfig } from "@/hooks/useConfig";
import LoadingIcon from "@/components/LoadingIcon";
import CustomContainer from "@/components/CustomContainer";
import "@/css/Home.css";

const ROOT = { title: "miarma.net", link: "https://www.miarma.net" };
const TAG = "< personal network hub />";

const Hero = () => {
    const [typed, setTyped] = useState("");

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setTyped(TAG.slice(0, i));
            if (i >= TAG.length) clearInterval(id);
        }, 55);
        return () => clearInterval(id);
    }, []);

    return (
        <header className="hero">
            <p className="hero__tag" aria-label={TAG}>{typed}</p>
            <h1 className="hero__title" data-text="miarma.net">
                miarma<span className="accent">.</span>net
                <span className="hero__beta">
                    <span className="hero__beta-text">BETA</span>
                </span>
            </h1>
        </header>
    );
};

const Home = () => {
    const { config, configLoading } = useConfig();
    const { authenticated, authLoading } = useAuth();

    const nodes = useMemo(
        () => (config?.pages ?? []).filter((p) => !p.requiresAuth || authenticated),
        [config, authenticated]
    );

    if (configLoading || authLoading) return <LoadingIcon />;

    return (
        <CustomContainer>
            <Hero />
            <NetworkGraph logo={config.logo} root={ROOT} nodes={nodes} />
        </CustomContainer>
    );
};

export default Home;