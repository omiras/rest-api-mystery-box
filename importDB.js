const ExcelJS = require('exceljs');
const dotenv = require('dotenv')
const connectDB = require('./config/db');

const { Schema, model } = require('mongoose');

dotenv.config();

const workbook = new ExcelJS.Workbook();

const cupounSchema = new Schema({
    code: String,
    expiration_date: Date,
    reward: String,
    redeemed: {
        type: Boolean,
        default: false
    }
});

const Cupoun = new model('cupoun', cupounSchema);

connectDB().then(() => {
    console.log('Conectado a la base de datos');

    doImport();
});


async function doImport() {
    await workbook.xlsx.readFile('./cuponDB.xlsx');
    const worksheet = workbook.getWorksheet(1); // Puedes acceder por índice o por nombre
    console.log("🚀 ~ file: importDB.js:8 ~ doImport ~ worksheet:", worksheet)

    // Leer cada fila
    worksheet.eachRow((row, rowNumber) => {

        // Las primeras fila no me sirve porque contiene información sobre las columnas (el nombre de cada columna)
        if (rowNumber < 2) {
            return;
        }
        const rowValues = row.values;
        console.log("🚀 ~ file: importDB.js:37 ~ worksheet.eachRow ~ values:", rowValues)

        // Creamos tantos documentos como filas hay en la hoja Excel. Atención: la primera posición del array la marca como vacía
        try {
            Cupoun.create({
                code: rowValues[1],
                expiration_date: new Date(rowValues[2]),
                reward: rowValues[3]
            })
        } catch (error) {
            console.error(error.message)
        }
    });
}

