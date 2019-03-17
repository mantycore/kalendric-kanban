const types = [
    'CARD'
];

export default itemType => {
    if (types.includes(itemType)) {
        return itemType;
    } else {
        throw new Error(`Unknown itemType: ${itemType}`);
    }
}