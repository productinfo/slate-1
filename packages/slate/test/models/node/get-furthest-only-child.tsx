/* @jsx h */

import assert from 'assert';
import h from '../../helpers/h';

export default function() {
    const { document } = (
        <value>
            <document>
                <paragraph>Some Text</paragraph>
            </document>
        </value>
    );

    const paragraph = document.nodes.first();
    const text = paragraph.getFirstText();

    assert.equal(document.getFurthestOnlyChildAncestor(paragraph.key), null);
    assert.equal(paragraph.getFurthestOnlyChildAncestor(text.key), null);
    assert.equal(document.getFurthestOnlyChildAncestor(text.key), paragraph);
}
