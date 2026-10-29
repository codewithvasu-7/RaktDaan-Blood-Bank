import React, { useState, useRef } from "react";

/**
 * SpatialCard — 3D Perspective Tilt Card with Specular Light Tracking
 * Delivers realistic spatial depth inspired by Apple VisionOS / Spatial UI.
 */
const SpatialCard = ({
  children,
  className = "",
  style = {},
  variant = "light", // 'light' | 'dark' | 'crimson'
  tiltFactor = 12,
  glare = true,
  onClick,
  ...rest
}) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltFactor;
    const rotateY = ((x - centerX) / centerX) * tiltFactor;

    setCoords({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const variantClass =
    variant === "dark"
      ? "spatial-glass-dark"
      : variant === "crimson"
      ? "spatial-glass-crimson"
      : "spatial-glass";

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateZ(10px)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`spatial-interactive-tile ${variantClass} ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.08s ease-out, box-shadow 0.2s ease"
          : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {/* Specular Glare Layer that tracks mouse cursor */}
      {glare && isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            background: `radial-gradient(circle 280px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, ${
              variant === "dark" ? "0.15" : "0.35"
            }) 0%, transparent 80%)`,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};

export default SpatialCard;
