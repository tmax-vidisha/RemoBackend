"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contenteditor_1 = require("../../controllers/contenteditor/contenteditor");
const router = (0, express_1.Router)();
router.route('/remocontentEditor/uploadItem').post(contenteditor_1.postRemoContentEditor);
exports.default = router;
