import { json } from 'co-body'
import OpenAIClient from '../../clients/OpenAIClient'
import VBaseClient from '../../clients/VBaseClient'
import { Context } from '@vtex/api'

export async function generateData(ctx: Context, next: () => Promise<any>) {
  const body = await json(ctx.req)

  const vbase = new VBaseClient(ctx.vtex)
  const aiClient = new OpenAIClient()

  const prompt = `Generate a VTEX-compatible store setup for the ${
    body.industry
  } industry.
    - ${body.departments} departments
    - ${body.categoryLevels} category levels
    - ${body.products} products
    - ${body.skus} SKUs
    - Multiple SKUs: ${body.multipleSkus ? 'Yes' : 'No'}
    - Language: ${body.language}
    - Additional Instructions: ${body.aiPrompt}

    Return JSON structured as: { categories: [...], products: [...], brands: [...], pricing: [...], logistics: [...] }`

  try {
    const generatedData = await aiClient.generateSetupPrompt(prompt)

    await vbase.saveGeneratedData(generatedData)

    ctx.status = 200
    ctx.body = { message: 'Generated successfully', preview: generatedData }
  } catch (error) {
    console.error('Error generating AI data:', error)
    ctx.status = 500
    ctx.body = { error: 'Failed to generate AI data' }
  }

  await next()
}
