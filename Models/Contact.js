const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

module.exports = mongoose.model('Contact', ContactSchema);