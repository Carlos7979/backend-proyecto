const passport = require('passport')
const GithubStrategy = require('passport-github2')
const jwt = require('passport-jwt')
const { Users, Carts } = require('../dao/MongoDB')
const {
    hash: { createHash }
} = require('../utils/controller')
const {
    jwt: { cookieExtractor }
} = require('../utils/controller')
const adminUser = require('./adminUser')
require('dotenv').config()
const {
    env: {
        CLIENT_ID: clientID,
        CLIENT_SECRET: clientSecret,
        CALLBACK_URL: callbackURL,
        JWT_SECRET: secret
    }
} = process
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: secret
            },
            async (jwt_payload, done) => {
                try {
                    if (!jwt_payload.sub) return done(null, false, { message: 'No authorized' } )
                    if (jwt_payload.sub === '6477f88b7fff754486aaa903') {
						return done(null, adminUser)
                    }
                    const user = await Users.getUserById(jwt_payload.sub)
                    const cart = await Carts.getProductsByCartId(user.cart)
                    if (cart) user.cart = cart
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GithubStrategy(
            {
                clientID,
                clientSecret,
                callbackURL,
                scope: ['user:email']
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    if (!profile.hasOwnProperty('emails'))
                        throw new Error('Es requerido un correo electrónico')
                    const names = profile._json.name.split(' ')
                    const id = profile.id
                    let first_name, last_name
                    if (Array.isArray(names)) {
                        first_name = names[0] ? names[0] : id
                        last_name = names[1] ? names[1] : id
                    }
                    const email = profile.emails[0]?.value
                    let user = await Users.getUserByEmail(email)
                    if (user === 'Not found') {
                        user = await Users.addUser({
                            first_name,
                            last_name,
                            email,
                            password: createHash(refreshToken),
                            date_of_birth: new Date(Date.now())
                        })
                        if (user === 'Todos los campos son obligatorios')
                            throw new Error('Todos los campos son obligatorios')
                        if (user === 'Error al crear carrito de compras')
                            throw new Error('Error al crear carrito de compras')
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}

module.exports = initializePassport
