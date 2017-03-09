import Cookies from 'js-cookie';
import {config} from '../config.js'

export class SaleRepository {
  constructor(url, port) {
    this.baseUrl = config.url
    this.headers = new Headers({
      'authorization' : Cookies.get('authorization')
    });
  }
  getSales(page, cb) {
    fetch(this.baseUrl+'/sales/'+page,{
      headers: this.headers
    }).then(response => {
      response.json().then(json => {
        if(response.ok) {
          cb(null, json);
        }
        else
          cb(json)
      }).catch(err => cb(err));
    }).catch(err => cb(err));

  }
  getSalesCount(cb) {
    fetch(`${this.baseUrl}/salesCount`)
    .then(response => {
      response.json().then(json => {
        if (response.ok)
          cb(null, json);
        else
          cb(json);
      })
    })
  }

  getSalesByName(name, page, cb) {
    fetch(`${this.baseUrl}/salesByName/${name}/${page}`)
    .then(response => {
      response.json().then(json => {
        if(response.ok)
          cb(null, json);
        else
          cb(json);
      });
    });
  }
  
  getSale(id, cb){
    fetch(this.baseUrl + '/sale/' + id, {
      headers:this.headers
    }).then(response => {
      response.json().then(json => {
        cb(null, json);
      }).catch(err => cb(err));
    }).catch(err => cb(err));
  }
  addSale(sale, cb) {
    let form_data = new FormData();
    form_data.append('name',sale.name);
    form_data.append('description', sale.description);
    form_data.append('link', sale.link);
    form_data.append('active', sale.active);
    if(typeof sale.mainImage == 'object')
      form_data.append('mainImage', sale.mainImage,'mainImage');

    fetch(this.baseUrl + '/sale', {
      headers:this.headers,
      method: 'POST',
      body: form_data
    }).then((response) => {
      cb();
    });

  }

  updateSale(id, sale, cb){
    let form_data = new FormData();
    form_data.append('name',sale.name);
    form_data.append('description', sale.description);
    form_data.append('link', sale.link);
    form_data.append('active', sale.active);
    if(typeof sale.mainImage == 'object')
      form_data.append('mainImage', sale.mainImage,'mainImage');

    fetch(this.baseUrl + '/sale/' + id, {
      headers:this.headers,
      method: 'PUT',
      body: form_data
    }).then(() => {
      cb();
    });
  }
}
