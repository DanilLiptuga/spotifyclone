import React, {FC, useEffect, useRef, useState} from 'react';
import {ISong} from "../../models/ISong";
import useAudio from "../../helpers/hooks/useAudio";
import classes from "/styles/SongPage.module.scss";
import PlayPauseBut from "../UI/PlayPauseBut";
import {numberFormat} from "../../helpers/numberFormat";
import Player from "./Player";
import {useUpdateListensMutation} from "../../API/songs/useUpdateListens.mutation";
type SongPageProps = {
    song: ISong;
    setSong: (song: ISong) => void;
}
const SongPage : FC<SongPageProps> = ({song, setSong}) => {
    const {playing, toggle, duration, currentTime, changeTime, setVolume} = useAudio(song?.audio_path??"");
    const listensUpdated = useRef<boolean>(false);
    useEffect(()=>{
        if (playing && !listensUpdated.current){
            useUpdateListensMutation(song.id);
            setSong({...song, listens: Number(song.listens)+1})
            listensUpdated.current = true;
        }
    }, [playing])
    return (
        <div>
                <div className={classes.song}>
                    <div className={classes.song__header}>
                        <div className={classes.song__thumbnail}>
                            <img src={song.thumbnail}/>
                            <PlayPauseBut active={playing} onClick={toggle} additionalClass={classes.song__playbut}/>
                        </div>
                        <div className={classes.song__info}>
                            <div>
                                <div className={classes.song__name}>{song.name}</div>
                                <div className={classes.song__listens}>{numberFormat(song.listens)} listens</div>
                            </div>
                            <div className="song__author">{song.author}</div>

                        </div>
                    </div>
                    <div className={classes.song__desc}>
                        <pre>
                            {song.description}
                        </pre>
                    </div>
                </div>
                <Player active={playing}  toggleActive={toggle} setCurrentTime={changeTime} song={song} currentTime={currentTime} duration={duration} setVolume={setVolume}/>
        </div>
    );
};

export default SongPage;