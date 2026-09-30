import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const GUEST = { authenticated: false, user: null, groups: [] };
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(GUEST);
  const [authLoading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();

    const fetchAuth = async () => {
      try {
        const res = await fetch("/api/auth", {
          credentials: "same-origin",
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error("auth");
        const json = await res.json();

        const groups = Array.isArray(json.groups)
          ? json.groups
          : String(json.groups ?? "").split(",").map((g) => g.trim()).filter(Boolean);

        setAuth({
          authenticated: json.authenticated === true && !!json.user,
          user: json.user ?? null,
          groups,
        });
      } catch (err) {
        if (err.name !== "AbortError") setAuth(GUEST);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    };

    fetchAuth();
    return () => ctrl.abort();
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };