import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { List } from "./pages/List";

export const ApplicationRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/list" element={<List />} />
    </Routes>
  </BrowserRouter>
);
