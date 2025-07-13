import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/ui/Layout";
import Home from "./screens/Home";
import Collection from "./screens/Collection";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="collection" element={<Collection/>} />
      </Route>
    </Routes>
  );
}