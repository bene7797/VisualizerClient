import React, { useRef, useMemo } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFrame, useThree } from "@react-three/fiber";

interface VisualizerProps {
  analyser: AnalyserNode | null;
  isAudioReady: boolean;
  rotationSpeed: number;
  cameraSpeed: number;
  lerpSpeed: number;
  initialSphereSize: number;
  initialCameraDepth: number;
}

function lerp(start: number, end: number, factor: number) {
  return (1 - factor) * start + factor * end;
}

function adjustFrequencyValue(value: number) {
  const maxValue = 255;

  return Math.pow(value / maxValue, 2) * maxValue; // Exponentielle Anpassung
}

const Visualizer: React.FC<VisualizerProps> = ({
  analyser,
  isAudioReady,
  rotationSpeed,
  cameraSpeed,
  lerpSpeed,
  initialSphereSize,
  initialCameraDepth,
}) => {
  const groupRef = useRef<any>();
  const sphereRadius = 10; // Radius der imaginären Kugel

  const { camera } = useThree();
  const frequencyData = new Uint8Array(
    analyser ? analyser.frequencyBinCount : 0
  );
  const gridSize = 40;
  const boxCount = gridSize * gridSize;

  //Positions- und Frequenzzuweisung der Kugeln
  const boxes = useMemo(() => {
    let tempBoxes: any[] = [];
    for (let i = 0; i < boxCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      tempBoxes.push({
        originalPosition: [x, y, z],
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        frequencyIndex:
          Math.random() > 0.3 // 20 prozent der freuquenzen werden auf den bassbereich verteilt, damit es schöner aussieht
            ? Math.floor(Math.random() * (frequencyData.length - 205))
            : Math.floor(Math.random() * 20),
        ref: React.createRef(),
      });
    }
    // assignRandomFrequencyToBalls(tempBoxes, frequencyData);
    return tempBoxes;
  }, [boxCount, frequencyData.length]);
  useFrame(({ clock }) => {
    if (isAudioReady && analyser) {
      const time = clock.getElapsedTime() / cameraSpeed; //Geschwindigkeit der Kamera
      camera.position.z = 40 + Math.sin(time) * initialCameraDepth; // Abstand + Kamerabewegung

      analyser.getByteFrequencyData(frequencyData);

      //Rotation
      if (groupRef.current) {
        groupRef.current.rotation.x += 0.001 * rotationSpeed;
        groupRef.current.rotation.y += 0.002 * rotationSpeed;
        groupRef.current.rotation.z += 0.001 * rotationSpeed;
      }

      boxes.forEach((box) => {
        const rawFrequencyValue = frequencyData[box.frequencyIndex];
        console.log("raw" + rawFrequencyValue);
        const adjustedFrequencyValue = adjustFrequencyValue(rawFrequencyValue); // Angepasster Wert

        const scale = initialSphereSize + (adjustedFrequencyValue / 255) * 3;
        box.ref.current.scale.set(scale, scale, scale);

        // Lerp für Skalierung
        box.ref.current.scale.x = lerp(
          box.ref.current.scale.x,
          scale,
          lerpSpeed
        );
        box.ref.current.scale.y = lerp(
          box.ref.current.scale.y,
          scale,
          lerpSpeed
        );
        box.ref.current.scale.z = lerp(
          box.ref.current.scale.z,
          scale,
          lerpSpeed
        );

        // Lerp für Position

        const movementFactor = (adjustedFrequencyValue / 255) * 2;
        box.ref.current.position.x = lerp(
          box.ref.current.position.x,
          box.originalPosition[0] * (1 + movementFactor),
          lerpSpeed
        );
        box.ref.current.position.y = lerp(
          box.ref.current.position.y,
          box.originalPosition[1] * (1 + movementFactor),
          lerpSpeed
        );
        box.ref.current.position.z = lerp(
          box.ref.current.position.z,
          box.originalPosition[2] * (1 + movementFactor),
          lerpSpeed
        );
      });
    }
  });
  return (
    <>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          height={300} // Stärke des Effekts
        />
        <group ref={groupRef}>
          {boxes.map((box, index) => (
            <mesh key={index} ref={box.ref} position={box.originalPosition}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color={box.color} />
            </mesh>
          ))}
        </group>
      </EffectComposer>
    </>
  );
};

export default Visualizer;
