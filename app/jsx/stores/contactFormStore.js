import {observable, action} from 'mobx'
export default class ContactFormStore {
  @observable loading = false
  @observable name = ''
  @observable email = ''
  @observable subject = ''
  @observable message = ''

  @action
  sendContactMessage(message) {
    return new Promise((resolve, reject) => {
      fetch(`${config.url}/sendContactMessage`,
        {
          method: 'POST',
          body: JSON.stringify(message),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })
        }
      ).then(response => {
        if (response.ok) {
          resolve()
        } else {
          response.text().then(text =>
            reject(text)
          )
        }
      }).catch(err => reject(err))
    })
  }

}
