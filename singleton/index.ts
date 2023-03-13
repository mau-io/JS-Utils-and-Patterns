class SingletonTS {
  
  private static instance: SingletonTS;
  public id: number;

  private constructor() {
    this.id = Math.random();
  }

  public static getInstance(): SingletonTS {
    if(!this.instance) this.instance = new SingletonTS();
    return this.instance;
  }
}

const singletonTs: SingletonTS = SingletonTS.getInstance();
console.log(singletonTs.id);
const singletonTs2: SingletonTS = SingletonTS.getInstance();
console.log(singletonTs2.id);