const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Users } = require('../dao/MongoDB')
const {
    hash: { createHash, isValidPassword }
} = require('../utils/controller')
const {
    validate: { emailValidate }
} = require('../utils/controller')
const adminUser = require('./adminUser')

const initializePassport = () => {
    // Passport utiliza sus propios middleares
    // Iniciaremos la estrategia local
    /**
     * username será en este caso el correo
     * done será el callback de resolución  de passport, el primer argumento es para error y el segundo para el usuario
     */
    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email'
            },
            async (req, username, password, done) => {
                // passport doesn't allow executed this middleware without username nor password
                const { first_name, last_name, date_of_birth } = req.body
                try {
                    if (!first_name || !last_name || !date_of_birth) {
                        throw new Error('Todos los campos son obligatorios')
                    }
                    emailValidate(username)
                    const user = await Users.addUser({
                        first_name,
                        last_name,
                        email: username,
                        password: createHash(password),
                        date_of_birth
                    })
                    if (user === 'Todos los campos son obligatorios')
                        throw new Error('Todos los campos son obligatorios')
                    if (user === 'Error al crear carrito de compras')
                        throw new Error('Error al crear carrito de compras')
                    if (user === 'Correo ya registrado') throw new Error('Correo ya registrado')
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email'
            },
            async (username, password, done) => {
                try {
                    emailValidate(username)
                    if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                        // id generated on https://observablehq.com/@hugodf/mongodb-objectid-generator
                        return done(null, adminUser)
                    }
                    const user = await Users.getUserByEmail(username)
                    if (user === 'Not found')
                        throw new Error(
                            `El usuario con el email ${username} no se encuentra registrado.`
                        )
                    if (!isValidPassword(user, password))
                        throw { message: 'La contraseña proporcionada es incorrecta', status: 401 }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await Users.getUserById(id)
        done(null, user)
    })
}

module.exports = initializePassport
