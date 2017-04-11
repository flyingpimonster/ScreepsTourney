"use strict"

const request = require('request-promise-native')
const webinterface = require('../webinterface')

module.exports = function(config) {
    // change history chunk size to 100
    config.engine.historyChunkSize = 100

    // create api instance with credentials from challenge file
    var api = new webinterface(config.challenge.interface, config.challenge.apikey)

    // create room history handler
    config.engine.on("saveRoomHistory", (name, baseTime, data) => {
        // get rid of obnoxious notifyWhenAttacked properties
        for(let obj of data.ticks[baseTime]) delete obj.notifyWhenAttacked

        // upload history
        // TODO: error handling
        api.roomHistory(data)
    })
}
