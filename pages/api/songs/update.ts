import * as fs from "fs";
import {ApiEndpoints} from "../../../helpers/apiEndpoints";
import {ISong} from "../../../models/ISong";
import path from "path";

export default function handler(req: any, res: any) {
    if (req.method === "POST") {
        const jsonDirectory = path.join(process.cwd(), 'public');
        fs.readFile(jsonDirectory + "/data/songs/songs.json", 'utf8', function readFileCallback(err, data) {
            if (err) {
                return res.status(405).send({error: err})
            } else {
                const content: ISong[] = JSON.parse(data);
                const indexOfSong = content.findIndex((song) => song.id === req.body.id);
                if (indexOfSong == -1)
                    return res.status(404).send({message: 'Song didn`t found!'});
                else
                    content[indexOfSong].listens = Number(content[indexOfSong].listens) + 1;
                fs.writeFile(jsonDirectory + "/data/songs/songs.json", JSON.stringify(content), 'utf8', err => {
                    if (err) throw err;
                    return res.status(200);
                });
            }
        })
    }
    else return res.status(405).send({error: "This route supports only POST method!"})

}