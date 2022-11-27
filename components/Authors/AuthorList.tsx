import React, {FC} from 'react';
import {ISong} from "../../models/ISong";
import {Card, Collapse} from "antd";

type AuthorListProps = {
    songs: ISong[]
}
const AuthorList : FC<AuthorListProps> = ({songs}) => {
    const authors = songs.reduce<any>((acc, song) => {
        const index = acc.findIndex((author: any)=>author.name==song.author)
        if(index==-1){
            acc.push({
                name: song.author,
                desc: song.author_description,
                songs: [song.name]
            })
        }
        else acc[index].songs.push(song.name)
        return acc;
    }, [])
    return (
        <div style={{marginTop: "16px"}}>
            <Collapse defaultActiveKey={['0']}>
                {authors.map((author: any, idx: number)=><Collapse.Panel header={author.name} key={idx}>
                    <div>Name: {author.name}</div>
                    <div>Description: {author.desc}</div>
                    <div>Songs: {author.songs.map((el: string)=><strong>{el}, </strong>)}</div>
                </Collapse.Panel>)}

            </Collapse>

        </div>
    );
};

export default AuthorList;