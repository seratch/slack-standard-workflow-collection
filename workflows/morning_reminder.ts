import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "morning-reminder-workflow",
  title: "Send a reminder every weekday morning",
  input_parameters: { properties: {}, required: [] },
});

// TODO: replace this URL with your real one
const interactiveWorkflowTrigger =
  "https://slack.com/shortcuts/Ft06AG8FN0G1/01bb602be0f658150c19e0946e500cc2";

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "CHE2DUW5V", // TODO: replace this with your real channel ID
  message: `*:handshake: Daily Standup (online) :handshake:*

<!here> :sunrise: Good morning, team! It's time for our daily standup.

Click <${interactiveWorkflowTrigger}|this> to share your updates with the team! :writing_hand:`,
});

export default workflow;
