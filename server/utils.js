exports.isAsset = function (path) {
    var pieces = path.split('/');
    if (pieces.length === 0) {
        return false;
    }
    var lastPiece = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    } else if (lastPiece.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}
