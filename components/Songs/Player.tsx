import React, {FC} from 'react';
import classes from './styles/player.module.scss'
import PlayPauseBut from "../UI/PlayPauseBut";
import {Slider} from "antd";
import {ISong} from "../../models/ISong";
import {secondsToTime} from "../../helpers/timeFormat";
import {SliderTooltipProps} from "antd/lib/slider";

interface PlayerProps{
    active: boolean,
    toggleActive: () => void,
    song: ISong,
    currentTime: number,
    duration: number,
    setCurrentTime: (value: number) => void,
    setVolume: (value: number) => void;
}
const sliderTooltip : SliderTooltipProps= {
    formatter: value => {
        return <span>{secondsToTime(value as number)}</span>
    }
}
const Player : FC<PlayerProps> = (
    {active,toggleActive, setVolume, setCurrentTime,song,duration,currentTime}) : JSX.Element => {
    const changeTime = (time: number) => setCurrentTime(time);
    const changeVolume = (volume: number) => setVolume(volume/100);
    return (
        <div className={classes.player}>
            <div className={classes.player__info}>
                <div className={classes.player__infoThumb}>
                    <img src={song.thumbnail} alt="image"/>
                </div>
                <div className={classes.player__infoTitle}>
                    <div className="player__name">{song.name}</div>
                    <div className="player__author">{song.author}</div>
                </div>
            </div>
            <div className={classes.player__controls}>
                <div className={classes.player__controlsTopLine}>
                    <PlayPauseBut active={active} onClick={toggleActive}/>
                </div>
                <div className={classes.player__controlsBottomLine}>
                    <span>{secondsToTime(currentTime)}</span>
                    <Slider tooltip={sliderTooltip} min={0} max={duration} defaultValue={0} onChange={changeTime}/>
                    <span>{secondsToTime(duration)}</span>
                </div>
            </div>
            <div className={classes.player__volumeContainer}>
                <div className={classes.player__volume}>
                    <div className={classes.player__volumeTopLine}>
                        Volume:
                    </div>
                    <div className={classes.player__volumeBottomLine}>
                        <span>0</span>
                        <Slider min={0} max={100} defaultValue={50} onChange={changeVolume}/>
                        <span>100</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;