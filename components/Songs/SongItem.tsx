import React, {FC, useState} from 'react';
import {ISong} from "../../models/ISong";
import {PlayCircleOutlined, PauseCircleOutlined} from "@ant-design/icons";
import {Button, Card} from "antd";
import classes from './styles/song.module.scss';
import {useStore} from "react-redux";
import {numberFormat} from "../../helpers/numberFormat";
import Link from "next/link";
import {ROUTES} from "../../helpers/routes";
interface SongItemProps{
    song: ISong,
    count: number
}
const SongItem : FC<SongItemProps> = ({song, count}) : JSX.Element => {
    const [active, setActive] = useState(false);

    return (
        <Card className={classes.songWrapper}>
            <Link href={ROUTES.SONGS + `/${song.id}`}>
                <div className={classes.song}>
                    <div className="song__leftSide">
                        <div className="song__id">{count}.</div>
                        <div className="song__title">{song.author} - {song.name}</div>
                    </div>
                    <div className="song__rightSide">
                        <div className={classes.song__listens}><span>Listens:</span>{numberFormat(song.listens)}</div>
                        <div className={classes.song__playbutton} onClick={(e)=>setActive(!active)}>{active ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</div>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default SongItem;