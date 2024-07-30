import express from "express";
import { generateShortURL } from "../controller/control.js";
import { getAnalytics } from "../controller/control.js";
const router = express.Router();

router.post('/generate', generateShortURL);
router.get('/analytics/:shortId', getAnalytics);

export default router;