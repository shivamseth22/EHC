import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_transactionId",
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
				"name": "to",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "transactionIds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const CONTRACT_ADDRESS = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';

const Physician = () => {
  const navigate = useNavigate();
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const physicians = [
    { name: 'Dr. Ramesh Patel', fees: ethers.utils.parseUnits('0.00000008', 'ether'), yearsExp: 10, address: '101, A Block, Mumbai' },
    { name: 'Dr. Priya Nair', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 12, address: '202, B Street, Bangalore' },
    { name: 'Dr. Suresh Gupta', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 15, address: '303, C Road, New Delhi' },
    { name: 'Dr. Anjali Sharma', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 8, address: '404, D Lane, Hyderabad' },
    { name: 'Dr. Manoj Desai', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 11, address: '505, E Avenue, Pune' },
    { name: 'Dr. Kavita Verma', fees: ethers.utils.parseUnits('0.00000008', 'ether'), yearsExp: 9, address: '606, F Street, Chennai' },
    { name: 'Dr. Arvind Rao', fees: ethers.utils.parseUnits('0.0000001', 'ether'), yearsExp: 14, address: '707, G Block, Ahmedabad' },
    { name: 'Dr. Sneha Kulkarni', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 7, address: '808, H Road, Kolkata' },
    { name: 'Dr. Rajesh Mehta', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 13, address: '909, I Avenue, Jaipur' },
    { name: 'Dr. Shalini Joshi', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 10, address: '1010, J Lane, Chandigarh' },
    { name: 'Dr. Vivek Singh', fees: ethers.utils.parseUnits('0.000000105', 'ether'), yearsExp: 15, address: '1111, K Street, Lucknow' },
    { name: 'Dr. Neha Shah', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 9, address: '1212, L Road, Bhopal' },
    { name: 'Dr. Ajay Kumar', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 11, address: '1313, M Avenue, Varanasi' },
    { name: 'Dr. Meera Deshmukh', fees: ethers.utils.parseUnits('0.00000008', 'ether'), yearsExp: 8, address: '1414, N Block, Thiruvananthapuram' },
    { name: 'Dr. Anil Saxena', fees: ethers.utils.parseUnits('0.0000001', 'ether'), yearsExp: 12, address: '1515, O Lane, Mysore' },
    { name: 'Dr. Rashmi Reddy', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 10, address: '1616, P Street, Amritsar' },
    { name: 'Dr. Vishal Kapoor', fees: ethers.utils.parseUnits('0.000000105', 'ether'), yearsExp: 14, address: '1717, Q Block, Guwahati' },
    { name: 'Dr. Ritu Jain', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 7, address: '1818, R Avenue, Srinagar' },
    { name: 'Dr. Abhishek Sen', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 9, address: '1919, S Road, Dehradun' },
    { name: 'Dr. Shweta Rao', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 13, address: '2020, T Street, Indore' }
];

  const addPhysician = (physician) => {
    setSelectedPhysician(physician);
  };

  const removePhysician = () => {
    setSelectedPhysician(null);
  };

  const isPhysicianSelected = (name) => {
    return selectedPhysician && selectedPhysician.name === name;
  };

  const recipientAddress = '0x14d61A4Fa152d16678eb6458853418667043Df80'; // Replace with your address

  const handleCheckout = async () => {
    if (!selectedPhysician) {
      alert('Please select a physician before proceeding to checkout.');
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

      // Calculate total cost in wei (only one physician is selected)
      const totalCost = selectedPhysician.fees;

      // Generate a unique transaction ID
      const transactionId = ethers.utils.hexlify(ethers.utils.randomBytes(32));

      // Call the contract method
      const txResponse = await contract.completeTransaction(
        recipientAddress,
        totalCost,
        transactionId
      );
      await txResponse.wait();

      alert('Transaction successful!');

      // Clear selected physician and navigate
      setSelectedPhysician(null);
      navigate('/');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className='flex justify-between items-center mb-2'>
        <h1 className="text-2xl font-bold">List of Physicians</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>
      <div className="mb-4">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!selectedPhysician ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheckout}
          disabled={isProcessing || !selectedPhysician}
        >
          {isProcessing ? 'Processing...' : `Checkout (1 appointment)`}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {physicians.map((doctor, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {ethers.utils.formatUnits(doctor.fees, 'ether')} ETH</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {doctor.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {doctor.address}</p>
            {isPhysicianSelected(doctor.name) ? (
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={removePhysician}
              >
                Cancel Appointment
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => addPhysician(doctor)}
                disabled={!!selectedPhysician} // Disable booking another physician
              >
                Book Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Physician;