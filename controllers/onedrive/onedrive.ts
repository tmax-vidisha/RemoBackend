import axios from "axios";
import express, { Request, Response } from "express";
// const qs = require('qs');
import fetch from "node-fetch";
// var multipart = require('connect-multiparty');
import upload from "express-fileupload";
// import {upload} from “express-fileupload”;
// import * as XLSX from 'xlsx';
import xlsx from "node-xlsx";
import moment from "moment";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PptxGenJS from "pptxgenjs";
import asyncHandler from "../../middleware/asyncHandler";
import { Console } from "console";
// import docx from 'docx';
const check =
  "https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'Agr.docx')";
// const { Document, Packer, Paragraph, TextRun } = docx;
const app = express();
// app.use(upload());
// app.use(express.urlencoded({ extended: true }));
// var multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });
// app.use(multipartMiddleware);

const uploadItemInOneDrive = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log(req.body)
    // const {token} = req.params

    // console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
    const token = req.headers.authorization;
    const { name } = req.body;
    // console.log(name, "gfhtht");

    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      // console.log("ooo");
      // const valid = await fetch(

      //   //   `https://graph.microsoft.com/v1.0/me/drive/root:/${file}.xlsx:/content`,

      //   //https://graph.microsoft.com/v1.0/me/drive/root/children

      //   // `https://graph.microsoft.com/v1.0/me/drive/items/{parent-id}:/${file}.xlsx:/content`,

      //   `https://graph.microsoft.com/v1.0/me/drive/root/children?$filter=startswith(name,'${name}')`,

      //   {

      //     method: 'GET',

      //     headers: {
      //       'Authorization': `Bearer ${token} `,
      //       'Content-Type': 'application/json'

      //     }

      //   })
      // const output = await valid.json();
      // console.log(output.value, 'lll')
      // //@ts-ignore
      // if (output.value?.length !== 0) {
      //   console.log('full')
      //   res.status(409).json({
      //     success: true,
      //     response: `${name} file already exists`

      //   });
      // }

      //create folder
      //  if(!name.includes(`.xlsx`) || !name.includes(`.pptx`) || !name.includes(`.docx`)){
      //   const Data ={
      //     "name":name,
      //     "folder": {}
      //   }
      //    try {
      //     const response = await fetch('https://graph.microsoft.com/v1.0/me/drive/root/children', {
      //       method: 'POST',
      //       headers: {
      //        'Authorization': `Bearer ${token}`,
      //         'Content-Type': 'application/json'
      //         },
      //         body:JSON.stringify(Data)
      //       });
      //       const data = await response.json();
      //       console.log(data)
      //       if(data !== 0){
      //         // console.log(`${name} file is created`)
      //         res.status(201).json({
      //           success: true,
      //            response:`${name} folder is created`

      //        });
      //       }

      //    }catch{
      //     res.status(404).json({
      //       success: false,
      //        response:`folder not created`

      //    });

      //    }

      //  }
      //xlsx file
      const data = [[" ", " "]];
      //@ts-ignore
      var buffer = xlsx.build([{ name: "", data: data }]);

      //docx file
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [new Paragraph({})],
          },
        ],
      });

      const b64string = await Packer.toBase64String(doc);
      const rrrr = Buffer.from(b64string, "base64");

      //pptx  file
      let pres = new PptxGenJS();
      //@ts-ignore
      // const pptData = await pres.write( 'base64')
      // Ex using: `const app = express();``
      const eeee = await pres.stream();
      //@ts-ignore
      const www = Buffer.from(eeee, "binary");

      //Uploading docx to onedrive
      if (name.includes(".docx")) {
        try {
          const result = await fetch(
            `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                // 'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              },
              //@ts-ignore
              body: rrrr,
            }
          );

          //   console.log(name,"upload excel file");

          //  console.log(result)
          const data = await result.json();
          //console.log(data);
          if (data !== 0) {
            // console.log(`${name} file is created`)
            res.status(201).json({
              success: true,
              response: `${name} file is created`,
            });
          }
        } catch {
          res.status(404).json({
            success: false,
            response: `file not created`,
          });
        }
        // return result
      }
      //   else  if(!name.includes('.docx')) {
      //     // console.log('Enter proper name')
      //  return   res.status(400).json({
      //       response:'Enter proper name'

      //    });
      //   }

      //uploading pptx to oneDrive
      else if (name.includes(".pptx")) {
        try {
          const result = await fetch(
            `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              },
              //@ts-ignore
              body: www,
            }
          );

          //   console.log(name,"upload excel file");

          //  console.log(result)
          const data = await result.json();
          console.log(data);
          if (data !== 0) {
            //console.log(`${name} file is created`);
            res.status(201).json({
              success: true,
              response: `${name}  is created`,
            });
          }
        } catch {
          res.status(404).json({
            success: false,
            response: `file not created`,
          });
        }
        // return result
      }
      // else if(!name.includes('.pptx')){
      //   // console.log('Enter proper name')
      //   res.status(404).json({
      //     success: false,
      //      response:'Enter proper name'

      //  });
      // }

      //uploading xlsx file to one drive
      else if (name.includes(".xlsx")) {
        try {
          const result = await fetch(
            `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

            {
              method: "PUT",

              headers: {
                Authorization: `Bearer ${token}`,

                "Content-Type":
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              },
              //@ts-ignore
              body: buffer,
            }
          );

          //   console.log(name,"upload excel file");

          //  console.log(result)
          const data = await result.json();
          if (data !== 0) {
            res.status(201).json({
              success: true,
              response: `${name}  is created`,
            });
          }
        } catch {
          res.status(404).json({
            success: false,
            response: `file not created`,
          });
        }
        // return result
      } else {
        const Data = {
          name: name,
          folder: {},
        };
        try {
          const response = await fetch(
            "https://graph.microsoft.com/v1.0/me/drive/root/children",
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
          //console.log(data);
          if (data !== 0) {
            // console.log(`${name} file is created`)
            res.status(201).json({
              success: true,
              response: `${name} folder is created`,
            });
          }
        } catch {
          res.status(404).json({
            success: false,
            response: `folder not created`,
          });
        }
      }

      //  const result = await fetch(

      //     //   `https://graph.microsoft.com/v1.0/me/drive/root:/${file}.xlsx:/content`,

      //     //https://graph.microsoft.com/v1.0/me/drive/root/children

      //    // `https://graph.microsoft.com/v1.0/me/drive/items/{parent-id}:/${file}.xlsx:/content`,

      //       `https://graph.microsoft.com/v1.0/me/drive/root:/${name}:/content`,

      //       {

      //         method: 'PUT',

      //         headers: {

      //           Authorization: `Bearer ${token}`,

      //          //'Content-Type': 'application/json'

      //         //  'Content-Type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      //         'Content-Type': "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      //         // 'Content-Type': "application/vnd.openxmlformats-officedocument.presentationml.presentation",

      //         //  'Content-Type': 'application/vnd.ms-excel'

      //           //'Content-Type': 'application/vnd.ms-excel.sheet.macroEnabled.12'

      //         //   'Content-Type': 'text/plain'

      //     //    ' Content-Type':"application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8"

      //         },
      //        //@ts-ignore
      //         body:rrrr

      //       })

      //     //   console.log(name,"upload excel file");

      //   console.log(result)

      // res.status(200).json({
      //     success: true,
      //      response:answer

      //  });
    }
  }
);

