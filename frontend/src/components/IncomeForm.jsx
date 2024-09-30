import React, { useState } from 'react';
import { useAddIncomeMutation } from '../redux/api/incomeApiSlice';
import { toast } from 'react-toastify';

const IncomeForm = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [addIncome, { isLoading }] = useAddIncomeMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Convertir el campo "amount" a número antes de enviar
      const amountValue = parseFloat(amount);
      if (isNaN(amountValue)) {
        toast.error('El monto debe ser un número válido');
        return;
      }

      await addIncome({ title, amount: amountValue, date, category, description }).unwrap();
      toast.success('Ingreso agregado con éxito');

      // Resetea los campos
      setTitle('');
      setAmount('');
      setDate('');
      setCategory('');
      setDescription('');
    } catch (err) {
      toast.error('Error al agregar ingreso');
      console.error('Error al agregar ingreso:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4 text-center text-red-800">Agregar Ingreso</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Monto
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Agregando...' : 'Agregar Ingreso'}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
