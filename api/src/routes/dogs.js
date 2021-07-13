const { Router } = require('express');
const router = Router();
const { getDogs, postDog, getDogParam } = require('./controllers/dogController.js');
// const { mayus } = require('../utils/middlewares/mayus')
// const { mayus } = ('./utils/middlewares/mayus.js');

router.get('/', getDogs);
router.get('/:id',getDogParam);
router.post('/',postDog);


module.exports = router;
