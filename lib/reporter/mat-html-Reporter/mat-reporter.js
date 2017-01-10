define(function(require){
    function matReporter(config){
        config = config || {};
        this.output = config.output;
    }

    matReporter.prototype = {
        runEnd(executor){
            require("intern/dojo/node!./report-generator").generate(executor.suites)
        },
    }
    return matReporter;
})