
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "transactionId",
        "type": "bytes32"
      }
    ],
    "name": "completeTransaction",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "transactionId",
        "type": "bytes32"
      }
    ],
    "name": "TransactionCompleted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const CONTRACT_ADDRESS = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';

const LabTest = () => {
  const navigate = useNavigate();

  const [selectedTests, setSelectedTests] = useState(() => {
    // const savedTests = localStorage.getItem('selectedTests');
    return savedTests ? JSON.parse(savedTests) : [];
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const labTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', cost: 0.000001 },
    { id: 2, name: 'Liver Function Test (LFT)', cost: 0.000001 },
    { id: 3, name: 'Kidney Function Test (KFT)', cost: 0.000001 },
    { id: 4, name: 'Lipid Profile', cost: 0.000001 },
    { id: 5, name: 'Thyroid Profile', cost: 0.000001 },
    { id: 6, name: 'Blood Glucose Fasting', cost: 0.000001 },
    { id: 7, name: 'Urine Routine Examination', cost: 0.000001 },
    { id: 8, name: 'Vitamin D Test', cost: 0.000001 },
    { id: 9, name: 'Electrolyte Panel', cost: 0.000001 },
    { id: 10, name: 'Prostate-Specific Antigen (PSA)', cost: 0.000001 },
    { id: 11, name: 'Blood Urea Nitrogen (BUN)', cost: 0.000001 },
    { id: 12, name: 'Hemoglobin A1c (HbA1c)', cost: 0.000001 },
    { id: 13, name: 'C-Reactive Protein (CRP)', cost: 0.000001 },
    { id: 14, name: 'Calcium Test', cost: 0.000001 },
    { id: 15, name: 'Complete Metabolic Panel (CMP)', cost: 0.000001 },
    { id: 16, name: 'Ferritin Test', cost: 0.000001 },
    { id: 17, name: 'Magnesium Test', cost: 0.000001 },
    { id: 18, name: 'Blood Gas Test', cost: 0.000001 },
    { id: 19, name: 'Creatinine Test', cost: 0.000001 },
    { id: 20, name: 'D-Dimer Test', cost: 0.000001 },
  ];
  const addTest = (test) => {
    const updatedTests = [...selectedTests, test];
    setSelectedTests(updatedTests);
    localStorage.setItem('selectedTests', JSON.stringify(updatedTests));
    console.log('Selected Tests after adding:', updatedTests);
  };

  const removeTest = (id) => {
    const updatedTests = selectedTests.filter(test => test.id !== id);
    setSelectedTests(updatedTests);
    localStorage.setItem('selectedTests', JSON.stringify(updatedTests));
    console.log('Selected Tests after removing:', updatedTests);
  };

  const isTestSelected = (id) => {
    return selectedTests.some(test => test.id === id);
  };

  const handleCheckout = async () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test before proceeding to checkout.');
      return;
    }

    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask to proceed.');
      return;
    }

    setIsProcessing(true);

    try {
      // Connect to MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Calculate total cost
      const totalCost = selectedTests.reduce((total, test) => total.add(ethers.utils.parseEther(test.cost.toString())), ethers.BigNumber.from(0));

      // Transaction ID (this can be any unique value, for example, a timestamp or UUID)
      const transactionId = ethers.utils.formatBytes32String(Date.now().toString());

      // Send the transaction
      const transaction = await contract.completeTransaction(signer.getAddress(), totalCost, transactionId, { value: totalCost });
      await transaction.wait();

      console.log('Transaction successful:', transaction);

      // Navigate to the confirmation page or another action
      navigate('/confirmation', { state: { transactionId: transaction.hash } });
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate('/')}
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Checkout (${selectedTests.length} tests)`}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Lab Tests</h1>

        <ul className="space-y-4">
          {labTests.map((test) => (
            <li key={test.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{test.name}</span>
                <span className="text-blue-500">{test.cost}</span>
              </div>
              <div className="flex justify-end space-x-2">
                {!isTestSelected(test.id) ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => addTest(test)}
                    disabled={isProcessing}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeTest(test.id)}
                    disabled={isProcessing}
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LabTest;
