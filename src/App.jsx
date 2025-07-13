import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/ui/Layout";
import Home from "./screens/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}