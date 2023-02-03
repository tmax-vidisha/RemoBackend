import {Router} from "express";
import { postRemoNews } from "../../controllers/contenteditor/news";

const router = Router();



router.route('/remonews/uploadItem').post(postRemoNews);


export default router;