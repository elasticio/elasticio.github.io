---
layout: default
title: Releases
description: List of the release notes listing the product updates.
---

{% assign releases = site.releases | sort: 'releaseDate' | reverse %}

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


<div class="file-box file-box_release_notes">
    <div class="wrap">
        <div class="file-box__list">
            {% for rel in releases %}
                {% if rel.version %}
                <a class="file-box__item" href="{{rel.url}}">
                        <span class="file-box__inner">
                            <i class="fa fa-tag"></i>
                            <span class="file-box__tit">{{rel.releaseDate}}</span>
                            <time>{{ rel.releaseDate | date: '%B %d, %Y' }}</time>
                        </span>
                </a>
                {% endif %}
            {% endfor %}
        </div>
    </div>
</div>



<div class="link-box">
    <div class="wrap">
        <div class="link-box__list">
            <ul class="link-box__column">
                <li class="link-box__item">
                    <div class="link-box__tit">Platform Releases</div>
                    <div class="link-box__holder">
                        {% for rel in releases %}
                            {% if rel.version%}
                              <a class="link-box__link" href="{{release.url}}">v{{rel.version}}</a>
                            {% endif %}
                        {% endfor %}
                    </div>
                </li>
            </ul>
            <ul class="link-box__column">
                <li class="link-box__item">
                    <div class="link-box__tit">Component Releases</div>
                    <div class="link-box__holder">
                        {% for release in releases %}
                            {% if release.version%}
                            <a class="link-box__link" href="{{release.url}}">#{{release.version}} - <time>{{ release.releaseDate | date: '%B %d, %Y' }}</time></a>
                            {% endif %}
                        {% endfor %}
                    </div>
                </li>
            </ul>
            <ul class="link-box__column">
                <li class="link-box__item">
                    <div class="link-box__tit">Useful Links</div>
                    <div class="link-box__holder">
                        <a class="link-box__link" href="{{site.data.tenant.apiBaseUri}}/docs/v2/">
                            <span class="label success">Stable</span>
                            REST API documentation v2 <i class="fa fa-external-link"></i>
                        </a>
                        {% if site.data.tenant.name == "elastic.io" %}
                        <a class="link-box__link" href="https://status.elastic.io">
                            {{site.data.tenant.name}} Status Page<i class="fa fa-external-link"></i>
                        </a>
                        <a class="link-box__link" href="https://support.elastic.io">
                            {{site.data.tenant.name}} Support Portal<i class="fa fa-external-link"></i>
                        </a>
                        {% endif %}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
