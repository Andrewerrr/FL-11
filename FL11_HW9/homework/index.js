function executeforEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i]);
    }
}

function mapArray(arr, cb) {
    const result = [];
    const newCb = (e) => {
        result.push(cb(e))
    };
    executeforEach(arr, newCb);
    return result;
}

function filterArray(arr, cb) {
    const result = [];
    const newCb = (e) => {
        if (cb(e)) {
            result.push(e);
        }
    };
    executeforEach(arr, newCb);
    return result;
}

function getNumbers(str) {
    return filterArray(mapArray(str.split(''), l => +l), l => !!l);
}

getNumbers('n1um3ber95');

function findTypes() {
    const types = ['string', 'number', 'boolean', 'object', 'undefined'];
    const result = {};
    executeforEach(types, type => {
        const typeCount = filterArray([...arguments], param => typeof param === type).length;
        if (typeCount) {
            result[type] = typeCount;
        }
    });
    return result;
}

findTypes(null, 1, 'hello', 'hello', 1);

function showFormattedDate(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).replace(/,/g, '');
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

function canConvertToDate(date) {
    return showFormattedDate(new Date(date)) !== 'Invalid Date';
}

canConvertToDate('2016-13-18T00:00:00');
canConvertToDate('2016-03-18T00:00:00');

const checkIsAdult = (datestring) => {
    const MIN_AGE_YEAR = 18;
    const date = new Date(datestring);
    const year = date.getFullYear() + MIN_AGE_YEAR;
    console.log('year', year);
    const month = date.getMonth() - 1;
    console.log('month', month);
    const day = date.getDate();
    const dateNow = new Date();
    console.log('dateNow', dateNow);
    const minBirthday = new Date(year, month, day);
    console.log('minBirthday', minBirthday);
    return minBirthday <= dateNow;
};

function getAmountOfAdultPeople(data) {
    console.log(data);
    const dataFilteredByAdult = filterArray(data, ({birthday}) => checkIsAdult(birthday));
    return dataFilteredByAdult.length;
}

const data = [
    {
        '_id': '5b5e3168c6bf40f2c1235cd6',
        'index': 0,
        'birthday': '2016-03-18T00:00:00',
        'eyeColor': 'green',
        'name': 'Stein',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e3168e328c0d72e4f27d8',
        'index': 1,
        'birthday': '1991-02-11T00:00:00',
        'eyeColor': 'blue',
        'name': 'Cortez',
        'favoriteFruit': 'strawberry'
    },
    {
        '_id': '5b5e3168cc79132b631c666a',
        'index': 2,
        'birthday': '1984-04-17T00:00:00',
        'eyeColor': 'blue',
        'name': 'Suzette',
        'favoriteFruit': 'apple'
    },
    {
        '_id': '5b5e31682093adcc6cd0dde5',
        'index': 3,
        'birthday': '1994-04-17T00:00:00',
        'eyeColor': 'green',
        'name': 'George',
        'favoriteFruit': 'banana'
    }
];

getAmountOfAdultPeople(data);

function keys(obj) {
    const result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key);
        }
    }
    return result;
}

keys({keyOne: 1, keyTwo: 2, keyThree: 3});

function values(obj) {
    const result = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }
    return result;
}

values({keyOne: 1, keyTwo: 2, keyThree: 3});
