import React from 'react';
import ReactDOM from 'react-dom';
import {ProductRepository} from '../../repositories/product.js';
import {CategoryRepository} from '../../repositories/category.js';
import {Input} from '../components/Input.jsx';
import {Select} from '../components/Select.jsx';
import {isRequired} from '../helpers/Validations.js';

export class ProductsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      category: '',
      categories: [],
      description: '',
      images: [],
      active: false,
      featured: false

    }

    this.repository = new ProductRepository('localhost', 3000);
    this.categoryRepository = new CategoryRepository();
  }
  refresh() {
    this.repository.one(this.props.params.id, (err, p) => {
      if(!err)
      this.setState(p);
    });
  }
  componentDidMount() {
    this.categoryRepository.getAllCategories((categories) => {
      this.setState({categories: categories});
    });
    if(this.props.params.id) {
      this.refresh();
    }

  }

  onChangeCategory(e) {
    this.setState({category: e.target.value})
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeActive(e) {
    this.setState({active: !this.state.active});
  }

  onChangeFeatured(e) {
    this.setState({featured: !this.state.featured});
  }

  onChangeMainImage(e) {
    this.setState({'mainImage' : e.target.files[0]});

  }

  onChangeImages(e) {
    this.setState({'newImages' : e.target.files});
  }

  onImageClick(e) {
    let modal = $('#imageModal');
    let imgUrl = e.target.src;
    this.setState({'selectedImage' : imgUrl});

    modal.find('#img').attr('src',imgUrl);
    modal.modal();

  }

  onSubmit(e) {
    e.preventDefault();
    let product = this.state;

    this.refs.nameInput.onBlur(this.state.name)
    if(!product._id) {
      this.repository.add(product, (err) => {
        if(!err)
          alert("Added");
        else
          console.log(err);
      });
    } else {
      this.repository.update(product, (err) => {
        if(!err)
          this.refresh();
        else
          this.setState({ error: err})
      });
    }
  }

  onUploadClick() {
    this.repository.addImages(this.props.params.id,
      this.state.newImages, (err) => {
        if(!err) {
          this.refresh();
        }
        else {
          console.log(err);
        }
      });
  }

  onDeleteClick() {
    this.repository.deleteImage(this.props.params.id,
      this.state.selectedImage, (err) => {

        if(err) {
          return this.setState({'error':err});
        }
        $('#imageModal').modal('hide');

        this.refresh();
      });
  }

  render() {
    {/*Building images nodes */}
    let images = null;
    let mainImage = null;
    let errorMsg = null;
    let options = null;

    if(this.state.images.map) {
      images = this.state.images.map(img => {
        return (
          <li key={img}>
            <img src={'img/products/'+img}
              className="img img-responsive col-md-6"
              onClick={this.onImageClick.bind(this)}
            />
          </li>
        )
      });
    }

    if(this.state.mainImage) {
      mainImage = (<div className="form-group">
        <img src={'img/products/' + this.state.mainImage}
          className="img img-responsive" />
      </div>)
    }

    if(this.state.error) {
      errorMsg = <span id="error">{this.state.error}</span>
    }

    if(this.state.categories){
      options = this.state.categories.map(c=> {
        return (
          <option value={c._id} key={c._id}>{c.name}</option>)
      })
    }
    if(this.state.categories) {
      let defaultValue = this.props.params.id ?
        this.state.category : this.state.categories[0];
    }





    {/* Render */}
    return(
      <div className="col-md-12">
        <div className="col-md-6">
          <h1>{this.state.name}</h1>
          <form onSubmit={this.onSubmit.bind(this)}>

            {/*Category field */}
            <div className="form-group">
              <Select
                label="Category"
                value={this.state.category}
                options={options}
                onChange={this.onChangeCategory.bind(this)}
                validationFunction={isRequired}
                validationMessage="This field is required"

                ></Select>
            </div>

            {/*Name Field */}
            <div className="form-group">
              <Input label="Name"
                ref="nameInput"
                value={this.state.name}
                onChange={this.onChangeName.bind(this)}
                validationFunction={isRequired}
                validationMessage="This field is required"
                ></Input>
            </div>

            {/*Description Field*/}
            <div className="form-group">
              <label>Description</label>
              <textarea onChange={this.onChangeDescription.bind(this)}
                className="form-control" value={this.state.description}></textarea>
            </div>

            {/*Price Field*/}
            <div className="form-group">
              <label>Price</label>
              <input className="form-control"
                onChange={this.onChangePrice.bind(this)}
                value={this.state.price} />
            </div>
            {/*Active Field*/}
            <div className="fieldset">
              <label>Active</label>
              <input type="checkbox" className="form-control" name="active"
                onChange={this.onChangeActive.bind(this)}
                value={this.state.active}
                checked={this.state.active}
              />
            </div>
            <div className="fieldset">
              <label>Featured</label>
              <input type="checkbox" className="form-control"
                onChange={this.onChangeFeatured.bind(this)}
                value={this.state.featured}
                checked={this.state.featured} />
            </div>

            {/*Main Image Field */}
            {mainImage}
            <div className="form-group">
              <label>Main Image</label>
              <input className="form-control" type="file"
                name="mainImage" onChange={this.onChangeMainImage.bind(this)} />
            </div>

            {/*Button*/ }
            <div className="form-group">
              <button className="btn btn-primary form-control">Save</button>
            </div>
          </form>
        </div>
        {/*Gallery */}
        <div className="col-md-6 image-gallery">
          {errorMsg}
          {/*Controls */}
          <div className="text-right">
            <input type="file" name="images" multiple id="image-input"
              onChange={this.onChangeImages.bind(this)}/>
            <button className="btn btn-default" onClick={this.onUploadClick.bind(this)}>Upload</button>
          </div>
          {/* Images */}
          <ul className="gallery">
            {images}
          </ul>
        </div>

        {/* Modal */}
        <div id="imageModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header text-right">
                <button type="button" data-dismiss="modal"
                  className="btn btn-default ">&times;</button>
              </div>
              <div className="modal-body">
                <div>
                  <img id="img" className="img img-responsive"/>
                </div>
                <div>
                  <button className="btn btn-danger form-control"
                    id="btn-delete-image" onClick={this.onDeleteClick.bind(this)}>
                    Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
