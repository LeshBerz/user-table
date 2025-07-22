import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import usersStore from '../../stores/users';
import styles from './Modal.module.css';

function Modal() {
    const { t } = useTranslation();
    const { selectedUser, closeModal } = usersStore;

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                console.log('Esc pressed, closing modal');
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            console.log('Cleaning up Esc listener');
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeModal]);

    if (!selectedUser) {
        console.log('Modal not rendered, selectedUser is null');
        return null;
    }

    const hasAddress = selectedUser.address && typeof selectedUser.address === 'object';
    const safeAddress = hasAddress ? selectedUser.address : {};

    return (
        <div
            className={styles.modalOverlay}
            onClick={() => {
                console.log('Overlay clicked, closing modal');
                closeModal();
            }}
        >
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.modalClose}
                    onClick={() => {
                        console.log('Close button clicked');
                        closeModal();
                    }}
                    aria-label={t('modal.close')}
                >
                    ×
                </button>
                <div className={styles.modalBody}>
                    {selectedUser.image ? (
                        <img
                            src={selectedUser.image}
                            alt={`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`}
                            className={styles.modalAvatar}
                        />
                    ) : (
                        <p>{t('modal.avatarMissing')}</p>
                    )}
                    <h2 align="center">
                        {selectedUser.lastName || ''} {selectedUser.firstName || ''}{' '}
                        {selectedUser.maidenName || ''}
                    </h2>
                    <p>
                        <strong>{t('modal.age')}:</strong> {selectedUser.age || t('modal.notSpecified')}
                    </p>
                    <p>
                        <strong>{t('modal.gender')}:</strong> {selectedUser.gender? `${selectedUser.gender === 'male'? t('modal.male') : t('modal.female')}` : t('modal.notSpecified')}
                    </p>
                    <p>
                        <strong>{t('modal.phone')}:</strong> {selectedUser.phone || t('modal.notSpecified')}
                    </p>
                    <p>
                        <strong>{t('modal.email')}:</strong> {selectedUser.email || t('modal.notSpecified')}
                    </p>
                    <p>
                        <strong>{t('modal.address')}:</strong>
                    </p>
                    <ul>
                        <li>
                            <strong>{t('modal.country')}:</strong> {safeAddress.country || t('modal.notSpecified')}
                        </li>
                        <li>
                            <strong>{t('modal.city')}:</strong> {safeAddress.city || t('modal.notSpecified')}
                        </li>
                        <li>
                            <strong>{t('modal.street')}:</strong> {safeAddress.address || t('modal.notSpecified')}
                        </li>
                        <li>
                            <strong>{t('modal.postalCode')}:</strong> {safeAddress.postalCode || t('modal.notSpecified')}
                        </li>
                    </ul>
                    <p>
                        <strong>{t('modal.height')}:</strong> {selectedUser.height ? `${selectedUser.height} ${t('modal.cm')}` : t('modal.notSpecified')}
                    </p>
                    <p>
                        <strong>{t('modal.weight')}:</strong> {selectedUser.weight ? `${selectedUser.weight} ${t('modal.kg')}` : t('modal.notSpecified')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default observer(Modal);