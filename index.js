const server = require('./server.js');


const PORT = 4000;
server.listen(PORT, () =>{
    console.log(`\n*** Server running on http://localhost: ${PORT} ***\n`);
});
// server.listen(4000, () => {
//     console.log('\n*** Server Running on http://localhost:4000 ***\n');
//   }); 