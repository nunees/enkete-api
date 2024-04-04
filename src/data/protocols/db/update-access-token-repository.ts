export interface UpdateAccessTokenReposiory {
  update: (id: string, token: string) => Promise<void>
}
