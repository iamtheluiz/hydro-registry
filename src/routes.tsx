import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { List } from "./pages/List";
import { NewMarker } from "./pages/NewMarker";
import { EditMarker } from "./pages/EditMarker";

export const ApplicationRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/list" element={<List />} />
      <Route path="/new" element={<NewMarker />} />
      <Route path="/edit/:id" element={<EditMarker />} />
    </Routes>
  </BrowserRouter>
);
