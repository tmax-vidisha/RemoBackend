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
exports.postRemoQuicklinks = void 0;
const azure_storage_1 = __importDefault(require("azure-storage"));
require('dotenv').config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const asyncHandler_1 = __importDefault(require("./../../middleware/asyncHandler"));
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id = 'tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43';
const Quicklinks_Id = "097511a4-53c1-4ee4-af0b-91a5e480641a";
const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net";
function blobStorage(image, imageName) {
    //@ts-ignore
    var blobService = azure_storage_1.default.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches !== null) {
        var type = matches[1];
        //@ts-ignore
        var buffer = new Buffer.from(matches[2], 'base64');
        const containerName = 'candidate';
        const blobName = imageName;
        //@ts-ignore
        blobService.createBlockBlobFromText(containerName, blobName, buffer, {
            contentSettings: {
                contentType: "image/svg+xml"
            }
        }, function (error, result, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
        var startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 300);
        var expiryDate = new Date(startDate);
        // expiryDate.setMinutes(startDate.getMinutes() + 300);
        expiryDate.setMonth(startDate.getMonth() + 12);
        var sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: [azure_storage_1.default.BlobUtilities.SharedAccessPermissions.READ],
                Start: startDate,
                Expiry: expiryDate
            }
        };
        console.log(sharedAccessPolicy, 'iiii');
        //@ts-ignore
        var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
        var response = {};
        //@ts-ignore
        response.image = blobService.getUrl(containerName, blobName, sasToken);
        //@ts-ignore
        console.log(response.image);
        //@ts-ignore
        return response.image;
    }
}
const postRemoQuicklinks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    // const {token} = req.params
    console.log(req.headers.authorization, 'tccccttddddttttvvvvvtttttttyy');
    const token = req.headers.authorization;
    const { 
    // token,
    title, description, image, imageName, order, pageDetails, hoverOffName, hoverOff, isActive, openNewTab, isDraft, accesible
    // ceotitle,ceodesc,ceousername,
    //  ceoposition,ceopic,ceopicname,
    //  newstitle,newsdesc,newspic,newspicname,
    //  employyetitle, empname,empdept,emppic,emppicname,
    //  userquicklink,globalquicklink
     } = req.body;
    console.log(isActive, 'isActive');
    console.log(openNewTab, 'EnableLikes');
    console.log(pageDetails, 'EnableCommands');
    console.log(order, 'SharedAsEmail');
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
    const Image = blobStorage(image, imageName);
    console.log(Image);
    const Image1 = blobStorage(hoverOff, hoverOffName);
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
        const Data = {
            fields: {
                Title: title,
                Url: pageDetails,
                HoverOn: Image,
                isActive: isActive,
                OpenInNewTab: openNewTab,
                OO: order,
                HoverOff: Image1,
                AccessibleTo: accesible,
                //   RecipientEmail:RecipientEmail,
                //   Attachment:Attachment,
                isDraft: isDraft
                //@ts-ignore
                // heroUrl: response.image
            }
        };
        try {
            const response = yield (0, node_fetch_1.default)(`${BASE_PATH}/${Site_Id}/lists/${Quicklinks_Id}/items`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            });
            const data = yield response.json();
            // enter you logic when the fetch is successful
            console.log(data);
            return res.status(201).json({
                success: true,
                response: "List Item created"
            });
            // return data
        }
        catch (error) {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error);
            return res.status(500).json({
                success: false,
                // error: error,
                response: 'List Item Creation Failed'
            });
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
exports.postRemoQuicklinks = postRemoQuicklinks;
