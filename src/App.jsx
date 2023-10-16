import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomePage from "./Components/Homepage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/reset.scss";
import { callFetchAccount } from "./services.js/api";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAccountAction,
  doGetAccountPending,
  doGetAccountError,
} from "./redux/account/accountSlice";
import NotFound from "./Components/NotFound";
import Loading from "./Components/Loading";
import AdminPage from "./Components/AdminControl/AdminPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import LayoutAdmin from "./Components/AdminControl/LayoutAdmin";
// import ManagerProducts from "./Components/admin/ManagerProducts";
import CreateProduct from "./Components/AdminControl/CreateProduct";
import ManagerProducts from "./Components/AdminControl/ManagerProducts";
import ScrollToTop from "./Components/ScrollToTop";
import DetailProduct from "./Components/DetailProduct";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import "./App.scss";

//LAYOUT MAIN
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  // console.log("isAuthenticated - App>> ", isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/product/:slug",
          element: <DetailProduct />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "/category/:slug",
          element: <Category />,
        },

        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/products",
          element: (
            <ProtectedRoute>
              <ManagerProducts />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  //FETCH ACCOUNT TO AUTHENTICATED
  useEffect(() => {
    console.log("isLoadingEF>> ", isLoading);
    const getAccount = async () => {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        return;
      }

      const res = await callFetchAccount();
      console.log("res>>> ", res);
      dispatch(doGetAccountPending());
      console.log("loading1>>> ", isLoading);
      if (res && res.data) {
        dispatch(doGetAccountAction(res.data));
        console.log("loading2>>> ", isLoading);
      } else {
        console.log("KO AUTHEN");
        dispatch(doGetAccountError());
      }
    };
    getAccount();
  }, []);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        // window.location.pathname === "/" ||
        // window.location.pathname === "/category" ||
        // window.location.pathname === "/cart"
        // window.location.pathname === "/:slug"
        <>
          <RouterProvider router={router} />
        </>
      ) : (
        //  window.location.pathname.startsWith("/admin")
        //BUG => Khi không đăng nhập và muốn truy cập vào trang ADMIN sẽ bị chuyển về trang login để đăng nhập
        // Cần tìm cách chuyển ..... chưa nghĩ ra nên để tạm laptopPage

        // <LaptopPage />
        <>
          {console.log("RUN")}
          <Loading />
        </>
      )}
    </>
  );
}
