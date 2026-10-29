import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";

const LanguageSelector = ({ variant = "header" }) => {
  const { lang, changeLanguage, supportedLanguages, currentLanguageObj } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      <button
        type="button"
        className={`btn btn-sm d-flex align-items-center gap-1 rounded-pill fw-bold transition-all ${
          variant === "header"
            ? "bg-white bg-opacity-10 text-white border border-white border-opacity-25 hover-lift shadow-sm px-2 px-md-3 py-1"
            : "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1"
        }`}
        style={{
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          fontSize: variant === "header" ? "12px" : "13px",
          whiteSpace: "nowrap",
        }}
        onClick={() => setIsOpen(!isOpen)}
        title="Change Language / भाषा बदलें"
      >
        <span style={{ fontSize: "13px" }}>{currentLanguageObj.flag}</span>
        <span className="ms-1">{currentLanguageObj.label}</span>
        <i
          className={`fa-solid fa-chevron-down ms-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{
            fontSize: "9px",
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        ></i>
      </button>

      {isOpen && (
        <div
          className="position-absolute end-0 mt-2 py-1 shadow-lg rounded-4 spatial-glass"
          style={{
            minWidth: "150px",
            zIndex: 1050,
            background: "rgba(26, 30, 36, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div className="px-3 py-1 border-bottom border-secondary border-opacity-25">
            <span className="text-white-50" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
              SELECT LANGUAGE
            </span>
          </div>
          {supportedLanguages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`w-100 text-start px-3 py-2 border-0 bg-transparent text-white d-flex align-items-center justify-content-between transition-colors ${
                lang === l.code ? "bg-danger bg-opacity-25 fw-bold text-danger" : "hover-bg-white-10"
              }`}
              style={{
                fontSize: "13px",
                cursor: "pointer",
              }}
              onClick={() => {
                changeLanguage(l.code);
                setIsOpen(false);
              }}
            >
              <span>
                <span className="me-2">{l.flag}</span>
                <span>{l.label}</span>
              </span>
              {lang === l.code && <i className="fa-solid fa-check text-danger small"></i>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
