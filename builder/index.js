class Person {
  constructor(name, lastName, age, country, hobbies) {
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

class PersonBuilder {

  constructor() {
    this.default();
  }

  default() {
    this.name = '';
    this.lastName = 'NA';
    this.age = 18;
    this.country = 'NA';
    this.hobbies = [];
  }

  setName(name) {
    this.name = name;
    return this;
  }
  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }
  setAge(age) {
    this.age = age;
    return this;
  }
  setCountry(country) {
    this.country = country;
    return this;
  }
  addHobbieName(hobbie) {
    this.hobbies.push(hobbie);
    return this;
  }

  build(){
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

const personBuilder = new PersonBuilder();
const mau = personBuilder
  .setName('Mau')
  .setCountry('Canada')
  .addHobbieName('Read')
  .build();


console.log(mau)