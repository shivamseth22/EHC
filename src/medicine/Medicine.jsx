import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address payable", "name": "_to", "type": "address" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
      { "internalType": "string", "name": "_transactionId", "type": "string" }
    ],
    "name": "completeTransaction",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';

const Medicine = () => {
  const navigate = useNavigate();
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const medicines = [
    { id: 1, name: 'Paracetamol', cost: ethers.utils.parseUnits('0.000000001', 'ether') },
    { id: 2, name: 'Amoxicillin', cost: ethers.utils.parseUnits('0.000000001', 'ether') },
    { id: 3, name: 'Ibuprofen', cost: ethers.utils.parseUnits('0.000000002', 'ether') },
    { id: 4, name: 'Aspirin', cost: ethers.utils.parseUnits('0.0000000015', 'ether') },
    { id: 5, name: 'Ciprofloxacin', cost: ethers.utils.parseUnits('0.0000000025', 'ether') },
    { id: 6, name: 'Metformin', cost: ethers.utils.parseUnits('0.000000003', 'ether') },
    { id: 7, name: 'Atorvastatin', cost: ethers.utils.parseUnits('0.0000000018', 'ether') },
    { id: 8, name: 'Omeprazole', cost: ethers.utils.parseUnits('0.0000000022', 'ether') },
    { id: 9, name: 'Amlodipine', cost: ethers.utils.parseUnits('0.0000000012', 'ether') },
    { id: 10, name: 'Losartan', cost: ethers.utils.parseUnits('0.0000000028', 'ether') },
    { id: 11, name: 'Simvastatin', cost: ethers.utils.parseUnits('0.0000000021', 'ether') },
    { id: 12, name: 'Gabapentin', cost: ethers.utils.parseUnits('0.0000000026', 'ether') },
    { id: 13, name: 'Lisinopril', cost: ethers.utils.parseUnits('0.0000000017', 'ether') },
    { id: 14, name: 'Hydrochlorothiazide', cost: ethers.utils.parseUnits('0.0000000024', 'ether') },
    { id: 15, name: 'Metoprolol', cost: ethers.utils.parseUnits('0.0000000019', 'ether') },
    { id: 16, name: 'Alprazolam', cost: ethers.utils.parseUnits('0.0000000023', 'ether') },
    { id: 17, name: 'Azithromycin', cost: ethers.utils.parseUnits('0.0000000032', 'ether') },
    { id: 18, name: 'Cetirizine', cost: ethers.utils.parseUnits('0.0000000011', 'ether') },
    { id: 19, name: 'Clindamycin', cost: ethers.utils.parseUnits('0.0000000029', 'ether') },
    { id: 20, name: 'Warfarin', cost: ethers.utils.parseUnits('0.0000000031', 'ether') }
];


  const addMedicine = (medicine) => {
    setSelectedMedicines([...selectedMedicines, medicine]);
  };

  const removeMedicine = (id) => {
    setSelectedMedicines(selectedMedicines.filter(medicine => medicine.id !== id));
  };

  const isMedicineSelected = (id) => {
    return selectedMedicines.some(medicine => medicine.id === id);
  };

// Replace with a valid Ethereum address for your recipient
const recipientAddress = '0x14d61A4Fa152d16678eb6458853418667043Df80';

const handleCheckout = async () => {
    if (selectedMedicines.length === 0) {
      alert('Please select at least one medicine before proceeding to checkout.');
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

      // Calculate total cost in wei
      const totalCost = selectedMedicines.reduce((acc, medicine) => acc.add(medicine.cost), ethers.BigNumber.from(0));

      // Generate a unique transaction ID
      const transactionId = ethers.utils.hexlify(ethers.utils.randomBytes(32));

      // Call the contract method
      const txResponse = await contract.completeTransaction(
        '0xYourRecipientAddressHere', // Replace with your recipient address
        totalCost,
        transactionId
      );
      await txResponse.wait();

      alert('Transaction successful!');

      // Clear selected medicines and navigate
      setSelectedMedicines([]);
      navigate('/');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed.');
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
          >
            Back
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${selectedMedicines.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleCheckout}
            disabled={isProcessing || selectedMedicines.length === 0}
          >
            {isProcessing ? 'Processing...' : `Checkout (${selectedMedicines.length} medicines)`}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Medicines</h1>

        <ul className="space-y-4">
          {medicines.map((medicine) => (
            <li key={medicine.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{medicine.name}</span>
                <span className="text-blue-500">₹{ethers.utils.formatUnits(medicine.cost, 'ether')}</span>
              </div>
              <div className="flex justify-end space-x-2">
                {!isMedicineSelected(medicine.id) ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => addMedicine(medicine)}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeMedicine(medicine.id)}
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



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate('/')}
          >
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Checkout (${selectedMedicines.length} medicines)`}
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Medicines</h1>

        <ul className="space-y-4">
          {medicines.map((medicine) => (
            <li key={medicine.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{medicine.name}</span>
                <span className="text-blue-500">₹{ethers.utils.formatUnits(medicine.cost, 'ether')}</span>
              </div>
              <div className="flex justify-end space-x-2">
                {!isMedicineSelected(medicine.id) ? (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => addMedicine(medicine)}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeMedicine(medicine.id)}
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

export default Medicine;
