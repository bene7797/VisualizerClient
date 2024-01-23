import React, { useState } from "react";

const ControlsContainer: React.FC = () => {
  const [rotationSpeed, setRotationSpeed] = useState<number>(0);
  const [cameraSpeed, setCameraSpeed] = useState<number>(-5); // Hier den initialen Wert anpassen
  const [lerpSpeed, setLerpSpeed] = useState<number>(0.5); // Hier den initialen Wert anpassen
  const [initialSphereSize, setInitialSphereSize] = useState<number>(1); // Hier den initialen Wert anpassen
  const [initialCameraDepth, setInitialCameraDepth] = useState<number>(10); // Hier den initialen Wert anpassen

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleContainer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`controls-container ${isOpen ? "open" : ""}`}>
      <h3 onClick={toggleContainer}>Spiel mit mir</h3>

      {isOpen && (
        <>
          <label>
            Rotationsgeschwindigkeit:
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Kamerageschwindigkeit:
            <input
              type="range"
              min="-10"
              max="-0.5"
              step="0.01"
              value={cameraSpeed}
              onChange={(e) => setCameraSpeed(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Lerp-Geschwindigkeit:
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={lerpSpeed}
              onChange={(e) => setLerpSpeed(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Größe der Kugeln:
            <input
              type="range"
              min="0.01"
              max="4"
              step="0.01"
              value={initialSphereSize}
              onChange={(e) => setInitialSphereSize(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Tiefe der Kamerafahrt
            <input
              type="range"
              min="0.01"
              max="100"
              step="0.01"
              value={initialCameraDepth}
              onChange={(e) =>
                setInitialCameraDepth(parseFloat(e.target.value))
              }
            />
          </label>
        </>
      )}
    </div>
  );
};

export default ControlsContainer;
