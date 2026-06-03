import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import success from "./features/Unboarding/Pages/Success";
import Success from "./features/Unboarding/Pages/Success";
import Header from "./features/class-teacher/layout/Header/Header";
import Layout from "./features/class-teacher/layout/Layout";
import Overview from "./features/class-teacher/pages/Overview/Overview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Success />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
