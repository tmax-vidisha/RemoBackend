import {Router} from "express";
import { postRemoQuicklinks } from "../../controllers/contenteditor/quicklinks";

const router = Router();



router.route('/remoquicklinks/uploadItem').post(postRemoQuicklinks);


export default router;