import UserSchema from '../models/userModel.js'
exports.addUser = async (req, res) => {
    //console.log(req.body);
    const {name, email, displaypicture} = req.body
    const userInfo = UserSchema({
        name,
        email,
        displaypicture,
    })
    try {
        // validations
        if (!title || !category || !description || !date){
            return res.status(400).json({message: 'Something broke with the user info!'})
        }
        await userInfo.save()
        res.status(200).json({message: 'User added successfully!'})
    } catch (error) {
        res.status(500).json({message: 'There is a user info error'})
    }
    console.log(userInfo)
}

exports.getUser = async (req, res) => {
    try {
        const userInfo = await UserSchema.find().sort({createdAt: -1})
        res.status(200).json(userInfo)
    } catch (error) {
        res.status(500).json({message: 'There is a server error'})
    }
}

// exports.deleteExpense = async (req, res) => {
//     const {id} = req.params;
//     UserSchema.findByIdAndDelete(id)
//         .then((expense) => {
//             res.status(200).json({message: 'Expense deleted successfully!'})
//         })
//         .catch((err) => {
//             res.status(500).json({message: 'There is a server error'})
//         })
// }


module.exports = { addUser, getUser }
