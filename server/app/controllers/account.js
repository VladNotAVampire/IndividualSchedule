const UsersService = require('../services/users');
const action = require('../action');

const usersService = new UsersService();

exports.login = action({ bodyRequired: true },
    async ctx => {
        await passport.authenticate('local', function (err, user) {
            if (user == false) {
                ctx.body = "Login failed";
            } else {
                const payload = {
                    id: user.id,
                    role: user.role,
                    email: user.email
                };
                const token = jwt.sign(payload, jwtsecret);

                ctx.body = { user: { id: user.id, email: user.email }, token: 'JWT ' + token };
            }
        })(ctx);
    });

exports.regiser = action({ bodyRequired: true },
    async ctx => {
        const result = await usersService.create(ctx.request.body);
        if (result.error) {
            ctx.status = 400;
        }

        ctx.body = result;
    });