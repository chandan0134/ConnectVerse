const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true,
    },
    Body:{
        type:String,
        required: false,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

},{timestamps:true});

const Blog = mongoose.model('blog',blogSchema);
module.exports = Blog;