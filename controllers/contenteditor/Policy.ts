import axios from "axios";
import express, { Request, Response } from "express";
import azure from "azure-storage";
require("dotenv").config();
import fetch from "node-fetch";
import asyncHandler from "./../../middleware/asyncHandler";
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;
const Site_Id =
  "tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43";
const PolicyDriveId =
  "b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPU-UPjxittT53b2Hcjy4dk";
const policyId = "0ec4e29a-d2ec-4835-a011-ea8a3fe33ed4";

// function blobStorage(image: any, imageName: any) {
//   //@ts-ignore
//   var blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING
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
//     var startDate = new Date();
//     startDate.setMinutes(startDate.getMinutes() - 300);
//     var expiryDate = new Date(startDate);
//     // expiryDate.setMinutes(startDate.getMinutes() + 300);
//     expiryDate.setMonth(startDate.getMonth() + 12);
//     var sharedAccessPolicy = {
//       AccessPolicy: {
//         Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ], //grent read permission only
//         Start: startDate,
//         Expiry: expiryDate,
//       },
//     };
//     console.log(sharedAccessPolicy, "Policy hiiu");
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

const postPolicy = asyncHandler(async (req: Request, res: Response) => {
   const token = req.headers.authorization;
  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9ZNlF1ZjZCWUZNbWljcjgtMHdsWHF1T0ZXTnFTcU42NDFsdHZ5VWduNkEiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NzdjZmVmZi04MmVmLTQ1YTktYTJiOC1iNzhhODMwMTM4ZDIvIiwiaWF0IjoxNjkzODAxOTU0LCJuYmYiOjE2OTM4MDE5NTQsImV4cCI6MTY5Mzg4ODY1NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhVQUFBQUU0K3ZTVkNiclZBeEJ0RitoV20rVWtZY3UvZkRSUjgwdkJUQVRFNXA0OUhMQlZqT1k2SGNOZWl5VzFnRmFnY3lscTRkRU9Sc2ZzRUJUY1ZXdHY4UjIrdmdCUVFINXNEN2N0WWg4dFdEenZNPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2hhdHVuIiwiZ2l2ZW5fbmFtZSI6IkphaGFuYXJhIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTE2LjIwNi4yMjIuMTMwIiwibmFtZSI6IkphaGFuYXJhIEtoYXR1biIsIm9pZCI6IjU2Nzk4ODgzLTMwMjUtNGFmNy1iMTliLTg2Nzc5OTY5MTc3OCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMUM4NEE4MTA1IiwicmgiOiIwLkFWTUFfXzU4ZC0tQ3FVV2l1TGVLZ3dFNDBnTUFBQUFBQUFBQXdBQUFBQUFBQUFERkFCOC4iLCJzY3AiOiJBY2Nlc3NSZXZpZXcuUmVhZC5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIEFQSUNvbm5lY3RvcnMuUmVhZC5BbGwgQVBJQ29ubmVjdG9ycy5SZWFkV3JpdGUuQWxsIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDaGFubmVsLlJlYWRCYXNpYy5BbGwgQ2hhbm5lbFNldHRpbmdzLlJlYWQuQWxsIENoYW5uZWxTZXR0aW5ncy5SZWFkV3JpdGUuQWxsIEN1c3RvbUF1dGhlbnRpY2F0aW9uRXh0ZW5zaW9uLlJlYWQuQWxsIEN1c3RvbUF1dGhlbnRpY2F0aW9uRXh0ZW5zaW9uLlJlYWRXcml0ZS5BbGwgQ3VzdG9tU2VjQXR0cmlidXRlQXNzaWdubWVudC5SZWFkLkFsbCBDdXN0b21TZWNBdHRyaWJ1dGVBc3NpZ25tZW50LlJlYWRXcml0ZS5BbGwgQ3VzdG9tU2VjQXR0cmlidXRlRGVmaW5pdGlvbi5SZWFkLkFsbCBDdXN0b21TZWNBdHRyaWJ1dGVEZWZpbml0aW9uLlJlYWRXcml0ZS5BbGwgRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgRGlyZWN0b3J5LlJlYWQuQWxsIERpcmVjdG9yeS5SZWFkV3JpdGUuQWxsIEZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZC5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBJZGVudGl0eVJpc2t5VXNlci5SZWFkLkFsbCBJZGVudGl0eVJpc2t5VXNlci5SZWFkV3JpdGUuQWxsIG9wZW5pZCBwcm9maWxlIFJlcG9ydHMuUmVhZC5BbGwgU2l0ZXMuUmVhZC5BbGwgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUZWFtLlJlYWRCYXNpYy5BbGwgVGVhbXNBY3Rpdml0eS5SZWFkIFRlYW1zQWN0aXZpdHkuU2VuZCBUZWFtc0FwcC5SZWFkIFRlYW1zQXBwLlJlYWQuQWxsIFRlYW1zQXBwLlJlYWRXcml0ZSBUZWFtc0FwcC5SZWFkV3JpdGUuQWxsIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JDaGF0IFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JUZWFtIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JVc2VyIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZUZvckNoYXQgVGVhbXNBcHBJbnN0YWxsYXRpb24uUmVhZFdyaXRlRm9yVGVhbSBUZWFtc0FwcEluc3RhbGxhdGlvbi5SZWFkV3JpdGVGb3JVc2VyIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JDaGF0IFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JUZWFtIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JVc2VyIFRlYW1TZXR0aW5ncy5SZWFkLkFsbCBUZWFtU2V0dGluZ3MuUmVhZFdyaXRlLkFsbCBUZWFtc1RhYi5DcmVhdGUgVGVhbXNUYWIuUmVhZC5BbGwgVGVhbXNUYWIuUmVhZFdyaXRlLkFsbCBUZWFtc1RhYi5SZWFkV3JpdGVGb3JDaGF0IFRlYW1zVGFiLlJlYWRXcml0ZUZvclRlYW0gVGVhbXNUYWIuUmVhZFdyaXRlRm9yVXNlciBVc2VyLlJlYWQgVXNlci5SZWFkLkFsbCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUXhtTGZQaVdCRmRLdHRJMExIY1A5WFE1LTc1cE9VRWtLY0t6aUc0NEM2RSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6Ijc3N2NmZWZmLTgyZWYtNDVhOS1hMmI4LWI3OGE4MzAxMzhkMiIsInVuaXF1ZV9uYW1lIjoiamFoYW5hcmEua0B0bWF4LmluIiwidXBuIjoiamFoYW5hcmEua0B0bWF4LmluIiwidXRpIjoibHJzT0lkLXBSMEdOdnVFbU84SW5BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiOXhJR05COWFuUXlCeUczc0d2a0pIN1d4YUR4U01lanFqd3gzckRQT3E5MCJ9LCJ4bXNfdGNkdCI6MTU0ODA0NDQ3MH0.iMbHiNJYSONgNKD2JzhYIuyTDwNoSojmvZg-V_6MAVK39IiHKg_LPcSyJoef9WRVB8IRr_k45h6n9w8vPTr4voiIu1hDtCW9v_WmyLwfD7LpPxrciPPIg16jKZYMjly9z7WNCFnWs3PsOKl--CA15-KxL1sUEre5t84MLtTIS8FJVow8E6Yv6SLzNm9qruTcAf-yq69Xh8bok4cQc59a1re92syLc4EnbDlCAgkwNAX9Uvsu9cQeijRrbX9zrNZ9FcxO6S4_gxYRa_BwpyX5pvK67zClwuKB-93zRVY4gjjQ2Y37qunwxLRLv3hfUPRpQG1ebkXZKlbFVq18wxHl1w";
  const { title, name, modified, modifiedBy } = req.body;
  console.log(req.body, "policyy and procedure");
  console.log(title, "title");
  console.log(name);
  console.log(modified);
  console.log(modifiedBy);

  // const File = blobStorage(Attachment, Attachmentname)
  //  console.log(File, 'tththththth')
  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    console.log("policy data");
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
        `${BASE_PATH}/${Site_Id}/drives/${PolicyDriveId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log(data, "policy and procedure");
      // return data
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
    res.status(200).json({
      success: true,
      response: `Sucessfully Created`,
    });
  }
});

export { postPolicy };
