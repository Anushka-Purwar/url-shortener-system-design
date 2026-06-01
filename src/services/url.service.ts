import {prisma} from "../config/prisma";
import { encodebase62 } from "../utils/base62";

export class UrlService{
    async createUrl(originalUrl : string){
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
}