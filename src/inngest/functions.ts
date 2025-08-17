import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit"
import { Sandbox } from "@e2b/code-interpreter"
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world-test" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run('get-sandbox-id', async () => {
      const sandbox = await Sandbox.create('vibe-nextjs-templates-test-2')
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: 'code-agent',
      system: 'You are an expert next.js developer.You write readable,maintainable code. You write simple Next.js & Rect snippets',
      model: openai({
        model: "gpt-4.1-mini",
        baseUrl: process.env.OPEN_AI_BASE_URL,
      }),
    })



    const { output } = await codeAgent.run(`write the following snippet: ${event.data.value}`)

    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000)
      return `https://${host}`
    })

    
    return { output, sandboxUrl };
  },
);