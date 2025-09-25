import axios from "axios";
import { useApi } from "./ApiContext";







export const createAxiosInstance = (city) => {
  const { apiKey } = useApi(); 

  return axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
      q: city,
      appid: apiKey,
      units: "metric"
    }
  });
};
