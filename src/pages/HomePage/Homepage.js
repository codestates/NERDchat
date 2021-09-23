import React from "react";
import Slide from "../../components/Slide/Slide";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomePage = () => {
  return (
    <>
      <SearchBar />
      <NavBar />
      <Slide />
      <Hero />
      <Footer />
    </>
  );
};

export default HomePage;
