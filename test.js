const dotenv = require("dotenv");
dotenv.config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + channel.id);
        // Break from for loop
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
findConversation("general");
let conversationHistory;

// Fetch conversation history using ID from last example
async function fetchHistory(id) {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await bolt.client.conversations.history({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: id,
    });

    conversationHistory = result.messages;

    // Print results
    console.log(conversationHistory[2].text + " messages found in " + id);
  } catch (error) {
    console.error(error);
  }
}

fetchHistory("C0111D0GJN7");
let message;

// Fetch conversation history using the ID and a TS from the last example
async function fetchMessage(id) {
  try {
    // Call the conversations.history method using the built-in WebClient
    const result = await app.client.conversations.history({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: id,
      // In a more realistic app, you may store ts data in a db
      //latest: ts,
      // Limit results
      inclusive: true,
      //limit: 1
    });

    // There should only be one result (stored in the zeroth index)
    message = result.messages[0];
    // Print message text
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}

// Fetch message using a channel ID and message TS
fetchMessage("C0111D0GJN7");
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
