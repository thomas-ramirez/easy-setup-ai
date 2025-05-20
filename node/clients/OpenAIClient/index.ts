import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import axios from 'axios'

export default class OpenAIClient extends ExternalClient {
  private apiKey: string

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('', ctx, options)

    this.apiKey = process.env.OPENAI_API_KEY || ctx.settings?.openai?.apiKey

    if (!this.apiKey) {
      throw new Error(
        'OpenAI API key not found. Please set OPENAI_API_KEY environment variable or configure it in the app settings.'
      )
    }
  }

  public async generateSetupPrompt(prompt: string) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    )

    return JSON.parse(response.data.choices[0].message.content ?? '{}')
  }
}
