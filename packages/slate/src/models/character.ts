import logger from '@gitbook/slate-dev-logger';
import { List, Record, Set } from 'immutable';
import isPlainObject from 'is-plain-object';

import MODEL_TYPES, { isType } from '../constants/model-types';

/*
 * Default properties.
 *
 * @type {Object}
 */

const DEFAULTS = {
    marks: new Set(),
    text: ''
};

/*
 * Character.
 *
 * @type {Character}
 */

class Character extends Record(DEFAULTS) {
    /*
     * Object.
     *
     * @return {String}
     */

    get object(): 'character' {
        return 'character';
    }

    get kind(): 'character' {
        logger.deprecate(
            'slate@0.32.0',
            'The `kind` property of Slate objects has been renamed to `object`.'
        );
        return this.object;
    }

    /*
     * Check if `any` is a `Character`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

    public static isCharacter = isType.bind(null, 'CHARACTER');
    /*
     * Create a `Character` with `attrs`.
     *
     * @param {Object|String|Character} attrs
     * @return {Character}
     */

    public static create(attrs = {}) {
        if (Character.isCharacter(attrs)) {
            return attrs;
        }

        if (typeof attrs === 'string') {
            attrs = { text: attrs };
        }

        if (isPlainObject(attrs)) {
            return Character.fromJS(attrs);
        }

        throw new Error(
            `\`Character.create\` only accepts objects, strings or characters, but you passed it: ${attrs}`
        );
    }

    /*
     * Create a list of `Characters` from `elements`.
     *
     * @param {String|Array<Object|Character|String>|List<Object|Character|String>} elements
     * @return {List<Character>}
     */

    public static createList(elements = []) {
        if (typeof elements === 'string') {
            elements = elements.split('');
        }

        if (List.isList(elements) || Array.isArray(elements)) {
            const list = new List(elements.map(Character.create));
            return list;
        }

        throw new Error(
            `\`Block.createList\` only accepts strings, arrays or lists, but you passed it: ${elements}`
        );
    }

    /*
     * Create a `Character` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Character}
     */

    public static fromJS(object) {
        const { text, marks = [] } = object;

        if (typeof text !== 'string') {
            throw new Error(
                '`Character.fromJS` requires a block `text` string.'
            );
        }

        const character = new Character({
            text,
            marks: new Set(marks)
        });

        return character;
    }

    /*
     * Alias `fromJS`.
     */

    public static fromJSON(object) {
        logger.deprecate(
            'slate@0.35.0',
            'fromJSON methods are deprecated, use fromJS instead'
        );
        return Character.fromJS(object);
    }

    /*
     * Check if `any` is a character list.
     */

    public static isCharacterList(input: any): boolean {
        return (
            List.isList(input) &&
            input.every(item => Character.isCharacter(item))
        );
    }

    /*
     * Return a JSON representation of the character.
     *
     * @return {Object}
     */

    public toJS() {
        const object = {
            object: this.object,
            text: this.text,
            marks: this.marks.toArray().map(m => m.toJS())
        };

        return object;
    }

    /*
     * Alias `toJSON`.
     */

    public toJSON() {
        logger.deprecate(
            'slate@0.35.0',
            'toJSON methods are deprecated, use toJS instead'
        );
        return this.toJS();
    }
}

/*
 * Attach a pseudo-symbol for type checking.
 */

Character.prototype[MODEL_TYPES.CHARACTER] = true;

/*
 * Export.
 *
 * @type {Character}
 */

export default Character;
