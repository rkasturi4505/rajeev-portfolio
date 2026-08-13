import "./Modal.css";

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

function SuccessModal({
  isOpen,
  title = "Success",
  message,
  buttonText = "OK",
  onClose,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon success">
          ✓
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="modal-btn success-btn"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;