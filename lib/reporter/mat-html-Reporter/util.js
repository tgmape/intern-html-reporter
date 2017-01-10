exports.sumTime = function(data) {
    var sum = 0, test=0, fail=0, skip=0;

    for (var index = 0; index < data.length; index++) {
        var element = data[index];
        sum = sum + element.timeElapsed;
        test = test + element.numTests;
        fail = fail + element.numFailedTests;
        skip = skip + element.numSkippedTests;
    }

    summary = {
        totalTime : Math.floor(sum/1000),
        totalTest : test,
        totalFail : fail,
        totalSkip : skip,
        totalPass : test - fail - skip
    }
    
    return summary;
};
