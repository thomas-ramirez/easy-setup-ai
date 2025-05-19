export interface SeedResponseItem {
  status: 'OK' | 'ERROR'
  results?: any[]
  error?: string
}

export interface SeedResponse {
  [key: string]: SeedResponseItem
}
