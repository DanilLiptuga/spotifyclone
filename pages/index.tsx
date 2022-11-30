import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from "next";
import MainLayout from "../layouts/MainLayout";
import SongsList from "../components/Songs/SongsList";
import {useSongsQuery} from "../API/songs/useSongsQuery";
import {ISong} from "../models/ISong";

export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<{songs: ISong[]}>> => {
    const {data: songs} = await useSongsQuery(context.req.headers.referer as string)
    return {
        props: {
            songs
        },
    };
};
const Home: NextPage<{ songs: ISong[] }> = ({songs} ) => {
    return (
        <MainLayout>
            <div className="pageHeader">
                <h1>Нещодавні</h1>
            </div>
            {songs&&<SongsList songs={songs}/>}
        </MainLayout>
    );
};

export default Home;
