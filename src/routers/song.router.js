import express from "express";

import { pull, getInfo } from "../controllers/song.controller";

const songRouter = express.Router();

songRouter.get("/pull", pull);

songRouter.get("/:id", getInfo);

export default songRouter;
