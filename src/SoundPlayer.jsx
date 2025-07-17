import { useState } from 'react';
import './SoundPlayer.css';

export default function SoundPlayer() {
    const soundList = [
        { id: 'ocean', name: 'Ocean', icon: '🌊', file: '/sounds/ocean.mp3' },
        { id: 'forest', name: 'Forest', icon: '🌲', file: '/sounds/forest.mp3' },
        { id: 'fireplace', name: 'Fireplace', icon: '🔥', file: '/sounds/fireplace.mp3' }
    ];

    const [currentSound, setCurrentSound] = useState(null);
    const [volume, setVolume] = useState(0.5);
    const [isVolumeVisible, setIsVolumeVisible] = useState(false);

    const playSound = (sound) => {
        if (currentSound) currentSound.pause();
        const audio = new Audio(sound.file);
        audio.loop = true;
        audio.volume = volume;
        audio.play();
        setCurrentSound(audio);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (currentSound) currentSound.volume = newVolume;
    };

    return (
        <>
            <div className="sound-player">
                <div className="sound-buttons">
                    {soundList.map((sound) => (
                        <button
                            key={sound.id}
                            onClick={() => playSound(sound)}
                            className="sound-btn"
                        >
                            <span className="sound-icon">{sound.icon}</span>
                            {sound.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Volume Trigger Area - Moved outside sound-player */}
            <div
                className="volume-trigger"
                onMouseEnter={() => setIsVolumeVisible(true)}
            />

            {/* Volume Control - Moved outside sound-player */}
            <div
                className={`volume-container ${isVolumeVisible ? 'visible' : ''}`}
                onMouseLeave={() => setIsVolumeVisible(false)}
            >
                <div className="volume-control">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                    />
                    <span className="volume-value">{Math.round(volume * 100)}%</span>
                </div>
            </div>
        </>
    );
}