# Slack Standard Workflow Collection

This repository is a collection of useful ["standard" workflow](https://slack.com/help/articles/15363357403411) templates in Slack. Check `manifest.ts` to learn what are available!

## Setup Channel

[The "Setup Channel" workflow](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/setup_channel.ts) enables\ your workspace users to effortlessly create a new public or private channel in a single step.

When a user clicks the link trigger of this workflow, the following modal dialog pops up. All the user needs to do is to fill in the form and submit it.

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/3366598d-5b04-4ce9-96aa-49a7e069fe16">

If everything goes well, the workflow automatically creates a new channel with the given topic, invite channel managers and other members, and then posts a welcome message.

<img width="400" src="https://github.com/seratch/slack-standard-workflow-collection/assets/19658/0c736644-92af-41a5-bc7d-8efc351388d6">

You can customize the details just by modifying [this source file](https://github.com/seratch/slack-standard-workflow-collection/blob/main/workflows/setup_channel.ts)!