const getAllOneDriveItemsRoot = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.headers.authorization, "all one drive");

    const token = req.headers.authorization;
    // console.log(req.body);
    // const { token } = req.params
    // //  const {token} = req.body
    // console.log(token, "llll");
    // console.log(req.body,'gregrthtrht')
    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.get(
          `https://graph.microsoft.com/v1.0/me/drive/root/children`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      // console.log(response.data.value, "root");
      res.status(200).json({
        success: true,
        response: response.data.value,
      });
    }
  }
);
const getOneDriveItemChildren = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log(req.body)
    // const {token} = req.params

    // console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
    const token = req.headers.authorization;
    const { ItemId, Name } = req.body;
    // console.log(ItemId, Name, "gfhtht");

    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      // console.log("trytrtjtjytaxczc");
      if (ItemId) {
        const response =
          // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
          await axios.get(
            `https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}/children`,
            {
              headers: {
                Authorization: `Bearer ${token} `,
                "Content-Type": "application/json",
              },
            }
          );
        // console.log(response.data.value, "ItemChildren");
        res.status(200).json({
          success: true,
          response: response.data.value,
        });
      } else {
        const response =
          // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
          await axios.get(
            `https://graph.microsoft.com/v1.0/me/drive/root/children`,
            {
              headers: {
                Authorization: `Bearer ${token} `,
                "Content-Type": "application/json",
              },
            }
          );
        // console.log(response.data.value, "ItemChildren");
        res.status(200).json({
          success: true,
          response: response.data.value,
        });
      }
    }
  }
);

