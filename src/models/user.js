const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const role = require('./role');

const axios = require('axios');
const { google } = require('googleapis');
const sheets = google.sheets('v4');


const apiKey = 'AIzaSyCa-NJJqje9mqUSh9NutiwTCAaDSdG3v9k';
// SpreadSheet ID
const spreadsheetId = '197USc6Up7BMLD1cdcSAwPkOlWD7st4rtgXUiFY006sM'

class User {
    initSchema(){
        const userSchema = new mongoose.Schema({
            first_name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            last_name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            student_id: {
                type: String,
                required: true,
                unique: true,
                minlength: 3
            },
            student_id_email: {
                type: String,
                required: true,
                unique: true,
                validate: {
                    validator : function (student_id_email) {
                        return student_id_email.endsWith('@rmit.edu.vn');
                    },
                    message: 'The email must be a valid RMIT email address',
                },
            },    
            first_name: {
                type: String,
                required: false,
            },
            last_name: {
                type: String,
                required: false,
            },
            password: {
                type: String,
                required: true,
            },
            isAdmin: Boolean,
            isActive: {
                type: Boolean,
                required: true,
            },
        });

        return mongoose.model('Users', userSchema);
        
    }

    
    getInstance() {
        this.initSchema();
        return mongoose.model("Users");
    }

}



module.exports= User;

// userSchema.methods.generateAuthToken = function() {
//     // generate an auth token for the user (secret key should be an environment variable)
//     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
//     return token;
// }; 

// Use this if the user is not in the database
// userSchema.methods.GoogleSheetFind = async function() {
//     const auth = await getAuthorizationToken();
//     const response = await axios.get(
//         `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${auth}`,
//             },
//         }
//     );
//     const data = response.data;
//     let found = false;
//     for (const row of data.values) {
//         for (const cell of row) {
//           if (cell === searchString) {
//             found = true;
//             break;
//         }
//     }
//     return found;
// };
// };


