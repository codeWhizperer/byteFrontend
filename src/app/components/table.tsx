// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelectors } from "../hook";

// function Table() {
//   const { data, error, loading } = useSelectors();
//   console.log(data);
//   return (
//     <>
//       <div>{loading && <p>Loading.....</p>}</div>
//       <div>{error && <p>{error}</p>}</div>
//       {!loading && (
//         <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 ID
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 FUNCTION NAME
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 BYTES SIGNATURE
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, key) => (
//               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                 <td className="px-6 py-4">{item?.id}</td>
//                 <td className="px-6 py-4">{item?.function_name}</td>
//                 <td className="px-6 py-4">{item?.selector}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// }

// export default Table;

"use client";
import React, { useEffect, useState } from "react";
import { useSelectors } from "../hook";

function Table() {
  const { data, error, loading } = useSelectors();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Adjust this to the number of items you want per page

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current items based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>{loading && <p>Loading.....</p>}</div>
      <div>{error && <p>{error}</p>}</div>
      {!loading && (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  FUNCTION NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  BYTES SIGNATURE
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, key) => (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.id}</td>
                  <td className="px-6 py-4">{item?.function_name}</td>
                  <td className="px-6 py-4">{item?.selector}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 border rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Table;

