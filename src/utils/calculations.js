// @ts-nocheck
/*
*   @func  (number, number, number, number)
*   @params latitude and longitude of 2 point
*   @desc calculates distance between 2 geolocation
*   @returns distance in km 
*   @source : geodatasource.com/developers/javascript
*/
const geoDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        return dist;
    }
}

/*
*   @func (array, string)
*   @params get an array of objects and key we want to avg by
*   @desc returns average of given key
*/
const avgByKey = (array, key) => {
    if (array.length !== 0) {
        let sum = 0;
        array.forEach(item => {
            sum += item[key];
        });
        return sum / array.length;
    } else return 0;
}

/*
*   @func (object, Number)
*   @params object of time (hours minutes), and duration in minutes
*   @desc returns average of given key
*/
const calculateDurationTime = (time, duration) => {
    if (time.minutes + duration < 60) {
        const totalMinutes = time.minutes + duration;
        const hours = time.hours + Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return {
            hours,
            minutes
        }
    } else return {
        hours: time.hours,
        minutes: time.minutes + duration
    }
}

module.exports = {
    avgByKey,
    geoDistance,
    calculateDurationTime
}