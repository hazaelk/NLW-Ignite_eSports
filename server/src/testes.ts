interface Ad {
    id: string;
    name: string;
    createdAt: Date;
}

function calculaTempoDePublicacaoDoAnuncio(ad: Ad) {
    // calculo a quantos dias foi postado
}

calculaTempoDePublicacaoDoAnuncio({
    // qualquer um desses que não estiver no objt dará erro
    id: '1',
    name: 'Ad 01',
    createdAt: new Date(),
})
