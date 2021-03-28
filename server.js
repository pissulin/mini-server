const rp = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')


const express = require('express')
const app =  express()
const router = express.Router()

app.use(express.json({extended:true}))

router.get('/api/v1/cotacao', (req, res) => {
  
  const options = {
    uri: 'https://valor.globo.com/valor-data/',
    transform: function(body){
        return cheerio.load(body)
    }
}

const cotacoes = []
rp(options)
.then(($)=>{
            $('.valor-data__components-container').each((i, item)=>{
    
                let valoresCotacoes = $(item).find('.data-cotacao__ticker').text()
    
                const dolarComarcial = ((valoresCotacoes.substring(0,17).trim()))
                const dolarComercialValor =((valoresCotacoes.substring(19,25).trim()))
    
                const dolarPtaxNome = ((valoresCotacoes.substring(34,50).trim()))
                const dolarPtaxValor = ((valoresCotacoes.substring(50,57).trim()))
    
                const dolarTurismoNome = ((valoresCotacoes.substring(65,86).trim()))
                const dolarTurismoValor = ((valoresCotacoes.substring(85,93).trim()))
    
                const euroComercialNome = ((valoresCotacoes.substring(100,120).trim()))
                const euroComercialValor = ((valoresCotacoes.substring(120, 130).trim()))
    
                const euroXdolarNome = ((valoresCotacoes.substring(140, 155).trim()))
                const euroXdolarValor = ((valoresCotacoes.substring(155, 164).trim()))
    
                
                //const cotacao = readFile()
                cotacoes.push(
                        {moeda: dolarComarcial,valor: dolarComercialValor},
                        {moeda: dolarTurismoNome, valor: dolarTurismoValor},
                        {moeda: dolarPtaxNome, valor: dolarPtaxValor},
                        {moeda: euroComercialNome, valor: euroComercialValor},
                        {moeda: euroXdolarNome, valor: euroXdolarValor}
                )
                    //save(cotacao)
            })
        })
        
        .then(()=> {
  
          res.send(cotacoes)
        })
        
        .catch((err)=>{
            console.log(err)
    })

});

app.use(router)

app.listen('8080', () => {
  console.log(`Servidor rodando na porta 8080`)
});