import Sandbox from "@e2b/code-interpreter"

export const getSandbox = async (id: string) => {
    const sandbox = await Sandbox.connect(id)
    return sandbox
}