import { getManagerUsers } from "../dao/daoManager.js";
import  ManagerUserMongoDB  from "../dao/MongoDB/models/user.js";


const data = await getManagerUsers()
const managerUser = new data()
export const createUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const user = await managerUser.getElementByEmail(email)
        if (user) {
            //Usuario existe
        }
        await managerUser.addElements([{ first_name, last_name, email, age, password }])

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}