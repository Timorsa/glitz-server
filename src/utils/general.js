
/* regular expression for PW validation :
 * should contain at least one digit
 * should contain at least one lower case
 * should contain at least one upper case
 * should contain at least 8 from the mentioned characters
 */
const passwordRegex = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;

/*
*   @func  
*   @params object : Any
*   @desc   return object without empty keys  
*   @returns object  
*/
const cleanEmptyKeys = (object) => {
    const obj = object;
    for (var propName in obj) {
        if (obj[propName] === '' || typeof obj[propName] === undefined || obj[propName] === null) {
            delete obj[propName];
        }
    }
    return obj;
}

module.exports = {
    passwordRegex,
    cleanEmptyKeys
}