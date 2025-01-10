import express from "express";
import "dotenv/config";
import { connectDB } from "./utils/db.js";
import NoteRouter from "./routes/notes.routes.js";
import UserRouter from "./routes/users.routes.js";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import {requiresAuth} from "./middleware/auth.js";

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(cookieParser());


app.use("/api/users", UserRouter);
app.use("/api/notes", requiresAuth, NoteRouter);

app.use((req, res, next) => {
	next(createHttpError(404, "Page doesnot exist"));
});

app.use((error, req, res, next) => {
	let status = 500;
	let errorMessage = "An unknown error occurred";

	if (isHttpError(error)) {
		status = error.status;
		errorMessage = error.message;
	}
	res.status(status).json({ error: errorMessage });
});

//Connecting to db
connectDB()
	.then(() => {
		app.listen(port, () =>
			console.log(`Example app listening on port ${port}!`)
		);
	})
	.catch((error) => console.error(error));
