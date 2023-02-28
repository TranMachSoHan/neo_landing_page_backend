const Service = require('./Service');
const { getAllStudentIDs } = require('../middleware/SheetAPI');
const User = require('../models/user');
const Role = require('../models/role');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const generateToken = require('../middleware/auth');

// Experimental
class UserService extends Service{
    constructor(model) {
        super(model);
    }

    async getAllMongoGoogleSheet(){
        try{
            let mongoData = (await this.getAll({})).data;
            console.log(mongoData);

            let googleData = await getAllStudentIDs();

            let json = {
                "googleData": googleData,
                "mongoData": mongoData
            }
            return {
                error: false,
                statusCode: 200,
                data: json,
            };
        }
        catch(errors){
            console.log(errors);
            return {
                error: true,
                statusCode: 500,
                errors
              };
        }
    }

    //@desc Add a new user to the database
    //@route POST /api/register
    //@access Public
    async RegisterUser (student) {

        // Generate a password
        const password = await this.generatePassword();
        
        // call insert function in abstract 
        return await this.insert(
            {
                "student_id": student.student_id,
                "student_id_email": student.student_id + "@rmit.edu.vn",
                "first_name": student.first_name,
                "last_name": student.last_name,
                "password": password,
                "isAdmin": false,
                "isActive": true
            }
        )
    }
    //@desc Generate new password
    //@route     
    //@access Public
    async generatePassword() {
        // Generate a random password
        const password = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return hashedPassword;
    }

    //@desc Check if the user exists in the google sheet
    //@route
    //@access Public
    async CheckIfExist () {
        try{
            // userCheck should be changed to googleData 
            const userCheck = await getAllStudentIDs();
            const mongoData =  (await this.getAll({})).data;
            
            let student_id_arr = userCheck.map(student => student.student_id);

            // Iterate each student in Google and compared with Mongo 
            let temp_arr = []
            for (let student of mongoData){

                // check if the student in mongoDB exists in GoogleSheet, 
                // if student exists in Googlesheet  
                if ((student_id_arr.includes(student.student_id))) {
                    /**
                     * ToDo: set isActive to True and update in MongoDB
                     */
                    // Set isActive to true in Mongo
                    student.isActive = true;
                    await this.update(student._id, student);
                    temp_arr.push(student.student_id);
                } 
                // if not exists then convert isActive to false 
                else if ((!student_id_arr.includes(student.student_id))) {
                    /**
                     * ToDo: update isActive of this student in mongoDB to False
                     */
                    // Set isActive to false in Mongo
                    student.isActive = false;
                    await this.update(student._id, student)
                    temp_arr.push(student.student_id, student)
                } else {
                    res.status(400).send('An error occured.');
                }
            }

            let data = []

            // Now register for new user 
            for(let student of userCheck){
                // just to make sure not waste time for student exists in mongoDB 
                if(temp_arr.includes(student.student_id)) continue;

                // the rest not in MongoDB is new user, register for this user 
                let response = await this.RegisterUser(student);
                if(response.error) return response;

                data.push(student)
            }

            return {
                error: false,
                statusCode: 200,
                data: data,
            };
        }
        catch(errors){
            return {
                error: true,
                statusCode: 500,
                errors
              };
        }
    }

    //@desc Authenticate 
    //@route     
    //@access Public
    async AuthenticateUser(email, password) {
        const user = await this.model.findOne({ student_id_email: email });

        if(user && await bcrypt.compare(password, user.password)){
            console.log("success");
            console.log(user);
            let result = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.student_id_email,
                token: await generateToken(user._id)
            }
            return {
                error: false,
                statusCode: 200,
                data: result,
            }            
        } else {
            return {
                error: true,
                statusCode: 401,
                errors: "Invalid user"
            }
        }
    
        
    }

    
};

module.exports = UserService; 