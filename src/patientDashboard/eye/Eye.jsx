import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
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
	}
]

const CONTRACT_ADDRESS = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47';

const Eye = () => {
  const navigate = useNavigate();
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to convert fractional value to rupee format
  const convertToRupees = (value) => {
    // Assuming 1 unit = 100000000 rupees
    return (value * 10000000000).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };



  const eyeSpecialists = [
    { name: 'Dr. Ayesha Khan', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 10, address: '101, G Block, Mumbai' },
    { name: 'Dr. Rahul Sharma', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 12, address: '202, H Street, Delhi' },
    { name: 'Dr. Snehal Patel', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 15, address: '303, I Road, Bangalore' },
    { name: 'Dr. Maya Gupta', fees: ethers.utils.parseUnits('0.00000008', 'ether'), yearsExp: 8, address: '404, J Lane, Chennai' },
    { name: 'Dr. Sameer Verma', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 11, address: '505, K Avenue, Kolkata' },
    { name: 'Dr. Nisha Reddy', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 9, address: '606, L Block, Pune' },
    { name: 'Dr. Pradeep Kumar', fees: ethers.utils.parseUnits('0.0000001', 'ether'), yearsExp: 14, address: '707, M Street, Hyderabad' },
    { name: 'Dr. Rina Patel', fees: ethers.utils.parseUnits('0.000000085', 'ether'), yearsExp: 7, address: '808, N Road, Ahmedabad' },
    { name: 'Dr. Vishal Singh', fees: ethers.utils.parseUnits('0.000000095', 'ether'), yearsExp: 13, address: '909, O Avenue, Jaipur' },
    { name: 'Dr. Ananya Desai', fees: ethers.utils.parseUnits('0.00000009', 'ether'), yearsExp: 10, address: '1010, P Lane, Chandigarh' }
  ];


  const addSpecialist = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const removeSpecialist = () => {
    setSelectedSpecialist(null);
  };

  const isSpecialistSelected = (name) => {
    return selectedSpecialist && selectedSpecialist.name === name;
  };

  const recipientAddress = '0x14d61A4Fa152d16678eb6458853418667043Df80'; // Replace with your address
  const handleCheckout = async () => {
    if (!selectedSpecialist) {
      alert('Please select a specialist before proceeding to checkout.');
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

      // Convert fees from Ether to Wei
      const feeInWei = ethers.utils.parseUnits(selectedSpecialist.fees.toString(), 'ether');

      // Generate a unique transaction ID
      const transactionId = ethers.utils.hexlify(ethers.utils.randomBytes(32));

      // Call the contract method
      const txResponse = await contract.completeTransaction(
        recipientAddress,
        feeInWei,
        transactionId
      );
      await txResponse.wait();

      alert('Transaction successful!');

      // Clear selected specialist and navigate
      setSelectedSpecialist(null);
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
      <div className='flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold">List of Eye Specialists</h1>
        <button
          onClick={() => navigate('/patient-dashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-50">
          Back
        </button>
      </div>

      <div className="mb-4">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!selectedSpecialist ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleCheckout}
          disabled={isProcessing || !selectedSpecialist}
        >
          {isProcessing ? 'Processing...' : `Checkout (1 appointment)`}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eyeSpecialists.map((specialist, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{specialist.name}</h2>
            <p className="text-gray-600 mb-1"><strong>Fees:</strong> {convertToRupees(specialist.fees)}</p>
            <p className="text-gray-600 mb-1"><strong>Years of Experience:</strong> {specialist.yearsExp}</p>
            <p className="text-gray-600 mb-4"><strong>Address:</strong> {specialist.address}</p>
            {isSpecialistSelected(specialist.name) ? (
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={removeSpecialist}
              >
                Cancel Appointment
              </button>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => addSpecialist(specialist)}
                disabled={!!selectedSpecialist} // Disable booking another specialist
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

export default Eye;