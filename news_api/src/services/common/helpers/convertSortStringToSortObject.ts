// Any exception thrown in this method must be handled by it's caller.

export default function convertSortStringToSortObject(sortStr: string) {
    if (sortStr.length == 0) return;

    JSON.parse(sortStr)
}