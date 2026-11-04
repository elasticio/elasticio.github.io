---
layout: default
title: Releases
description: List of the release notes listing the product updates.
# Release numbers are set manually (YY.WW) because the release dates are not on a fixed schedule.
# Update both values with every release. If a value is empty, the latest one is taken from the
# newest release note and the next one is not shown.
latest_release: "26.45"
next_release: "26.49"
---
{% assign releases = site.releases | sort: 'releaseDate' | reverse %}
{% if page.latest_release and page.latest_release != "" %}
  {% assign latest_release = page.latest_release %}
{% else %}
  {% assign latest_release = releases.first.version %}
{% endif %}
{% assign next_release = page.next_release %}

<div class="wrap">
    <div class="breadcrumbs">
        <a href="/" class="breadcrumbs__item">Home</a>
        <span class="breadcrumbs__item">Releases</span>
    </div>
</div>
{% assign chapter = site.data.chapters[page.collection] %}
<div class="welcomer welcomer_icon">
    <div class="wrap">
        <div class="welcomer__icon {{chapter.welcommer-class}}"><i class="fa {{chapter.fa-icon}}"></i></div>
        <div class="welcomer__tit">{{page.title}}</div>
        <div class="welcomer__text">{{chapter.description}}</div>
    </div>
</div>

<div class="wrap">
    <div class="description">
      <p>
      {{site.data.tenant.companyName}} product updates are released once per month.
      The release numbering format is based on year and week of the release - <strong>YY.WW</strong>.
      <ul>
        <li><strong>YY</strong> are the last two digits of the year.</li>
        <li><strong>WW</strong> is the number of the week in that year.</li>
        </ul>
        <p>
            The latest release is <strong>v{{ latest_release }}</strong>{% if next_release and next_release != "" %} and the next release would be <strong>v{{ next_release }}</strong>{% endif %}.
        </p>
    </p>
    <!-- {% assign week = releases[0].version | split: "." %}
      <p>
        The latest release is <strong>v{{releases[0].version}}</strong> and the
        next release would be <strong>v{{week[0]}}.{{week[1] | plus: 2}}</strong>.
      </p> -->
    </div>
</div>

<div class="file-box file-box_release_notes">
    <div class="wrap">
        <div class="file-box__list">
            {% for rel in releases %}
                {% if rel.version%}
                <a class="file-box__item" href="{{rel.url}}">
                        <span class="file-box__inner">
                            <i class="fa fa-newspaper-o"></i>
                            <span class="file-box__tit">v{{rel.version}}</span>
                            <time>{{ rel.releaseDate | date: '%B %d, %Y' }}</time>
                        </span>
                </a>
                {% endif %}
            {% endfor %}
        </div>
    </div>
    <div class="wrap">
    <div class="description">
    <h2>Archives</h2>
      <p>
      Here we present the list of past product updates grouped into the quarters.
      </p>
    </div>
    </div>
    <div class="wrap">
        <div class="file-box__list">
            {% for rel in releases %}
                {% if rel.archive %}
                <a class="file-box__item" href="{{rel.url}}">
                        <span class="file-box__inner">
                            <i class="fa fa-archive"></i>
                            <span class="file-box__tit">v{{rel.archive}}</span>
                            <time>{{ rel.releaseDate | date: '%B %d, %Y' }}</time>
                        </span>
                </a>
                {% endif %}
            {% endfor %}
        </div>
    </div>
</div>
