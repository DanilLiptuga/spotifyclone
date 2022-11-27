import axios from "axios";
import {ApiEndpoints} from "../../helpers/apiEndpoints";

export const useUpdateListensMutation = async (id: number) => {
    await axios.post(ApiEndpoints.SONGS_UPDATE, {id});
}