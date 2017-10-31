export class User {
  readonly username: string;
  readonly name: string;
  readonly visible: boolean;
  readonly challengesCompleted: any[];
  readonly isCurrentUser: boolean;
  readonly settings: {appearOnLeaderboard: boolean, profileVisible: boolean};
  readonly github: {id: number, username: string, displayName: string};

  constructor(options) {
    this.username = options.username;
    this.name = options.name;
    this.visible = options.visible;
    this.challengesCompleted = options.visible || options.isCurrentUser
      ? options.challengesCompleted
      : [];
    this.isCurrentUser = options.isCurrentUser || false;
    this.settings = options.settings || {  appearOnLeaderboard: true,  profileVisible: true};
    this.github = options.github
  }
}
