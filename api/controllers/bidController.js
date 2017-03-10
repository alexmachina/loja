const nodemailer = require('nodemailer'),
      config = require('../config')

function bidController() {
  this.createHtml = function(bid) {
    let trs = '';
    bid.products.forEach(p => {
      trs += `
      <tr>
        <td>${p.name}</td>
        <td>${p.quantity}</td>
        <td>${p.price}</td>
        <td>${p.price * p.quantity}</td>
      </tr>
      `
    })
    let html = `
    <div>
      <ul>
        <li>Nome: ${bid.name}</li>
        <li>Sobrenome: ${bid.lastName}</li>
        <li>Celular: ${bid.phone}</li>
        <li>Telefone: ${bid.telephone}</li>
        <li>Email: ${bid.email}</li>
        <li>Mensagem: ${bid.message}</li>
      </ul>
    </div>
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${trs}
      </tbody>
    </table>
    `
    return html
  }

  this.sendBid = (req, res) =>{
    let bid = req.body;
    
    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      auth: {
        user: config.email,
        pass: config.password
      }
    })
    let mailOptions = {
      from: config.email,
      to: 'alex@webyang.com.br',
      subject: `Orçamento de ${bid.name}`,
      html:this.createHtml(bid)
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send(error)
      } else {
        res.send()
        console.log(info)
      }
    })

  }

  }

module.exports = new bidController()
