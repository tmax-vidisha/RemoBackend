import express from "express";
import { Router } from "express";
import {
  uploadItemInOneDrive,
  getAllOneDriveItemsRoot,
  getOneDriveItemChildren,
  deleteOneDriveItem,
  copylinkDriveItem,
  getAllOneDriveSharedItems,
  getAllOneDriveRecentFiles,
  getAllOneDrivePolicyItems,
  getAllOneDriveItemDownloadUrl,
  getAllStarred,
  getAllTrashed,
  deleteTrashedItem,
  deleteStarredItem,
  getAllOneDriveDocumentItems,
} from "../../controllers/onedrive/onedrive";
import { getRemoPolicy } from "../../controllers/token";
// import multer from 'multer'
const router = Router();
// const upload = multer({ dest: "../../uploads" });
//@ts-ignore
router.route("/uploadItem").post(uploadItemInOneDrive);
router.route("/getAllRootItems/:token").get(getAllOneDriveItemsRoot);
router.route("/getItemChildren").post(getOneDriveItemChildren);
router.route("/deleteOneDriveItem").post(deleteOneDriveItem);
router.route("/copylinkOneDriveItem").post(copylinkDriveItem);
router.route("/getSharedItems/:token").get(getAllOneDriveSharedItems);
router.route("/getPolicy/:token").get(getAllOneDrivePolicyItems);
router.route("/getPolicy/:token").get(getRemoPolicy);
router.route("/getDocuments/:token").get(getAllOneDriveDocumentItems);
router.route("/getRecentFiles/:token").get(getAllOneDriveRecentFiles);
router.route("/getRecentFiles/downloadurl").post(getAllOneDriveItemDownloadUrl);
router.route("/getStarred/:token").get(getAllStarred);
router.route("/getTrashed/:token").get(getAllTrashed);
router.route("/deleteTrashedItem").post(deleteTrashedItem);
router.route("/deleteStarredItem").post(deleteStarredItem);
export default router;
