// Accounts.jsx
import { DataProvider } from "@/context/DataContext";
import { useError } from "@/context/ErrorContext";
import LoadingIcon from "@/components/LoadingIcon";
import { useDataContext } from "@/hooks/useDataContext";
import CustomContainer from "@/components/CustomContainer";
import ContentWrapper from "@/components/ContentWrapper";
import { useConfig } from "@/hooks/useConfig";
import PropTypes from 'prop-types';
import PaginatedCardGrid from "@/components/PaginatedCardGrid";
import AccountCard from "@/components/Accounts/AccountCard";
import CustomModal from "@/components/CustomModal";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Accounts = () => {
    const { config, configLoading } = useConfig();
    const { showError } = useError();

    if (configLoading) return <p><LoadingIcon /></p>;

    const identity = JSON.parse(localStorage.getItem("identity"));

    const BASE_URL = `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.credentials.byUserId}`
        .replace(":userId", identity?.user.userId);

    const BY_ID_URL = `${config.apiConfig.baseUrl}${config.apiConfig.endpoints.credentials.byId}`;

    const reqConfig = {
        baseUrl: BASE_URL,
        byIdUrl: BY_ID_URL,
        params: {}
    };

    return (
        <DataProvider config={reqConfig} onError={showError}>
            <AccountsContent reqConfig={reqConfig} />
        </DataProvider>
    );
}

const AccountsContent = ({ reqConfig }) => {
    const { data, dataLoading, putData } = useDataContext();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingAccountId, setPendingAccountId] = useState(null);
    const [pendingStatus, setPendingStatus] = useState(null);
    const [confirmedStatusChange, setConfirmedStatusChange] = useState(null);

    const handleRequestStatusChange = (identity, newStatus) => {
        if (newStatus === 0 && identity?.status !== 0) {
            setPendingAccountId(identity?.credentialId);
            setPendingStatus(newStatus);
            setShowConfirmModal(true);
        }
    };

    const handleConfirmDeactivation = () => {
        setConfirmedStatusChange({
            credentialId: pendingAccountId,
            status: pendingStatus
        });
        setShowConfirmModal(false);
        setPendingAccountId(null);
        setPendingStatus(null);
    };

    const handleUpdate = async (updatedIdentity) => {
        try {
            await putData(
                reqConfig.byIdUrl.replace(":credentialId", updatedIdentity?.credentialId),
                { 
                    username: updatedIdentity?.username,
                    email: updatedIdentity?.email, 
                    status: updatedIdentity?.status,
                    serviceId: updatedIdentity?.serviceId
                },
                true
            );
        } catch (err) {
            console.error(err);
        }
    };

    if (dataLoading) return <p><LoadingIcon /></p>;

    return (
        <CustomContainer>
            <ContentWrapper>
                <PaginatedCardGrid
                    items={data}
                    renderCard={(identity, idx) => (
                        <AccountCard
                            key={idx}
                            identity={identity}
                            onUpdate={handleUpdate}
                            onRequestStatusChange={handleRequestStatusChange}
                            confirmedStatusChange={confirmedStatusChange}
                        />
                    )}
                />
            </ContentWrapper>

            {showConfirmModal && (
                <CustomModal
                    show={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    title="Confirmar desactivación"
                >
                    <div className="p-4">
                        <p>¿Seguro que quieres pasar esta cuenta a estado inactivo? Después de desactivarla sólo podra ser reactivada o editada otra vez por un administador.</p>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleConfirmDeactivation}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </CustomModal>
            )}
        </CustomContainer>
    );
}

AccountsContent.propTypes = {
    reqConfig: PropTypes.object.isRequired
};

export default Accounts;