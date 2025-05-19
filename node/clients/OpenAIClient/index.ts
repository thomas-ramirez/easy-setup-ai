import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import OpenAI from 'openai'

export default class OpenAIClient extends ExternalClient {
  private client: OpenAI

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('', ctx, options)

    this.client = new OpenAI({ apiKey: "fech-key-from-app-settings-or-ssm" })
  }

  public async generateSetupPrompt(prompt: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }],
    })

    return JSON.parse(response.choices[0].message.content ?? '{}')
  }
}
