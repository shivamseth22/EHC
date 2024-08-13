import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import 'react-toastify/dist/ReactToastify.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import PlaceOrder from "./orders/PlaceOrder";
import LabTest from './labtest/LabTest';
// import LabTestDetailPage from './LabTestDetailPage'; // Assuming you created this earlier

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <PlaceOrder />,
  },
  {
    path: "/lab-test",
    element:<LabTest/> ,
  },
  // {
  //   path: "/lab-tests",
  //   element: <LabTestDetailPage />,
  // },
]);

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  useEffect(() => {
    connectWithMetamask().then(async (res) => {
      console.log(res);
    });
  }, [address]);

  return (
    <div>
      <ConnectWallet />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
