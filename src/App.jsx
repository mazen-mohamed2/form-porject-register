import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import Form from "./pages/form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./pages/user/UserTable";
import "./App.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute unprotectedPaths={["/", "/login"]} />}>
            {/* Wrap the /user route within PrivateRoute to make it private */}
            <Route path="/user" element={<UserTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
