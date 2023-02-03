"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../../controllers/contenteditor/events");
const router = (0, express_1.Router)();
router.route('/remoevents/uploadItem').post(events_1.postRemoEvents);
exports.default = router;
