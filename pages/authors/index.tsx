import React from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from "next";
import MainLayout from "../../layouts/MainLayout";
import {useSongsQuery} from "../../API/songs/useSongsQuery";
import {ISong} from "../../models/ISong";
import AuthorList from "../../components/Authors/AuthorList";
export const getServerSideProps: GetServerSideProps = async (context): Promise<GetServerSidePropsResult<any>> => {
    const songs = await useSongsQuery("http://" +context.req.headers.host as string)
    return {
        props: {
            songs: songs.data
        },
    };
};
const Authors: NextPage<{songs: ISong[]}> = ({songs}) => {
    return (
        <MainLayout>
            <div className="pageHeader">
                <h1>Виконавці</h1>

            </div>
            {songs&&<AuthorList songs={songs}/>}
        </MainLayout>
    );
};

export default Authors;
