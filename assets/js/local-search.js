(function () {
'use strict';

var input = document.getElementById('search-input');
var results = document.getElementById('hits');

if (!input || !results) {
    return;
}

var searchData = [];
var maxResults = 20;


/*
 * =========================================================
 * SEARCH OPEN / CLOSE
 * =========================================================
 */

function openResults() {
    results.style.display = 'block';
}

function closeSearch() {
    input.value = '';
    results.innerHTML = '';
    results.style.display = 'none';
    input.blur();
}


/*
 * =========================================================
 * RESULT LINKS
 * =========================================================
 */

results.addEventListener('mouseup', function (event) {

    if (event.button !== 0) {
        return;
    }

    var link = event.target.closest('a');

    if (!link) {
        return;
    }

    if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }

    event.stopPropagation();

    window.location.assign(link.href);
});


/*
 * =========================================================
 * LOAD SEARCH INDEX
 * =========================================================
 */

fetch('/assets/js/search-data.json')
    .then(function (response) {

        if (!response.ok) {
            throw new Error('Unable to load search index');
        }

        return response.json();
    })
    .then(function (data) {
        searchData = data;
    })
    .catch(function (error) {
        console.error('Local search:', error);
    });


/*
 * =========================================================
 * HTML ESCAPING
 * =========================================================
 */

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


/*
 * =========================================================
 * REGEX ESCAPING
 * =========================================================
 */

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/*
 * =========================================================
 * TOKENIZE
 * =========================================================
 */

function tokenize(query) {
    return query
        .toLowerCase()
        .split(/[\s/]+/)
        .map(function (token) {
            return token.trim();
        })
        .filter(function (token) {
            return token.length > 0;
        });
}


/*
 * =========================================================
 * PHRASE MATCH
 * =========================================================
 */

function containsPhrase(text, query) {
    return text.indexOf(query) !== -1;
}


/*
 * =========================================================
 * TOKEN POSITIONS
 * =========================================================
 */

function tokenPositions(text, tokens) {
    var positions = [];

    tokens.forEach(function (token) {

        var position = text.indexOf(token);

        if (position !== -1) {
            positions.push({
                token: token,
                position: position
            });
        }
    });

    return positions;
}


/*
 * =========================================================
 * PROXIMITY SCORE
 * =========================================================
 */

function proximityScore(text, tokens) {

    if (!tokens.length) {
        return 0;
    }

    var positions = tokenPositions(text, tokens);

    if (positions.length < 2) {
        return 0;
    }

    positions.sort(function (a, b) {
        return a.position - b.position;
    });

    var bestSpan = Infinity;

    for (var i = 0; i < positions.length; i++) {

        var start = positions[i].position;
        var end = start;

        for (var j = i + 1; j < positions.length; j++) {

            end = positions[j].position;

            var span = end - start;

            if (span < bestSpan) {
                bestSpan = span;
            }

            if (span > 1000) {
                break;
            }
        }
    }

    if (bestSpan === Infinity) {
        return 0;
    }

    if (bestSpan <= 50) {
        return 80;
    }

    if (bestSpan <= 100) {
        return 60;
    }

    if (bestSpan <= 200) {
        return 40;
    }

    if (bestSpan <= 400) {
        return 20;
    }

    return 5;
}


/*
 * =========================================================
 * SCORE RESULT
 * =========================================================
 */

function scoreResult(item, tokens, query) {

    var title = (item.title || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    var doc = (item.doc || '').toLowerCase();

    var score = 0;

    if (title === query) {
        score += 500;
    }

    if (containsPhrase(title, query)) {
        score += 300;
    }

    if (containsPhrase(doc, query)) {
        score += 200;
    }

    if (containsPhrase(content, query)) {
        score += 150;
    }

    score += proximityScore(title, tokens) * 3;
    score += proximityScore(doc, tokens) * 2;
    score += proximityScore(content, tokens);

    tokens.forEach(function (token) {

        if (title.indexOf(token) !== -1) {
            score += 20;
        }

        if (doc.indexOf(token) !== -1) {
            score += 10;
        }

        if (content.indexOf(token) !== -1) {
            score += 3;
        }
    });

    return score;
}


/*
 * =========================================================
 * MATCH RESULT
 * =========================================================
 */

function matches(item, tokens, query) {

    var title = (item.title || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    var doc = (item.doc || '').toLowerCase();

    if (
        title.indexOf(query) !== -1 ||
        doc.indexOf(query) !== -1 ||
        content.indexOf(query) !== -1
    ) {
        return true;
    }

    return tokens.every(function (token) {

        return (
            title.indexOf(token) !== -1 ||
            doc.indexOf(token) !== -1 ||
            content.indexOf(token) !== -1
        );
    });
}


/*
 * =========================================================
 * CREATE PREVIEW
 * =========================================================
 */

function createPreview(text, tokens) {

    if (!text) {
        return '';
    }

    var cleanText = text.trim();

    if (!cleanText) {
        return '';
    }

    var lowerText = cleanText.toLowerCase();
    var position = -1;

    var query = tokens.join(' ');
    var phrasePosition = lowerText.indexOf(query);

    if (phrasePosition !== -1) {

        position = phrasePosition;

    } else {

        tokens.some(function (token) {

            var found = lowerText.indexOf(token);

            if (
                found !== -1 &&
                (
                    position === -1 ||
                    found < position
                )
            ) {
                position = found;
                return true;
            }

            return false;
        });
    }

    var start;

    if (position === -1) {
        start = 0;
    } else {
        start = Math.max(0, position - 80);
    }

    var previewLength = 220;

    var preview = cleanText.substring(
        start,
        start + previewLength
    );

    if (start > 0) {
        preview = '…' + preview;
    }

    if (
        start + previewLength <
        cleanText.length
    ) {
        preview += '…';
    }

    return highlight(preview, tokens);
}


/*
 * =========================================================
 * HIGHLIGHT
 * =========================================================
 */

function highlight(text, tokens) {

    var escaped = escapeHtml(text);

    tokens.forEach(function (token) {

        if (!token) {
            return;
        }

        var expression = new RegExp(
            '(' +
            escapeRegExp(
                escapeHtml(token)
            ) +
            ')',
            'gi'
        );

        escaped = escaped.replace(
            expression,
            '<mark>$1</mark>'
        );
    });

    return escaped;
}


/*
 * =========================================================
 * RENDER RESULTS
 * =========================================================
 */

function renderResults(items, query, tokens) {

    if (!items.length) {

        results.innerHTML =
            '<div class="ais-hits__empty">' +
                'We didn\'t find any results for the search ' +
                '<em>"' +
                escapeHtml(query) +
                '"</em>' +
            '</div>';

        openResults();

        return;
    }

    var html = '';

    items
        .slice(0, maxResults)
        .forEach(function (item) {

            html +=
                '<div class="ais-hits--item">' +

                    '<a href="' +
                        escapeHtml(item.url) +
                    '">' +

                        '<span class="hit-title">' +
                            highlight(
                                item.title ||
                                item.doc,
                                tokens
                            ) +
                        '</span>' +

                        '<span class="hit-text">' +
                            createPreview(
                                item.content,
                                tokens
                            ) +
                        '</span>' +

                    '</a>' +

                '</div>';
        });

    results.innerHTML = html;

    openResults();
}


/*
 * =========================================================
 * PERFORM SEARCH
 * =========================================================
 */

function performSearch() {

    var query =
        input.value
            .trim()
            .toLowerCase();

    if (!query) {
        closeSearch();
        return;
    }

    if (!searchData.length) {
        return;
    }

    var tokens = tokenize(query);

    if (!tokens.length) {
        closeSearch();
        return;
    }

    var found = searchData

        .filter(function (item) {
            return matches(
                item,
                tokens,
                query
            );
        })

        .map(function (item) {

            return {
                item: item,
                score: scoreResult(
                    item,
                    tokens,
                    query
                )
            };
        })

        .sort(function (a, b) {
            return b.score - a.score;
        })

        .map(function (entry) {
            return entry.item;
        });

    renderResults(
        found,
        query,
        tokens
    );
}


/*
 * =========================================================
 * INPUT
 * =========================================================
 */

input.addEventListener(
    'input',
    performSearch
);


/*
 * =========================================================
 * FOCUS
 * =========================================================
 */

input.addEventListener(
    'focus',
    function () {

        if (input.value.trim()) {
            performSearch();
        }
    }
);


/*
 * =========================================================
 * OUTSIDE CLICK
 * =========================================================
 */

document.addEventListener(
    'click',
    function (event) {

        var clickedInput =
            event.target === input ||
            input.contains(event.target);

        var clickedResults =
            event.target === results ||
            results.contains(event.target);

        if (clickedInput) {
            return;
        }

        if (clickedResults) {
            return;
        }

        closeSearch();
    },
    true
);


/*
 * =========================================================
 * ESCAPE
 * =========================================================
 */

input.addEventListener(
    'keydown',
    function (event) {

        if (event.key === 'Escape') {
            closeSearch();
        }
    }
);


/*
 * =========================================================
 * INITIAL STATE
 * =========================================================
 */

results.innerHTML = '';
results.style.display = 'none';

})();