"use strict";

import 'jest';
require("babel-core/register");
require("babel-polyfill");

import {Property} from "./property";
import {Subscription} from "rxjs/Subscription";
var assert = require('assert');

describe('Property', () => {

    var stringProp: Property<string>;
    var results: string[];
    var subscription: Subscription;

    beforeEach(() => {
        stringProp = new Property<string>("mike");
        results = [];

        subscription = stringProp.subscribe(next => results.push(next));
    });

    afterEach(() => {
        stringProp.complete();
    });

    describe('#reset()', () => {

        it('should reset the property to it\'s initial value', () => {

            stringProp.next("tacos");
            stringProp.reset();

            expect(["mike", "tacos", "mike"]).toEqual(results);
        });

    });

    describe('#next', () => {

        it('should not emmit a value if the new value is the same as the current value', () => {

            stringProp.next("mike");

            expect(["mike"]).toEqual(results);
        });

    });

});