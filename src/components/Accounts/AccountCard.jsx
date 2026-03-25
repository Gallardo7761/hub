// AccountCard.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { CONSTANTS } from "@/util/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const getServiceName = (serviceId) => {
    switch (serviceId) {
        case CONSTANTS.CORE_ID: return "Miarma";
        case CONSTANTS.MINECRAFT_ID: return "MiarmaCraft";
        case CONSTANTS.HUERTOS_DE_CINE_ID: return "Huertos de Cine";
        case CONSTANTS.MPASTE_ID: return "MPaste";
        default: return "Desconocido";
    }
};

const AccountCard = ({ identity, onUpdate, onRequestStatusChange, confirmedStatusChange }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: identity.username,
        email: identity.email,
        status: identity.status
    });

    useEffect(() => {
        if (!editMode) {
            setFormData({
                username: identity.username,
                email: identity.email,
                status: identity.status
            });
        }
    }, [identity, editMode]);

    // Aplica la desactivación confirmada
    useEffect(() => {
        if (confirmedStatusChange?.credentialId === identity.credentialId) {
            setFormData(prev => ({ ...prev, status: confirmedStatusChange.status }));
        }
    }, [confirmedStatusChange, identity.credentialId]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onUpdate?.({ ...identity, ...formData });
        setEditMode(false);
    };

    const handleCancel = () => setEditMode(false);

    return (
        <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="m-0 p-0 d-flex flex-column">
                    <span className={`fw-semibold ${identity.status == 0 ? "text-danger" : ""}`}>
                        {getServiceName(identity.serviceId)}
                        {identity.status == 0 && (
                            <span className="text-danger small">
                                &nbsp;&nbsp;(Se eliminará en 2 meses tras desactivación)
                            </span>
                        )}
                    </span>
                    <small className="muted">{identity.credentialId}</small>
                </div>
                <div className="d-flex gap-3">
                    {identity.status != 0 && (
                        !editMode ? (
                            <FontAwesomeIcon icon={faPen} className="cursor-pointer" onClick={() => setEditMode(true)} />
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faCheck} className="text-success cursor-pointer" onClick={handleSave} />
                                <FontAwesomeIcon icon={faXmark} className="text-danger cursor-pointer" onClick={handleCancel} />
                            </>
                        )
                    )}
                </div>
            </div>

            <div className="card-body d-flex flex-column gap-2">
                <div>
                    <span className="text-muted small">Usuario</span>
                    {editMode ? (
                        <input className="form-control form-control-sm themed-input" value={formData.username} onChange={e => handleChange("username", e.target.value)} />
                    ) : <div className="fw-semibold">{identity.username}</div>}
                </div>

                <div>
                    <span className="text-muted small">Email</span>
                    {editMode ? (
                        <input className="form-control form-control-sm themed-input" value={formData.email} onChange={e => handleChange("email", e.target.value)} />
                    ) : <div>{identity.email}</div>}
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    {editMode ? (
                        <select className="form-select form-select-sm themed-input"
                            value={formData.status}
                            onChange={e => onRequestStatusChange?.(identity, parseInt(e.target.value))}
                        >
                            <option value={1}>Activa</option>
                            <option value={0}>Inactiva</option>
                        </select>
                    ) : (
                        <span className={`badge ${identity.status === 1 ? "bg-success" : "bg-danger"}`}>
                            {identity.status === 1 ? "Activa" : "Inactiva"}
                        </span>
                    )}

                    <span className="text-muted small ms-2">
                        Creada el: {dayjs(identity.updatedAt).format("DD/MM/YYYY")}
                    </span>
                </div>
            </div>
        </div>
    );
};

AccountCard.propTypes = {
    identity: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
    onRequestStatusChange: PropTypes.func,
    confirmedStatusChange: PropTypes.object
};

export default AccountCard;