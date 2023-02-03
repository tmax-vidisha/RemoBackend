"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../../controllers/contenteditor/news");
const router = (0, express_1.Router)();
router.route('/remonews/uploadItem').post(news_1.postRemoNews);
exports.default = router;
