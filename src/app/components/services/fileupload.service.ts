import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
//import * as Workbook from "exceljs/dist/exceljs.min.js";
import * as fs from 'file-saver';

@Injectable({
providedIn: 'root'
})
export class ExportExcelService {


constructor() { }

exportExcel(excelData) {

//Title, Header & Data
const title = excelData.title;
const header = excelData.headers
const data = excelData.data;
console.log("excel data",data)

//Create a workbook with a worksheet
let workbook = new Workbook();
let worksheet = workbook.addWorksheet('Sheet1');



// worksheet.mergeCells('G1:H4');
// let d = new Date();
// let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
// let dateCell = worksheet.getCell('G1');
// dateCell.value = date;
// dateCell.font = {
// name: 'Calibri',
// size: 12,
// bold: true
// }
// dateCell.alignment = { vertical: 'middle', horizontal: 'center' }

//Add Image
// let myLogoImage = workbook.addImage({
// base64: logo.imgBase64,
// extension: 'png',
// });
// worksheet.mergeCells('A1:B4');
// worksheet.addImage(myLogoImage, 'A1:B4');

//Blank Row
// worksheet.addRow([]);

//Adding Header Row
let headerRow = worksheet.addRow(header);
headerRow.eachCell((cell, number) => {
cell.fill = {
type: 'pattern',
pattern: 'solid',
fgColor: { argb: '4167B8' },
bgColor: { argb: '' }
}
cell.font = {
bold: true,
color: { argb: 'FFFFFF' },
size: 12
}
})

// Adding Data with Conditional Formatting
data.forEach(d => {
let row = worksheet.addRow(d)
worksheet.getColumn(1).width = 20;
worksheet.getColumn(2).width = 20;
worksheet.getColumn(3).width = 20;
worksheet.getColumn(4).width = 20;


});


workbook.xlsx.writeBuffer().then((data) => {
let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
fs.saveAs(blob, title + '.xlsx');
})
}
}