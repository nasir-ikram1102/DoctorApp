const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { caseService, icdService, cptService, roleService } = require('../services');
var express = require("express");
var router = express.Router();
var fs = require('fs');
const Excel = require("exceljs");
const path = require('path');
const moment = require('moment');
var fs = require('fs');
var pdf = require('html-pdf');

const createCase = catchAsync(async (req, res) => {
  const caseServ = await caseService.createCase(req.body);
  res.status(httpStatus.CREATED).send(caseServ);
});

const getCases = catchAsync(async (req, res) => {
  
  const searchValue = req.body.search;
  const filter = (searchValue) ?
    {
      $or: [{
        firstName: {
          $regex: searchValue, $options: 'i'
        }
      },
      {
        lastName:
        {
          $regex: searchValue, $options: 'i'
        }
      }]
    } : {};

  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  if (startDate && endDate) {
    startDate = moment(new Date(startDate)).startOf('day').toDate();
    endDate = moment(new Date(endDate)).endOf('day').toDate();

    filter.createdAt = {
      $gte: startDate,
      $lt: endDate
    }
  }

  const options = pick(req.body, ['sortBy', 'limit', 'page']);
  const result = await caseService.queryCases(filter, options);
  res.send(result);
});

const getCase = catchAsync(async (req, res) => {
  const cas = await caseService.getCaseById(req.params.caseId);
  if (!cas) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Case not found');
  }
  res.send(cas);
});

const updateCase = catchAsync(async (req, res) => {
  const cas = await caseService.updateCaseById(req.params.caseId, req.body);
  res.send(cas);
});

const deleteCase = catchAsync(async (req, res) => {
  await caseService.deleteCaseById(req.params.caseId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getCasePrebindData = catchAsync(async (req, res) => {

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const roleResult = await roleService.queryRoles(filter, options);

  res.send({
    roles: roleResult
  });
});


const uploadFile = catchAsync(async (req, res) => {

  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory

  var fileExtension = path.extname(myFile.name);
  var ticks = ((new Date().getTime() * 10000) + 621355968000000000);
  const reqPath = path.join(__dirname + '../../public/images/');

  var dir = reqPath;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var fileName = `${ticks + fileExtension}`;
  myFile.mv(reqPath + fileName, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    var urlHost = req.protocol + '://' + req.get('host');
    return res.send({ name: fileName, path: `${urlHost}/public/images/${fileName}` });
  });
});


const ExportCasesInExcel = catchAsync(async (req, res) => {

  const searchValue = req.body.search;
  const filter = (searchValue) ?
    {
      $or: [{
        firstName: {
          $regex: searchValue, $options: 'i'
        }
      },
      {
        lastName:
        {
          $regex: searchValue, $options: 'i'
        }
      }]
    } : {};

  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  if (startDate && endDate) {
    startDate = moment(new Date(startDate)).startOf('day').toDate();
    endDate = moment(new Date(endDate)).endOf('day').toDate();

    filter.createdAt = {
      $gte: startDate,
      $lt: endDate
    }
  }

  const result = await caseService.queryCasesWithoutPaging(filter);

  try {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet();

    worksheet.columns = [
      { header: "First Name", key: "firstName", width: 10 },
      { header: "Last Name", key: "lastName", width: 32 },
      { header: "Institution", key: "institution", width: 10 },
      { header: "Hospitalization", key: "hospitalization", width: 10 },
      { header: "Findings", key: "findings", width: 10 },
      { header: "FollowUp", key: "followUp", width: 10 },
    ];

    if (result) {
      result.forEach(item => {
        worksheet.addRow({ firstName: item.firstName, lastName: item.lastName, institution: item.institution, hospitalization: item.hospitalization, findings: item.findings, followUp: item.followUp });
      });
    }

    workbook.xlsx
      .writeFile(__dirname + '../../public/cases/excel/Cases.xlsx')
      .then(response => {
        var urlHost = req.protocol + '://' + req.get('host');
        return res.send(urlHost + "/public/cases/excel/Cases.xlsx");
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});


const ExportCasesInPdf = catchAsync(async (req, res) => {

  //const filter = pick(req.body, ['search']);
  const searchValue = req.body.search;
  console.log(searchValue);
  //Like operator with or condition 
  //  const filter = (searchValue) ? { $or: [{ firstName: { $in: searchValue } }, { lastName: { $in: searchValue } }] } : {};

  const filter = (searchValue) ?
    {
      $or: [{
        firstName: {
          $regex: searchValue, $options: 'i'
        }
      },
      {
        lastName:
        {
          $regex: searchValue, $options: 'i'
        }
      }]
    } : {};

  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  if (startDate && endDate) {
    startDate = moment(new Date(startDate)).startOf('day').toDate();
    endDate = moment(new Date(endDate)).endOf('day').toDate();

    filter.createdAt = {
      $gte: startDate,
      $lt: endDate
    }
  }

  const result = await caseService.queryCasesWithoutPaging(filter);
  fs.readFile(__dirname + '../../public/templates/CaseTemplatePDF.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);



    var options = { format: 'Letter' };
    pdf.create('<html><body>ASDF</body></html>', options).toFile(__dirname + '../../public/cases/pdf/doctorApp.pdf', function(pdfError, pdfRes) {
      if (pdfError) return console.log(pdfError);
      var urlHost = req.protocol + '://' + req.get('host');
      return res.send(urlHost + "/public/cases/pdf/doctorApp.pdf");
    });



    return res.end();
  });
});



module.exports = {
  createCase,
  ExportCasesInExcel,
  ExportCasesInPdf,
  uploadFile,
  getCases,
  getCase,
  updateCase,
  deleteCase,
  getCasePrebindData,
};
