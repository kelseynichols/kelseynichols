var mysql = require('mysql');
var pool = mysql.createPool({
   connectionlimit: 10,
   host: process.env.RDS_HOSTNAME,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: process.env.RDS_DATABASE
});

exports.pool = pool;

exports.empty = function (procName, args) {
    return callProcedure(procName, args)
        .then( function() {} );
}

exports.row = function (procName, args) {
    return callProcedure(procName, args)
        .then (function(resultsets) {
            return resultsets[0][0];
        })
}
exports.rows = function (procName, args) {
    return callProcedure(procName, args)
        .then (function(resultsets) {
            return resultsets[0];
        })
}

function callProcedure(procName, args) {
    if (!args) {
        args = [];
    }
    var argString = '';
    for (var i = 0; i < args.length; i++) {
        if (i === args.length - 1) {
            argString += '?';
         } else {
            argString += '?,';
        }
    }
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(error, connection){
            if (error) {
                reject(error);
            } else {
                connection.query('call ' + procName + '(' + argString + ');', args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                })
            }
        })
    })
}
