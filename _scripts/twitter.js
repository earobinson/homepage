const util = require('util');
const Twitter = require('twitter');
const slugify = require('slugify');
const fs = require('fs');

const client = new Twitter();
// Set some defaults (required if your JSON file is empty)

const get = util.promisify(client.get.bind(client));
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  run: async function() {
    let max_id;
    let tweets = await get('statuses/user_timeline', { screen_name: 'earobinson', count: 200 });

    while (tweets.length !== 1 && tweets[0].id !== max_id) {
      for(let tweet of tweets) {
        max_id = tweet.id;
        const date = new Date(tweet.created_at);

        const tweetFileName = `./../_posts/${date.toISOString().split('T')[0]}-${slugify(tweet.text, {
          lower: true,
          remove: /[$*_+~.()'"!\-:@/?#'"]/g
        })}.md`;
        console.log(tweetFileName);
        if (!fs.existsSync(tweetFileName)) {
          const fileText =
`---
title: '${tweet.text.replace(/\n/g, ' ').replace(/'/g, '&#39')}'
layout: tweet
categories: tweets
date: ${tweet.created_at}
entities: ${JSON.stringify(tweet.entities)}
tweetJson: ${JSON.stringify({ text: tweet.text })}
---
`;

          console.log(fileText);
          writeFile(tweetFileName, fileText);
        }
      }
      tweets = await get('statuses/user_timeline', { screen_name: 'earobinson', count: 200, max_id });
    }
  }
};

module.exports.run()
.then(() => {
  process.exit(0);
})
.catch((err) => {
  console.error('An error occurred');
  console.error(err);
  process.exit(-1);
});