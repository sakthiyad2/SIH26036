function Alert({
  message,
  type = "info",
  onClose,
}) {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="alert-close"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;