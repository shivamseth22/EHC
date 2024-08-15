import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import 'react-toastify/dist/ReactToastify.css';
import { ConnectWallet } from "@thirdweb-dev/react";
import PlaceOrder from "./orders/PlaceOrder";
import LabTest from './labtest/LabTest';
import Medicine from './medicine/Medicine';
import PatientDashboard from './patientDashboard/PatientDashboard';
import Dentist from './patientDashboard/dentist/Dentist';
import Diet from './patientDashboard/diet/Diet';
import Physician from './patientDashboard/physician/Physician';
import Cardio from './patientDashboard/cardio/Cardio';
import Sergon from './patientDashboard/sergon/Sergon';
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
  {
    path: "/medicine",
    element: <Medicine/>,
  },
  {
    path: "/patient-dashboard",
    element: <PatientDashboard/>,
  },
  {
    path: "/dentist-list",
    element: <Dentist/>,
  },
  {
    path: "/cardio-list",
    element: <Cardio/>,
  },
  {
    path: "/physician-list",
    element: <Physician/>,
  },
  {
    path: "/diet-list",
    element: <Diet/>,
  },
  {
    path: "/sergon-list",
    element: <Sergon/>,
  },
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
