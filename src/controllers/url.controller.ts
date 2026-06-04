import { Request, Response } from "express";
import { UrlService } from "../services/url.service.js";
import { updateExpirationSchema, validateActiveBool, validateDeletedAt, validateUrl } from "../validators/url.validation.js";
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
    const result = await urlService.createUrl(valid.data.originalUrl, valid.data.customAlias, valid.data.expiresAt);

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

    if(!url.isActive || (url.expiresAt && url.expiresAt < new Date()) || (url.deletedAt && url.deletedAt < new Date())){
        return res.status(410).json({
            message: "This link is no longer active"
        })
    }

    await urlService.incrementClicks(shortCode);

    return res.redirect(url.originalUrl);

  } catch (error) {
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

// to update expiration link

export async function updateExpiration(req: Request, res: Response){
    const {shortCode} = req.params
    const {expiresAt} = req.body

    const valid = updateExpirationSchema.safeParse({shortCode, expiresAt})

    if(!valid.success){
        return res.status(400).json({
            errors : z.prettifyError(valid.error)
        })
    }

    const url = await urlService.updateExpirationDate(valid.data.shortCode,new Date(valid.data.expiresAt))

    if(!url){
        return res.status(404).json({
            message : "url not found for this particular code"
        })
    }

    return res.status(200).json({
        message: "Expiry date updated successfully",
        shortCode: url.shortCode,
        expiresAt: url.expiresAt,
    })
}

// Function to make link active or inactive
export async function updateStatus(req: Request, res: Response){
    try{
        const { shortCode} = req.params
        const {isActive} = req.body
    
        const valid = validateActiveBool.safeParse({shortCode,isActive})
    
        if(!valid.success){
            return res.status(400).json({
                errors : z.prettifyError(valid.error)
            })
        }
    
        const url = await urlService.updateLinkActivation(valid.data.isActive,valid.data.shortCode)
    
        if(!url){
            return res.status(404).json({
                message : "url not found for this particular code"
            })
        }
    
        return res.status(200).json({
            message: "Link updates sucessfully",
            shortCode: url.shortCode,
            isActive : url.isActive
        })
    }catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export async function deleteUrl(req : Request, res : Response){
    try{
        const { shortCode} = req.params
        const {deletedAt} = req.body
    
        const valid = validateDeletedAt.safeParse({shortCode,deletedAt})
    
        if(!valid.success){
            return res.status(400).json({
                errors : z.prettifyError(valid.error)
            })
        }
    
        const url = await urlService.deleteUrlService(valid.data.shortCode,new Date(valid.data.deletedAt))
    
        if(!url){
            return res.status(404).json({
                message : "url not found for this particular code"
            })
        }
    
        return res.status(200).json({
            message: "Delete date added successfully",
            shortCode: url.shortCode,
            deletedAt : url.deletedAt
        })
    }catch (error) {
        
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }


}

