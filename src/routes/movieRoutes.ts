import express, {Request, Response} from "express";
import MovieModel, {Movie} from "../models/Movie";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const tasks: Array<Movie> = await MovieModel.find();
        res.json(tasks);
    } catch (e: unknown) {
        res.status(500).json({message: "Nie udalo sie pobrac filmow"});
    }
})

router.post("/", async (req: Request, res: Response) => {
    try{
        console.log("BODY:", req.body);

        const {title, releaseYear, genre, director, cast, rating, description} = req.body;
        const newMovie: Movie | null = new MovieModel({title, releaseYear, genre, director, cast, rating, description});
        await newMovie.save();
        res.status(201).json({message: `Dodano nowy film ${newMovie}`});
    } catch (e: unknown) {
        console.error("Błąd przy dodawaniu filmu:", e);
        res.status(500).json({message: "Nie udalo sie dodac filmu"});
    }
})

router.put("/:id", async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            console.log(id);
            const updatedMovie: Movie | null = await MovieModel.findByIdAndUpdate(id, req.body, {new: true});
            if(!updatedMovie) {
                res.status(404).json({message: "Nie znaleziono zadanego filmu"});
                return;
            }
        } catch (e: unknown) {
            res.status(500).json({message: "Nie udalo sie zaktualizowac filmu"});
        }
    }
)

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const deletedMovie: Movie | null = await MovieModel.findByIdAndDelete(id);
        if(!deletedMovie) {
            res.status(404).json({message: "Nie znaleziono zadanego filmu"});
            return;
        }
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error("Nieznany błąd")
        res.status(500).json({message: "Nie udalo sie usunac filmu"});
    }
})

export default router;