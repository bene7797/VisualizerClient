import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AudioPlayer from "./AudioPlayer";
import Visualizer from "./Visualizer";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.5);
  const [cameraSpeed, setCameraSpeed] = useState<number>(3);
  const [lerpSpeed, setLerpSpeed] = useState<number>(0.65);
  const [initialSphereSize, setInitialSphereSize] = useState<number>(1);
  const [initialCameraDepth, setInitialCameraDepth] = useState<number>(20);

  return (
    <div>
      <AudioPlayer
        setAnalyser={setAnalyser}
        setIsAudioReady={setIsAudioReady}
      />
      <Canvas
        camera={{ position: [0, 0, 110] }}
        style={{ width: "100%", height: "100vh", backgroundColor: "black" }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Visualizer
          analyser={analyser}
          isAudioReady={isAudioReady}
          rotationSpeed={rotationSpeed}
          cameraSpeed={cameraSpeed}
          lerpSpeed={lerpSpeed}
          initialSphereSize={initialSphereSize}
          initialCameraDepth={initialCameraDepth}
        />
      </Canvas>

      <div className="controls-container">
        <h3>Spiel mit mir</h3>
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
            onChange={(e) => setInitialCameraDepth(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
