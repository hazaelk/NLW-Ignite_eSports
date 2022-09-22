# Back-end

## Entidade

### Game

id
title
bannerUrl

<!-- CDN (Amazon S3) (Content Delivery Network) -->
### Ad

id
gameId
name
yearsPlaying
discord
weekDays
    0 1 2 3 4 5 6 (seg à dom)
hourStart
hourEnd
useVoiceChannel
    boolean 0 or 1
createdAt
    boa prática

## Casos de Uso
-> Rotas
    Cada comunicação do front com o back
    1. Listagem de games com contagem de anúncios
    2. Criação de novo anúncio
    3. Listagem de anuncios com base nos games
    4. Buscar discord pelo ID do anúncio