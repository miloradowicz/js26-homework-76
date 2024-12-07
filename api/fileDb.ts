import { promises as fs } from 'fs';
import { Message } from './types';

const filename = './db.json';

let data: Message[];

const fileDb = {
  async init() {
    try {
      const file = await fs.readFile(filename);
      data = JSON.parse(file.toString());
      this.sort();
    } catch (e: any) {
      if ('code' in e && e.code === 'ENOENT') {
        data = [];
      } else {
        throw e;
      }
    }
  },

  getItems() {
    return data;
  },

  async addItem(item: Message) {
    data.push(item);
    this.sort();
    await this.save();
  },

  sort() {
    data.sort((a, b) => Date.parse(a.datetime) - Date.parse(b.datetime));
  },

  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  },
};

export default fileDb;
