import { addExpense, getExpense, deleteExpense } from '../controllers/expenseController.js';
import { addIncome, getIncomes, deleteIncome } from '../controllers/incomeController.js';
import express from 'express';

const router = express.Router();

// Rutas
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);
router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);

// Exportación
export default router;
