const Migration=require('../models/migration-model');
const getDb=require('../database/db').getDb;
const oracledb =require('oracledb');



exports.fetchMigrationData=(req,res)=>{
   
    console.log(req.body);
   
    Migration.fetchMigrationData(req).then(result=>{
            res.json(result);
        })
   
}

exports.generateFile=(req,res)=>{
   
    console.log(req.body);
   
    Migration.writeIntoFile(req).then(result=>{
            res.json(result);
        })
   
}

