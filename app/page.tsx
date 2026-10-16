import React from "react";
import Hero from "./components/Hero";
import Requirements from "./components/Requirements";
import Faq from "./components/Faq";
import Contacts from "./components/Contacts";
import NewHero from "./components/NewHero";

const Page = () => {
  return (
    <div className="scroll-smooth scrollbar-hide">
      
     
      <Hero />
      <Requirements />
      <Faq />
      <Contacts />
    </div>
  );
};

export default Page;
