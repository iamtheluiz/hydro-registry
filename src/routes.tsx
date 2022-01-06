import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { List } from "./pages/List";
import { NewMarker } from "./pages/NewMarker";

export const ApplicationRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/list" element={<List />} />
      <Route path="/new" element={<NewMarker />} />
    </Routes>
  </BrowserRouter>
);
