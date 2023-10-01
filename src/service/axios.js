import axios from "axios";

const baseURL = "https://gnews.io/api/v4";

const ONE_MINUTE_IN_MILLISECONDS = 60000;

const api = axios.create({
    baseURL,
    timeout: ONE_MINUTE_IN_MILLISECONDS,
    params: {
        apikey: import.meta.env.VITE_GNEWS_API_KEY,
        lang: "en"
    },
    timeoutErrorMessage: "There was an unexpected problem, your request is taking too long. Try again later"
});

export default api;