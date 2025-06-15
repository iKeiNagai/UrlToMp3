const cron = require('node-cron');
const path = require('path');
const cleanUp = require('../utils/cleanUp');

//clean up every 30 mins
function scheduledCleanUp (){
    const filePath = path.join(__dirname, '..', 'controllers', 'download');

    cron.schedule('*/30 * * * *', () => {
        console.log('cron executed');
        cleanUp(filePath);
    })
}

module.exports = scheduledCleanUp;