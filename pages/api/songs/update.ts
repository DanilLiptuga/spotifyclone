import * as fs from "fs";
import {ApiEndpoints} from "../../../helpers/apiEndpoints";
import {ISong} from "../../../models/ISong";
import path from "path";

export default function handler(req: any, res: any) {
    if (req.method === "POST") {
        const jsonDirectory = path.join(process.cwd(), 'public');
        fs.readFile(jsonDirectory + ApiEndpoints.SONGS, 'utf8', function readFileCallback(err, data) {
            if (err) {
                res.status(405).send({error: err})
            } else {
                const content: ISong[] = JSON.parse(data);
                const indexOfSong = content.findIndex((song) => song.id === req.body.id);
                if (indexOfSong == -1)
                    res.status(404).send({message: 'Song didn`t found!'});
                else
                    content[indexOfSong] = {...content[indexOfSong], listens: Number(content[indexOfSong].listens) + 1};
                fs.writeFile(jsonDirectory + ApiEndpoints.SONGS, JSON.stringify(content), 'utf8', err => {
                    if (err) throw err;
                    res.status(200).json(JSON.stringify(content));
                });
            }
        })
    }
    else res.status(405).send({error: "This route supports only POST method!"})

}
