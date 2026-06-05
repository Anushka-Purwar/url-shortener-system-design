import {prisma} from "../config/prisma";
import { encodebase62 } from "../utils/base62";
import { ConflictError } from "../errors/url.errors";
import { redis } from "../config/redis";

export class UrlService{
    /*--------helper functions------------------*/
    async invalidateCache(shortCode: string) {
        await redis.del(shortCode);
    }

    async findUrl(shortCode: string){
        return  prisma.url.findUnique({
        where: {
            shortCode,
            },
        });
    }

    /*--------service functions------------------*/

    //create url service
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

    //redirect logic to get link from shortCode
    async redirect(shortCode : string) {

        const cache = await redis.get(shortCode)

        if (cache) {
            return JSON.parse(cache);
        }


        const url = await prisma.url.findUnique({
        where: {
            shortCode,
            },
        });

        if (!url) {
            return null;
        }

        await redis.set(
            shortCode,
            JSON.stringify({
                ...url,
                id: url.id.toString()
            }),
            {
                EX: 3600
            }
        );

       return url
    }

    //increment clicks based on how many hits user made in db
    async incrementClicks(shortCode : string){

        const url =  await this.findUrl(shortCode)
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

    //service to get status of urls
    async stats(shortCode : string){

        const url =  await this.findUrl(shortCode)
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

        const url =  await this.findUrl(shortCode)
        if (!url) {
            return null;
        }

        await this.invalidateCache(shortCode);

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

        const url =  await this.findUrl(shortCode)
        if (!url) {
            return null;
        }

        await this.invalidateCache(shortCode);

        return prisma.url.update({
            where:{
                shortCode
            },
            data:{
                isActive
            }
        })
    }

    // deletedAt logic implementation
    async deleteUrlService(shortCode: string, deletedAt : Date){

        const url =  await this.findUrl(shortCode)
        if (!url) {
            return null;
        }

        await this.invalidateCache(shortCode);

        return prisma.url.update({
            where:{
                shortCode
            },
            data:{
                deletedAt
            }
        })
    }

    //creating click event for better analytics
    async clickEventService(shortCode: string){
        return prisma.clickEvent.create({
            data:{
                shortCode
            }
        })
    }

    //fetching click analytics from clickEvent model
    async fetchAnalytics(shortCode: string){

        const [totalClicks, last24Hours, last7Days] = await Promise.all([
            prisma.clickEvent.count({
                where: {
                    shortCode,
                } 
            }),
            prisma.clickEvent.count({
                where: {
                    shortCode,
                    clickedAt: {
                        gte: new Date(
                            Date.now() -
                            24 * 60 * 60 * 1000
                        ),
                    },
                },
            }),
            prisma.clickEvent.count({
            where: {
                shortCode,
                clickedAt: {
                    gte: new Date(
                        Date.now() -
                        7 * 24 * 60 * 60 * 1000
                    ),
                },
            },
        })
        ])

    
        return {
            totalClicks,
            last24Hours,
            last7Days,
        };
    }

}