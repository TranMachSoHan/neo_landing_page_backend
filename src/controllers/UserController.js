const User = require("../models/user");
const UserServcice= require("../services/UserService");
const Controller= require("./Controller");

const userServcice = new UserServcice(
    new User().getInstance()
);

class UserController extends Controller{
    constructor(service){
        super(service);
    }

    async updateMemberShip(req,res){
        let response = await userServcice.getAllMongoGoogleSheet();
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async MemberRegistration(req, res) {
        let response = await userServcice.CheckIfExist();
        // Send error response + code
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response);
    }

    async UserAuthenticate(req, res){
        const { email, password } = req.body;
        let response = await userServcice.AuthenticateUser(email, password); 
        if (response.error) return res.status(response.statusCode).send(response);
        return res.status(201).send(response)
    }
}

module.exports = new UserController(userServcice);