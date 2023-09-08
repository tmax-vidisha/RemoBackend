import { Router } from "express";
import { getLatestDepartment,postTableDepartment } from "../../controllers/contenteditor/department";

const router = Router();

router.route("/remodepartment/uploadItem").post(postTableDepartment);
// router.route('/announcementlatest/:token').get(getLatestDepartment);
export default router;
