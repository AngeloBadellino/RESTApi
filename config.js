// Create and export the environment object

var environment = {};

environment.staging = {
    'port': 3000,
    'envName': 'staging'
};

environment.production = {
    'port': 5000,
    'envName': 'production'
};

// Read the environment passed as parameter to the node process
var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : '';

// Get the environment object (staging default)
var environmentToExport =  typeof(environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;

module.exports = environmentToExport;