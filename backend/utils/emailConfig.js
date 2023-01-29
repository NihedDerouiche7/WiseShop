import SibApiV3Sdk from 'sib-api-v3-sdk'

const defaultClient = SibApiV3Sdk.ApiClient.instance
var apiKey = defaultClient.authentications['api-key']
apiKey.apiKey =
  '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'

export const sendEmail = (to, subject, content) => {
  const transEmail = new SibApiV3Sdk.TransactionalEmailsApi()
  transEmail
    .sendTransacEmail({
      sender: {
        email: 'Welcome@wizeShop.com',
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      textContent: content,
    })
    .then(console.log)
    .catch(console.log)
}