const deleteOneDriveItem = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params

  // console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
  const token = req.headers.authorization;
  const { ItemId, Name } = req.body;
  // console.log(ItemId, Name, "treytrutusc");

  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    // console.log("deklee");
    if (ItemId) {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.delete(
          `https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      const data = await response.data;
      //  console.log(data, "kky");
      res.status(200).json({
        success: true,
        response: data,
      });
    }
  }
});

const copylinkDriveItem = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params

  //console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
  const token = req.headers.authorization;
  const { ItemId, Name } = req.body;
  //console.log(ItemId, Name, "ewfeu87uedsfdfbfbc");

  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    //console.log("dekleeewwrw465776uhfdbfngngn");
    if (ItemId) {
      const permission = {
        type: "view",

        scope: "anonymous",
      };
      // const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      //     await axios.post(`https://graph.microsoft.com/v1.0//me/drive/items/${ItemId}/createLink`, {
      //     headers: {
      //         'Authorization': `Bearer ${token} `,
      //         'Content-Type': 'application/json'

      //       },
      //       body:permission

      // })
      // const data = await response.data
      // console.log(data,'kky')
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}/createLink`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(permission),
        }
      );
      const data = await response.json();
      // console.log(data, "rty");
      const mydata = data.link.webUrl;

      res.status(200).json({
        success: true,
        response: mydata,
      });
    }
  }
});

const getAllOneDriveSharedItems = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log(
    //   req.headers.authorization,
    //   "tfssadsa"
    // );

    const token = req.headers.authorization;
    // console.log(req.body);
    // const { token } = req.params
    // //  const {token} = req.body
    // console.log(token, "llll");
    // console.log(req.body,'gregrthtrht')
    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.get(
          `https://graph.microsoft.com/v1.0/me/drive/sharedWithMe`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      // console.log(response.data.value, "root");
      res.status(200).json({
        success: true,
        response: response.data.value,
      });
    }
  }
);
const getAllOneDrivePolicyItems = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.headers.authorization, "policyy");
    // const token =
    //   "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9ZNlF1ZjZCWUZNbWljcjgtMHdsWHF1T0ZXTnFTcU42NDFsdHZ5VWduNkEiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NzdjZmVmZi04MmVmLTQ1YTktYTJiOC1iNzhhODMwMTM4ZDIvIiwiaWF0IjoxNjkzODAxOTU0LCJuYmYiOjE2OTM4MDE5NTQsImV4cCI6MTY5Mzg4ODY1NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhVQUFBQUU0K3ZTVkNiclZBeEJ0RitoV20rVWtZY3UvZkRSUjgwdkJUQVRFNXA0OUhMQlZqT1k2SGNOZWl5VzFnRmFnY3lscTRkRU9Sc2ZzRUJUY1ZXdHY4UjIrdmdCUVFINXNEN2N0WWg4dFdEenZNPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2hhdHVuIiwiZ2l2ZW5fbmFtZSI6IkphaGFuYXJhIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTE2LjIwNi4yMjIuMTMwIiwibmFtZSI6IkphaGFuYXJhIEtoYXR1biIsIm9pZCI6IjU2Nzk4ODgzLTMwMjUtNGFmNy1iMTliLTg2Nzc5OTY5MTc3OCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMUM4NEE4MTA1IiwicmgiOiIwLkFWTUFfXzU4ZC0tQ3FVV2l1TGVLZ3dFNDBnTUFBQUFBQUFBQXdBQUFBQUFBQUFERkFCOC4iLCJzY3AiOiJBY2Nlc3NSZXZpZXcuUmVhZC5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIEFQSUNvbm5lY3RvcnMuUmVhZC5BbGwgQVBJQ29ubmVjdG9ycy5SZWFkV3JpdGUuQWxsIENhbGVuZGFycy5SZWFkLlNoYXJlZCBDaGFubmVsLlJlYWRCYXNpYy5BbGwgQ2hhbm5lbFNldHRpbmdzLlJlYWQuQWxsIENoYW5uZWxTZXR0aW5ncy5SZWFkV3JpdGUuQWxsIEN1c3RvbUF1dGhlbnRpY2F0aW9uRXh0ZW5zaW9uLlJlYWQuQWxsIEN1c3RvbUF1dGhlbnRpY2F0aW9uRXh0ZW5zaW9uLlJlYWRXcml0ZS5BbGwgQ3VzdG9tU2VjQXR0cmlidXRlQXNzaWdubWVudC5SZWFkLkFsbCBDdXN0b21TZWNBdHRyaWJ1dGVBc3NpZ25tZW50LlJlYWRXcml0ZS5BbGwgQ3VzdG9tU2VjQXR0cmlidXRlRGVmaW5pdGlvbi5SZWFkLkFsbCBDdXN0b21TZWNBdHRyaWJ1dGVEZWZpbml0aW9uLlJlYWRXcml0ZS5BbGwgRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgRGlyZWN0b3J5LlJlYWQuQWxsIERpcmVjdG9yeS5SZWFkV3JpdGUuQWxsIEZpbGVzLlJlYWQgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgR3JvdXAuUmVhZC5BbGwgR3JvdXAuUmVhZFdyaXRlLkFsbCBJZGVudGl0eVJpc2t5VXNlci5SZWFkLkFsbCBJZGVudGl0eVJpc2t5VXNlci5SZWFkV3JpdGUuQWxsIG9wZW5pZCBwcm9maWxlIFJlcG9ydHMuUmVhZC5BbGwgU2l0ZXMuUmVhZC5BbGwgU2l0ZXMuUmVhZFdyaXRlLkFsbCBUZWFtLlJlYWRCYXNpYy5BbGwgVGVhbXNBY3Rpdml0eS5SZWFkIFRlYW1zQWN0aXZpdHkuU2VuZCBUZWFtc0FwcC5SZWFkIFRlYW1zQXBwLlJlYWQuQWxsIFRlYW1zQXBwLlJlYWRXcml0ZSBUZWFtc0FwcC5SZWFkV3JpdGUuQWxsIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JDaGF0IFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JUZWFtIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRGb3JVc2VyIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZUZvckNoYXQgVGVhbXNBcHBJbnN0YWxsYXRpb24uUmVhZFdyaXRlRm9yVGVhbSBUZWFtc0FwcEluc3RhbGxhdGlvbi5SZWFkV3JpdGVGb3JVc2VyIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JDaGF0IFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JUZWFtIFRlYW1zQXBwSW5zdGFsbGF0aW9uLlJlYWRXcml0ZVNlbGZGb3JVc2VyIFRlYW1TZXR0aW5ncy5SZWFkLkFsbCBUZWFtU2V0dGluZ3MuUmVhZFdyaXRlLkFsbCBUZWFtc1RhYi5DcmVhdGUgVGVhbXNUYWIuUmVhZC5BbGwgVGVhbXNUYWIuUmVhZFdyaXRlLkFsbCBUZWFtc1RhYi5SZWFkV3JpdGVGb3JDaGF0IFRlYW1zVGFiLlJlYWRXcml0ZUZvclRlYW0gVGVhbXNUYWIuUmVhZFdyaXRlRm9yVXNlciBVc2VyLlJlYWQgVXNlci5SZWFkLkFsbCBVc2VyLlJlYWRCYXNpYy5BbGwgVXNlci5SZWFkV3JpdGUgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiUXhtTGZQaVdCRmRLdHRJMExIY1A5WFE1LTc1cE9VRWtLY0t6aUc0NEM2RSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6Ijc3N2NmZWZmLTgyZWYtNDVhOS1hMmI4LWI3OGE4MzAxMzhkMiIsInVuaXF1ZV9uYW1lIjoiamFoYW5hcmEua0B0bWF4LmluIiwidXBuIjoiamFoYW5hcmEua0B0bWF4LmluIiwidXRpIjoibHJzT0lkLXBSMEdOdnVFbU84SW5BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiOXhJR05COWFuUXlCeUczc0d2a0pIN1d4YUR4U01lanFqd3gzckRQT3E5MCJ9LCJ4bXNfdGNkdCI6MTU0ODA0NDQ3MH0.iMbHiNJYSONgNKD2JzhYIuyTDwNoSojmvZg-V_6MAVK39IiHKg_LPcSyJoef9WRVB8IRr_k45h6n9w8vPTr4voiIu1hDtCW9v_WmyLwfD7LpPxrciPPIg16jKZYMjly9z7WNCFnWs3PsOKl--CA15-KxL1sUEre5t84MLtTIS8FJVow8E6Yv6SLzNm9qruTcAf-yq69Xh8bok4cQc59a1re92syLc4EnbDlCAgkwNAX9Uvsu9cQeijRrbX9zrNZ9FcxO6S4_gxYRa_BwpyX5pvK67zClwuKB-93zRVY4gjjQ2Y37qunwxLRLv3hfUPRpQG1ebkXZKlbFVq18wxHl1w";
    const token = req.headers.authorization;
    console.log(req.body, "policY");
    // const { token } = req.params
    // //  const {token} = req.body
    console.log(token, "policY shdgfdjsgfj");
    // console.log(req.body,'gregrthtrht')
    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPU-UPjxittT53b2Hcjy4dk/root/children', {
        //await axios.get(`https://graph.microsoft.com/v1.0/me/drive/policiesContentPage`, {
        await axios.get(
          "https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPU-UPjxittT53b2Hcjy4dk/root/children",
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      console.log(response, "root Policy uuu");
      res.status(200).json({
        success: true,
        response: response.data.value,
      });
    }
  }
);
const getAllOneDriveDocumentItems = asyncHandler(
  async (req: Request, res: Response) => {
    //console.log(req.headers.authorization, "Documents library");

    const token = req.headers.authorization;
    //console.log(req.body);
    // const { token } = req.params
    // //  const {token} = req.body
    // console.log(token, "Documents library");
    // console.log(req.body,'gregrthtrht')
    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.get(
          `https://graph.microsoft.com/v1.0/me/drive/getDocuments`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      //console.log(response.data.value, "all documents");
      res.status(200).json({
        success: true,
        response: response.data.value,
      });
    }
  }
);

