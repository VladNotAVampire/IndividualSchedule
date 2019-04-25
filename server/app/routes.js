'use strict';

const Router = require('koa-router');
const miscController = require('./controllers/misc');
const subjectsController = require('./controllers/subjects');

const SUBJECTS_PREFIX = "subjects"

const router = new Router({ prefix: "/api"});
router.get('/', miscController.getApiInfo);
router.get('/spec', miscController.getSwaggerSpec);

router.get(`/${SUBJECTS_PREFIX}`, subjectsController.get)
      .get(`/${SUBJECTS_PREFIX}/:id`, subjectsController.get);
router.post(`/${SUBJECTS_PREFIX}`, subjectsController.post);
router.patch(`/${SUBJECTS_PREFIX}/:id`, subjectsController.patch);
router.delete(`/${SUBJECTS_PREFIX}/:id`, subjectsController.delete);

module.exports = router;
