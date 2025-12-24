import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/pages/Home";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import CategoryList from "./components/dashboard/CategoryList";
import EditCategoryList from "./components/dashboard/EditCategoryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/edit-categorylist/:slug" element={<EditCategoryList />} />
          <Route path="/create-subcategory" element={"Create Sub-Category"} />
        </Route>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
