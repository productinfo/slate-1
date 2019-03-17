/* @jsx h */

import { Set } from 'immutable';
import h from '../../../../helpers/h';

export const input = (
    <text>
        <i>Cat</i>
        is
        <i>Cute</i>
    </text>
)[0];

export default function(t) {
    return t.getActiveMarks();
}

export const output = Set();
