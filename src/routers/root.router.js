import express from "express";
import { home } from "../controllers/root.controller";

const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;
