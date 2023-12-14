import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/morning_reminder.ts";

// Run the following command to generate a new trigger
// $ slack trigger create --trigger-def triggers/morning_reminder_test.ts
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Send a reminder every weekday morning (testing)",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {},
};

export default trigger;
