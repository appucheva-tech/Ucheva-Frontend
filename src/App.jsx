import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import success from "./features/Unboarding/Pages/Success";
import Success from "./features/Unboarding/Pages/Success";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from './pages/ContactUs'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
