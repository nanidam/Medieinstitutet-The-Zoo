import { RouterProvider } from "react-router-dom";
import { router } from "../Router";
import "./App.css";
// import zooLogo from "./assets/zooLogo.svg";

export const App: React.FC = () => {
  return (
    <>
      <img
        className="zoo-logo"
        src="../src/assets/zooLogo.svg"
        alt="The Zoo Logo"
      ></img>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
