import { execSync } from "node:child_process";
import {prisma} from "../config/prisma";
import { encodebase62 } from "../utils/base62";
import { error } from "node:console";
import { ConflictError } from "../errors/url.errors";

export class UrlService{
    async createUrl(originalUrl : string, customAlias? :string){
        
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
                shortCode : customAlias ?? shortUrl
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