const getAllOneDriveRecentFiles = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log(
    //   req.headers.authorization,
    //   "tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy"
    // );

    const token = req.headers.authorization;
    //console.log(req.body);
    // const { token } = req.params
    // //  const {token} = req.body
    // console.log(token, "llll");
    // console.log(req.body,'gregrthtrht')
    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.get(`https://graph.microsoft.com/v1.0/me/drive/recent`, {
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
        });
      // console.log(response.data.value, "root");
      res.status(200).json({
        success: true,
        response: response.data.value,
      });
    }
  }
);

const getAllOneDriveItemDownloadUrl = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log(
    //   req.headers.authorization,
    //   "tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy"
    // );
    const token = req.headers.authorization;
    const { ItemId, Name } = req.body;
    //console.log(ItemId, Name, "treytrutusc");

    if (!token) {
      return res.status(404).json({
        success: false,
        error: "No Token found",
      });
    } else {
      //console.log("deklee");
      if (ItemId) {
        const response =
          // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
          await axios.get(
            `https://graph.microsoft.com/v1.0/me/drive/items/${ItemId}`,
            {
              headers: {
                Authorization: `Bearer ${token} `,
                "Content-Type": "application/json",
              },
            }
          );
        const data = await response.data;
        //console.log(data["@microsoft.graph.downloadUrl"], "kky");
        res.status(200).json({
          success: true,
          response: data["@microsoft.graph.downloadUrl"],
        });
      }
    }
  }
);

