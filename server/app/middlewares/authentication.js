const crypo = require('crypto');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const authconfig = require('../authconfig.json');
const UsersService = require('../services/users');

const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.JwtStrategy;
const ExtractJwt = passportJwt.ExtractJwt;

const usersService = new UsersService();

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
        await function (email, password, done) {
            try {
                const user = await usersService.findByEmail(email)

                if (!user || !user.checkPassword(password)) {
                    return done(null, false, { message: 'Invalid credentials' });
                }
                return done(null, user);

            }
            catch (err) {
                return done(err);
            }
        }
    ));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: authconfig.secret
    },
        function (payload, done) {
            try{
                const user = usersService.get(payload.id);

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
    }
};