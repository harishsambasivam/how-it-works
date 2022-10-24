const fs = require('node:fs');
const zlib = require('node:zlib');


// const file = fs.ReadStream('example.txt');
// file.write('hello, ');
// file.end('world!');

// const file = fs.WriteStream('example.txt');
// file.on('data', (data) => {
//     console.log(data.toString());
// })

const r = fs.createReadStream('example.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);

