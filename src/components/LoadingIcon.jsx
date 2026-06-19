import '@/css/LoadingIcon.css';

const LoadingIcon = () => {
    return (
        <div className="boot-loader" role="status" aria-live="polite">
            <span className="boot-loader__prompt">
                $ booting network
                <span className="boot-loader__dots">
                    <span>.</span><span>.</span><span>.</span>
                </span>
            </span>
            <span className="boot-loader__cursor" aria-hidden="true"></span>
        </div>
    );
}

export default LoadingIcon;
