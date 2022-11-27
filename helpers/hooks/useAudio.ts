import {useEffect, useState} from "react";

const useAudio = (url: string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );
    const changeTime = (time: number) => {
        audio.currentTime = time
    }
    const pause = () => setPlaying(false);
    useEffect(() => {
        audio.volume = volume
    },[volume]);
    useEffect(() => {
        audio.addEventListener('ended', pause);
        audio.addEventListener('loadedmetadata', () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        });
        audio.ontimeupdate = (event: any) => {
            setCurrentTime(event.target.currentTime)
        }
        return () => {
            audio.removeEventListener('ended', pause);
            audio.pause();
        };
    }, []);

    return {playing, toggle, duration, currentTime, changeTime, setVolume};
};
export default useAudio;