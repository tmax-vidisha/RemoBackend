"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const navigation_1 = require("../../controllers/contenteditor/navigation");
const router = (0, express_1.Router)();
router.route('/remonavigation/uploadItem').post(navigation_1.postRemoNavigation);
exports.default = router;
