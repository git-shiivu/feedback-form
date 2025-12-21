const mysql = require('mysql2/promise');

async function main() {
  // Create a connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wakeup',
    database: 'dataset'
  });

  try {
    // Execute a query using async/await
    await connection.execute('INSERT INTO feedbacks (Name,Contect,Email,Suggestion) VALUES ("Hello",3456789546,"example@example.com,"No");');
    console.log("Done");
  } catch (err) {
    console.error(err);
  } finally {
    // Close connection
    await connection.end();
  }
}

main();