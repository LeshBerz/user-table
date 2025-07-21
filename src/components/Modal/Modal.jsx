import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import usersStore from '../../stores/users';
import './Modal.css';

function Modal() {
  const { selectedUser, closeModal } = usersStore;

  useEffect(() => {
    console.log('Modal opened, selectedUser:', selectedUser); // Отладка
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        console.log('Esc pressed, closing modal'); // Отладка
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      console.log('Cleaning up Esc listener'); // Отладка
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  if (!selectedUser) {
    console.log('Modal not rendered, selectedUser is null'); // Отладка
    return null;
  }

  return (
    <div className="modal-overlay" onClick={() => {
      console.log('Overlay clicked, closing modal'); // Отладка
      closeModal();
    }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => {
            console.log('Close button clicked'); // Отладка
            closeModal();
          }}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="modal-body">
          <img
            src={selectedUser.image}
            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
            className="modal-avatar"
          />
          <h2>
            {selectedUser.lastName} {selectedUser.firstName} {selectedUser.maidenName}
          </h2>
          <p><strong>Возраст:</strong> {selectedUser.age}</p>
          <p><strong>Пол:</strong> {selectedUser.gender}</p>
          <p><strong>Телефон:</strong> {selectedUser.phone}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Адрес:</strong></p>
          <ul>
            <li><strong>Страна:</strong> {selectedUser.address.country}</li>
            <li><strong>Город:</strong> {selectedUser.address.city}</li>
            <li><strong>Улица:</strong> {selectedUser.address.address}</li>
            <li><strong>Почтовый индекс:</strong> {selectedUser.address.postalCode}</li>
          </ul>
          <p><strong>Рост:</strong> {selectedUser.height} см</p>
          <p><strong>Вес:</strong> {selectedUser.weight} кг</p>
        </div>
      </div>
    </div>
  );
}

export default observer(Modal);