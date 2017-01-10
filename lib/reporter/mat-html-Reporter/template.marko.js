function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa,
      forEachWithStatusVar = __helpers.fv,
      attr = __helpers.a;

  var util = require("./util");

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Marko Demo</title> <link href=\"http://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\"> <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css\"> <link rel=\"stylesheet\" href=\"style_materilize.css\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> </head> <body> <header> <div class=\"navbar-fixed\"> <nav class=\"top-nav yellow accent-4\"> <div class=\"container \"> <div class=\"container\"><a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse top-nav full hide-on-large-only\"><i class=\"material-icons grey-text text-darken-4\">view_list</i></a></div> <div class=\"nav-wrapper\"> <a class=\"page-title grey-text text-darken-4 small\">Intern Test Result</a> </div> </div> </nav> </div> <ul id=\"nav-mobile\" class=\"side-nav fixed z-depth-5 grey darken-4\"> <li class=\"bold\"> <a href=\"#summary\" class=\"waves-effect waves-teal yellow-text text-accent-4\"> <i class=\"material-icons yellow-text text-accent-4 small\">airplay</i>Summary</a> </li> ");

    if (data.length) {
      out.w(" ");

      forEach(data, function(platform) {
        out.w(" <li class=\"bold\"> <a href=\"#" +
          escapeXmlAttr(platform.id.replace(/ /gi, "")) +
          "\" class=\"waves-effect waves-teal yellow-text text-accent-4\"> <i class=\"material-icons yellow-text text-accent-4 small\">zoom_in</i>" +
          escapeXml(platform.name) +
          "</a> </li> ");
      });

      out.w(" ");
    }

    out.w(" </ul> </header> <main> <div class=\"container\"> <div class=\"row\"> <div id=\"dashboard\"> <div class=\"col s12 l12 m12\"> <ul class=\"collapsible popout\" data-collapsible=\"accordion\"> <li> <div class=\"collapsible-header active\"><i class=\"material-icons\">input</i>Test Information</div> <div class=\"collapsible-body\"> <table class=\"striped\"> <tbody> <tr> <td>Duration</td> <td class=\"green-text text-darken-2\">" +
      escapeXml(util.sumTime(data).totalTime) +
      " seconds</td> </tr> </tbody> </table> </div> </li> </ul> </div> </div> <div class=\"col s12 l12 m12\" id=\"summary\"> <div class=\"card\"> <div class=\"card-content\"> <span class=\"card-title black-text col s12 l12 m12\">All Platforms</span> <div class=\"col s6 l3 m6\"> <canvas id=\"pieChart0\" width=\"400\" height=\"400\"></canvas> </div> <div class=\"col s6 l3 m6\"> <canvas id=\"barChart0\" width=\"400\" height=\"400\"></canvas> </div> <table class=\"striped\"> <thead> <tr> <th>Platform</th> <th>Passes</th> <th>Failed</th> <th>Skipped</th> <th>Total</th> </tr> </thead> <tbody> ");

    forEach(data, function(platform) {
      out.w("<tr> <td>" +
        escapeXml(platform.name) +
        "</td> <td class=\"green-text text-darken-2\">" +
        escapeXml((platform.numTests - platform.numFailedTests) - platform.numSkippedTests) +
        "</td> <td class=\"red-text text-darken-2\">" +
        escapeXml(platform.numFailedTests) +
        "</td> <td class=\"teal-text text-darken-2\">" +
        escapeXml(platform.numSkippedTests) +
        "</td> <td>" +
        escapeXml(platform.numTests) +
        "</td> </tr>");
    });

    out.w(" </tbody> </table> </div> </div> </div> ");

    forEachWithStatusVar(data, function(platform, loop) {
      out.w("<div class=\"col s12 l12 m12\"" +
        attr("id", platform.id.replace(/ /gi, "")) +
        "> <div class=\"card col s12 l12 m12\"> <div class=\"card-content col s12 l12 m12\"> <span class=\"card-title black-text platform-chart col s12 l12 m12\">" +
        escapeXml(platform.name) +
        "</span> <div class=\"platform-chart col s6 l3 m6\"> <canvas id=\"pieChart" +
        escapeXmlAttr(loop.getIndex() + 1) +
        "\"></canvas> </div> <div class=\"platform-chart col s10 l9 m10\"> <ul class=\"collapsible popout\" data-collapsible=\"expandable\"> ");

      forEachWithStatusVar(platform.tests, function(suite, loop) {
        out.w("<li> <div class=\"collapsible-header ipg-yellow ipg-dark-text\"> <i class=\"material-icons\">keyboard_arrow_down</i> <span class=\"test-name\">" +
          escapeXml(suite.name) +
          " | </span> <span class=\"total-test\">Tests : " +
          escapeXml(suite.numTests) +
          " | </span> ");

        if (suite.numFailedTests) {
          out.w("<span class=\"fail-test\">Failed: " +
            escapeXml(suite.numFailedTests) +
            " | </span>");
        }

        out.w(" ");

        if (suite.skipped) {
          out.w("<span class=\"skip-test\">Skipped: " +
            escapeXml(suite.numSkippedTests) +
            "</span>");
        }

        out.w(" </div> <div class=\"collapsible-body\"> <table class=\"striped\"> <thead> <tr> <th>Tests</th> <th>Status</th> </tr> </thead> <tbody> ");

        forEach(suite.tests, function(test) {
          out.w("<tr> <td>" +
            escapeXml(test.name) +
            "</td> ");

          if (test.hasPassed) {
            out.w("<td class=\"green-text text-darken-2\">Pass</td>");
          }

          out.w(" ");

          if (test.error) {
            out.w("<td> <a class=\"waves-effect waves-light btn red\" href=\"#" +
              escapeXmlAttr(test.id.replace(/ /gi, "")) +
              "\">Fail</a> <div" +
              attr("id", test.id.replace(/ /gi, "")) +
              " class=\"modal\"> <div class=\"modal-content\"> <h3>" +
              escapeXml(test.error.name) +
              "</h3> <h5>Message:</h5> <samp>" +
              escapeXml(test.error.message) +
              "</samp> <h5>Stack</h5> <samp>" +
              escapeXml(test.error.stack) +
              "</samp> </div> <div class=\"modal-footer\"> <a href=\"#!\" class=\" modal-action modal-close waves-effect waves-green btn-flat\">Close</a> </div> </div> </td>");
          }

          out.w(" ");

          if (test.skipped) {
            out.w("<td class=\"skip-test\">Skip</td>");
          }

          out.w(" </tr>");
        });

        out.w(" </tbody> </table> </div> </li>");
      });

      out.w(" </ul> </div> </div> </div> </div>");
    });

    out.w(" </div> </div> </main> <script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script> <script src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js\"></script> <script src=\"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.js\"></script> <script>\r\n        $(document).ready(function () {\r\n            // Activate the side menu \r\n            $(\".button-collapse\").sideNav();\r\n            $('.modal').modal();\r\n\r\n            var data = " +
      str(JSON.stringify(data)) +
      ";\r\n\r\n            var totalTests = 0, totalPassed = 0, totalFailed = 0, totalSkipped = 0;\r\n            var platformName = [], platformNumTest = [],\r\n                platformFail = [], platformSkip = [],\r\n                platformPass = [], platformPassColor = []\r\n            platformFailColor = [], platformSkipColor = [];\r\n\r\n            for (var i = 0; i < data.length; i++) {\r\n                var platform = data[i];\r\n                platformName[i] = platform.name;\r\n                platformNumTest[i] = platform.numTests;\r\n                platformFail[i] = platform.numFailedTests;\r\n                platformSkip[i] = platform.numSkippedTests;\r\n                platformPass[i] = platformNumTest[i] - platformFail[i] - platformSkip[i];\r\n                totalTests = totalTests + platformNumTest[i];\r\n                totalFailed = totalFailed + platformFail[i];\r\n                totalSkipped = totalSkipped + platformSkip[i];\r\n                totalPassed = totalPassed + platformPass[i];\r\n                platformPassColor[i] = \"#ffdc00\";\r\n                platformFailColor[i] = \"#212121\";\r\n                platformSkipColor[i] = \"gray\";\r\n            }\r\n\r\n            var doughnutOptions = {\r\n                // title: {\r\n                //     display: true,\r\n                //     text: 'Test Status'\r\n                // },\r\n                legend: {\r\n                    display: false,\r\n                    fullWidth: false\r\n                },\r\n            };\r\n\r\n            var barOptions = {\r\n                legend: {\r\n                    display: false,\r\n                    fullWidth: false\r\n                },\r\n                scales: {\r\n                    xAxes: [{\r\n                        stacked: true,\r\n                        display: false\r\n                    }],\r\n                    yAxes: [{\r\n                        stacked: true\r\n                    }]\r\n                },\r\n                gridLines: {\r\n                    offsetGridLines: false\r\n                }\r\n            }\r\n\r\n            var ctxPieChart0 = document.getElementById(\"pieChart0\");\r\n            var pieChart0 = new Chart(ctxPieChart0, {\r\n                type: 'doughnut',\r\n                animation: {\r\n                    animateScale: true\r\n                },\r\n                data: {\r\n                    labels: [\"Pass\", \"Fail\", \"Skip\"],\r\n                    datasets: [{\r\n                        data: [totalPassed, totalFailed, totalSkipped],\r\n                        backgroundColor: [\r\n                            'rgba(255, 214, 0, 1)',\r\n                            'rgba(33, 33, 33, 1)',\r\n                            'rgba(126, 126, 124, 1)',\r\n                        ],\r\n                        borderWidth: 3\r\n                    }]\r\n                },\r\n                options: doughnutOptions\r\n            });\r\n\r\n            for (var i = 0; i < data.length; i++) {\r\n                var platform = data[i];\r\n                var ctxPieChartx = document.getElementById(\"pieChart\" + (i + 1));\r\n                var pieChartx = new Chart(ctxPieChartx, {\r\n                    type: 'doughnut',\r\n                    animation: {\r\n                        animateScale: true\r\n                    },\r\n                    data: {\r\n                        labels: [\"Pass\", \"Fail\", \"Skip\"],\r\n                        datasets: [{\r\n                            data: [\r\n                                platform.numTests - platform.numFailedTests - platform.numSkippedTests,\r\n                                platform.numFailedTests,\r\n                                platform.numSkippedTests\r\n                            ],\r\n                            backgroundColor: [\r\n                                'rgba(255, 214, 0, 1)',\r\n                                'rgba(33, 33, 33, 1)',\r\n                                'rgba(126, 126, 124, 1)',\r\n                            ],\r\n                            borderWidth: 3\r\n                        }]\r\n                    },\r\n                    options: doughnutOptions\r\n                });\r\n            }\r\n\r\n            var ctxBarChart0 = document.getElementById(\"barChart0\");\r\n            var barChart0 = new Chart(ctxBarChart0, {\r\n                type: 'bar',\r\n                data: {\r\n                    labels: platformName,\r\n                    datasets: [\r\n                        {\r\n                            label: \"Passed\",\r\n                            backgroundColor: platformPassColor,\r\n                            borderWidth: 1,\r\n                            data: platformPass,\r\n                        },\r\n                        {\r\n                            label: \"Failed\",\r\n                            backgroundColor: platformFailColor,\r\n                            borderWidth: 1,\r\n                            data: platformFail,\r\n                        },\r\n                        {\r\n                            label: \"Skipped\",\r\n                            backgroundColor: platformSkipColor,\r\n                            borderWidth: 1,\r\n                            data: platformSkip,\r\n                        }\r\n                    ]\r\n                },\r\n                options: barOptions\r\n            });\r\n\r\n        });\r\n    </script> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
