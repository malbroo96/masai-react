import { useMemo, useCallback } from 'react';
import axios from 'axios';

export const useOptimizedMap = (destination) => {
  const fetchRoute = useCallback(async (currentLocation) => {
    if (!destination || !currentLocation) return null;
    const res = await axios.get('/api/route', { params: { origin: currentLocation, destination } });
    return res.data;
  }, [destination]);

  const fetchPOIs = useMemo(() => {
    return async (location) => {
      const res = await axios.get('/api/pois', { params: { location } });
      return res.data;
    };
  }, []);

  return { fetchRoute, fetchPOIs };
};
