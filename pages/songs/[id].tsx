import React, {useState} from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from "next";
import MainLayout from "../../layouts/MainLayout";
import {useSongsQuery} from "../../API/songs/useSongsQuery";
import dynamic from "next/dynamic";
import {ISong} from "../../models/ISong";

const SongPageContent = dynamic(
    () => import("../../components/Songs/SongPage"), {ssr: false}
)

interface SongProps{
    initialSong: ISong,
}
export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<SongProps>> => {
    const songs = await useSongsQuery()
    const song = songs.data[context.params.id - 1]
    return {
        props: {
            initialSong: song
        },
    };
};
const SongPage : NextPage<SongProps> = ({initialSong}) : JSX.Element => {
    const [song, setSong] = useState<any>(initialSong);

    return (
        <MainLayout>
            {song&&<SongPageContent song={song} setSong={setSong}/>}
        </MainLayout>
    );
};

export default SongPage;