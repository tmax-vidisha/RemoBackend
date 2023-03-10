"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const header_1 = require("../controllers/header");
const router = (0, express_1.Router)();
router.route('/prayerTime').get(header_1.prayerTime);
router.route('/countryCodes/:token').get(header_1.getCurrency);
router.route('/unreadmails/:token').get(header_1.getUnReadEmails);
router.route('/uncountmeetings/:token').get(header_1.getMeetingsUnCount);
router.route('/userinfo/:token').get(header_1.getUserInfo);
router.route('/countrycurrency').post(header_1.getAmount);
router.route('/weatherData').get(header_1.getWeather);
exports.default = router;
