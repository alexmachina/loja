let env = 'production'
let url = 'http://localhost:3000'

console.log(env)
if(env == 'production') {
  url = 'https://artelazermoveis.com.br'
}

let config = {
  url: url
}
export {config}
