//including dependencies
const async = require('async')
const request = require('request')
const _cliProgress = require('cli-progress');






//progress bar
const totalCalls = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
var avgCallResponseTime= 0;

function httpGet(url, callback) {
    const options = {
        url: url,
        time: true
    };
    request(options, function (err, res, body) {
        callback(err, res, body);
        if (err) {
            console.log(err);
        }
        else
        {
            totalCalls.increment(1);
            avgCallResponseTime+= res.elapsedTime/1000
       }

    });
}

const urls = []
for (let i = 0; i < 1000; i++) {
    urls.push("http://www.youtube.com")
}
totalCalls.start(3000, 0);

async.map(urls, httpGet, function (err, res) {
    if (err) return console.log(err);
      console.log("Average Response time is : " + Math.ceil(avgCallResponseTime/1000) + " ms" );
      process.exit()
})
