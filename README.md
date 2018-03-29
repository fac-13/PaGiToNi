Server API Call Project  [![Build Status](https://travis-ci.org/fac-13/PaGiToNi.svg?branch=master)](https://travis-ci.org/fac-13/PaGiToNi)
====================

Team PaGiToNi has built a site that allows you to view the latest news from a variety of reputable news sources, and search for news relating to issues of your choice 👍

Completed Key objectives 🏄‍🏄‍🏄‍🏄‍
-------------------------------------------------------------------------------------------------------------------------------

-   [x]  Use at least 1 API
-   [x]  Make your API calls from the back-end using the Request module (or one you build yourself)
-   [x]  The server contains a minimum of 2 routes
-   [x]  Back-end testing with Tape
-   [x]  Server testing with Supertest to inject fake HTTP requests
-   [x]  Project hosted on Heroku
-   [x]  Using module.exports and require to break a single large server file into smaller modules.
-   [x]  Employ continuous intergration on your project with Travis or a similar tool (not currently passing..)


Stretch goals still to complete 🙆‍
----------------------------------------------------------------------------------------------------------------
-   [ ]  Allow users to search via categories, countries, sources etc.
-   [ ]  Allow users to scroll across pages to view more than the set amount of news articles


Our journey 🚗
---------------------------------------------------------------------------------------------------------

### Day One (Tuesday)

-   We used a whiteboard to draw up a basic software architecture
-   We decided on our priorities for this project, namely: a clearly structured, documented API to allow us to focus on back-end requests 
-   We mob-programmed the initial setup

### Day Two (Wednesday)
-   Splitting into pairs👯‍, we started with:
    1. the first API call and its handler
    2. the xhr to reach the first API's route and handler

-  Reconvening to plan our next steps, we decided on:
    1.   beginning work on the second, user-input API call
    2.   prepping the front-end to render the response from the first xhr and API

### Biggest challenge: Mocking API calls

-  We attempted to test our back-end handlers using **nock** to mock an external API call. After struggling with it for several hours, we ultimately couldn't get it to work. 😭




### Resources

-   News API: 
[https://newsapi.org](https://newsapi.org)
-   Loading spinner : 
[http://tobiasahlin.com/spinkit/](http://tobiasahlin.com/spinkit/)

### Our initial software architecture plan:
![software architecture](https://i.imgur.com/ivyRkAP.jpg "title")