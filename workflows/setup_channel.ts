import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "setup-channel-workflow",
  title: "Create a channel with given information",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["interactivity", "user_id"],
  },
});

const form = workflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Setup New Channel",
  interactivity: workflow.inputs.interactivity,
  submit_label: "Submit",
  fields: {
    elements: [
      {
        name: "channel_name",
        title: "Channel Name",
        type: Schema.types.string, // => "plain_text_input"
        minLength: 3, // inclusive
        maxLength: 80, // inclusive
        description:
          "This workflow won't check whether a channel name is in the correct format and if it has already been taken. Be cautious to select a name that is currently available!",
      },
      {
        name: "channel_topic",
        title: "Channel Topic",
        type: Schema.types.string, // => "plain_text_input"
        minLength: 10, // inclusive
        maxLength: 250, // inclusive
        description:
          "Be specific as much as possible to make this channel useful and well organized!",
      },
      {
        name: "channel_managers",
        title: "Channel Managers",
        type: Schema.types.array, // => "multi_users_select"
        items: { type: Schema.slack.types.user_id },
        default: [workflow.inputs.user_id],
        description:
          "You can only add users who are in this workspace. Attempts to add external folks you're connected via a Slack Connect channel will fail.",
      },
      {
        name: "channel_members",
        title: "Initial Channel Members",
        type: Schema.types.array, // => "multi_users_select"
        items: { type: Schema.slack.types.user_id },
        default: [workflow.inputs.user_id],
        description:
          "You don't need to add the channel managers you've selected above to this list. Also, you can only add users who are in this workspace. Attempts to add external folks you're connected via a Slack Connect channel will fail.",
      },
      {
        name: "is_private",
        title: "Private Channel?",
        default: false,
        type: Schema.types.boolean, // => "checkboxes"
        description:
          "Making a channel public is generally recommended, but you can go with a private one as necessary.",
      },
    ],
    required: [
      "channel_name",
      "channel_topic",
      "channel_managers",
      "channel_members",
      "is_private",
    ],
  },
});

const channelCreation = workflow.addStep(Schema.slack.functions.CreateChannel, {
  channel_name: form.outputs.fields.channel_name,
  manager_ids: form.outputs.fields.channel_managers,
  is_private: form.outputs.fields.is_private,
});

workflow.addStep(Schema.slack.functions.UpdateChannelTopic, {
  channel_id: channelCreation.outputs.channel_id,
  topic: form.outputs.fields.channel_topic,
});

workflow.addStep(Schema.slack.functions.InviteUserToChannel, {
  channel_ids: [channelCreation.outputs.channel_id],
  user_ids: form.outputs.fields.channel_members,
});

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: channelCreation.outputs.channel_id,
  message:
    `<!here> Welcome to this channel! <@${workflow.inputs.user_id}> created this channel specifically for this purpose: _${form.outputs.fields.channel_topic}_ :wave:`,
});

export default workflow;
