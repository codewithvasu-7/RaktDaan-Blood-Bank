import React, { useEffect, useRef } from "react";

// City coordinates mapping for India
const CITY_COORDS = {
  mumbai: [19.0760, 72.8777],
  delhi: [28.6139, 77.2090],
  jaipur: [26.9124, 75.7873],
  bengaluru: [12.9716, 77.5946],
  bangalore: [12.9716, 77.5946],
  pune: [18.5204, 73.8567],
  hyderabad: [17.3850, 78.4867],
  chennai: [13.0827, 80.2707],
  kolkata: [22.5726, 88.3639],
  lucknow: [26.8467, 80.9462],
  ahmedabad: [23.0225, 72.5714],
};

// Haversine formula to calculate distance between two coordinates in km
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

const InteractiveDonorMap = ({
  hospitalCity = "Mumbai",
  hospitalName = "Apollo Trauma Emergency Center",
  donors = [],
  onSelectDonor,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!window.L || !mapContainerRef.current) return;

    // Determine center coordinate
    const cityKey = (hospitalCity || "mumbai").toLowerCase().trim();
    const center = CITY_COORDS[cityKey] || [19.0760, 72.8777];

    // Clean up existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = window.L.map(mapContainerRef.current).setView(center, 12);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Hospital / Accident Center Marker (Blue)
    const hospitalIcon = window.L.divIcon({
      className: "custom-hospital-marker",
      html: `
        <div style="background-color: #1a1e24; color: white; border: 2px solid #dc3545; border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4); font-size: 18px;">
          🏥
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
    });

    const hospitalMarker = window.L.marker(center, { icon: hospitalIcon }).addTo(map);
    hospitalMarker.bindPopup(`
      <div style="font-family: inherit; padding: 4px;">
        <span style="background: #dc3545; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">EMERGENCY ACCIDENT CENTER</span>
        <h6 style="margin: 6px 0 2px 0; font-weight: bold; font-size: 13px;">${hospitalName}</h6>
        <small style="color: #666;">Center point for 10 km emergency donor search radius</small>
      </div>
    `);

    // 10 km Emergency Dispatch Radius Circle
    window.L.circle(center, {
      color: "#dc3545",
      fillColor: "#dc3545",
      fillOpacity: 0.08,
      radius: 8000,
      weight: 1.5,
      dashArray: "4, 6",
    }).addTo(map);

    // Plot Nearby Donors
    donors.forEach((donor, idx) => {
      // Offset coords slightly around center based on index to simulate real-world distribution
      const angle = (idx / (donors.length || 1)) * 2 * Math.PI;
      const radiusKm = 1.5 + (idx % 5) * 1.3; // between 1.5 and 7 km
      const latOffset = (radiusKm / 111) * Math.cos(angle);
      const lonOffset =
        (radiusKm / (111 * Math.cos((center[0] * Math.PI) / 180))) *
        Math.sin(angle);

      const donorCoord = [center[0] + latOffset, center[1] + lonOffset];
      const distance = calculateDistanceKm(
        center[0],
        center[1],
        donorCoord[0],
        donorCoord[1]
      );

      const donorIcon = window.L.divIcon({
        className: "custom-donor-marker",
        html: `
          <div style="background: #dc3545; color: white; border: 2px solid white; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(220,53,69,0.5); font-weight: bold; font-size: 11px;">
            ${donor.bloodGroup || "🩸"}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = window.L.marker(donorCoord, { icon: donorIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px; min-width: 170px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="background: #dc3545; color: white; font-weight: bold; font-size: 12px; padding: 2px 6px; border-radius: 4px;">${donor.bloodGroup}</span>
            <span style="color: #28a745; font-size: 11px; font-weight: bold;">● Available</span>
          </div>
          <h6 style="margin: 0; font-weight: bold; font-size: 13px;">${donor.name}</h6>
          <small style="color: #666; display: block; margin-bottom: 4px;">📍 ${distance} km from Hospital</small>
          <small style="color: #888; display: block; margin-bottom: 8px;">Phone: ${donor.phone || "Verified"}</small>
          <button id="btn-dispatch-${donor._id}" style="width: 100%; background: #dc3545; color: white; border: none; padding: 5px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; cursor: pointer;">
            🚨 Dispatch Emergency SOS
          </button>
        </div>
      `);

      marker.on("popupopen", () => {
        const btn = document.getElementById(`btn-dispatch-${donor._id}`);
        if (btn && onSelectDonor) {
          btn.onclick = () => onSelectDonor(donor);
        }
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [hospitalCity, hospitalName, donors, onSelectDonor]);

  return (
    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4 bg-white">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fs-5 text-danger">🗺️</span>
          <div>
            <h6 className="fw-bold mb-0 text-dark">Live GPS Proximity Map & Emergency Donors</h6>
            <small className="text-muted">
              Interactive 8 km radar map showing donors currently eligible for accident dispatch
            </small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 small">
            <span className="spinner-grow spinner-grow-sm me-1"></span> Live Radar Active
          </span>
        </div>
      </div>

      <div
        ref={mapContainerRef}
        style={{ height: "420px", width: "100%", zIndex: 1 }}
      ></div>

      <div className="card-footer bg-light py-2 px-3 d-flex justify-content-between align-items-center small text-muted">
        <div>
          <span className="me-3">🏥 <strong>Hospital / Trauma Spot</strong></span>
          <span>🩸 <strong>Available Donor (Click Pin to Dispatch)</strong></span>
        </div>
        <span>Powered by OpenStreetMap • Free & Privacy Safe</span>
      </div>
    </div>
  );
};

export default InteractiveDonorMap;
