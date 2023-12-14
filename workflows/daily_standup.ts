import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "daily-standup-workflow",
  title: "Daily standup in a Slack channel",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
      channel_id: { type: Schema.slack.types.channel_id },
      message_ts: { type: Schema.types.string },
    },
    required: ["interactivity", "user_id", "channel_id", "message_ts"],
  },
});

const emoji = ":question:";
const q1 = "What did you do yesterday (or last week)?";
const q2 = "What will you do today?";
const q3 = "Are there any impediments in your way?";

const form = workflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Daily Standup",
  interactivity: workflow.inputs.interactivity,
  submit_label: "Share with the team",
  fields: {
    elements: [
      {
        name: "q1",
        title: q1,
        type: Schema.types.string,
        long: true,
        description: "No need to detail everything you completed.",
      },
      {
        name: "q2",
        title: q2,
        type: Schema.types.string,
        long: true,
        description: "No need to detail everything you plan to do today.",
      },
      {
        name: "q3",
        title: q3,
        type: Schema.types.string,
        long: true,
        description: "If you don't have any, just skip this question.",
      },
    ],
    required: ["q1", "q2"],
  },
});

workflow.addStep(Schema.slack.functions.ReplyInThread, {
  message_context: {
    channel_id: workflow.inputs.channel_id,
    message_ts: workflow.inputs.message_ts,
  },
  message: `:wave: <@${workflow.inputs.user_id}>'s response:

${emoji} *${q1}*
${form.outputs.fields.q1}

${emoji} *${q2}*
${form.outputs.fields.q2}

${emoji} *${q3}*
${form.outputs.fields.q3}
`,
});

export default workflow;
