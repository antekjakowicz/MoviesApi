import mongoose, { Document } from "mongoose";

export interface Movie extends Document {
    title: string;
    releaseYear: number;
    genre: string;
    director: string;
    cast: string[];
    rating: number;
    description: string;
}

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    releaseYear: {type: Number, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    cast: { type: [String], required: true },
    rating: {type: Number, required: false},
    description: {type: String, required: false},
})

export default mongoose.model<Movie>("Movie", movieSchema);