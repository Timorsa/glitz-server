/*
*   @func  
*   @params object : Any
*   @desc   return object without empty keys  
*   @returns object  
*/
function cleanEmptyKeys(object) {
    const obj = object;
    for (var propName in obj) {
        if (obj[propName] === '' || typeof obj[propName] === undefined || obj[propName] === null) {
            delete obj[propName];
        }
    }
    return obj;
}