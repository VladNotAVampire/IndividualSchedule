const crypo = require('crypto');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const authconfig = require('../authconfig.json');
const UsersService = require('../services/users');

const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const usersService = new UsersService();

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
        async function (email, password, done) {
            try {
                console.warn(`Attempt to login ${email}`);

                const user = await usersService.findByEmail(email)

                if (!user || !user.checkPassword(password)) {
                    return done(null, 0, { message: 'Invalid credentials' });
                }
                return done(null, user);

            }
            catch (err) {
                return done(err);
            }
        }
    ));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authconfig.secret
    },
        async function (payload, done) {
            try{
                const user = await usersService.get(payload.id);

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            }catch (err){
                done(err);
            }
        })
    );

    return async (ctx, next) => {
        await passport.authenticate('jwt', function (err, user) {
            if (user) {
                ctx.user = user;
            }
        })(ctx, next);

        await next();
    }
};