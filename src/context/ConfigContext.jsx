import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [configLoading, setLoading] = useState(true);
  const [configError, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("https://cdn.killobyte.es/files/config/hub.json", { cache: "no-cache" });
        if (!response.ok) throw new Error("Error al cargar la configuración del hub");
        const json = await response.json();
        setConfig(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, configLoading, configError }}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ConfigContext};
