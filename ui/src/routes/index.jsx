import { Routes, Route } from "react-router";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import Home from "../pages/Home.jsx";
import ThankYou from "../pages/ThankYou.jsx";
import RegistrationError from "../pages/error/RegistrationError.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/greet" element={<ThankYou />} />
      <Route path="/registration-error" element={<RegistrationError />} />      
    </Routes>
  )
}

export default AppRouter;
