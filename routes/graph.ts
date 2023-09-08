import express from "express";

import { getPostData,
         postEventData,
         postHeroData,
         postCeoData,
         postDepartmentListData,
         postNewsData,
         postEmpData,
         postUserQuicklinkData,
         postRemoNews,
         postRemEmpHighlight,
         RemEmpHighlightItemId,
         postRemoEventData,
         getRemoEventData,
         getRemoEventDataLanding,
         postRemoUserQuicklinkData
        } from  "../controllers/postdata";

// const { getData } = require("../controllers/graph");
// const createToken = require('../controllers/token')
import { Router } from "express";

const router = Router()
// const RemoToken = require('../controllers/token');
// const { getTokens } = require("../controllers/graph");
// router.route('/lists').get(getData);
// console.log(createToken,'uuuuu')
// router.get("/",async (req, res, next) => {

//     try {
//         const response = await axios.get(`${BASE_PATH}/${REMOSITEID}/lists`,{
//             headers: {
//                         'Authorization': `Bearer ${RemoToken}`,
//                         'Content-Type': 'application/json'
//                       }

//         });
//         console.log(response.data);
//         res.send(response.data);
//     }
//     catch (err) {
//         next(err)
//     }
//     })

// router.route('/').get(getTokens)
router.route('/data').post(getPostData)
router.route('/eventdata').post(postRemoEventData)
router.route('/herodata').post(postHeroData)
router.route('/ceodata').post(postCeoData)
router.route('/departmentListdata').post(postDepartmentListData)
router.route('/newsdata').post(postRemoNews)
router.route('/eventdataOne').post(getRemoEventData)
router.route('/eventdataLanding').post(getRemoEventDataLanding)
// router.route('/empdata').post(postEmpData)

router.route('/empdata').post(postRemEmpHighlight)

router.route('/empItemdata').post(RemEmpHighlightItemId)
router.route('/userquicklinkdata').post(postUserQuicklinkData)
router.route('/userRemoquicklinkdata').post(postRemoUserQuicklinkData)
export default router;