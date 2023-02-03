import {Router} from "express";
import { postRemoNavigation } from "../../controllers/contenteditor/navigation";

const router = Router();



router.route('/remonavigation/uploadItem').post(postRemoNavigation);


export default router;