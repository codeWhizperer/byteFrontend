"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import {SelectorDataProps} from "../types/index"
function Search() {
  const [selector, setSelector] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SelectorDataProps>()

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSelector(event.target.value);
    setError(""); 
  };


  const searchSelector = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get(`https://bytedirectory.onrender.com/selectors/${selector}`);
      if (response.status === 200) {
        setData(response.data);
        setSelector("");
      } 
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data)
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchSelector();
        }}
      >
        <div className="w-full max-w-xs mx-auto">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputBox"
          >
            Search Selector by name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="inputBox"
            type="text"
            required
            value={selector}
            onChange={changeHandler}
            placeholder="Enter text here"
          />
          <button
            type="submit"
            disabled={loading}
            className="py-2 w-full bg-gray-300 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          {error && (
            <p className="text-red-500 text-xs italic mt-2">{error}</p>
          )}
          {
            !error && !loading && (
              <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selector Information</h2>
      <div className="space-y-3">
      <div className="bg-gray-100 p-4 rounded-lg">
          <span className="font-bold text-gray-700">ID:</span>
          <p className="text-gray-600 break-words">{data?.id}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <span className="font-bold text-gray-700">Function Name:</span>
          <p className="text-gray-600">{data?.function_name}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <span className="font-bold text-gray-700">Felt Selector:</span>
          <p className="text-gray-600 break-words">{data?.felt_selector}</p>
        </div>
       
        <div className="bg-gray-100 p-4 rounded-lg">
          <span className="font-bold text-gray-700">Selector:</span>
          <p className="text-gray-600">{data?.selector}</p>
        </div>
      </div>
    </div>
            )
          }
        </div>
      </form>
    </div>
  );
}

export default Search;
