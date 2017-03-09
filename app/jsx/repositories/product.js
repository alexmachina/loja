import Cookies from 'js-cookie';
import {config} from '../config.js'

export class ProductRepository {
  constructor(baseUrl, port) {
    this.baseUrl = config.url

    $.ajaxSetup({
      headers: {'authorization': Cookies.get('authorization')}
    });
  }
  all(page,cb) {
    $.ajax({
      method:'GET',
      url: this.baseUrl + '/products/' + page,
    }).done(products => cb(null,products))
      .fail((err, xhr) =>{
        cb(err)
      });
  }

  getProductsByName(name, page, cb){
    fetch(`${this.baseUrl}/productsByName/${name}/${page}`)
    .then(response => {
      response.json().then(json => {
        if(response.ok)
          cb(null, json);
        else
          cb(json);
      })
    })
  }

  getProductsByCategory(categoryId){
    return new Promise((resolve, reject) => {
      fetch(`${this.baseUrl}/products/category/${categoryId}`)
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
      }).catch(err => {
        reject(err);
      })
    })
  }

  getProductByName(name) {
    return new Promise((resolve, reject) => {
      let req = fetch(`${this.baseUrl}/product/byName/${name}`);

      req.then(response => {
        if(response.ok) {
          response.json().then(json => resolve(json));
        } else{
          response.text().then(text => resolve(text));
        }
      })

      req.catch(err => reject(err));
    })
  }

  getProductsCount(cb) {
    fetch(this.baseUrl + '/productsCount')
      .then(response => {
        response.json().then(json => {
          cb(null, json);
        })
      })
  }

  allFeatured(cb) {
    fetch(this.baseUrl + '/products/featured')
      .then(response => {
        response.json().then(json => {
          cb(json);
        })
      })
  }

  allActive(cb) {
    fetch(this.baseUrl + '/products/active')
      .then(response => {
        response.json().then(response => {
          cb(json);
        })
      })
  }

  one(id, cb) {
    $.get(this.baseUrl + '/product/'  + id)
      .done(product => cb(null, product))
      .fail(err => cb(err));
  }

  add(product, cb) {
    let form_data = new FormData();
    form_data.append('category', product.category);
    form_data.append('name', product.name);
    form_data.append('description', product.description);
    form_data.append('price', product.price)
    form_data.append('mainImage', product.mainImage, 'mainImage');
    form_data.append('active', product.active);
    form_data.append('featured', product.featured);
    for(let i = 0; i < product.images.length; i++)
      form_data.append('images', product.images[i], 'image'+i);



    $.ajax({
      method: 'POST',
      data: form_data,
      url: this.baseUrl + '/product',
      processData: false,
      contentType:false
    }).done(() => cb(null))
      .fail(err => {
        console.log(err);
        cb(err)
      });

  }

  update(product, cb) {
    let form_data = new FormData();
    form_data.append('category', product.category);
    form_data.append('name', product.name);
    form_data.append('description', product.description);
    form_data.append('price', product.price);
    form_data.append('active', product.active);
    form_data.append('featured', product.featured);

    if(typeof product.mainImage == 'object')
      form_data.append('mainImage', product.mainImage, 'mainImage');
    if(typeof product.images == 'object' && product.images.length) {
      for(let i = 0; i < product.images.length; i++) {
        if( typeof product.images[i] == 'object') {
          form_data.append('images', product.images[i], 'image'+i);
        } //EndIf
      } //EndFor
    }//EndIf

    $.ajax({
      method: 'PUT',
      data: form_data,
      url: this.baseUrl + '/product/' + product._id,
      processData: false,
      contentType: false

    }).done(() => cb(null))
      .fail(err => cb(err));
  }

  addImages(id, images, cb) {
    let form_data = new FormData();
    for(let i = 0; i < images.length; i++) {
      form_data.append('images', images[i], 'image'+i);
    }

    $.ajax({
      method: 'POST',
      data: form_data,
      url: this.baseUrl + '/product/' + id + '/addImages',
      processData: false,
      contentType: false
    }).done(() => cb(null))
      .fail(err => cb(err));
  }

  deleteImage(id, image, cb) {
    $.ajax({
      method: 'POST',
      url: this.baseUrl + '/product/' + id + '/removeImages',
      processData: true,
      data: {"image": image}
    }).done(() => cb(null))
      .fail(err => cb(err));
  }
}
