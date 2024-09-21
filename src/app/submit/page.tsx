// "use client";
// import axios from "axios";
// import React, { useState, ChangeEvent } from "react";

// function Submit() {
//   const [selector, setSelector] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setSelector(event.target.value);
//   };
//   const submitSelector = async () => {
//     setLoading(true);
//     try {
//       let response = await axios.post("http://127.0.0.1:8080/submit", {
//         function_name: selector,
//       });
//      if (response.status === 200){
//       setSelector(response.data)
//      }else{
//       setError(response.config.data)
//      }
    
    
//     } catch (error:any) {
//       console.log(error.response)
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           submitSelector();
//         }}
//       >
//         <div className="w-full max-w-xs mx-auto">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="inputBox"
//           >
//             Submit Selector
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="inputBox"
//             type="text"
//             required={true}
//             value={selector}
//             onChange={changeHandler}
//             placeholder="Enter text here"
//           />
//           <button disabled={loading} className="py-2 w-full bg-gray-300">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Submit;


"use client";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";

function Submit() {
  const [selector, setSelector] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSelector(event.target.value);
    setError(""); 
  };

  const submitSelector = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.post("https://bytedirectory.onrender.com/submit", {
        function_name: selector,
      });

      if (response.status === 200) {
        setSelector(response.data);
        setSelector("")
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error("Error response:", error.response);
      setError(error.response?.data?.message || "An error occurred."); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSelector();
        }}
      >
        <div className="w-full max-w-xs mx-auto">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="inputBox"
          >
            Submit Selector
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
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && (
            <p className="text-red-500 text-xs italic mt-2">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Submit;
