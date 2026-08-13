import "./Modal.css";

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

function ErrorModal({
  isOpen,
  title = "Error",
  message,
  buttonText = "Close",
  onClose,
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon error">
          ✕
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="modal-btn error-btn"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;