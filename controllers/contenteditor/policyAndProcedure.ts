import axios from "axios";
import express, { Request, Response } from "express";
import azure from "azure-storage";
require("dotenv").config();
import fetch from "node-fetch";
import asyncHandler from "./../../middleware/asyncHandler";
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id =
  "tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43";
const Policy_Id =
  "b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPU-UPjxittT53b2Hcjy4dk";

// function blobStorage(image: any, imageName: any) {
//   //@ts-ignore
//   var blobService = azure.createBlobService(
//     process.env.AZURE_STORAGE_CONNECTION_STRING
//   );
//   var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//   if (matches !== null) {
//     var type = matches[1];
//     //@ts-ignore
//     var buffer = new Buffer.from(matches[2], "base64");
//     const containerName = "candidate";
//     const blobName = imageName;
//     //@ts-ignore
//     blobService.createBlockBlobFromText(
//       containerName,
//       blobName,
//       buffer,
//       function (error, result, response) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(result);
//         }
//       }
//     );

//     //@ts-ignore
//     var sasToken = blobService.generateSharedAccessSignature(
//       containerName,
//       blobName
//     );
//     var response = {};
//     //@ts-ignore
//     response.image = blobService.getUrl(containerName, blobName, sasToken);
//     //@ts-ignore
//     console.log(response.image);

//     //@ts-ignore
//     return response.image;
//   }
// }

const postRemoPolicy = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization, "policy header");
  const token = req.headers.authorization;
  const {
    // token,
    title,
    name,
    modified,
    modifiedBy,
  } = req.body;

  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    const Data = {
      fields: {
        Title: title,
        Name: name,
        Modified: modified,
        ModifiedBy: modifiedBy,
      },
    };
    try {
      const response = await fetch(
        `${BASE_PATH}/${Site_Id}/lists/${Policy_Id}/items`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log(data);
      return res.status(201).json({
        success: true,
        response: "List Item created",
      });
      // return data
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
      return res.status(500).json({
        success: false,
        // error: error,
        response: "List Item Creation Failed",
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
});

export { postRemoPolicy };
