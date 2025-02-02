import { Routes, Route } from "react-router";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import Home from "../pages/Home.jsx";
import ThankYou from "../pages/ThankYou.jsx";
import RegistrationError from "../pages/error/RegistrationError.jsx";
import LoginFailed from "../pages/error/LoginFailed.jsx";
import PageNotFound from "../pages/error/PageNotFound.jsx";
import RequireAuth from "../pages/auth/RequireAuth.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/greet" element={<RequireAuth />}>
        <Route index element={<ThankYou />} />
      </Route>
      <Route path="/registration-error" element={<RegistrationError />} />
      <Route path="/login-error" element={<LoginFailed />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
