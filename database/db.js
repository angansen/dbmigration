const oracledb =require('oracledb');
const Promise=require('promise');
var SimpleOracleDB = require('simple-oracledb');
SimpleOracleDB.extend(oracledb);


const Dbconnect=()=>{
	
	const dbAttr={
		user          : "seaas",
	    password      : "seaas",
	    connectString : "solutionengineering-devops.us.oracle.com/sepdbdev.us.oracle.com"
			}
			return new Promise((resolve,reject)=>{
				oracledb.getConnection(dbAttr)
					.then(connection=>{
						_db=connection;
						resolve('Connected')
					})
					.catch((err)=>{
						console.log('Can not connect to DB')
					})		
			})
				
	  }

	const getDb=()=>{ 
	if(_db){
		return _db;
	}
	throw 'No Database Found';
}

	module.exports={
		Dbconnect:Dbconnect,
		getDb:getDb
	};
