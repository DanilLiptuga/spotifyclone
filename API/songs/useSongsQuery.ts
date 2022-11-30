import axios from "axios";
import {ApiEndpoints} from "../../helpers/apiEndpoints";

export const useSongsQuery = async (siteUrl: string) => {
    return await axios.get(siteUrl + ApiEndpoints.SONGS);
}