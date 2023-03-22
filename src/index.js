import 'dotenv/config'
import express from 'express'
import * as path from 'path'
import { __dirname } from "./path.js"
import { Engine } from 'express-handlebars'
import  socket  from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'

const app = express()
const managerMessage = new getManagerMessages()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("port",process.env.PORT || 8080 )

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, "./views"))

const server = app.listen(app.get("port", () => console.log(`Server on port ${app.get("port")}`)))

const io = socket(server)

io.on("connection", async (socket) => {
    socket.on ("message", async (info) => {
        await managerMessage.addElements([info])
        const messages = await managerMessage.getElements()
        console.log(messages)
        socket.emit("allMessages", messages)
    })
} )