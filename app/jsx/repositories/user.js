export class UserRepository {
  constructor(baseUrl, port) {
    this.baseUrl = 'http://' + baseUrl + ':' + port;
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
