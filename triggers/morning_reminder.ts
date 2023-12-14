import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/morning_reminder.ts";

// Run the following command to generate a new trigger
// $ slack trigger create --trigger-def triggers/morning_reminder.ts
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Scheduled,
  name: "Send a reminder every weekday morning",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  // See https://api.slack.com/automation/triggers/scheduled to customize this
  schedule: {
    // Note that this start_time must be a future datetime
    // Example to generate tomorrow's 9am in your local time:
    // macOS: date -v09H -v00M -v00S -v+1d +%s | xargs date -u -Iseconds -r
    // Linux: date -u -d 'TZ="America/New_York" 09:00 tomorrow'
    start_time: "2023-12-15T00:00:00+00:00",
    frequency: {
      type: "weekly",
      on_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
};
// Note that the Trigger object must be default-exported
export default trigger;
