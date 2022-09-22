# Back-end

## Entidade

### Game
    *id
    *title
    *bannerUrl

### Ad
    *id
    *gameId
    *name
    *yearsPlaying
    *discord
    *weekDays
        [0 1 2 3 4 5 6](seg à dom)
    *hourStart
    *hourEnd
    *useVoiceChannel
        [0 or 1](false / true)
    *createdAt
        boa prática

## Casos de Uso
### Rotas
    __Cada comunicação do front com o back__
        . Listagem de games com contagem de anúncios
        . Criação de novo anúncio
        . Listagem de anuncios com base nos games
        . Buscar discord pelo ID do anúncio
