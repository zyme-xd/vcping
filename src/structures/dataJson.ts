export interface serverObj {
  roleId: string;
  delay: number;
  channelRoles?: {
    voiceChannel: string;
    role: string;
  }[];
}
