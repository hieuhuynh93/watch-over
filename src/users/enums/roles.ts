export const Roles = {
  USER: 1,
  CREW: 2,
  OWNER: 3,
  ADMIN: 4,
} as const

export type IRoles = (typeof Roles)[keyof typeof Roles]

export const RolesText = {
  [Roles.USER]: 'user',
  [Roles.CREW]: 'crew',
  [Roles.OWNER]: 'owner',
  [Roles.ADMIN]: 'admin',
} as const

export default Roles
