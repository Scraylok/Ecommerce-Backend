import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import * as path from 'path'
import { __dirname } from "./path.js"
import { engine } from 'express-handlebars'
import { getManagerMessages } from './dao/daoManager.js'
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
import MongoStore from 'connect-mongo'

const app = express()
const data = await getManagerMessages();
const managerMessage = new data.ManagerMessageMongoDB;
//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Port
app.set("port",process.env.PORT || 8080 )
const server = app.listen(app.get("port", () => console.log(`Server on port ${app.get("port")}`)))

//Handlebars
app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, "./views"))

//Socket io
const io = new Server(server)

const msgData = await getManagerMessages();
const messageManager = new msgData.ManagerMessageMongoDB;
let messagesArr = []

io.on("connection", async (socket)=>{
    console.log("Socket connected");
    socket.emit("allMessages", messagesArr)
    socket.on("message", async (info)=>{
        await messageManager.addElements([info])
        messagesArr.push(info)
        io.emit("allMessages", messagesArr)
    })
    socket.on("emptyArr", info=>{
        messagesArr = info
        io.emit("allMessages", info)
    })
})

//Routes

app.use("/", express.static(__dirname + "/public"));
app.get("/chat", (req, res)=>{
    res.render("chat")
})
app.use("/products", routerProduct)
app.use("/cart", routerCart)