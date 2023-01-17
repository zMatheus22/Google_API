const { google } = require("googleapis");

//Nome do Página da planilha para inserir os dados
const nameRange = process.env.NAMERANGE;

// Autenticação
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Criando o cliente para utilizar a planilha
const client = async () => {
  await auth.getClient();
};

// Instance of Google Sheetes API
const googleSheets = google.sheets({ version: "v4", auth: client });
const spreadsheetId = process.env.SPREADSHEETID;

// Get metadata about spreadsheet
const metaData = async () => {
  const planilha = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  return planilha.data;
};

// Read rows from spreadsheet
const getRows = async () => {
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${nameRange}!A:F`,
  });
  return rows.data;
};

//Write row(s) to spreadsheet
const createRows = async (row) => {
  // Itens/Input(id) do from
  const { id, data, model, quantity, plate, mechanic } = row;
  // const data = new Date(Date.now()).toUTCString();

  //Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${nameRange}!A:E`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[ id, data, model, quantity, plate, mechanic]],
    },
  });
};

module.exports = { metaData, getRows, createRows };