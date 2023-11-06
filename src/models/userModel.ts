export class userModel {
  private usuId: number | undefined;
  private id: number;
  private name: string;
  private lastName: string;
  private typeID: string;
  private typeEducator: string | null;
  private email: string;
  private password: string;
  private title: string;


  constructor(
    usuId: number | undefined,
    id: number,
    name: string,
    lastName: string,
    typeID: string,
    typeEducator: string | null,
    email: string,
    password: string,
    title: string
  ) {
    this.usuId = usuId;
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.typeID = typeID;
    this.typeEducator = typeEducator;
    this.email = email;
    this.password = password;
    this.title = title;
  }


   public getUsuId(): number | undefined {
    return this.usuId;
  }
  public setUsuId(usuId: number): void {
    this.usuId = usuId;
  }
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  public getTypeID(): string {
    return this.typeID;
  }
  public setTypeID(typeID: string): void {
    this.typeID = typeID;
  }
  public getTypeEducator(): string | null {
    return this.typeEducator;
  }
  public setTypeEducator(typeEducator: string | null): void {
    this.typeEducator = typeEducator;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getTitle(): string {
    return this.title;
  }
  public setTitle(title: string): void {
    this.title = title;
  }

}
