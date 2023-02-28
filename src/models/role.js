const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/StudentDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (!err) {
//         console.log('MongoDB connection succeeded.');
//     } else {
//         console.log('Error in DB connection: ' + err);
//     }
// });

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    privileges: {
        type: Array,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
});



const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
