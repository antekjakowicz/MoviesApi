import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./database";
import movieRoutes from "./routes/movieRoutes";

(async () =>{
    try{
        await connectDB()
        console.log("Connected to DB...")
    }catch(e: unknown){
        if(e instanceof Error) {
            console.error(`błąd połączenie z MongoDB ${e}`)

        }else{
            console.log(`nie znany błąd połączenia `, e)
        }
        process.exit(1)
    }
})()

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json()); // Parsowanie JSON w requestach


app.use(express.static(path.join(__dirname, "../public")));

app.use("/movies", movieRoutes); // Ustawienie routów


app.get("/", (req, res) => {
    res.json({ message: "API Express + TypeScript działa!" });
});

export default app;