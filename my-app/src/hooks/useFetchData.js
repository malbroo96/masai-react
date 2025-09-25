import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchError } from "../store";
import axios from "axios";
import { useApi } from "../ApiContext";

export const useFetchData = (city) => {
  const dispatch = useDispatch();
  const { apiKey } = useApi();

  useEffect(() => {
    if (!city) return; 

    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: { q: city, appid: apiKey, units: "metric" }
          }
        );
        dispatch(fetchSuccess(response.data));
      } catch (error) {
        dispatch(fetchError(error.response?.data?.message || error.message));
      }
    };

    fetchData();
  }, [city, dispatch, apiKey]);
};
