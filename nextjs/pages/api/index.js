function Autenticacao(request, response) {
  const { google } = require("googleapis");

  // Nome da Planilha
  const nameRange = process.env.NAMERANGE;

  // Autenticação
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.CREDENTIALS_TYPE,
      project_id: process.env.CREDENTIALS_PROJECT_ID,
      private_key_id: process.env.CREDENTIALS_PRIVATE_KEY_ID,
      private_key: process.env.CREDENTIALS_PRIVATE_KEY,
      client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
      client_id: process.env.CREDENTIALS_CLIENT_ID,
      auth_uri: process.env.CREDENTIALS_AUTH_URI,
      token_uri: process.env.CREDENTIALS_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CREDENTIALS_CLIENT_X509_CERT_URL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  // Criando o cliente para utilizar a planilha
  const client = async () => {
    await auth.getClient();
  };

  // Instance of Google Sheetes API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SPREADSHEETID;

  return response.status(200).json({ client, nameRange, spreadsheetId });
}

export default Autenticacao;
