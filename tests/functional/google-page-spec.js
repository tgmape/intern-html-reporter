define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'intern js page',

        'Navigate to intern doc': function () {
            return this.remote
                .get(require.toUrl('https://theintern.github.io'))
                .findById('showMenu')
                    .click()
                    .end()
                .findByCssSelector('#tableOfContents > ul > li:nth-child(5) > a')
                    .click()
                    .end()
                .findByCssSelector('#initialScrollPoint > h1')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'Intern. The user guide',
                        'Intern js doc page is not displayed');
                });
        },

        'to see error page': function () {
            return this.remote
                .get(require.toUrl('https://theintern.github.io'))
                .findById('showMenu')
                    .click()
                    .end()
                .findByCssSelector('#tableOfContents > ul > li:nth-child(5) > a')
                    .click()
                    .end()
                .findByCssSelector('#initialScrollPoint > h1')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'Intern. The user guides',
                        'This is just to display error in report');
                });
        },

        'Navigate to sitepen page': function () {
            return this.remote
                .get(require.toUrl('https://theintern.github.io'))
                .findById('showMenu')
                    .click()
                    .end()
                .findByCssSelector('#tableOfContents > ul > li:nth-child(6) > a')
                    .click()
                    .end()
                .findByCssSelector('body > div.mastheadContainer.masthead-labs > div > h1 > span')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'SitePen Labs',
                        'sitepen page is not displayed');
                });
        }
    });
});