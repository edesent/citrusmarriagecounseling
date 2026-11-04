// Live chat + form delivery (Website Chat, the Slack-backed chat Pastor Eli runs).
//
// This is Bethel Baptist Church's connection (the ministry belongs to Bethel),
// so the chat bubble and the consultation form land in the same Slack channel
// Pastor Brandon already answers from his phone.
//
// The key only permits posting into that channel. It can't read anything, so
// it lives in the repo rather than in an env var.
// Backend site id: 84791e07-ae1f-44f6-b9e4-90e7d79a6549 (Bethel Baptist Hernando).

export const CHAT = {
  origin: "https://slackwebsitechat.vercel.app",
  apiKey: "wbc_24059ab7fa7f5feab79c2d0134564d4456d49e6511a4c742",
  accentColor: "#b3861d",
  brandColor: "#12403c",
  /** Pastor Brandon's face, so visitors see they are writing to a person. */
  agentIcon: "/photos/pastor-face.jpg",
  greeting: "Thinking about counseling? I’m Pastor Brandon. Ask me anything here and I’ll answer you myself.",
  formSubtitle: "Leave your name and a number or email and Pastor Brandon will get back to you.",
} as const;
