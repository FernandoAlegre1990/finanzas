import React from 'react';
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../redux/api/expenseApiSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';

const ExpenseList = () => {
  const { data: expenses, error, isLoading } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id).unwrap();
      toast.success('Gasto eliminado con éxito');
    } catch (err) {
      toast.error('Error al eliminar el gasto');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Gastos</h2>
      {expenses && expenses.length > 0 ? (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense._id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{expense.title}</h3>
                <p className="text-sm text-gray-300">Monto: ${expense.amount}</p>
                <p className="text-sm text-gray-300">Categoría: {expense.category}</p>
              </div>
              <button
                onClick={() => handleDelete(expense._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay gastos disponibles.</p>
      )}
    </div>
  );
};

export default ExpenseList;
