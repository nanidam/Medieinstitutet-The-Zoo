import AnimalPage from "./src/views/AnimalPage";
import HomePage from "./src/views/HomePage";
import TheZoo from "./src/views/TheZoo";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/zoo",
    element: <TheZoo></TheZoo>,
  },
  {
    path: "/zoo/:query",
    element: <AnimalPage></AnimalPage>,
  },
]);
