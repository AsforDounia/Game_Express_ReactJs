import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthRoute from "./Components/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./Components/Layout";
import { DashboardProvider } from "./context/DashboardContext";
import ProductList from "./pages/ProductList";
import { ProductProvider } from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { SubCategoryProvider } from "./context/SubCategoryContext";
import { CategoryProvider } from "./context/CategoryContext";
import CategotiesList from "./pages/CategotiesList";
import EditCategory from "./pages/EditCategory";
import CategoryDetails from "./pages/CategoryDetails";


function App() {
  return (
    <Router>
      <AuthProvider>
        <CategoryProvider>
          <SubCategoryProvider>
            <DashboardProvider>
              <ProductProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    {/* Public Routes */}
                    <Route index element={<Home />} />
                    <Route element={<AuthRoute />}>
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="unauthorized" element={<Unauthorized />} />

                    {/* Protected Routes */}
                      <Route path="products" element={<ProductList />} />
                      <Route path="productdetails/:id" element={<ProductDetails />} />
                    <Route element={<ProtectedRoute roles={["product_manager", "super_admin"]} />}>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="editproduct/:id" element={<EditProduct />} />
                      <Route path="addproduct" element={<AddProduct />} />
                      <Route path="categories" element={<CategotiesList />} />
                      <Route path="categorydetails/:id" element={<CategoryDetails />} />
                      <Route path="editcategory/:id" element={<EditCategory />} />
                    </Route>

                    {/* 404 Route */}
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                  </Route>
                </Routes>
              </ProductProvider>
            </DashboardProvider>
          </SubCategoryProvider>
        </CategoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;