const ContentWrapper = ({ children }) => {
    return (
        <div className={"container py-5"}>
            {children}
        </div>
    );
}

export default ContentWrapper;