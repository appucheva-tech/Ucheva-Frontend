// import SignUp from "./features/auth/SignUp";
// import Login from "./features/auth/Login";
// import VerifyEmail from "./features/auth/VerifyEmail";
// import ForgetPassword from "./features/auth/ForgetPassword";
// import InputCode from "./features/auth/InputCode";
// import ResetPassword from "./features/auth/ResetPassword";
// import Home from "./pages/Home";
// import Pricing from "./pages/Pricing";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
// import MyClass from "./features/class-teacher/pages/MyClass/MyClass";
// import Score from "./features/class-teacher/pages/Scores/Score";
// import CTreport from "./features/class-teacher/pages/CTreport/CTreport";
// import Dashboard from "./features/ParentDashboard/Pages/DashboardPages";
// import PaymentPage from "./features/ParentDashboard/Pages/PaymentPage";
// import SettingsPage from "./features/ParentDashboard/Pages/SettingsPage";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Pricing" element={<Pricing />} />
//         <Route path="/AboutUs" element={<AboutUs />} />
//         <Route path="/ContactUs" element={<ContactUs />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verifyEmail" element={<VerifyEmail />} />
//         <Route path="/forgetpassword" element={<ForgetPassword />} />
//         <Route path="/inputCode" element={<InputCode />} />
//         <Route path="/resetpassword" element={<ResetPassword />} />
//         <Route path="/step1" element={<Step1 />} />
//         <Route path="/step2" element={<Step2 />} />
//         <Route path="/step3" element={<Step3 />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/dashboard" element={<Layout />}>
//           <Route index element={<Overview />} />
//           <Route path="myclass" element={<MyClass />} />
//           <Route path="score" element={<Score />} />
//           <Route path="reportcard" element={<CTreport />} />
//         </Route>
//         <Route path="/parentdashboard" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="payment" element={<PaymentPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step1 from "./features/Unboarding/Pages/Step1";
import Step2 from "./features/Unboarding/Pages/Step2";
import Step3 from "./features/Unboarding/Pages/Step3";
import Success from "./features/Unboarding/Pages/Success";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
          <Route path="/success" element={<Success />} />
           <Route path="/" element={<Home />} />
           <Route path="/Pricing" element={<Pricing />} />
         <Route path="/AboutUs" element={<AboutUs />} />
   <Route path="/ContactUs" element={<ContactUs />} />

        </Routes>
      </BrowserRouter>
  );
};

export default App;