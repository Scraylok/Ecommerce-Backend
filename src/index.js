import 'dotenv/config'
import express from 'express'
import  { Server } from 'socket.io'
import cookieParser  from 'cookie-parser'
import session from 'express-session'
import * as path from 'path'
import { __dirname } from "./path.js"
import { engine } from 'express-handlebars'
import { getManagerMessages, getManagerProducts, getManagerCart } from './dao/daoManager.js'
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
import routerUser from './routes/user.routes.js'
import MongoStore from 'connect-mongo'
import routerSession from './routes/session.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30
    }),
   
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
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
//Coockies
app.get('/setCookie' , (req,res) => {
    res.cookie('CookieCookie', "Esta es mi primer cookie", { maxAge:6000 , signed: true}.send('Cookie'))
})
app.get('/getCookie', (req,res) => {
    res.send(req.signedCookies)
})

//Session
app.get('/session', (req,res) => {
    if (req.session.counter){
        req.session.counter++
        (res.send(`ingresaste ${req.session.counter} veces`))
    }else {
        req.session.counter = 1
        res.send("Hola,bienvenido por primera vez")
    }
})
app.get("/login", (req,res) => {
    const {email, password} = req.body

    if (email == user.email && password == user.password){
        req.session.email = email
        req.session.password = password
        res.send("Se iniciado sesión correctamente")
    }else {
        res.send("Login invalido")
    }

})
app.get("/logout", (req,res) =>{
    req.session.destroy(() => {
        res.send("Sesión finalizada")
    })
} )

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
app.use("/user", routerUser)
app.use("/products", routerProduct)
app.use("/cart", routerCart)
app.use("/session", routerSession)