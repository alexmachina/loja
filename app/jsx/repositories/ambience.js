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
    fetch(this.baseUrl + '/ambience/' + id)
    .then(response => {
      response.json().then(json => {
        cb(null, json);
      }).catch(err => cb(err));
    }).catch(err => cb(err));
  }

  addAmbience(ambience, cb) {
    let form_data = new FormData();
    form_data.append('name', ambience.name);
    form_data.append('description',ambience.description);
    form_data.append('active', ambience.active);
    form_data.append('mainImage',ambience.mainImage, 'mainImage');
    for(let i = 0; i < ambience.images; i++)
      form_data.append('images', ambience.images[i], 'images'+i);

    fetch(this.baseUrl + '/ambience', {
      method: 'POST',
      body: form_data
    }).then(()=> cb())
    .catch(err => cb(err));
  }

  updateAmbience(id, ambience, cb) {
    let form_data = new FormData();
    form_data.append('name', ambience.name);
    form_data.append('description',ambience.description);
    form_data.append('active', ambience.active);
    form_data.append('mainImage',ambience.mainImage, 'mainImage');
    for(let i = 0; i < ambience.images; i++)
      form_data.append('images', ambience.images[i], 'images'+i);

    fetch(this.baseUrl + '/ambience/' + id, {
      method: 'PUT',
      body: form_data
    }).then(()=> cb())
      .catch(err => cb(err));
  }

}
