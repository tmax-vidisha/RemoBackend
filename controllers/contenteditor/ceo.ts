//@ts-nocheck
import axios from "axios";
import express, { Request, Response } from "express";
import azure from "azure-storage";
require("dotenv").config();
import fetch from "node-fetch";
import asyncHandler from "./../../middleware/asyncHandler";
const Site_Id =
  "tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43";
const Announcement_Id = "4d933ed8-bce3-4429-9af6-8e509eb6d2dc";
const BASE_PATH = `https://graph.microsoft.com/v1.0/sites`;

function blobStorage(image: any, imageName: any) {
  //@ts-ignore
  var blobService = azure.createBlobService(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches !== null) {
    var type = matches[1];
    //@ts-ignore
    var buffer = new Buffer.from(matches[2], "base64");
    const containerName = "candidate";
    const blobName = imageName;
    //@ts-ignore
    blobService.createBlockBlobFromText(
      containerName,
      blobName,
      buffer,
      { contentType: type },
      function (error, result, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 300);
    var expiryDate = new Date(startDate);
    // expiryDate.setMinutes(startDate.getMinutes() + 300);
    expiryDate.setMonth(startDate.getMonth() + 12);
    var sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ], //grent read permission only
        Start: startDate,
        Expiry: expiryDate,
      },
    };
    console.log(sharedAccessPolicy, "iiii");
    //@ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(
      containerName,
      blobName,
      sharedAccessPolicy
    );
    var response = {};
    //@ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    //@ts-ignore
    console.log(response.image);

    //@ts-ignore
    return response.image;
  }
}

function blobStorage1(image: any, imageName: any) {
  //@ts-ignore
  var blobService = azure.createBlobService(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches !== null) {
    var type = matches[1];
    //@ts-ignore
    var buffer = new Buffer.from(matches[2], "base64");
    const containerName = "candidate";
    const blobName = imageName;
    //@ts-ignore
    blobService.createBlockBlobFromText(
      containerName,
      blobName,
      buffer,
      { contentType: type },
      function (error, result, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      }
    );
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 300);
    var expiryDate = new Date(startDate);
    // expiryDate.setMinutes(startDate.getMinutes() + 300);
    expiryDate.setMonth(startDate.getMonth() + 12);
    var sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ], //grent read permission only
        Start: startDate,
        Expiry: expiryDate,
      },
    };
    console.log(sharedAccessPolicy, "iiii");
    //@ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(
      containerName,
      blobName,
      sharedAccessPolicy
    );
    var response = {};
    //@ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    //@ts-ignore
    console.log(response.image);

    //@ts-ignore
    return response.image;
  }
}

const postCeo = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params
  console.log(req.headers.authorization, "ceoooo");
  const token = req.headers.authorization;
  const {
    // token,
    title,
    description,
    image,
    imageName,
    isActive,
    Attachment,
    Attachmentname,
    designation,
    Name,
    isDraft,
    // ceotitle,ceodesc,ceousername,
    //  ceoposition,ceopic,ceopicname,
    //  newstitle,newsdesc,newspic,newspicname,
    //  employyetitle, empname,empdept,emppic,emppicname,
    //  userquicklink,globalquicklink
  } = req.body;
  console.log(isActive, "isActive");
  console.log(isDraft, "isDraft");
  const Image = blobStorage(image, imageName);
  // const File = blobStorage1(Attachment, Attachmentname)
  console.log(Image, "rtretrt");
  //  console.log(File, 'tththththth')
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
      error: "No Token found",
    });
  } else {
    console.log("lllllllllllllllllllllllll");
    const Data = {
      fields: {
        Title: title,
        Description: description,
        Designation: designation,
        Image: Image,
        isActive: isActive,
        Designation: designation,
        Name: Name,
        //  Attachment:File,
        isDraft: isDraft,

        //@ts-ignore
        // heroUrl: response.image
      },
    };
    try {
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/lists/17897d96-e2f4-4e34-a48e-a312836fca40/items`,
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

export { postCeo };
