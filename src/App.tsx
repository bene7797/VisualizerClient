import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AudioPlayer from "./AudioPlayer";
import Visualizer from "./Visualizer";
import ControlsContainer from "./ControlsContainer";

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

      <ControlsContainer />
    </div>
  );
};

export default App;
