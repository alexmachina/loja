import {config} from '../config.js'

export class UserRepository {
  constructor(baseUrl, port) {
    this.baseUrl = config.url
  }

  login(user, cb) {
    $.ajax({
      method:'POST',
      data:user,
      url: this.baseUrl + '/login'

    }).done(token => cb(null, token))
      .fail(err => cb(err))
  }
}
