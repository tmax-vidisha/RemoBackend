import {Router} from "express";
import { postPolicy } from "../../controllers/contenteditor/Policy";

const router = Router();



router.route('/policy/uploadItem').post(postPolicy);


export default router;