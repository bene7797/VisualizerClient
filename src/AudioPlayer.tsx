import React, { useRef, useEffect, useState } from "react";

interface AudioPlayerProps {
  setAnalyser: (analyser: AnalyserNode) => void;
  setIsAudioReady: (isAudioReady: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  setAnalyser,
  setIsAudioReady,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createMediaElementSource(audioRef.current);
      const analyser = audioContext.createAnalyser();

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      setAnalyser(analyser);
    }
  }, [audioSrc, setAnalyser]);

  const handlePlay = () => {
    // Setzen Sie den Pfad zur MP3-Datei relativ zum Basis-URL der Webseite
    // Angenommen, die Datei heißt 'meineMusik.mp3'
    setAudioSrc("/musik/Fly.mp3");
    setIsPlaying(true); // Setze isPlaying auf true, wenn das Audio abgespielt wird
  };

  return (
    <div className={`InputAudio`}>
      <button onClick={handlePlay}>Play</button>
      {audioSrc && (
        <audio
          ref={audioRef}
          controls
          src={audioSrc}
          onLoadedData={() => setIsAudioReady(true)}
        ></audio>
      )}
    </div>
  );
};

export default AudioPlayer;
