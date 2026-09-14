export function tokenFixture(sub = 'member-one', nonce = 'first'): string {
  return `Bearer fixture.${Buffer.from(JSON.stringify({ iss: 'https://fixture.invalid', sub, nonce })).toString('base64url')}.fixture`
}