const getAllStarred = asyncHandler(async (req: Request, res: Response) => {
  // console.log(
  //   req.headers.authorization,
  //   "tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy"
  // );

  const token = req.headers.authorization;
  // console.log(req.body)
  // const {token} = req.params
  //  const {token} = req.body
  // console.log(token, "llll");
  // console.log(req.body,'gregrthtrht')
  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(
        `https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikMF_Pl86wt6RJ301fEG4lAL/root/children`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
        }
      );

    // const responseTop =
    //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
    //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
    //     headers: {
    //         'Authorization': `Bearer ${token} `,
    //         'Content-Type': 'application/json'

    //       }

    // })
    //console.log(response.data.value, "meetingssssssssssssssssssssssss");
    res.status(200).json({
      success: true,
      response: response.data.value,
      //   response1:responseTop.data.value
    });
  }
});
const getAllTrashed = asyncHandler(async (req: Request, res: Response) => {
  // console.log(
  //   req.headers.authorization,
  //   "tfssadsadsadasdsaasdasdsadsadsadssccccttddddttttvvvvvtttttttyy"
  // );

  const token = req.headers.authorization;
  // console.log(req.body)
  // const {token} = req.params
  //  const {token} = req.body
  //console.log(token, "llll");
  // console.log(req.body,'gregrthtrht')
  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    const response =
      // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
      await axios.get(
        `https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPA6Y9HwDJ4TLznL7CJStDS/root/children`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
            "Content-Type": "application/json",
          },
        }
      );

    // const responseTop =
    //   // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
    //     await axios.get(`${BASE_PATH}/${Site_Id}/lists/${RemoNews_Id}/items?$expand=fields&$top=5`, {
    //     headers: {
    //         'Authorization': `Bearer ${token} `,
    //         'Content-Type': 'application/json'

    //       }

    // })
    // console.log(response.data.value, "meetingssssssssssssssssssssssss");
    res.status(200).json({
      success: true,
      response: response.data.value,
      //   response1:responseTop.data.value
    });
  }
});

