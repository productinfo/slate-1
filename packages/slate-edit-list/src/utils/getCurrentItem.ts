import { Block, Value } from '@gitbook/slate';
import Options from '../options';

/*
 * Return the current list item, from current selection or from a node.
 */

function getCurrentItem(
    opts: Options,
    value: Value,
    block?: Block
): Block | null {
    const { document } = value;

    if (!block) {
        if (!value.selection.startKey) {
            return null;
        }
        block = value.startBlock;
    }

    const parent = document.getParent(block.key);
    return parent && parent.type === opts.typeItem ? parent : null;
}

export default getCurrentItem;
