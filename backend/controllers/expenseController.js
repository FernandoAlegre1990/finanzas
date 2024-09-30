import ExpenseSchema from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
    });

    try {
        // Validaciones
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await income.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(income);
};

export const getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
