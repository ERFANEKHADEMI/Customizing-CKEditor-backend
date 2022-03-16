const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({

    title: {
        type: String,
    },

    content: {
        type: String,
    },
});

module.exports = Templates = mongoose.model("templates", TemplateSchema);	