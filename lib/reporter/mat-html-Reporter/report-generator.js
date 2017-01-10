require("marko/node-require").install();
var fs = require("fs");
var template = require("./template.marko")

// var help = require("../../utils/helper")
// var data = help.JsonReader("data_err_platform", "src/data/");

module.exports.generate = function (data) {
    template.renderToString(data, function (err, output) {
        // console.log(output);
        var outputFile = __dirname + "/result/result.html";
        fs.writeFile(outputFile, output, function (err) {
            if (err) return console.log(err);
            console.log("save done");
            console.log("result can be viewed at " + outputFile)
        })
    });
}