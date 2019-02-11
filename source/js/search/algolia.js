(function () {
    $('a.social-icon.search').on('click', function () {
        $('body').css('width', '100%');
        $('body').css('overflow', 'hidden');
        $('.search-dialog').velocity('stop').velocity('fadeIn', {
            duration: 300,
            complete: function () {
                $('.ais-search-box--input').focus();
            }
        });
        $('.search-mask').velocity('stop').velocity('fadeIn', {
            duration: 300
        });

        // shortcut: ESC
        document.addEventListener('keydown', function f(event) {
            if (event.code === 'Escape') {
                closeSearch();
                document.removeEventListener('keydown', f);
            }
        });
    });

    var closeSearch = function () {
        $('body').css('overflow', 'auto');
        $('.search-dialog').velocity('stop').velocity('fadeOut', {
            duration: 300
        });
        $('.search-mask').velocity('stop').velocity('fadeOut', {
            duration: 300
        });
    };
    $('.search-mask, .search-close-button').on('click', closeSearch);


    var algolia = window.GLOBAL_CONFIG.algolia;
    var isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName;
    if (!isAlgoliaValid) {
        return console.error('Algolia setting is invalid!');
    }

    var search = instantsearch({
        appId: algolia.appId,
        apiKey: algolia.apiKey,
        indexName: algolia.indexName,
        routing: true,
        searchParameters: {
            hitsPerPage: algolia.hits.per_page || 10
        }
        // searchFunction: function (helper) {
        //     var searchInput = $('#search-box').find('input');
        //     if (searchInput.val()) {
        //         helper.search();
        //     }
        // }
    });

    // initialize currentRefinedValues
    // search.addWidget(
    //     instantsearch.widgets.currentRefinedValues({
    //         container: '#current-refined-values',
    //         // This widget can also contain a clear all link to remove all filters,
    //         // we disable it in this example since we use `clearAll` widget on its own.
    //         clearAll: false
    //     })
    // );

    // initialize clearAll
    // search.addWidget(
    //     instantsearch.widgets.clearAll({
    //         container: '#clear-all',
    //         templates: {
    //             link: 'Reset everything'
    //         },
    //         autoHideContainer: false
    //     })
    // );

    // initialize pagination
    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#algolia-pagination',
            scrollTo: false,
            showFirstLast: false,
            labels: {
                first: '<i class="fa fa-angle-double-left"></i>',
                last: '<i class="fa fa-angle-double-right"></i>',
                previous: '<i class="fa fa-angle-left"></i>',
                next: '<i class="fa fa-angle-right"></i>'
            },
            cssClasses: {
                root: 'pagination',
                item: 'pagination-item',
                link: 'page-number',
                active: 'current',
                disabled: 'disabled-item'
            }
        })
    );

    // initialize RefinementList
    // search.addWidget(
    //     instantsearch.widgets.refinementList({
    //         container: '#refinement-list',
    //         attributeName: 'categories'
    //     })
    // );

    // initialize SearchBox
    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: window.GLOBAL_CONFIG.algolia.languages.input_placeholder
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                item: function (data) {
                    var link = data.permalink ? data.permalink : (window.GLOBAL_CONFIG.root + data.path);
                    return (
                        '<a href="' + link + '" class="algolia-hit-item-link">' +
                        data._highlightResult.title.value +
                        '</a>'
                    );
                },
                empty: function (data) {
                    return (
                        '<div id="algolia-hits-empty">' +
                        window.GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
                        '</div>'
                    );
                }
            },
            cssClasses: {
                item: 'algolia-hit-item'
            }
        })
    );

    // search.addWidget(
    //     instantsearch.widgets.searchBox({
    //         container: '#algolia-search-input',
    //         reset: false,
    //         magnifier: false,
    //         placeholder: window.GLOBAL_CONFIG.algolia.languages.input_placeholder
    //     })
    // );
    // search.addWidget(
    //     instantsearch.widgets.hits({
    //         container: '#algolia-hits',
    //         templates: {
    //             item: function (data) {
    //                 var link = data.permalink ? data.permalink : (window.GLOBAL_CONFIG.root + data.path);
    //                 return (
    //                     '<a href="' + link + '" class="algolia-hit-item-link">' +
    //                     data._highlightResult.title.value +
    //                     '</a>'
    //                 );
    //             },
    //             empty: function (data) {
    //                 return (
    //                     '<div id="algolia-hits-empty">' +
    //                     window.GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
    //                     '</div>'
    //                 );
    //             }
    //         },
    //         cssClasses: {
    //             item: 'algolia-hit-item'
    //         }
    //     })
    // );
    //
    // search.addWidget(
    //     instantsearch.widgets.stats({
    //         container: '#algolia-stats',
    //         templates: {
    //             body: function (data) {
    //                 var stats = window.GLOBAL_CONFIG.algolia.languages.hits_stats
    //                     .replace(/\$\{hits}/, data.nbHits)
    //                     .replace(/\$\{time}/, data.processingTimeMS);
    //                 return (
    //                     '<hr>' +
    //                     stats +
    //                     '<span class="algolia-logo pull-right">' +
    //                     '  <img src="' + window.GLOBAL_CONFIG.root + 'img/algolia.svg" alt="Algolia" />' +
    //                     '</span>'
    //                 );
    //             }
    //         }
    //     })
    // )
    //
    // search.addWidget(
    //     instantsearch.widgets.pagination({
    //         container: '#algolia-pagination',
    //         scrollTo: false,
    //         showFirstLast: false,
    //         labels: {
    //             first: '<i class="fa fa-angle-double-left"></i>',
    //             last: '<i class="fa fa-angle-double-right"></i>',
    //             previous: '<i class="fa fa-angle-left"></i>',
    //             next: '<i class="fa fa-angle-right"></i>'
    //         },
    //         cssClasses: {
    //             root: 'pagination',
    //             item: 'pagination-item',
    //             link: 'page-number',
    //             active: 'current',
    //             disabled: 'disabled-item'
    //         }
    //     })
    // );

    search.start();
})();
