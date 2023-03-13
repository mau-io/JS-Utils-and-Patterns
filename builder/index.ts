class Person {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private hobbies: string[];

  constructor(name: string, lastName: string, age: number, country: string, hobbies: string[]) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.hobbies = hobbies;
  }

  getFullName() {
    return this.name + ' ' +  this.lastName;
  }
}

interface PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  hobbies: string[];
  
  setName(name: string): PersonBuilder;
  setLastName(lastName: string): PersonBuilder;
  setAge(age: number): PersonBuilder;
  setCountry(country: string): PersonBuilder;
  addHobby(hobbie: string): PersonBuilder;
  build(): Person;
}

class NormalPersonBuilder implements PersonBuilder {

  name: string;
  lastName: string;
  age: number;
  country: string;
  hobbies: string[];

  constructor() {
    this.default();
  }

  default(): void {
    this.name = '';
    this.lastName = 'NA';
    this.age = 18;
    this.country = 'NA';
    this.hobbies = [];
  }

  setName(name: string): PersonBuilder {
    this.name = name;
    return this;
  }
  setLastName(lastName: string): PersonBuilder {
    this.lastName = lastName;
    return this;
  }
  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }
  setCountry(country: string): PersonBuilder {
    this.country = country;
    return this;
  }
  addHobby(hobbie: string): PersonBuilder {
    this.hobbies.push(hobbie);
    return this;
  }

  build(): Person{
    const person = new Person(
      this.name,
      this.lastName,
      this.age,
      this.country,
      this.hobbies
    );
    this.default();
    return person;
  }

}

const personBuilder = new NormalPersonBuilder();
const mau = personBuilder
  .setName('Mau')
  .setCountry('Canada')
  .addHobby('Read')
  .build();


console.log(mau);

const ion = personBuilder
  .setName('Ion')
  .setCountry('Japan')
  .addHobby('Run')
  .setAge(50)
  .build();


console.log(ion)