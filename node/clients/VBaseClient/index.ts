import { IOContext, InstanceOptions, VBase } from '@vtex/api'

const VBASE_BUCKET = 'ai-easy-setup-data'
const VBASE_KEY = 'generated-store'

export default class VBaseClient extends VBase {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options)
  }

  public async saveGeneratedData(data: any) {
    return this.saveJSON(VBASE_BUCKET, VBASE_KEY, data)
  }

  public async getGeneratedData(): Promise<any> {
    return this.getJSON(VBASE_BUCKET, VBASE_KEY, true)
  }

  public async saveSeedStatus(status: any) {
    return this.saveJSON(VBASE_BUCKET, 'seed-status', status)
  }

  public async getSeedStatus(): Promise<any> {
    return this.getJSON(VBASE_BUCKET, 'seed-status', true)
  }
}
