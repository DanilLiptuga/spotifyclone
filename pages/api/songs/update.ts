import * as fs from "fs";
import {ApiEndpoints} from "../../../helpers/apiEndpoints";
import {ISong} from "../../../models/ISong";
import path from "path";

export default function handler(req: any, res: any) {
    if (req.method === "POST") {
        const jsonDirectory = path.join(process.cwd(), 'public');
        fs.readFile( `${jsonDirectory}/${ApiEndpoints.SONGS}`, 'utf8', function readFileCallback(err, data) {
            if (err) {
                return res.status(405).send({error: err})
            } else {
                const content: ISong[] = JSON.parse(data);
                const indexOfSong = content.findIndex((song) => song.id == req.body.id);
                    content[indexOfSong].listens = +content[indexOfSong].listens + 1;
                fs.writeFile(`${jsonDirectory}/${ApiEndpoints.SONGS}`, JSON.stringify(content), 'utf8', _ => {
                    return res.status(200);
                });
            }
        })
    }
    else return res.status(405).send({error: "This route supports only POST method!"})

}