function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        document.body.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// https://github.com/substack/point-in-polygon/blob/master/index.js
function pointInPolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

document.addEventListener("DOMContentLoaded",function(){
    const eastorwestWrapper = document.getElementById('eastorwestWrapper')

    getLocation((position) => {
        const { coords } = position
        let point = [coords.longitude, coords.latitude]

        // West
        /* point = [
          13.291397094726562,
          52.49657756892365
        ]*/

        // East
        /* point = [
          13.47198486328125,
          52.52248815280757
        ]*/

        const eastorwest = pointInPolygon(point, window.geodata.geometry.coordinates[0]) ? 'WEST' : 'EAST'

        eastorwestWrapper.innerHTML = eastorwest
    })
});
