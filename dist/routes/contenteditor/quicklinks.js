"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quicklinks_1 = require("../../controllers/contenteditor/quicklinks");
const router = (0, express_1.Router)();
router.route('/remoquicklinks/uploadItem').post(quicklinks_1.postRemoQuicklinks);
exports.default = router;
