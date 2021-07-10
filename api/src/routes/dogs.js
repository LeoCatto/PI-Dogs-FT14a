const { Router } = require('express');
const router = Router();
const { getDogs, postDog, getDogParam } = require('./controllers/dogController.js');

router.get('/',getDogs);
router.get('/:idDog',getDogParam);
router.post('/',postDog);


module.exports = router;
