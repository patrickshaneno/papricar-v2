export const TEST_ACCOUNTS = {
  user: {
    email: 'testuser@papricar.de',
    password: 'papricar123',
    role: 'user'
  },
  dealer: {
    email: 'dealer@papricar.de',
    password: 'papricar456',
    role: 'dealer'
  }
} as const

export type UserRole = 'user' | 'dealer'

export const getRedirectPath = (role: UserRole) => {
  switch (role) {
    case 'dealer':
      return '/dealer'
    case 'user':
    default:
      return '/vehicles'
  }
} 