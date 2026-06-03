import { Request, Response } from "express";
import { UrlService } from "../services/url.service.js";
import { validateUrl } from "../validators/url.validation.js";
import z from "zod";
import { ConflictError } from "../errors/url.errors.js";

const urlService = new UrlService();
interface RedirectParams {
  shortCode: string;
}

export async function createShortUrl(req: Request, res: Response) {
  try {
    const valid = validateUrl.safeParse(req.body);
    if(!valid.success){
        return res.status(400).json({
            errors : z.prettifyError(valid.error)
        })
    }
    const result = await urlService.createUrl(valid.data.originalUrl, valid.data.customAlias);

    return res.status(200).json({
        ...result,
        id : result.id.toString()
    });

  }catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).json({
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
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

export async function redirect(req : Request<RedirectParams>, res : Response){
    try {
    const { shortCode } = req.params;

    const url = await urlService.redirect(shortCode)

    if(!url){
        return res.status(404).json({
            message : "url not found for this particular code"
        })
    }
    await urlService.incrementClicks(shortCode);
    return res.redirect(url.originalUrl);
  } 
  catch (error) {
    return res.status(500).json({
      message: "Internal Server Errorss",
    });
  }
}

export async function findStats(req : Request<RedirectParams>, res: Response) {
    try{
        const {shortCode} = req.params;
        const url = await urlService.stats(shortCode)
        if(!url){
            return res.status(404).json({
            message : "url not found for this particular code"
            })
        }
        return res.status(200).json({
        ...url,
        id : url.id.toString()
    });
    }catch{
        return res.status(500).json({
      message: "Internal Server Errorss",
    });
    }
}

