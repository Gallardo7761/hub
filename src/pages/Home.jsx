import NetworkGraph from "@/components/graph/NetworkGraph";
import { useConfig } from "@/hooks/useConfig";
import LoadingIcon from "@/components/LoadingIcon";
import CustomContainer from "@/components/CustomContainer";
import "@/css/Home.css";

const ROOT = { title: "miarma.net", link: "https://www.miarma.net" };

const Home = () => {
    const { config, configLoading } = useConfig();

    if (configLoading) return <LoadingIcon />;

    return (
        <CustomContainer>
            <header className="hero">
                <p className="hero__tag">// personal network hub</p>
                <h1 className="hero__title">
                    miarma<span className="accent">.</span>net
                    <span className="hero__beta">
                        <span className="hero__beta-text">BETA</span>
                    </span>
                </h1>
            </header>
            <NetworkGraph root={ROOT} nodes={config.pages} />
        </CustomContainer>
    );
};

export default Home;
