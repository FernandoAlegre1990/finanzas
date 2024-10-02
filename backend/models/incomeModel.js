import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
        maxLength: 100, // Aumentar el valor de 20 a 100 caracteres
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    userId: { // Añadir el campo userId
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Referencia al modelo User
    }
}, { timestamps: true });

export default mongoose.model('Income', IncomeSchema);
