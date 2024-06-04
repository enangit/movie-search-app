import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { API_KEY, API_URI } from "../config/config";
import { fetchMovies, fetchMovie } from "../services/services";
const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

router.get("/movies", async (req: Request, res: Response) => {
    const url = API_URI + API_KEY + "&type=movie";
    const newURI = new URL(url);
    try {
        const data = await fetch(newURI);
        const movies = await data.json();
        console.log(movies);
        if (movies) {
            res.status(200).send(movies);
        }
    } catch (error) {
        console.log(`There's an error: ${error}`)
    }
});


router.get("/search", async (req: Request, res: Response) => {
    const query = req.query.title;

    try {
        if (!query) {
            throw new Error("Query string is undefined!");
        }
        const response = await fetchMovies(query.toString());
        if (!response.ok) {
            throw new Error("Fetch error!");
        }

        const data = await response.json();
        console.log(data);
        return res.status(200).json(data);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error })
        }
        console.log(`There's an error: ${error}`)
    }
});

router.get("/search/movie", async (req: Request, res: Response) => {

    const query = req.query.title;
    console.log(query);
    try {
        if (!query) {
            throw new Error("Query string is undefined!");
        }
        const response = await fetchMovie(query.toString());
        if (!response.ok) {
            throw new Error("Fetch error!");
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error })
        }
        console.log(`There's an error: ${error}`)
    }
});
export default router;
