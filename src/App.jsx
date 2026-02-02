import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./components/pages/Home";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import CategoryList from "./components/dashboard/CategoryList";
import EditCategoryList from "./components/dashboard/EditCategoryList";
import SubCategory from "./components/dashboard/SubCategory/SubCategory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SubCategoryList from "./components/dashboard/SubCategory/SubCategoryList";
import CreateBrand from "./components/dashboard/Brand/CreateBrand";
import BrandList from "./components/dashboard/Brand/BrandList";
import EditBrand from "./components/dashboard/Brand/EditBrand";
import CreateSingleVariant from "./components/dashboard/SingleVariantProduct/CreateSingleVariant";
import SingleVariantList from "./components/dashboard/SingleVariantProduct/SingleVariantList";
import CreateMultipleVariant from "./components/dashboard/MultipleVariantProduct/CreateMultipleVariant";
import MultipleVariantList from "./components/dashboard/MultipleVariantProduct/MultipleVariantList";
import SingleVariantDetails from "./components/dashboard/SingleVariantProduct/SingleVariantDetails";
import DashboardHome from "./components/pages/DashboardHome";
import EditSingleVariant from "./components/dashboard/SingleVariantProduct/EditSingleVariant";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<DashboardHome />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route
              path="/edit-categorylist/:slug"
              element={<EditCategoryList />}
            />
            <Route path="/create-subcategory" element={<SubCategory />} />
            <Route path="/subcategory-list" element={<SubCategoryList />} />
            <Route path="/create-brand" element={<CreateBrand />} />
            <Route path="/brand-list" element={<BrandList />} />
            <Route path="/edit-brand/:slug" element={<EditBrand />} />
            <Route
              path="/create-single-variant"
              element={<CreateSingleVariant />}
            />
            <Route
              path="/single-variant-list"
              element={<SingleVariantList />}
            />
            <Route
              path="/single-variant-details/:slug"
              element={<SingleVariantDetails />}
            />
            <Route
              path="/create-variant-multiple"
              element={<CreateMultipleVariant />}
            />
            <Route
              path="/multiple-variant-list"
              element={<MultipleVariantList />}
            />

            <Route
              path="/edit-single-variant/:slug"
              element={<EditSingleVariant />}
            />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
