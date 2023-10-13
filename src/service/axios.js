import axios from "axios";

export const BASE_URL = "https://gnews.io/api/v4";
export const TIMEOUT_ERROR_MESSAGE = "There was an unexpected problem, your request is taking too long. Try again later";

export const ONE_MINUTE_IN_MILLISECONDS = 60000;

export default axios.create({
    baseURL: BASE_URL,
    timeout: ONE_MINUTE_IN_MILLISECONDS,
    params: {
        apikey: import.meta.env.VITE_GNEWS_API_KEY,
        lang: "en"
    },
    timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE
});