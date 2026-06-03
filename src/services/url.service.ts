import {prisma} from "../config/prisma";
import { encodebase62 } from "../utils/base62";
import { ConflictError } from "../errors/url.errors";

export class UrlService{

    async createUrl(originalUrl : string, customAlias? :string, expiresAt?: string){
        
        if(customAlias){
            const aliasExsist = await prisma.url.findUnique({
                where: {
                    shortCode : customAlias
                }
            })

            if (aliasExsist) {
                throw new ConflictError(
                    "Alias already exists"
                );
            }
        }


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
                shortCode : customAlias ?? shortUrl,
                expiresAt : expiresAt
            }

        });

        return updateUrl;
    }

    async redirect(shortCode : string) {
        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }
        return prisma.url.findUnique({
            where:{
                shortCode
            }
        })
    }

    async incrementClicks(shortCode : string){
        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }

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
        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }

        return  prisma.url.findUnique({
            where:{
                shortCode
            }
        })
    }

    // if alias and link already exsist and user need to update expiration date then patch 

    async updateExpirationDate(shortCode: string, expiresAt: Date){
        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }

        return prisma.url.update({
            where:{
                shortCode
            },
            data:{
                expiresAt
            }
        })
    }

    // update db for isActive
    async updateLinkActivation(isActive: boolean, shortCode: string){
        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }

        return prisma.url.update({
            where:{
                shortCode
            },
            data:{
                isActive
            }
        })
    }
}