const deleteTrashedItem = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params

  // console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
  const token = req.headers.authorization;
  const { ItemId, Name } = req.body;
  // console.log(ItemId, Name, "treytrutusc");

  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    // console.log("deklee");
    if (ItemId) {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.delete(
          `https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikPA6Y9HwDJ4TLznL7CJStDS/items/${ItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      const data = await response.data;
      // console.log(data, "kky");
      res.status(200).json({
        success: true,
        response: "Deleted Successfully",
      });
    }
  }
});

const deleteStarredItem = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body)
  // const {token} = req.params

  //console.log(req.headers.authorization, "tssccccttddddttttvvvvvtttttttyy");
  const token = req.headers.authorization;
  const { ItemId, Name } = req.body;
  // console.log(ItemId, Name, "treytrutusc");

  if (!token) {
    return res.status(404).json({
      success: false,
      error: "No Token found",
    });
  } else {
    //console.log("deklee");
    if (ItemId) {
      const response =
        // await axios.get('https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location', {
        await axios.delete(
          `https://graph.microsoft.com/v1.0/sites/tmxin.sharepoint.com,39018770-3534-4cef-a057-785c43b6a200,47c126a5-33ee-420a-a84a-c8430a368a43/drives/b!cIcBOTQ170ygV3hcQ7aiAKUmwUfuMwpCqErIQwo2ikMF_Pl86wt6RJ301fEG4lAL/items/${ItemId}`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
              "Content-Type": "application/json",
            },
          }
        );
      const data = await response.data;
      // console.log(data, "kky");
      res.status(200).json({
        success: true,
        response: "Deleted Successfully",
      });
    }
  }
});

export {
  uploadItemInOneDrive,
  getAllOneDriveItemsRoot,
  getOneDriveItemChildren,
  deleteOneDriveItem,
  copylinkDriveItem,
  getAllOneDriveSharedItems,
  getAllOneDriveRecentFiles,
  getAllOneDriveItemDownloadUrl,
  getAllStarred,
  getAllTrashed,
  deleteTrashedItem,
  deleteStarredItem,
  getAllOneDriveDocumentItems,
  getAllOneDrivePolicyItems,
};
