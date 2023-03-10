"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRootFile = exports.uploadRootFolder = exports.getGalleryChildren = exports.getAllRoot = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fetch_1 = __importDefault(require("node-fetch"));
// import fileUpload from 'express-fileupload';
// import bodyParser from 'body-parser';
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
// const app = express();
// app.use(cors());
// app.use(fileUpload());
// app.use(express.static("files"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser. text({type: '/'}));
const getAllRoot = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers.authorization, 'tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    // console.log(req.body)
    // const {token} = req.params
    //  const {token} = req.body
    console.log(token, 'llll');
    // console.log(req.body,'gregrthtrht')
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        const response = 
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        yield axios_1.default.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/root/children`, {
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        });
        // const responseTop = 
        //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
        //     headers: {
        //         'Authorization': `Bearer ${token} `,
        //         'Content-Type': 'application/json'
        //       }
        // })
        console.log(response.data.value, "meetingssssssssssssssssssssssss");
        res.status(200).json({
            success: true,
            response: response.data.value,
            //   response1:responseTop.data.value
        });
    }
}));
exports.getAllRoot = getAllRoot;
const getGalleryChildren = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tssccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { ItemId } = req.body;
    console.log(ItemId, 'gfhtht');
    if (!token) {
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('trytrtjtjytaxczc');
        if (ItemId) {
            const response = 
            // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
            yield axios_1.default.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/items/${ItemId}/children`, {
                headers: {
                    'Authorization': `Bearer ${token} `,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.value, "ItemChildren");
            res.status(200).json({
                success: true,
                response: response.data.value
            });
        }
        else if (!ItemId) {
            const response = 
            // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
            yield axios_1.default.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/root/children`, {
                headers: {
                    'Authorization': `Bearer ${token} `,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.value, "ItemChildren");
            res.status(200).json({
                success: true,
                response: response.data.value
            });
        }
    }
}));
exports.getGalleryChildren = getGalleryChildren;
const uploadRootFolder = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { folderName, ItemId } = req.body;
    // console.log(folderName, 'isActive')
    //  console.log(ItemId, 'EnableLikes')
    // console.log(pageDetails, 'EnableCommands')
    // console.log(order, 'SharedAsEmail')
    //     var dateobj = 
    // new Date(startDate + startTime);
    // var B = dateobj.toISOString();
    // // Printing the converted string.
    // console.log(B);
    // const Start = startDate + startTime
    // const End = endDate + endTime
    // console.log(Start.toISOString())
    // console.log(image,'image')
    // console.log(imageName,'imageName')
    //  const Image = blobStorage(image, imageName)
    //  console.log(Image)
    // const Image1 = blobStorage(hoverOff, hoverOffName)
    //  console.log(Image, 'rtretrt')
    // console.log(File, 'tththththth')
    // //    console.log( title,imageName,isActive,EnableLikes,'ytjytjytjty')
    // console.log(description,'thgtrhj67k87k87k87k87')
    //  console.log(image,'thgtrhj67k87k87k87k87')
    //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
    // console.log(empname,'tey54u6565ieutudrusya')
    // console.log(empdept,'gregrthtrht')
    // console.log(emppicname,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('ttrgs');
        if (ItemId) {
            const driveItem = {
                name: folderName,
                folder: {},
                '@microsoft.graph.conflictBehavior': 'rename'
            };
            try {
                const response = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/items/${ItemId}/children`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(driveItem)
                });
                const data = yield response.json();
                // enter you logic when the fetch is successful
                console.log(data);
                res.status(201).json({
                    success: true,
                    response: 'Successfully Created'
                });
                // return data
            }
            catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error);
            }
        }
        else {
            const driveItem = {
                name: folderName,
                folder: {},
                '@microsoft.graph.conflictBehavior': 'rename'
            };
            try {
                const response = yield (0, node_fetch_1.default)(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/root/children`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(driveItem)
                });
                const data = yield response.json();
                // enter you logic when the fetch is successful
                console.log(data);
                res.status(201).json({
                    success: true,
                    response: 'Successfully Created'
                });
                // return data
            }
            catch (error) {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error);
            }
        }
        //     const response = 
        //     // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //       await axios.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/4d933ed8-bce3-4429-9af6-8e509eb6d2dc/items?$expand=fields`, {
        //       headers: {
        //           'Authorization': `Bearer ${token} `,
        //           'Content-Type': 'application/json'
        //         }
        //   })
        //   console.log(response.data.value,"meetingssssssssssssssssssssssss" )
        //   res.status(200).json({
        //     success: true,
        //     response :response.data.value
        //  });
    }
}));
exports.uploadRootFolder = uploadRootFolder;
const uploadRootFile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    // const {
    //      fileContent,
    //     folderName,
    //     ItemId
    //   // title, description, image, imageName, order, pageDetails, hoverOffName,hoverOff,isActive,openNewTab,isDraft
    //   // ceotitle,ceodesc,ceousername,
    //   //  ceoposition,ceopic,ceopicname,
    //   //  newstitle,newsdesc,newspic,newspicname,
    //   //  employyetitle, empname,empdept,emppic,emppicname,
    //   //  userquicklink,globalquicklink
    // } = req.body
    // console.log(fileContent, 'isActive')
    //  console.log(ItemId, 'EnableLikes')
    //@ts-ignore
    const file = req.files.file;
    //@ts-ignore
    const filename = file.name;
    // console.log(pageDetails, 'EnableCommands')
    // console.log(order, 'SharedAsEmail')
    //     var dateobj = 
    // new Date(startDate + startTime);
    // var B = dateobj.toISOString();
    // // Printing the converted string.
    // console.log(B);
    // const Start = startDate + startTime
    // const End = endDate + endTime
    // console.log(Start.toISOString())
    // console.log(image,'image')
    // console.log(imageName,'imageName')
    //  const Image = blobStorage(image, imageName)
    //  console.log(Image)
    // const Image1 = blobStorage(hoverOff, hoverOffName)
    //  console.log(Image, 'rtretrt')
    // console.log(File, 'tththththth')
    // //    console.log( title,imageName,isActive,EnableLikes,'ytjytjytjty')
    // console.log(description,'thgtrhj67k87k87k87k87')
    //  console.log(image,'thgtrhj67k87k87k87k87')
    //  console.log(globalquicklink,'rgtreyrewyreyweywsF')
    // console.log(empname,'tey54u6565ieutudrusya')
    // console.log(empdept,'gregrthtrht')
    // console.log(emppicname,'gregrthtrht')
    if (!token) {
        // const dataFiles = await createRequset(`${BASE_PATH}/${REMO_SITE_ID}/lists/${Events_Id}/items?$expand=fields`, token )
        // console.log(dataFiles,'dgdfgthtrhytjytjyt')
        // return res.status(200).json({
        //     success: true,
        //     data: dataFiles
        // });
        //  res.send(dataFiles)
        return res.status(404).json({
            success: false,
            error: "No Token found"
        });
    }
    else {
        console.log('ttrgs');
        //   if(ItemId){
        //     // const driveItem = {
        //     //   name: folderName,
        //     //   folder: { },
        //     //   '@microsoft.graph.conflictBehavior': 'rename'
        //     // };
        //     try {
        //       const response = await fetch(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/items/${ItemId}/children`, {
        //         method: 'POST',
        //         headers: {
        //           'Authorization': `Bearer ${token}`,
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(fileContent)
        //       });
        //       const data = await response.json();
        //       // enter you logic when the fetch is successful
        //       console.log(data);
        //         res.status(201).json({
        //           success: true,
        //           response :'Successfully Created'
        //        });
        //       // return data
        //     } catch (error) {
        //       // enter your logic for when there is an error (ex. error toast)
        //       console.log(error)
        //     }
        //   }
        //  else  {
        //     // const driveItem = {
        //     //   name: folderName,
        //     //   folder: { },
        //     //   '@microsoft.graph.conflictBehavior': 'rename'
        //     // };
        //     try {
        //       const response = await fetch(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikN7l5pVNJUCQrB4Gn3-Lhaw/items/root:/${folderName}:/content`, {
        //         method: 'PUT',
        //         headers: {
        //           'Authorization': `Bearer ${token}`,
        //           'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify(fileContent)
        //       });
        //       const data = await response.json();
        //       // enter you logic when the fetch is successful
        //       console.log(data);
        //         res.status(201).json({
        //           success: true,
        //           response :'Successfully Created'
        //        });
        //       // return data
        //     } catch (error) {
        //       // enter your logic for when there is an error (ex. error toast)
        //       console.log(error)
        //     }
        //   }
        //     const response = 
        //     // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        //       await axios.get(`https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/4d933ed8-bce3-4429-9af6-8e509eb6d2dc/items?$expand=fields`, {
        //       headers: {
        //           'Authorization': `Bearer ${token} `,
        //           'Content-Type': 'application/json'
        //         }
        //   })
        //   console.log(response.data.value,"meetingssssssssssssssssssssssss" )
        //   res.status(200).json({
        //     success: true,
        //     response :response.data.value
        //  });
    }
}));
exports.uploadRootFile = uploadRootFile;
