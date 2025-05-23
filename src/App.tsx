import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Loader from "./Components/Loader";
import { useAppSelector } from "./store/hooks";
import { selectApiCallInProgress } from "./store/userSlice";
import { selectProductApiCallInProgress } from "./store/productSlice";
import { DashboardProvider } from "../src/context/DashboardContext";

function App() {
  const userLoading = useAppSelector(selectApiCallInProgress);
  const productLoading = useAppSelector(selectProductApiCallInProgress);

  const isLoading = userLoading || productLoading;

  return (
    <>
      <DashboardProvider>
        {isLoading && (
          <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
            <Loader />
          </div>
        )}
        <RouterProvider router={router} />
      </DashboardProvider>
    </>
  );
}

export default App;
