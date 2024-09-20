import React from "react";

function Nav() {
  const routes = [
    {
      name: "Function Selector",
      page: "/",
    },
    {
      name: "Submit Selector",
      page: "/submit",
    },
    {
      name: "Search Selector",
      page: "#",
    },
  ];
  return (
    <header className="flex space-x-4 bg-slate-100 p-2">
      <div>
        <p className="font-bold font-[800]">BYTEDIRECTORY</p>
      </div>
      <nav>
        <ul className="flex justify-between space-x-12 ">

          {routes.map((route, key) => (
            <li key={key} className="hover:text-slate-300">
              <a href={route.page}>{route.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
