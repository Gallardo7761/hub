import ContentWrapper from "@/components/ContentWrapper.jsx";
import Card from "@/components/Card";
import { useConfig } from "@/hooks/useConfig";
import LoadingIcon from "@/components/LoadingIcon";
import PropTypes from 'prop-types';
import CustomContainer from "@/components/CustomContainer";

const Home = () => {
    const { config, configLoading } = useConfig();

    if (configLoading) return <p className="text-center my-5"><LoadingIcon /></p>;

    return (
        <HomeContent cards={config.pages} />
    );
}

const HomeContent = ({ cards }) => {
    return (
        <CustomContainer>
            <ContentWrapper>
                <div className={"row g-4"}>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            {...card}
                        />
                    ))}
                </div>
            </ContentWrapper>
        </CustomContainer>
    );
}

HomeContent.propTypes = {
    cards: PropTypes.array.isRequired
};

export default Home;