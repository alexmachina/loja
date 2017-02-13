import {config} from '../config.js';
export class CategoryRepository {
  constructor() {
    this.baseUrl = config.url;
  }

  getCategories(page, cb) {
    fetch(this.baseUrl+'/categories/'+page)
    .then(response => {
      response.json().then(json => {
        cb(json);
      });
    });
  }

  getAllCategories(cb){
    fetch(this.baseUrl+'/allCategories')
    .then(response => {
      if(response.ok) {
        response.json().then(json => {
          cb(json);
        })
      } else {console.log(response.body)}
    })
  }

  getCategoriesByName(name, page, cb) {
    fetch(this.baseUrl + '/categoriesByName/' + name + '/' + page)
      .then(response => {
        response.json().then(json => {
          if(response.ok)
            cb(null, json.categories);
          else
            cb(json);
        });
      });
  }
  getCategoryByName(name, cb) {
    return new Promise((resolve, reject) => {
      fetch(this.baseUrl + '/categoryByName/' + name)
      .then(response => {
        if(response.ok) {
          response.json().then(json => {
            resolve(json);
          });
        } else {
          response.text().then(text => {
            reject(text);
          });
        }
      });
    });
  }
  getCategoriesCount(cb) {
    fetch(this.baseUrl+'/categoriesCount')
      .then(response => {
        response.json().then(json => {
          if(response.ok)
            cb(null, json);
          else
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
