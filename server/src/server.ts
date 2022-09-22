import express from 'express'
import cors from 'cors'
// package.json > "type": "module"; e não o "common"
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors())
// o cors evita que front end externos acessem minha api
const prisma = new PrismaClient({
    log: ['query']
})
// HTTP Methods / API RESTful
// HTTP Codes -> .status(200,201,400,404,500)

// GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH

/*
    * Query: "?" ex: http://localhost:3333/ads?page=2
        -> Usados mais para persistir estado
    * Route: ex: http://localhost:3333/ads/5
    * Body: ex: http://localhost:3333/ fica escondido na requisicao
*/

// Listagem de todos os games
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ads: true,
                }
            }
        }
    })

    return response.json(games)
})

// Criação dos ads
app.post('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id
    const body: any = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    return response.status(201).json(ad)
})

// Listagem de anúncios por game
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id
    const ads = await prisma.ad.findMany({
        select: {
            id:true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // backend devolve JSON
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

// discord
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id
    // acha só 1 ou da erro, pois só um discord por anuncio
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })
    return response.json(ad)
})

app.listen(3333)
