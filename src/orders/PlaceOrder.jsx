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
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "deliveryAddress",
				"type": "string"
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
		"inputs": [],
		"name": "getOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phoneNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "deliveryAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "transactionId",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct HealthcareOrder.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "deliveryAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "transactionId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_address",
				"type": "string"
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
    productName: '',
    name: '',
    phoneNumber: '',
    address: '',
    transactionId: '',
  });



  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName) newErrors.productName = 'Product Name is required.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
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
        formData.productName,
        formData.name,
        formData.phoneNumber,
        formData.address,
        formData.transactionId
      );

      console.log('Transaction Response:', txResponse);

      // Wait for the transaction to be mined
      await txResponse.wait();
      console.log('Transaction Confirmed');

      setSuccessMessage('Order successfully placed and transaction confirmed!');
      setFormData({
        productName: '',
        name: '',
        phoneNumber: '',
        address: '',
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
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter Product Name"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.productName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Specify your correct address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
                productName: '',
                name: '',
                phoneNumber: '',
                address: '',
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
