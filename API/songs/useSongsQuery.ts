import axios from "axios";
import {ApiEndpoints} from "../../helpers/apiEndpoints";

export const useSongsQuery = async () => {
    return await axios.get(ApiEndpoints.SONGS);
}