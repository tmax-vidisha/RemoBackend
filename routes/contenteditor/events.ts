import {Router} from "express";
import {  postRemoEvents } from "../../controllers/contenteditor/events";

const router = Router();



router.route('/remoevents/uploadItem').post(postRemoEvents);


export default router;