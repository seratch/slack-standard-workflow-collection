import { Manifest } from "deno-slack-sdk/mod.ts";
import SetupChannel from "./workflows/setup_channel.ts";
import DailyStandup from "./workflows/daily_standup.ts";
import MorningReminder from "./workflows/morning_reminder.ts";
import GoogleCalendar from "./workflows/google_calendar.ts";
import Giphy from "./workflows/giphy.ts";

export default Manifest({
  name: "My Standards",
  description: "A collection of useful standard workflows",
  icon: "assets/default_new_app_icon.png",
  workflows: [
    SetupChannel,
    DailyStandup,
    MorningReminder,
    GoogleCalendar,
    Giphy,
  ],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:manage", // for SetupChannel
    "groups:write", // for SetupChannel
  ],
});
