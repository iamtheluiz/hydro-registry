import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Map } from "./pages/Map";

export const ApplicationRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  </BrowserRouter>
);
