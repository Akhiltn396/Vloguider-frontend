import logo from "./logo.svg";
import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Drag from "./components/Drag/Drag";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Feature from "./pages/Feature/Feature";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();
  let persistor = persistStore(store);
  const { user, error, loading, message } = useSelector((state) => state.auth);

  console.log(user);

  const Layout = () => {
    return (
      <div className="app">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
            <Footer />
          </PersistGate>
        </Provider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/feature",
          element: (
            <ProtectedRoutes isAuthenticated={user}>
              <Feature />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/drag",
          element: <Drag />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path:"*",
    //   element: <Login/>
    // }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
