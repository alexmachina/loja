let nodemailer = require('nodemailer')
let config = require('../config')
function ContactController() {
    this.sendContactMessage = (req, res) => {
    let message = req.body

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
      subject: `${message.subject}`,
      html:this._createHtml(message)
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error)
      } else {
        res.send()
      }
    })


  }

   this._createHtml = (message) =>{
    let html = `
    <div>
    <p>nome: ${message.name}</p>
    <p>email: ${message.email}</p>
    <p>assunto: ${message.subject}</p>
    <p>mensagem: ${message.message}</p>
    </div>
    `

    return html
  }
}

module.exports =  new ContactController()
