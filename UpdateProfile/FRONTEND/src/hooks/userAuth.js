
import { useEffect, useState } from "react";
import { api } from "../api/axiosInstance"; // withCredentials: true

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/v1/User");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, loading };
};
