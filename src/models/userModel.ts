

export class userModel {
  private name: string;
  private lastName: string;
  private typeID: string;
  private id: number;
  private email: string;
  private password: string;
  private title: string;

  constructor() {
    this.name = 'juan';
    this.lastName = 'pepe';
    this.typeID = 'cc';
    this.id = 0;
    this.email = 'juan@gmail.com';
    this.password = '12345';
    this.title = 'TC';
  }

    getName() {
        return this.name;
    }

    getLastName() {
        return this.lastName;
    }

    getTypeID() {
        return this.typeID;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getTitle() {
        return this.title;
    }

    setName(name: string) {
        this.name = name;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    setTypeID(typeID: string) {
        this.typeID = typeID;
    }

    setId(id: number) {
        this.id = id;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setTitle(title: string) {
        this.title = title;
    }

    toString() {
        return `User: ${this.name} ${this.lastName} ${this.typeID} ${this.id} ${this.email} ${this.password} ${this.title}`;
    }


}

