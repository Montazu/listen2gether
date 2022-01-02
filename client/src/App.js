import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Host from "./pages/Host";
import Admin from "./pages/Admin";
import User from "./pages/User";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='h/:id' element={<Host />} />
      <Route path='a/:id' element={<Admin />} />
      <Route path='u/:id' element={<User />} />

      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
}
