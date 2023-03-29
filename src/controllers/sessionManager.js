export const getSession = (req, res) => {
    if (req.session.login) {
        res.redirect('/products', 200, {
            'message': "Bienvenido/a a mi tienda"
        })
    }
    res.redirect('/session/login', 500, {   
    })
}

export const testLogin = (req, res) => {
 
    const { email, password } = req.body

    try {
        if (email == "Aquilesbailo@gmail.com" && password == "5678") {
            req.session.login = true
            res.redirect('/products', 200)
        } else {
            res.redirect("/session/login", 500, {
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const destroySession = (req, res) => {
    if (req.session.login) {
        req.session.destroy()
     }
    res.redirect('/products', 200, {
        'divMessage': "Hola"
    })
}