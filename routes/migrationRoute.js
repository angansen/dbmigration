const migrationController=require('../controllers/migration-controller')
var express = require('express');
var router = express.Router();

router.post('/getMigrationData',migrationController.fetchMigrationData);
router.post('/generateFile',migrationController.generateFile);
router.post('/clientFile',migrationController.clientFile);

module.exports = router;
