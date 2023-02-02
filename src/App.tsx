import React, { FC, useState} from 'react';
import { Routes, Route } from "react-router-dom";

import FavorutiesPage from "./pages/Home/FavorutiesPage";
import Navigation from "./components/Navigation";
import Home from "./pages/Home/Home";


const App: FC = () => {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favourites" element={<FavorutiesPage />}/>
      </Routes> 
    </>
  );
}

export default App;
