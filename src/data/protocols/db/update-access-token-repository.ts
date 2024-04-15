export interface UpdateAccessTokenReposiory {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
