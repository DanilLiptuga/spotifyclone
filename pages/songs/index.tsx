import React, {useState} from 'react';
import {GetServerSideProps, GetServerSidePropsResult, NextPage} from "next";
import MainLayout from "../../layouts/MainLayout";
import SongsList from "../../components/Songs/SongsList";
import {useSongsQuery} from "../../API/songs/useSongsQuery";
import {Input, Select} from "antd";
import {ISong} from "../../models/ISong";

const { Option } = Select;
const options = [
    {
        label: "По популярности",
        value: "popularity"
    },
    {
        label: "По дате публикации",
        value: "date"
    }
]
export const getServerSideProps: GetServerSideProps = async (): Promise<GetServerSidePropsResult<SongProps>> => {
    const songs = await useSongsQuery()
    return {
        props: {
            songs: songs.data
        },
    };
};
const SongsPage: NextPage<{songs: ISong[]}> = ({songs}) => {
    const [filteredSongs, setFilteredSongs] = useState<ISong[]>([...songs].sort((a, b)=>Number(b.listens)-Number(a.listens)));
    const searchSongs = (event: any) => {
        let text = event.target.value;
        const searchedSongs = songs.filter((el) => {
            const name = el.name.toLowerCase();
            text = text.toLowerCase();
            const author = el.author.toLowerCase();
            const id = el.id;
            return name.indexOf(text)!=-1||author.indexOf(text)!=-1||id==text;
        })
        setFilteredSongs(searchedSongs);
    }
    const handleSortChange = (value: string) => {
        let sortedSongs : ISong[] = [];
        switch (value) {
            case "popularity": {
                sortedSongs = [...filteredSongs].sort((a, b)=>Number(b.listens)-Number(a.listens));
                break;
            }
            case "date": {
                sortedSongs = [...filteredSongs].sort((a, b)=>Number(b.id)-Number(a.id));
                break;

            }
        }
        setFilteredSongs(sortedSongs);
    }
    return (
        <MainLayout>
            <div className="pageHeader">
                <h1>Songs catalog</h1>
                <div style={{display: "flex", gap: "12px"}}>
                    <Select defaultValue="popularity" onChange={handleSortChange}>
                        <Option value="popularity">По популярности</Option>
                        <Option value="date">По дате публикации</Option>
                    </Select>
                    <div>
                        <Input placeholder="Search song..." onChange={searchSongs}/>
                    </div>
                </div>
            </div>
            {filteredSongs&&<SongsList songs={filteredSongs}/>}
        </MainLayout>
    );
};

export default SongsPage;
