import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Loader from "./Components/Loader";
import { useAppSelector } from "./store/hooks";
import { selectApiCallInProgress } from "./store/userSlice";

function App() {
  const isLoading = useAppSelector(selectApiCallInProgress);
  return (
    <>
      {isLoading && (
        <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
          <Loader />
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
