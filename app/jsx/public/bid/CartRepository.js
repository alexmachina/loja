import Cookies from 'js-cookie';

class CartRepository {
  addItem(item) {
    let items = this.getItems();
    items.push(item);

    Cookies.set('items', items);

  }

  getItems() {
    if (Cookies.getJSON('items')) {
      return Cookies.getJSON('items');
    } else {
      return []
    }
  }

  removeItem(i) {
    let items = this.getItems();
    items.splice(i, 1);

    Cookies.set('items', items);
  }
}

export default new CartRepository();
