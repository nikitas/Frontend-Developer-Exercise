# Frontend Developer Exercise 2.7

[![Build Status](https://travis-ci.org/Bane-Maksin/Frontend-Developer-Exercise.svg?branch=master)](https://travis-ci.org/Bane-Maksin/Frontend-Developer-Exercise)

## Description

For the purpose of this exercise, I have used Gulp modules as tasks runner and bower module for external dependency package management.

The main purpose of Gulp tasks is to provide automation of every aspect regarding static resources. Bower packages, custom files and so on are automatically included and maintained into the desired placeholders.

## Logic
Since Ergast is a public API, the small caching mechanism has been implemented to store retrieved JSON data into the browser local storage. The logic is simply checking is there a valid data in the cache that can be used. If not, the 2 HTTP requests will be made to restart the cache process.

## W3C and JS validation
During the build process (and also when the watch task is active) newly created files are checked against JSHint configuration and both CSSs and HTMLs files (with support for Angular templates) are validated against W3C online service.

## Graphic elements
Every graphic elements are automatically created for later include into the project build.

	- Font icons are automatically created with preview directly from SVG files, and SASS mixins support and with new wof2 web font format
	- CSS sprites are also automatically created with full retina and SASS mixins support

## Optimization
Every resources in distribution folder are optimized for maximum performance. All project JS files are included into one, minified and timestamped using RequireJS r.js library for it. The same apply for CSS files. Also all the HTML files are fully minified.

 As for the graphic elements, they are progressively optimized before delivery to distribution folder.

## UI/UX
For the visual part, the Foundation framework has been used in conjunction with lightweight mixin library for SASS called Bourbon. Around 99% of styles are what Foundation is providing out of the box.

## Unit tests
Currently only one example test has been written, but soon we should have full test coverage for all methods using Karma, Jasmine and PhantomJS environment.