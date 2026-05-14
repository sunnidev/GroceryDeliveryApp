import mongoose from "mongoose";

interface IGrocery {
    id: mongoose.Types.ObjectId
    name: string;
    price: string;
    category: string;
    unit: string;
    image: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const GrocerySchema = new mongoose.Schema<IGrocery>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["fruits & Vegitables", "Rice, Atta & Grains", "Snacks & Biscuits", "Dairy & Eggs", "Beverages & Drinks", "Personal Care", "Household Essentials", "Instant & Packed Foods", "Baby & Pet Care", "Spices & Masalas"],
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ["kg", "g", "liter", "ml", "piece", "packet"]
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Grocery = mongoose.models.Grocery || mongoose.model("Grocery", GrocerySchema)