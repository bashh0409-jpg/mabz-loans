import React from "react";
import Navbar from "./components/Navbar";
import Cookies from "./components/Cookies";
import Hero from "./components/Hero";
import Requirements from "./components/Requirements";
import Faq from "./components/Faq";
import Contacts from "./components/Contacts";

const Page = () => {
  return (
    <div className="scroll-smooth scrollbar-hide">
      <Navbar />
      <Cookies />
      <Hero />
      <Requirements />
      <Faq />
      <Contacts />
    </div>
  );
};

export default Page;
