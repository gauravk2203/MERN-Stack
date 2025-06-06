// create , delete , edit 
import Comment from "../Models/comment.model.js";

export const addComment = async (req , res) => {
    const { comment , id } = req.body;

    try {
        if(!comment || !id){
            return res.status(400).json({message : "Comment is empty"})             
        }
         const newComment = new Comment({comment , user: id });
            await newComment.save() 
            res.status(200).json(newComment)   
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message : "something went wrong"})
    }  
}


export const deleteComment = async (req , res) => {

    const id = req.params.id;
    try{
        const deletedComment = await Comment.findByIdAndDelete(id);

        if(!deletedComment){
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" }); 
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const getallComments = async (req , res) => {
    try{
        const allComments = await Comment.find();
        res.status(200).json({ Comments : allComments})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }

} 