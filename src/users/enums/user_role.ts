export const UserRole = {
  User: 1,
  Crew: 2,
  Owner: 3,
  Admin: 4,
} as const

export type IUserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.User]: 'User',
  [UserRole.Crew]: 'Crew',
  [UserRole.Owner]: 'Owner',
  [UserRole.Admin]: 'Admin',
} as const
