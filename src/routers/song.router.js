import express from "express";

import { pull } from "../controllers/song.controller";

const songRouter = express.Router();

songRouter.get("/pull", pull);

export default songRouter;
