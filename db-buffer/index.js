const fs = require('fs');

class Database {
  constructor(filePath) {
    this.filePath = filePath;
    this.bufferSize = 1024 * 1024; // 1 MB
    this.fd = null;
    this.position = 0;
  }

  async open() {
    this.fd = await fs.promises.open(this.filePath, 'a+');
    this.position = (await this.fd.stat()).size;
  }

  async close() {
    await this.fd.close();
  }

  async read(key) {
    let data = '';

    await this.fd.read(Buffer.alloc(this.bufferSize), 0, this.bufferSize, 0);

    for (let offset = 0; offset < this.position; ) {
      const line = data.slice(offset).split('\n')[0];
      offset += line.length + 1;

      const [lineKey, lineValue] = line.split('=');
      console.log(data)
      if (lineKey === key) {
        return lineValue;
      }
    }

    return null;
  }

  async write(key, value) {
    const data = `${key}=${value}\n`;
    const buffer = Buffer.from(data);

    if (this.position + buffer.length > this.bufferSize) {
      await this.fd.write(buffer, 0, buffer.length, this.position);
      await this.fd.fsync();
      this.position += buffer.length;
    } else {
      await this.fd.write(buffer, 0, buffer.length, this.position);
      this.position += buffer.length;
    }
  }
}

// Ejemplo de uso
async function main() {
  const db = new Database('data.txt');
  await db.open();
  //await db.write('key1', 'value1');
  //await db.write('key2', 'value2');
  console.log(await db.read('key1')); // output: value1
  console.log(await db.read('key2')); // output: value2
  await db.close();
}

main().catch(console.error);