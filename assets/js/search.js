var search = instantsearch({
    appId: 'V2486N1OKP',
    apiKey: '8b8391d5265b293410fca650e3cd2b9e',
    indexName: 'test_elasticio',
    urlSync: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-input'
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        hitsPerPage: 10,
        templates: {
            item: document.getElementById('hit-template').innerHTML,
            empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
        }
    })
);
search.start();