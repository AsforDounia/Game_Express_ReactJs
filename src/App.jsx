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


function App() {
  return (
    <Router>
      <AuthProvider>
      <DashboardProvider>
      <ProductProvider>
        <SubCategoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<AuthRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route
                  element={
                    <ProtectedRoute roles={["product_manager", "super_admin"]} />
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="productdetails/:id" element={<ProductDetails />} />
                  <Route path="editproduct/:id" element={<EditProduct />} />
                  <Route path="addproduct" element={<AddProduct />} />
                  <Route path="products-management" element={<div>Products Management</div>} />
            </Route>
            
            {/* <Route
              element={
                <ProtectedRoute roles={["product_manager", "super_admin"]} />
              }
            >
              <Route
                    path="dashboard"
                    element={
                      <DashboardProvider>
                        <Dashboard />
                      </DashboardProvider>
                    }
              />
            </Route>
            <Route
              element={
                <ProtectedRoute roles={["product_manager", "super_admin"]} />
              }
            >
            <Route
                    path="products"
                    element={
                      <ProductProvider>
                        <ProductList />
                      </ProductProvider>
                    }
              />
            </Route>

            <Route element={<ProtectedRoute roles={["super_admin"]} />}>
              <Route
                path="categories"
                element={<div>Categories Management</div>}
              />
            </Route>

            <Route
              element={
                <ProtectedRoute roles={["product_manager", "super_admin"]} />
              }
            >
              <Route path="products" element={<div>Products Management</div>} />
            </Route> */}
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
        </SubCategoryProvider>
      </ProductProvider>
      </DashboardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
