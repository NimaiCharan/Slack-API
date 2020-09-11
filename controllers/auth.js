const { App } = require("@slack/bolt");

const boltApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

let conversationHistory;
var key = "message";
let data = {};
data[key] = [];
exports.read = async (req, res) => {
  try {
    const result = await boltApp.client.conversations.history({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C0111D0GJN7",
    });
    conversationHistory = result.messages;
    for (var i = conversationHistory.length - 1; i >= 0; i--) {
      //console.log(conversationHistory[i].text);
      //console.log(conversationHistory[i].user);
      user = conversationHistory[i].user;
      message = conversationHistory[i].text;
      var temp = {
        name: user,
        msg: message,
      };
      //console.log(name + " :" + message);
      data["message"].push(temp);
    }
  } catch (error) {
    console.error(error);
  }

  //var dat = fetchHistory("C0111D0GJN7");
  //console.log(dat);
  if (data) {
    res.status(200).json(data);
    data = {};
    data[key] = [];
  } else {
    res.send("ERROR");
  }
};
exports.write = async (req, res) => {
  console.log(req.body.msg);
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await boltApp.client.chat.postMessage({
      // The token you used to initialize your app
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C0111D0GJN7",
      text: req.body.msg,
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    res.status(200).json({ message: "Message Sent" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Message Error" });
  }
};
(async () => {
  // Start your app
  await boltApp.start(process.env.PORT || 4000);

  console.log("⚡️ Bolt app is running!");
})();
