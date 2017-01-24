import Immutable from 'immutable';
import { curry, concat } from 'lodash';

function moveListItemBase (fromIndex, toIndex, list) {
    const from = list.get(fromIndex);
    list = list.delete(fromIndex);

    return list.insert(toIndex, from);
}

function fromJSBase (recordClasses, data) {
    return Immutable.fromJS(data, function (key, value) {
        const record = value.get('record');

        if (record) {
            if (!recordClasses[record]) {
                throw new Error(`Record class ${record} not found`);
            }

            return new recordClasses[record](value.toObject());
        } else {
            return Immutable.Iterable.isIndexed(value) ? value.toList() : value.toMap();
        }
    });
}

function updateRecursiveBase (Item, updater, item) {
    if (item instanceof Item) {
        return item.update(updater);
    } else if (item instanceof Immutable.List || item instanceof Immutable.Map) {
        return item.map(updateRecursive(Item, updater));
    } else {
        return item;
    }
}

function traverseRecursiveBase (Item, path, callback, item, key) {
    const currentPath = concat(path, [key]);

    if (item instanceof Item) {
        callback(item, currentPath);
        return item;
    } else if (item instanceof Immutable.List || item instanceof Immutable.Map) {
        return item.map(traverseRecursive(Item, currentPath, callback));
    } else {
        return item;
    }
}

export const traverseRecursive = curry(traverseRecursiveBase);
export const updateRecursive = curry(updateRecursiveBase);
export const moveListItem = curry(moveListItemBase);
export const fromJS = curry(fromJSBase);
