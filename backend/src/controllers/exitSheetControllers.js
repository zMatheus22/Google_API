const exitSheetModel = require("../model/exitSheetModel");

const metaData = async (_req, res) => {
  const list = await exitSheetModel.metaData();
  return res.status(200).json(list);
};

const getRows = async (_req, res) => {
  const list = await exitSheetModel.getRows();
  return res.status(200).json(list);
};

// OK -> Funcionando
const createRows = async (req, res) => {
  const createdRows = await exitSheetModel.createRows(req.body);
  return res
    .status(201)
    .json(`Sucesso Cadastro cumprido! Obrigado! ${createdRows}`);
};

module.exports = { metaData, getRows, createRows };