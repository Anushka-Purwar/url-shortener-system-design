import {prisma} from "../config/prisma";
import { encodebase62 } from "../utils/base62";

export class UrlService{
    async createUrl(originalUrl : string){
        const existing = await prisma.url.findUnique({
            where : {
                originalUrl,
            }
        });

        if(existing) return existing;
        const url = await prisma.url.create({
            data : {
                originalUrl
            }
        });

        const shortUrl = encodebase62(url.id);

        const updateUrl = await prisma.url.update({
            where: {
                id : url.id
            },
            data : {
                shortCode : shortUrl
            }

        });

        return updateUrl;
    }

    async redirect(shortCode : string) {
        return prisma.url.findUnique({
            where:{
                shortCode
            }
        })
    }

    async incrementClicks(shortCode : string){
        return prisma.url.update({
            where:{
                shortCode,
            },
            data:{
                clicks:{
                    increment : 1
                }
            }

        })
    }

    async stats(shortCode : string){
        return  prisma.url.findUnique({
            where:{
                shortCode
            }
        })
    }
}