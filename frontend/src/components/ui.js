import { FiAlertTriangle, FiInbox, FiLoader } from "react-icons/fi";

export function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Loader({ label = "Loading..." }) {
  return (
    <div className="state">
      <FiLoader className="spin" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title = "No data yet", message = "There is nothing to show right now." }) {
  return (
    <div className="state">
      <FiInbox />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state state-error">
      <FiAlertTriangle />
      <h3>Could not load data</h3>
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}

export function Field({ field, value, onChange }) {
  const common = {
    id: field.name,
    name: field.name,
    value: value || "",
    required: field.required,
    onChange: (event) => onChange(field.name, event.target.value),
  };

  return (
    <label className="field">
      <span>
        {field.label}
        {field.required && <b>*</b>}
      </span>
      {field.type === "textarea" ? (
        <textarea {...common} rows={4} />
      ) : field.type === "select" ? (
        <select {...common}>
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={field.type || "text"} />
      )}
    </label>
  );
}

export function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close dialog">x</button>
        </div>
        {children}
      </div>
    </div>
  );
}
