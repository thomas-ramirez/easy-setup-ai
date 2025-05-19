import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import OpenAI from 'openai'

export default class OpenAIClient extends ExternalClient {
  private client: OpenAI

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('', ctx, options)

    const apiKey = process.env.OPENAI_API_KEY || ctx.settings?.openai?.apiKey

    if (!apiKey) {
      throw new Error(
        'OpenAI API key not found. Please set OPENAI_API_KEY environment variable or configure it in the app settings.'
      )
    }

    this.client = new OpenAI({ apiKey })
  }

  public async generateSetupPrompt(prompt: string) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }],
    })

    return JSON.parse(response.choices[0].message.content ?? '{}')
  }
}
