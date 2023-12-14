# Slack Standard Workflow Collection

This repository is a collection of useful ["standard" workflow](https://slack.com/help/articles/15363357403411) templates in Slack. Check `manifest.ts` to learn what are available!

## Setup Channel

[The "Setup Channel" workflow](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/setup_channel.ts) enables your workspace users to effortlessly create a new public or private channel in a single step.

### How to enable it

* Run `slack run` to start your local app
* Run `slack trigger create --trigger-def triggers/setup_channel.ts` to create a link trigger on a different terminal window
* Share the link trigger URL either in a channel or in a canvas document

### How it works

When a user clicks the link trigger of this workflow, the following modal dialog pops up. All the user needs to do is to fill in the form and submit it.

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/3366598d-5b04-4ce9-96aa-49a7e069fe16">

If everything goes well, the workflow automatically creates a new channel with the given topic, invite channel managers and other members, and then posts a welcome message.

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/0c736644-92af-41a5-bc7d-8efc351388d6">

You can customize the details just by modifying [this source file](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/setup_channel.ts)!

## Morning Reminder / Daily Standup

[The "Morning Reminder" workflow](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/morning_reminder.ts) sends a reminder message to your team every weekday morning. While it's feasible to do similar with the the built-in `/remind` feature, a good thing about this workflow is that you can manage operations in a git repo and can have a sequence of steps in a more flexible way!

### How to enable it

As a first step in preparation, start by creating a simple daily standup workflow.
* Run `slack run` to start your local app
* Run `slack trigger create --trigger-def triggers/daily_standup.ts`
* Copy the link trigger URL

Now you can finalize the "Morning Reminder" workflow code:
* Replace the TODO parts in `workflows/morning_reminder.ts`
  * Set the above link trigger URL
  * Set the channel ID where you want to send reminder messages

To see how it works immediately, you can use the link trigger for testing:
* Run `slack run` to start your local app
* Run `slack trigger create --trigger-def triggers/morning_reminder_test.ts`
* Share the link trigger URL either in a channel and click it

For production use cases, we recommend running the app in the deployed mode:
* Run `slack deploy` to deploy your app (before deploying the app, you may want to adjust the name, icon, enabled features; edit `manifest.ts` for it)
* Set up the daily standup trigger in the same way
* Edit `triggers/morning_reminder.ts` to replace the TODO parts
* Run `slack trigger create --trigger-def triggers/morning_reminder.ts`
* You will recieve a reminder message in the specified channel tomorrow morning

### How it works

The workflow posts a reminder message in your team channel every morning. 
<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/9eb790e8-149a-4419-aa62-fcf83958554e">

When your team member clicks the link, a modal dialog of the "Daily Standup" workflow pops up.

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/a4e3e614-8cf8-4444-bee3-e6c04511e734">

When they submit the form, the inputs will be shared in the message's thread:

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/0fe0496e-91d8-4a34-a5ca-1bfee827d79c">

You can customize the details by modifying the follow source code files:
* [The "Daily Standup" workflow](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/daily_standup.ts)
* [The "Morning Reminder" workflow](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/morning_reminder.ts)