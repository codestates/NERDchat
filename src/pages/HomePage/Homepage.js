import React from "react";
import Slide from "../../components/Slide/Slide";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Slide />
      <Hero />
      <Footer />
    </>
  );
};

export default HomePage;
