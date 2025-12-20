import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/Home";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import Login from "./components/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/category-list" element={"Category-List"} />
          <Route path="/create-subcategory" element={"Create Sub-Category"} />
        </Route>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
