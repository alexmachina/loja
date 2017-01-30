import {config} from '../config.js';
export class CategoryRepository {
  constructor() {
    this.baseUrl = config.url;
  }

  getCategories(cb) {
    fetch(this.baseUrl+'/categories')
    .then(response => {
      response.json().then(json => {
        cb(json);
      });
    });
  }

  getCategory(id, cb) {
    fetch(this.baseUrl+'/category/'+id)
    .then(response => {
      response.json().then(json => {
        cb(json);
      })
    })
  }

  addCategory(category, cb) {
    fetch(this.baseUrl+'/category', {
      body: JSON.stringify(category), 
      method: 'POST',
      headers: new Headers({'Content-Type':'application/json'})
    }).then((response) => {
      if(response.ok)
        cb();
      else {
        response.json().then(json => {
          cb(json)
        })
      }
       
    })
  }

  updateCategory(id, category, cb) {
    fetch(this.baseUrl+'/category/'+id, {
      body: JSON.stringify(category),
      method:'PUT',
      headers: new Headers({'Content-Type':'application/json'})
    }).then((response) => {
      if(response.ok) {
        cb();
      }
      else {
        response.json().then(json => {
          cb(json);
        })
      }
    })
  }
}
