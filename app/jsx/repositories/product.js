import Cookies from 'js-cookie';

export class ProductRepository {
  constructor(baseUrl, port) {
    this.baseUrl = 'http://' + baseUrl + ':' + port;

    $.ajaxSetup({
      headers: {'authorization': Cookies.get('authorization')}
    });
  }
  all(cb) {
    $.ajax({
      method:'GET',
      url: this.baseUrl + '/products',
    }).done(products => cb(null,products))
      .fail((err, xhr) =>{ 
        cb(err)
      });
  }

  one(id, cb) {
    $.get(this.baseUrl + '/product/'  + id)
      .done(product => cb(null, product))
      .fail(err => cb(err));
  }

  add(product, cb) {
    let form_data = new FormData();
    form_data.append('name', product.name);
    form_data.append('description', product.description);
    form_data.append('price', product.price)
    form_data.append('mainImage', product.mainImage, 'mainImage');
    form_data.append('active', product.active);
    for(let i = 0; i < product.images.length; i++)
      //form_data.append('images', product.images[i], 'image'+i);



      $.ajax({
        method: 'POST',
        data: form_data,
        url: this.baseUrl + '/product',
        processData: false,
        contentType:false
      }).done(() => cb(null))
        .fail(err => cb(err));

  }

  update(product, cb) {
    let form_data = new FormData();
    form_data.append('name', product.name);
    form_data.append('description', product.description);
    form_data.append('price', product.price);
    form_data.append('active', product.active);
    
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
