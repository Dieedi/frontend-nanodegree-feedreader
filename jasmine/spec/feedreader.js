/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 var menuVisibility, first;
$(function() {
    var first;
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    // var allFeeds = [];
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url are defined', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed]).toBeDefined();
                expect(allFeeds[feed].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (var feed in allFeeds) {
                expect(allFeeds[feed]).toBeDefined();
                expect(allFeeds[feed].name.length).not.toBe(0);
            }
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // check for class menu-hidden on body
        var menuVisibility = function() {
            return $("body").hasClass('menu-hidden');
        }

        it('is hidden at launch', function() {
            expect(menuVisibility()).toBeTruthy();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // menu-icon-link is the link to be clicked to open menu
        var button = $('.menu-icon-link');

        // test if click on button open menu by toggling the menu-hidden class
        it('is toggled when menu button is clicked', function() {
            button.click();
            // on first click class menu-hidden should not be here
            expect(menuVisibility()).toBeFalsy();
            button.click();
            // on second click class menu-hidden should reappear
            expect(menuVisibility()).toBeTruthy();
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* loadFeed() is called on init and on feedList click ($('.feed-list'))
     * focus on init first
     */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            //  before each test call the function with done as callback
            loadFeed(0, done);
        });

        it('are called', function(done) {
            //  add a sppy on the function to check if it loads
            spyOn(window, 'loadFeed');
            loadFeed(0);
            expect(window.loadFeed).toHaveBeenCalled();
            done();
        });

        it('with at least one entry',function(done) {
            loadFeed(0);
            expect($('a').hasClass('entry-link')).toBeTruthy();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New feed Selection', function() {
        beforeEach(function(done) {
            //  before each test call the function with done as callback
            loadFeed(0, done);
        });

        describe('first feed', function() {

            it('is loaded',function(done) {
                loadFeed(0);
                feed0 = $('.entry h2').first().text();
                expect($('a').hasClass('entry-link')).toBeTruthy();
                done();
            });

            describe('second feed', function(done) {
                beforeEach(function(done) {
                    loadFeed(1, done);
                });

                it('is not the same as first', function(done) {
                    loadFeed(1);
                    feed1 = $('.entry h2').first().text();
                    expect(feed1).not.toEqual(feed0);
                    done();
                });

                describe('third feed', function(done) {
                    beforeEach(function(done) {
                        loadFeed(2, done);
                    });

                    it('is not the same as second', function(done) {
                        loadFeed(2);
                        feed2 = $('.entry h2').first().text();
                        expect(feed2).not.toEqual(feed1);
                        done();
                    });

                    describe('fourth feed', function(done) {
                        beforeEach(function(done) {
                            loadFeed(3, done);
                        });

                        it('is not the same as third', function(done) {
                            loadFeed(3);
                            feed3 = $('.entry h2').first().text();
                            expect(feed3).not.toEqual(feed2);
                            done();
                        });
                    });
                });
            });
        });
    });

    var menuLength = $('.feed-list li').length;

    function testBegin(i) {
        describe('New feed Selection', function() {
            beforeEach(function(done) {
                //  before each test call the function with done as callback
                loadFeed(i, done);
            });

            describe('origin feed', function() {

                it('is loaded',function(done) {
                    loadFeed(i);
                    feed0 = $('.entry h2').first().text();
                    expect($('a').hasClass('entry-link')).toBeTruthy();
                    done();
                });

                if (i < menuLength) {
                    for (var j = i + 1; j < menuLength; j++) {
                        compareNext(j);
                    };
                }

                if (i >= 0) {
                    for (var j = i - 1; j >= 0; j--) {
                        comparePrevious(j);
                    };
                };
            });
        });
    }

    function comparePrevious(j) {
        describe('previous feed', function(done) {
            beforeEach(function(done) {
                loadFeed(j, done);
            });

            it('is not the same as origin', function(done) {
                loadFeed(j);
                feed1 = $('.entry h2').first().text();
                expect(feed1).not.toEqual(feed0);
                done();
            });
        });
    }

    function compareNext(j) {
        describe('next feed', function(done) {
            beforeEach(function(done) {
                loadFeed(j, done);
            });

            it('is not the same as origin', function(done) {
                loadFeed(j);
                feed1 = $('.entry h2').first().text();
                expect(feed1).not.toEqual(feed0);
                done();
            });
        });
    }

    for (var i = 0; i < menuLength; i++) {
        testBegin(i);
    }
}());
