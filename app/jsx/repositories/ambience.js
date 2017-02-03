import Cookies from 'js-cookie';
export class AmbienceRepository {
  constructor(baseUrl, port){
    this.baseUrl = baseUrl + ':' + port;
    this.headers = new Headers({
        authorization: Cookies.get('authorization')
    });
  }
  getAmbiences(cb){
    let request = new Request(this.baseUrl + '/ambiences', {
      headers: this.headers
    });
    fetch(request).then(response => {
      response.json().then(json => {
        cb(null, json);
      }).catch(err => cb(err));
    }).catch(err => cb(err));
  }

  getAmbience(id, cb) {
    fetch(this.baseUrl + '/ambience/' + id, {headers: this.headers})
    .then(response => {
      response.json().then(json => {
        cb(null, json);
      }).catch(err => cb(err));
    }).catch(err => cb(err));
  }

  getActiveAmbiences(cb) {
    fetch(this.baseUrl + '/ambiences/active')
    .then(response => {
      response.json().then(json => {
        if(response.ok)
          cb(null, json);
        else
          cb(json);
      });
    })
  }

  addAmbience(ambience, cb) {
    let form_data = new FormData();
    form_data.append('name', ambience.name);
    form_data.append('description',ambience.description);
    form_data.append('active', ambience.active);
    form_data.append('mainImage',ambience.mainImage, 'mainImage');
    for(let i = 0; i < ambience.images.length; i++)
      form_data.append('images', ambience.images[i], 'images'+i);

    fetch(this.baseUrl + '/ambience', {
      method: 'POST',
      body: form_data,
      headers: this.headers
    }).then(()=> cb())
      .catch(err => cb(err));
  }

  updateAmbience(id, ambience, cb) {
    let form_data = new FormData();
    form_data.append('name', ambience.name);
    form_data.append('description',ambience.description);
    form_data.append('active', ambience.active);
    if(typeof ambience.mainImage == 'object')
      form_data.append('mainImage',ambience.mainImage, 'mainImage');
    for(let i = 0; i < ambience.images.length; i++)
      if(typeof ambience.images[i] == 'object')
        form_data.append('images', ambience.images[i], 'images'+i);

    fetch(this.baseUrl + '/ambience/' + id, {
      method: 'PUT',
      body: form_data,
      headers: this.headers
    }).then(()=> cb())
      .catch(err => cb(err));
  }

}
