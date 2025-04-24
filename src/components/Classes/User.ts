export class User {
    constructor(
      public id: string,
      public name: string,
      public username: string
    ) {}
  
    static fromData(id: string, data: any): User {
      return new User(id, data.name, data.username);
    }
  
    toFirestore(): object {
      return {
        name: this.name,
        username: this.username,
      };
    }
  
    toString(): string {
      return `User ${this.id}: ${this.name} (@${this.username})`;
    }
  }
  