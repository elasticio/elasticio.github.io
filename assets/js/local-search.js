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
     * Search results are dynamically generated.
     * Explicitly navigate when a result is clicked.
     */
    results.addEventListener('mousedown', function (event) {
        var link = event.target.closest('a');

        if (!link) {
            return;
        }

        if (event.button !== 0) {
            return;
        }

        window.location.href = link.href;
    });

    /*
     * Load the generated Jekyll search index.
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
     * Escape HTML before inserting text into the results.
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
     * Escape characters used by regular expressions.
     */
    function escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /*
     * Convert the query into searchable words.
     *
     * Example:
     *
     * "component run out of memory"
     *
     * becomes:
     *
     * ["component", "run", "out", "of", "memory"]
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
     * Find whether the complete phrase exists in a field.
     */
    function containsPhrase(text, query) {
        return text.indexOf(query) !== -1;
    }

    /*
     * Find the positions of all tokens inside a piece of text.
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
     * Calculate how close the search words are to each other.
     *
     * The smaller the span, the better the match.
     *
     * Example:
     *
     * "component run out of memory"
     *
     * appearing together gets a much better score than the
     * same words scattered throughout the document.
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

                /*
                 * Once the span becomes very large there is
                 * little benefit in continuing this window.
                 */
                if (span > 1000) {
                    break;
                }
            }
        }

        if (bestSpan === Infinity) {
            return 0;
        }

        /*
         * Close words receive a larger bonus.
         */
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
     * Score a search result.
     *
     * Exact phrases are deliberately much more important
     * than individual word matches.
     */
    function scoreResult(item, tokens, query) {
        var title = (item.title || '').toLowerCase();
        var content = (item.content || '').toLowerCase();
        var doc = (item.doc || '').toLowerCase();

        var score = 0;

        /*
         * -----------------------------------------------------
         * Exact phrase matches
         * -----------------------------------------------------
         */

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

        /*
         * -----------------------------------------------------
         * Proximity
         * -----------------------------------------------------
         *
         * If the complete phrase isn't present, reward results
         * where the individual words are close together.
         */

        score += proximityScore(title, tokens) * 3;
        score += proximityScore(doc, tokens) * 2;
        score += proximityScore(content, tokens);

        /*
         * -----------------------------------------------------
         * Individual word matches
         * -----------------------------------------------------
         *
         * These are intentionally much weaker than phrase
         * matches.
         */

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
     * Determine whether an item is eligible for the search.
     *
     * First preference:
     *   complete phrase exists.
     *
     * Fallback:
     *   every search word exists somewhere in the document.
     */
    function matches(item, tokens, query) {
        var title = (item.title || '').toLowerCase();
        var content = (item.content || '').toLowerCase();
        var doc = (item.doc || '').toLowerCase();

        /*
         * Exact phrase match.
         */
        if (
            title.indexOf(query) !== -1 ||
            doc.indexOf(query) !== -1 ||
            content.indexOf(query) !== -1
        ) {
            return true;
        }

        /*
         * Fallback to all individual words.
         *
         * This keeps useful results when the exact phrase
         * doesn't exist anywhere.
         */
        return tokens.every(function (token) {
            return (
                title.indexOf(token) !== -1 ||
                doc.indexOf(token) !== -1 ||
                content.indexOf(token) !== -1
            );
        });
    }

    /*
     * Create a readable preview around the first matching word.
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

        /*
         * Prefer the complete phrase when finding the preview.
         */
        var query = tokens.join(' ');
        var phrasePosition = lowerText.indexOf(query);

        if (phrasePosition !== -1) {
            position = phrasePosition;
        } else {
            tokens.some(function (token) {
                var found = lowerText.indexOf(token);

                if (
                    found !== -1 &&
                    (position === -1 || found < position)
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

        if (start + previewLength < cleanText.length) {
            preview += '…';
        }

        return highlight(preview, tokens);
    }

    /*
     * Highlight individual search words.
     *
     * We intentionally highlight the words separately so that
     * highlighting also works when the exact phrase doesn't exist.
     */
    function highlight(text, tokens) {
        var escaped = escapeHtml(text);

        tokens.forEach(function (token) {
            if (!token) {
                return;
            }

            var expression = new RegExp(
                '(' + escapeRegExp(escapeHtml(token)) + ')',
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
     * Render search results.
     */
    function renderResults(items, query, tokens) {
        if (!items.length) {
            results.innerHTML =
                '<div class="ais-hits__empty">' +
                'We didn\'t find any results for the search ' +
                '<em>"' + escapeHtml(query) + '"</em>' +
                '</div>';

            results.style.display = 'block';

            return;
        }

        var html = '';

        items.slice(0, maxResults).forEach(function (item) {
            html +=
                '<div class="ais-hits--item">' +
                    '<a href="' + escapeHtml(item.url) + '">' +
                        '<span class="hit-title">' +
                            highlight(
                                item.title || item.doc,
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
        results.style.display = 'block';
    }

    /*
     * Perform the search.
     */
    function performSearch() {
        var query = input.value.trim().toLowerCase();

        if (!query) {
            results.innerHTML = '';
            results.style.display = 'none';

            return;
        }

        if (!searchData.length) {
            return;
        }

        var tokens = tokenize(query);

        if (!tokens.length) {
            results.style.display = 'none';

            return;
        }

        var found = searchData
            .filter(function (item) {
                return matches(item, tokens, query);
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

        renderResults(found, query, tokens);
    }

    /*
     * Search while typing.
     */
    input.addEventListener('input', performSearch);

    /*
     * Re-open results when focusing the search field.
     */
    input.addEventListener('focus', function () {
        if (input.value.trim()) {
            performSearch();
        }
    });

    /*
     * Close the search dropdown when clicking elsewhere.
     */
    document.addEventListener('click', function (event) {
        if (
            event.target !== input &&
            !results.contains(event.target)
        ) {
            results.style.display = 'none';
        }
    });

    /*
     * Escape closes the search results.
     */
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            input.value = '';
            results.innerHTML = '';
            results.style.display = 'none';
            input.blur();
        }
    });
})();