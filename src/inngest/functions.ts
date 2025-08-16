import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit"

export const helloWorld = inngest.createFunction(
  { id: "hello-world-test" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const summerizer = createAgent({
      name: 'summerizer',
      system: 'You are a helpful assistant that summarizes text. You summarize in 2 words',
      model: openai({
        model: "gpt-4.1-mini",
        baseUrl: process.env.OPEN_AI_BASE_URL,
      }),
    })

    const { output } = await summerizer.run(`Summarize the following text: ${event.data.value}`)

    console.log(output)
    
    return { output };
  },
);