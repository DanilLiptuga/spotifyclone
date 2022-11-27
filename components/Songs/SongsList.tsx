import React, {FC, useEffect, useState} from 'react';
import SongItem from "./SongItem";
import classes from "./styles/songList.module.scss";
import {useSongsQuery} from "../../API/songs/useSongsQuery";
import {ISong} from "../../models/ISong";

type SongsListProps = {
    songs: ISong[];
}
const SongsList : FC<SongsListProps> = ({songs}) : JSX.Element => {

    return (
        <div className={classes.songList}>
            {songs&&songs.map((song, index) => <SongItem key={song.id} song={song} count={index + 1}/>)}
        </div>
    );
};

export default SongsList;