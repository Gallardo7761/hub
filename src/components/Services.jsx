import PropTypes from "prop-types";

const LOGIN = "https://id.killobyte.es";

const hostOf = (link) => {
    try { return new URL(link).hostname; } catch { return link; }
};

const Services = ({ pages, hiddenCount = 0 }) => (
    <div className="kb-scroll">
        <table className="services">
            <caption>Servicios disponibles</caption>
            <thead>
                <tr><th>Nº</th><th>Servicio</th><th>Dirección</th><th>Acceso</th></tr>
            </thead>
            <tbody>
                {pages.map((p, i) => (
                    <tr key={p.link + p.title}>
                        <td className="kb-mono">{String(i + 1).padStart(2, "0")}</td>
                        <td><a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a></td>
                        <td className="kb-mono">{hostOf(p.link)}</td>
                        <td>{p.requiresAuth ? "privado" : "público"}</td>
                    </tr>
                ))}
                {hiddenCount > 0 && (
                    <tr>
                        <td colSpan={4} className="kb-muted">
                            + {hiddenCount} servicios privados. <a href={LOGIN}>Identifícate en KID</a> para verlos.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

Services.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            requiresAuth: PropTypes.bool,
        })
    ).isRequired,
    hiddenCount: PropTypes.number,
};

export default Services;
