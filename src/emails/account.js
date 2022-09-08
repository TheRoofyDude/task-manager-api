const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abrahamphilip47@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail =  (email, name) => {
    sgMail.send({
        to: email,
        from : 'abrahamphilip47@gmail.com',
        subject: `Goodbye ${name}`,
        text: 'Hope you enjoyed our product, could we have done anything to prevent this ?.'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}