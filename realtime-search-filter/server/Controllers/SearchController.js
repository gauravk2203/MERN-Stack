import { Product } from "../Models/ProductModel.js"

export const SearchFilter = async(req, res) => {
    try {
        // console.log(req)
        const search = req.query.Searchtext;
        // console.log(search)

        if (!search || search.length === 0) {
            return res.status(400).json({ Message: "Query is Empty" })
        }

        const item = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ]
        })

        if (item.length === 0) {
            return res.status(404).json({ Mesage: "Object not found" })
        }

        res.status(200).json(item)
    } catch (error) {
        console.log("Error in the controller", error)
        res.status(500).json({ Message: "Something went wrong" })
    }

}