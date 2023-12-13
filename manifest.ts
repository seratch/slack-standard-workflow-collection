import { Manifest } from "deno-slack-sdk/mod.ts";
import SetupChannel from "./workflows/setup_channel.ts";

export default Manifest({
  name: "Standard Workflows",
  description: "A collection of useful standard workflows",
  icon: "assets/default_new_app_icon.png",
  workflows: [
    SetupChannel,
  ],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:manage", // for SetupChannel
    "groups:write", // for SetupChannel
  ],
});
