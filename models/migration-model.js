const getDb=require('../database/db').getDb;

const oracledb =require('oracledb');

var fs = require('fs');

module.exports=class Migration{
    

//Fetch conditional Migration data from database
static fetchMigrationData(req){
    let selections = req.body.selections;
    let source_db_version = req.body.source_db_version;
    
    let platform_family = req.body.platform_family;
    
    let os_platform = req.body.os_platform;
    
    let cdb = req.body.cdb;
    
    let nls_cs_compatible = req.body.nls_cs_compatible;
    
    let db_size = req.body.db_size;
    
    let network_bandwidth = req.body.network_bandwidth;
    
    let target_db = req.body.target_db;
    
    let target_db_version = req.body.target_db_version;
    
    let permissible_dt = req.body.permissible_dt;
    
    console.log('the query parameter ',selections);
    return new Promise((resolve,reject)=>{
   
    let sql;
    var options={};
    const connection=getDb();
    

    if(selections == '0'){
        console.log('We have reached here ',selections);
        connection.query(`select source_db_version from migration_decision_details group by source_db_version`,[],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_source_db_version = response;
                    resolve(response);
                })
                .catch(err=>{
                    reject(err)
    
                })  
    }
    else if(selections == '1'){
        connection.query(`select platform_family from migration_decision_details where source_db_version=:source_db_version group by platform_family`,[source_db_version],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_platform_family = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })  
    }else if(selections == '2'){
        connection.query(`select os_platform from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family group by os_platform`,[source_db_version,platform_family],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_os_platform = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })  
    }else if(selections == '3'){
        connection.query(`select cdb from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform group by cdb`,[source_db_version,platform_family,os_platform],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_cdb = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                }) 
    }else if(selections == '4'){
        connection.query(`select nls_cs_compatible from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb group by nls_cs_compatible`,[source_db_version,platform_family,os_platform,cdb],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_nls_cs_compatible = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                }) 
    }else if(selections == '5'){
        connection.query(`select db_size from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible group by db_size`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_db_size = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })
    }else if(selections == '6'){
        connection.query(`select network_bandwidth from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible
        and db_size=:db_size group by network_bandwidth`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible,db_size],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_network_bandwidth = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })
    }else if(selections == '7'){
        connection.query(`select target_db from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible
        and db_size=:db_size and network_bandwidth=:network_bandwidth group by target_db`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible,db_size,network_bandwidth],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_target_db = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })
    }else if(selections == '8'){
        connection.query(`select target_db_version from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible
        and db_size=:db_size and network_bandwidth=:network_bandwidth
        and target_db=:target_db group by target_db_version`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible,db_size,network_bandwidth,target_db],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_target_db_version = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
                })
    }
    else if(selections == '9'){
        connection.query(`select permissible_dt from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible
        and db_size=:db_size and network_bandwidth=:network_bandwidth
        and target_db=:target_db and target_db_version=:target_db_version group by permissible_dt`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible,db_size,network_bandwidth,target_db,target_db_version],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_permissible_dt = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })
    }else if(selections == '10'){
        connection.query(`select migration_method from migration_decision_details where 
        source_db_version=:source_db_version and platform_family=:platform_family
        and os_platform=:os_platform and cdb=:cdb
        and nls_cs_compatible=:nls_cs_compatible
        and db_size=:db_size and network_bandwidth=:network_bandwidth
        and target_db=:target_db and target_db_version=:target_db_version
        and permissible_dt=:permissible_dt group by migration_method`,[source_db_version,platform_family,os_platform,cdb,nls_cs_compatible,db_size,network_bandwidth,target_db,target_db_version,permissible_dt],
            {
                outFormat:oracledb.OBJECT
            })
            .then(response=>{
                    file_migration_method = response;
                    resolve(response)
                })
                .catch(err=>{
                    reject(err)
    
                })
    }
      
        })
    }

    static writeIntoFile(req , res){
        
    let file_source_db_version = req.body.source_db_version;
    let file_platform_family = req.body.platform_family;
    let file_os_platform = req.body.os_platform;
    let file_cdb = req.body.cdb;
    let file_nls_cs_compatible = req.body.nls_cs_compatible;
    let file_db_size = req.body.db_size;
    let file_network_bandwidth = req.body.network_bandwidth;
    let file_target_db = req.body.target_db;
    let file_target_db_version = req.body.target_db_version;
    let file_permissible_dt = req.body.permissible_dt;
    let generateFile = []; //Array to be fed into the file

        //Source DB version
        if(file_source_db_version == '< 11.2.0.3'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }else if(file_source_db_version == '11.2.0.3'){
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
        }else if(file_source_db_version == '11.2.0.4'){
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
        }else if(file_source_db_version == '12cR1'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
        }else if(file_source_db_version == '12cR2'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
        }else{
            console.log('Going to a DB version whose data not stored in  Migration_Dataset table')
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }

        //Platform family 
        if(file_platform_family == 'Little Endian'){
            generateFile.push(1);
        }else{
            generateFile.push(0);
        }

        //OS Platform
        if(file_platform_family == 'Big Endian'){
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
        }else if(file_os_platform == 'Linux x86-64'){
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
        }else{
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }

        //CDB -- Container Databse
        if(file_source_db_version != '12cR1' && file_source_db_version != '12cR2'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }else if(file_cdb == 'CDB'){
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
        }else{
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
        }

        //NLS CS Compatible
        if(file_nls_cs_compatible == 'Yes'){
            generateFile.push(1);
        }else{
            generateFile.push(0);
        }

        //DB size
        if(file_db_size ==  'SDB'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
        }else if(file_db_size ==  'MDB'){
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
        }else if(file_db_size ==  'LDB'){
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
        }else if(file_db_size ==  'VLDB'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }

        //Network Bandwidth
        if(file_network_bandwidth == 'Cloud Storage'){
            generateFile.push(0);
        }else if(file_network_bandwidth == 'Dedicated VPN'){
            generateFile.push(1);
        }

        //Target DB (SAAS/PAAS)
        if(file_target_db == 'IaaS'){
            generateFile.push(0);
        }else if(file_target_db == 'PaaS'){
            generateFile.push(1);
        }

        //Target DB version
        if(file_source_db_version != '12cR1' && file_source_db_version != '12cR2'){
            if(file_target_db_version == '11gR2'){
                generateFile.push(1);
                generateFile.push(0);
                generateFile.push(0);
            }else if(file_target_db_version == '12cR1'){
                generateFile.push(0);
                generateFile.push(1);
                generateFile.push(0);
            }else if(file_target_db_version == '12cR2'){
                generateFile.push(0);
                generateFile.push(0);
                generateFile.push(1);
            }
        }else{
            if(file_target_db_version == '12cR1'){
                generateFile.push(0);
                generateFile.push(1);
                generateFile.push(0);
            }else if(file_target_db_version == '12cR2'){
                generateFile.push(0);
                generateFile.push(0);
                generateFile.push(1);
            }
        }

        //Permissible DT
        if(file_permissible_dt == 'LDT'){
            generateFile.push(0);
            generateFile.push(1);
            generateFile.push(0);
        }else if(file_permissible_dt == 'MDT'){
            generateFile.push(0);
            generateFile.push(0);
            generateFile.push(1);
        }else if(file_permissible_dt == 'DNC'){
            generateFile.push(1);
            generateFile.push(0);
            generateFile.push(0);
        }

        
        console.log('The data to be written is' , generateFile );
        return new Promise( (resolve , reject)=>{
            

            var file = fs.createWriteStream('FileCreated.txt');

            file.on('error', function(err) { 
                reject('Some error in File creation');
             });
            generateFile.forEach(function(v) { 
                file.write(v + '\r\n');
            });
            file.end();
            resolve(generateFile);
        })
    }


}