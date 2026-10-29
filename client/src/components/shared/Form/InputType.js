import React from "react";

const InputType = ({
  labelText,
  labelFor,
  inputType = "text",
  value,
  onChange,
  name,
  placeholder,
  icon,
  required = false,
  helperText,
}) => {
  return (
    <div className="mb-3">
      {labelText && (
        <label htmlFor={labelFor} className="form-label fw-semibold small text-secondary mb-1">
          {labelText} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-light text-muted border-end-0">
            <i className={icon}></i>
          </span>
        )}
        <input
          id={labelFor}
          type={inputType}
          className={`form-control py-2 ${icon ? "border-start-0" : ""}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || (labelText ? `Enter ${labelText.toLowerCase()}` : "")}
          required={required}
          style={{
            borderColor: "#dee2e6",
            fontSize: "0.95rem",
          }}
        />
      </div>
      {helperText && <small className="text-muted d-block mt-1" style={{ fontSize: "0.8rem" }}>{helperText}</small>}
    </div>
  );
};

export default InputType;
