// Library to storing and deal with data on the file system

// Dependencis.
var fs = require('fs');
var path = require('path');

// Module container to exported.
var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = function(dir, file, data, callback){
    // Open the file for reading.
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescription){
        if(!err && fileDescription){
            // Convert data into string
            var stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescription, stringData,function(err){
                if(!err){
                    fs.close(fileDescription,function(err){
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};

// Read data from the file
lib.read = function(dir, file, callback){
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data){
        callback(err, data);
    });
};

lib.update = function(dir, file, data, callback){
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescription){
        if (!err && fileDescription){
            // Convert data into string
            var stringData = JSON.stringify(data);

            // Truncate the file 
            fs.ftruncate(fileDescription, function(err){
                if (!err){
                    // Write to the file and close it
                    fs.writeFile(fileDescription, stringData, function(err){
                        if (!err){
                            fs.close(fileDescription, function(err){
                                if (!err){
                                    callback(false);
                                } else {
                                    callback('Error closing the file.')
                                }
                            })
                        } else {
                            callback('Error writing to the file');
                        }
                    })
                } else {
                    callback('Error trucnating the file.');
                }
            });
        } else {
            callback('Could not open the file for updating.')
        }
    });
};

lib.delete = function(dir,file,callback){
    // Open the file for writing
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err){
        if(!err){
            callback(false);
        } else {
            callback('Could not delete the file.');
        }
    });
};

// Exported module
module.exports = lib;
