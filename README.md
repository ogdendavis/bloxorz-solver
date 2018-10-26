# Bloxorz Solver!

## What?
This is a Javascript program to solve Bloxorz puzzles. Bloxorz is a puzzle game
in which the goal is to maneuver a 1x1x2 rectangular cuboid across a field of
squares and into the hole. You can check out the game [here](http://miniclip.wikia.com/wiki/Bloxorz).

This code was written for [this Codewars kata](https://www.codewars.com/kata/bloxorz-solver).

## How?
I broke the task down into multiple functions which do things like move the
block, find the position of things on the map, and determine if a set of
coordinates represent a valid block location on the map. I used Jasmine to
attack this challenge in a test-driven development model, writing tests for a
function before writing the function itself. I started by rewriting the tests
provided in the kata for overall success, and then worked backwards to test each
individual function that I would need. I used module.exports to connect the
tests to the scripts.

The main function that runs the search for the solution is a recursive, breadth-
first algorithm that finds the solution by simultaneously exploring many
different possible solutions until it finds one that reaches the exit.

## Why?
Because I can! Or rather, to prove to myself that I can. I've done lots of
projects that feature bits and pieces of test-driven development, modules, and
recursive search. I wanted to put it all together in one project, and this kata
gave me the opportunity to do just that!
