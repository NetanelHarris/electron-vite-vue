function csvToJson(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

export function getCsvFile(file) {
    // // Returns a csv file as a json object, not Promise
    // const reader = new FileReader();
    // reader.readAsText(file);
    // reader.onload = function () {
    //     const csv = reader.result;
    //     const json = csvToJson(csv);
    //     return json;
    // };
    // product_name,product_id,num_of_pack
    // Ball,ABC123,12
    // Police Car,XYZ456,8
    // Rubic Cube,DEF789,20
    // Tennis Ball,HIJ101,30
    return [
        {
            product_name: 'Ball',
            product_id: 'ABC123',
            num_of_pack: 12
        },
        {
            product_name: 'Police Car',
            product_id: 'XYZ456',
            num_of_pack: 8
        },
        {
            product_name: 'Rubic Cube',
            product_id: 'DEF789',
            num_of_pack: 20
        },
        {
            product_name: 'Tennis Ball',
            product_id: 'HIJ101',
            num_of_pack: 30
        }
    ]
}

// Remove \r for a string
function stripReverse(str) {
    return str.replace(/\r/g, '');
}


//var csv is the CSV file with headers
export function csvJSON(csv) {

    let lines = csv.split("\n");
    let result = [];
    let headers = stripReverse(lines[0]).split(",");
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = stripReverse(lines[i]).split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JavaScript object
}

// export default getCsvFile;
export default csvJSON;