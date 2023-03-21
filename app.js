const timestamp = (new Date()).getTime()
const publicKey = 'f656deb32ac72497ec37611bf984be40'
const privateKey = '26fa7362acd67864becd350beca709825d7b5129'
const hash = timestamp + privateKey + publicKey
const hashMd5 = MD5.generate(hash)

const listaPersonagens = document.querySelector('#lista-personagens')

// endereço:https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}
// metodo: GET
//consumir utilizando metodo fetch
//dentro do fetc colocamos o url da API
const promise = fetch(
  `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hashMd5}`
)

promise
    .then(response => {
        console.log(response)
        //abertura de lista desordenada
//converteu para .json()
            response.json()
            .then(res => {
                console.log(res)
                //buscando os dados da api pelo nome do objeto
                //elemento é uma função que recebe a busca
                //forEach percorre o array 
                res.data.results.forEach(elemento => {
                //cada linha com a informação da API
                    listaPersonagens.innerHTML += ` 
                    <div class='figure'>
                    <img src='${elemento.thumbnail.path}.${elemento.thumbnail.extension}'/>
                    <ul>    
                        <h3><b>${elemento.name}</b></h3>
                        <li>${elemento.description}</li>
                    </ul>
                    </div>
                    `
                })
        //fechamento de lista desordenada
    })
}) 
    .catch(error => {
        console.log('Erro: ' + error)
});