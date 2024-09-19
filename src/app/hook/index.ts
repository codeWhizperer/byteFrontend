import axios from "axios";
import { useState, useEffect } from "react";
import {ISelector} from "../types/index"

export const useSelectors = () => {
  const [data, setData] = useState<ISelector[]>([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const fetchData = async () => {
    try {
      const response = await axios.get("https://bytedirectory.onrender.com/selectors");
      if (!response.status) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.data;
      setData(result?.data);
    } catch (err:any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);  

  return {
    data,    
    loading, 
    error    
  };
};
