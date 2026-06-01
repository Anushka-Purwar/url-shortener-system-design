import { Request, Response } from "express";
import { UrlService } from "../services/url.service.js";

const urlService = new UrlService();

export async function createShortUrl(req: Request, res: Response) {
  try {
    const { originalUrl } = req.body;

    const result = await urlService.createUrl(originalUrl);

    return res.status(200).json({
        ...result,
        id : result.id.toString()
    });

  } 
  catch (error) {
    return res.status(500).json({
      message: "Internal Server Errorss",
    });
  }
}

export async function healthCheck(req : Request, res : Response){
    try{
        return res.status(200).json({
            status : "ok"
        })
    }catch{
        return res.status(500).json({
            message : "internal error"
        })
    }
}