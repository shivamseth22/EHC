import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';

// Replace these with your contract's ABI and deployed address
const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "testDetails",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "transactionId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "OrderPlaced",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_testDetails",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_totalAmount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_transactionId",
        "type": "string"
      }
    ],
    "name": "placeOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const CONTRACT_ADDRESS = '0xd9145CCE52D386f254917e481eB44e9943F39138';


const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    testDetails: '',
    totalAmount: '',
    transactionId: uuidv4(), // Generate a random transaction ID
  });

  const [selectedTests, setSelectedTests] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedTests = localStorage?.getItem('selectedTests');
    if (savedTests) {
      const parsedTests = JSON.parse(savedTests);
      setSelectedTests(parsedTests);

      const total = parsedTests.reduce((acc, test) => acc + test.cost, 0);
      setTotalAmount(total.toFixed(6));

      const testDetails = parsedTests.map(test => `${test.name}: ${test.cost} ETH`).join(', ');

      setFormData(prevState => ({
        ...prevState,
        testDetails: testDetails,
        totalAmount: total.toFixed(6),
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.transactionId) {
      valid = false;
      errors.transactionId = "Transaction ID is required";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed.');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const txResponse = await contract.placeOrder(
        formData.testDetails,
        ethers.utils.parseUnits(formData.totalAmount, 'ether'),
        formData.transactionId
      );

      await txResponse.wait();
      setSuccessMessage('Order successfully placed and transaction confirmed!');
      setFormData({
        testDetails: '',
        totalAmount: '',
        transactionId: uuidv4(), // Generate a new random transaction ID for the next order
      });
    } catch (error) {
      console.log(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate()

  return (
    <>

    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center p-4">

      <div className="bg-white shadow-md rounded-lg w-full max-w-sm p-6">
        <h1 className="text-lg font-bold text-center mb-4">Order Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="testDetails" className="block text-sm font-medium text-gray-700">Test Details</label>
            <textarea
              name="testDetails"
              id="testDetails"
              placeholder='Details'
              value={formData.testDetails} // Display the test details
              readOnly // Set the field to read-only
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount (in ETH)</label>
            <input
              type="text"
              name="totalAmount"
              id="totalAmount"
              placeholder='Total Amount'
              value={formData.totalAmount} // Display the calculated total amount
              readOnly // Set the field to read-only
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              id="transactionId"
              readOnly
              placeholder="Transaction of the payment"
              value={formData.transactionId}
              onChange={handleChange} // Handle input change
              className={`w-full p-2 border cursor-not-allowed  bg-gray-100 ${errors.transactionId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() =>{
                navigate('/lab-test')
               setFormData({
                testDetails: '',
                totalAmount: '',
                transactionId: '',
              })}}

              className="bg-orange-400 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Order Confirmed'}
            </button>
          </div>
        </form>
        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      </div>
    </div>
    </>
  );
};

export default PlaceOrder;
