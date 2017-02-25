export class BidRepository {
  constructor(url, port) {
    this.baseUrl = url + ':' + port;
     
  }
  sendBid(bid) {
    return new Promise((resolve, reject) => {
      fetch(this.baseUrl + '/sendBid', {
        method: 'POST',
        body: JSON.stringify(bid),
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type':'application/json'})
      }).then(response => {
        console.log("WO");
        resolve()
      })
    
    })
  }
}

