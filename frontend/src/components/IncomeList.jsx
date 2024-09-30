import React from 'react';
import { useGetIncomesQuery, useDeleteIncomeMutation } from '../redux/api/incomeApiSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';

const IncomeList = () => {
  const { data: incomes, error, isLoading } = useGetIncomesQuery();
  const [deleteIncome] = useDeleteIncomeMutation();

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id).unwrap();
      toast.success('Ingreso eliminado con éxito');
    } catch (err) {
      toast.error('Error al eliminar el ingreso');
    }
  };

  // Calcular el total de ingresos
  const totalIncome = incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Ingresos</h2>

      <div className="text-lg font-semibold mb-4">
        Total de Ingresos: ${totalIncome.toFixed(2)}
      </div>

      {incomes && incomes.length > 0 ? (
        <ul className="space-y-4">
          {incomes.map((income) => (
            <li key={income._id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{income.title}</h3>
                <p className="text-sm text-gray-300">Monto: ${income.amount}</p>
                <p className="text-sm text-gray-300">Categoría: {income.category}</p>
              </div>
              <button
                onClick={() => handleDelete(income._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay ingresos disponibles.</p>
      )}
    </div>
  );
};

export default IncomeList;
