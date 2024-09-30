import mongoose from "mongoose";
const incomeSchema = new mongoose.Schema({
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
        maxLength: 100,  // Aumentar el valor de 20 a, por ejemplo, 100 caracteres
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Income', incomeSchema);
