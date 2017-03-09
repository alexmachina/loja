let env = 'production'
let url = 'http://localhost:3000'

if(env == 'production') {
  url = 'https://serene-brushlands-57199.herokuapp.com'
}

let config = {
  url: url
}
export {config}
