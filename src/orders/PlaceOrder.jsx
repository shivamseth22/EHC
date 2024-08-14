import React, { useState } from 'react';
import { ethers } from 'ethers';

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
    transactionId: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.testDetails) newErrors.testDetails = 'Test Details are required.';
    if (!formData.totalAmount) newErrors.totalAmount = 'Total Amount is required.';
    if (!formData.transactionId) newErrors.transactionId = 'Transaction ID is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Check for MetaMask
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed.');
      }

      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      // Create a signer
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call the smart contract method
      const txResponse = await contract.placeOrder(
        formData.testDetails,
        ethers.utils.parseUnits(formData.totalAmount, 'ether'),
        formData.transactionId
      );

      console.log('Transaction Response:', txResponse);

      // Wait for the transaction to be mined
      await txResponse.wait();
      console.log('Transaction Confirmed');

      setSuccessMessage('Order successfully placed and transaction confirmed!');
      setFormData({
        testDetails: '',
        totalAmount: '',
        transactionId: '',
      });
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-sm p-6">
        <h1 className="text-lg font-bold text-center mb-4">Order Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="testDetails" className="block text-sm font-medium text-gray-700">Test Details</label>
            <textarea
              name="testDetails"
              id="testDetails"
              placeholder="Enter lab test details"
              value={formData.testDetails}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.testDetails ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.testDetails && <p className="text-red-500 text-sm">{errors.testDetails}</p>}
          </div>
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount (in ETH)</label>
            <input
              type="text"
              name="totalAmount"
              id="totalAmount"
              placeholder="Enter total amount"
              value={formData.totalAmount}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.totalAmount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount}</p>}
          </div>
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              id="transactionId"
              placeholder="Enter the transaction ID after the payment"
              value={formData.transactionId}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.transactionId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId}</p>}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setFormData({
                testDetails: '',
                totalAmount: '',
                transactionId: '',
              })}
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
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default PlaceOrder;
