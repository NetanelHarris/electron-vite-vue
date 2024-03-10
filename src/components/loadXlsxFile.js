import { read, utils } from 'xlsx'
import { store } from './store';


// Import XLSX file
// Example file:
// | product_name | product_id | num_of_pack |
// | ------------ | ---------- | ----------- |
// | Ball         | ABC123     | 12          |
// | Police Car   | XYZ456     | 8           |
// | Rubic Cube   | DEF789     | 20          |
// | Tennis Ball  | HIJ101     | 30          |
// Output:
// [
//     {
//         product_name: 'Ball',
//         product_id: 'ABC123',
//         num_of_pack: 12
//     },
//     {
//         product_name: 'Police Car',
//         product_id: 'XYZ456',
//         num_of_pack: 8
//     },
//     {
//         product_name: 'Rubic Cube',
//         product_id: 'DEF789',
//         num_of_pack: 20
//     },
//     {
//         product_name: 'Tennis Ball',
//         product_id: 'HIJ101',
//         num_of_pack: 30
//     }
// ]
export function getXlsxFile(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
        const data = new Uint8Array(reader.result);
        const workbook = read(data);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = utils.sheet_to_json(sheet);
        store.rowProducts = json;
        return json;
    };
}