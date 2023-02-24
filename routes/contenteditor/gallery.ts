import express from "express";
import {Router} from "express";
import { getAllRoot,getGalleryChildren,uploadRootFolder } from "../../controllers/contenteditor/gallery";

const router = Router();




router.route('/galleryroot/:token').get(getAllRoot);
router.route('/getGalleryItemChildren').post(getGalleryChildren);
router.route('/remophotoGallery/uploadItem').post(uploadRootFolder);
// router.route('/remophotoGallery/uploadFileItem').post(uploadRootFile);
export default router;