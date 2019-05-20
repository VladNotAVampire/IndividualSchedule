'use strict';

const Router = require('koa-router');

const controllers = require('./controllers');
const miscController = controllers.misc;
const subjectsController = controllers.subjects;
const accountController = controllers.account;
const itemsController = controllers.items;

const SUBJECTS_PREFIX = "subjects"
const ITEMS_PREFIX = "items";

const router = new Router({ prefix: "/api"});
router.get('/', miscController.getApiInfo);
router.get('/spec', miscController.getSwaggerSpec);

router.post('/user', accountController.regiser);
router.post('/login', accountController.login);

router.get(`/${SUBJECTS_PREFIX}`, subjectsController.get)
      .get(`/${SUBJECTS_PREFIX}/:id`, subjectsController.get);
router.post(`/${SUBJECTS_PREFIX}`, subjectsController.post);
router.patch(`/${SUBJECTS_PREFIX}/:id`, subjectsController.patch);
router.delete(`/${SUBJECTS_PREFIX}/:id`, subjectsController.delete);

router.get(`/${ITEMS_PREFIX}/:id`, itemsController.getById);
router.get(`/${ITEMS_PREFIX}/ofSubject/:subjectId`, itemsController.getBySubjectId);
router.get(`/${ITEMS_PREFIX}/file/:id`, itemsController.getFile);
router.post(`/${ITEMS_PREFIX}/`, itemsController.post);

module.exports = router;
