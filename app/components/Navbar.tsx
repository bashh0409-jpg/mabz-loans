import React from "react";

const Navbar = () => {
  return (
    <div className="flex p-4 z-100 text-white fixed mix-blend-difference w-full justify-between items-center text-md font-semibold uppercase tracking-tight">
      <div>
        <span>Mabz Loans</span>
      </div>

      <div className="md:flex hidden gap-3">
        {/* mailto: scheme is required, otherwise the browser resolves the value as a relative path */}
        <a href="">Info</a>
        <a href="">Faq</a>
        <a href="">Contact</a>
        <a href="">Apply</a>
      </div>

      <button className="flex md:hidden uppercase">Menu</button>
    </div>
  );
};

export default Navbar;
