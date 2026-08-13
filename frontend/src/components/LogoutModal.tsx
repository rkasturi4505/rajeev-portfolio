import "./LogoutModal.css";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <div className="logout-icon">⚠️</div>

        <h2>Confirm Logout</h2>

        <p>Are you sure you want to logout from the admin dashboard?</p>

        <div className="logout-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
