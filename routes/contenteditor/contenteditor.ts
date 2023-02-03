import {Router} from "express";
import { postRemoContentEditor } from "../../controllers/contenteditor/contenteditor";

const router = Router();



router.route('/remocontentEditor/uploadItem').post(postRemoContentEditor);


export default router;