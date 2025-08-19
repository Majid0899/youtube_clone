import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Loading from "./components/Loading.jsx";

const LogIn = lazy(() => import("./components/LogIn.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const SignUp = lazy(() => import("./components/SignUp.jsx"));
const ChannelPage = lazy(() => import("./components/ChannelPage.jsx"));
const MyChannel = lazy(() => import("./components/MyChannel.jsx"));
const WatchVideo = lazy(() => import("./components/WatchVideo.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Loading />}>
            <LogIn />
          </Suspense>
        ),
      },
      {
        path: "/createChannel",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateChannel />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ChannelPage />
          </Suspense>
        ),
      },
      {
        path: "/myChannel/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <MyChannel />
          </Suspense>
        ),
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <WatchVideo />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
