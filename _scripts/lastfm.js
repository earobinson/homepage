const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./lastfm.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
async function script() {
  db.defaults({ posts: [], user: {}, count: 0 })
  .write();
}

script()
.then(() => {
  process.exit(0);
})
.catch((err) => {
  console.error('An error occurred');
  console.error(err);
  process.exit(-1);
});