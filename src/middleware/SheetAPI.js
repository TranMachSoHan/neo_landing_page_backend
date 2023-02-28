const { json } = require('body-parser');
const { google } = require('googleapis');
// const sheets = google.sheets('v4');

const auth = new google.auth.GoogleAuth({
    keyFile: './nctlandingpage-b7147bbcfbbb.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

    
// Read column that contains the student ID and return under JSON format
async function getAllStudentIDs() {
    console.log("get All Student IDs");
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    // Spreadsheet Id
    // https://docs.google.com/spreadsheets/d/1wirh1W7CTGQ74cd9YF6AmfaoOl7HpltTzLirm8pRWyk/edit#gid=0
    const spreadsheetId = '1wirh1W7CTGQ74cd9YF6AmfaoOl7HpltTzLirm8pRWyk';

    const opt = {
        auth,
        spreadsheetId: spreadsheetId,
        range: 'MemberFee!B2:D',
    };

    let data = await googleSheets.spreadsheets.values.get(opt);
    let data_arr = data.data.values;
    let student_arr = [];
    let student_id_arr = [];

    for (let i = 0; i < data_arr.length; i++) {
        if (data_arr[i] !== undefined) {
            if(!student_arr.some(student => student.student_id === data_arr[i][0]) ){
                student_id_arr.push(data_arr[i][0])
                student_arr.push({
                    "student_id": data_arr[i][0],
                    "first_name": data_arr[i][1],
                    "last_name": data_arr[i][2]
                });
            }
        }
    }

    console.log(student_arr);
    return student_arr;
}



// Export the function
module.exports.getAllStudentIDs = getAllStudentIDs;