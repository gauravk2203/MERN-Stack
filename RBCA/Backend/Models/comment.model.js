import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    comment : String,
    user : {
        type : Schema.Types.ObjectId ,
        ref : 'User'
    }
},
{ timestamps: true }
)

export default mongoose.model('Comment' , CommentSchema);