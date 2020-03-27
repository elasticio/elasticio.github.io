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


<div class="link-box">
    <div class="wrap">
        <div class="link-box__list">
            <ul class="link-box__column">
                <li class="link-box__item">
                    <div class="link-box__tit">Product Updates</div>
                    <div class="link-box__holder">
                        {% for rel in releases %}
                            {% if rel.version%}
                              <a class="link-box__link" href="{{rel.url}}">{{rel.releaseDate }} -  v{{rel.version}}</a>
                            {% endif %}
                        {% endfor %}
                    </div>
                </li>
            </ul>
            <ul class="link-box__column">
                <li class="link-box__item">
                    <div class="link-box__tit">Archives</div>
                    <div class="link-box__holder">
                        {% for rel in releases %}
                            {% if rel.archive%}
                            <a class="link-box__link" href="{{rel.url}}">{{rel.archive}} Product Updates</a>
                            {% endif %}
                        {% endfor %}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
