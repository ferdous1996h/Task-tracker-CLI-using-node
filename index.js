import { argv } from 'node:process';
import fs, { writeFile } from 'node:fs/promises';
import path from 'node:path';

import { addTask } from './utils/addTask.js';
import { updateTask } from './utils/updateTask.js';
import { deleteTask } from './utils/deleteTask.js';
import { statusUpdate } from './utils/statusUpdate.js';

const dirName = import.meta.dirname;
const inputs = argv.slice(2);

const fileDir = path.join(dirName, 'tasks.json');

async function ensureFileExist(path) {
  try {
    await fs.access(path);
    console.log('File exist');
  } catch {
    console.log('Creating file...');
    await fs.writeFile(path, '[]');
    console.log('File created');
  }
}
await ensureFileExist(fileDir);

if (inputs.includes('add')) {
  const task = inputs.at(inputs.indexOf('add') + 1);
  addTask(fileDir, task);
} else if (inputs.includes('update')) {
  const selectID = inputs.at(inputs.indexOf('update') + 1);
  const updatedTask = inputs.at(inputs.indexOf('update') + 2);

  updateTask(fileDir, selectID, updatedTask);
} else if (inputs.includes('delete')) {
  const selectID = inputs.at(inputs.indexOf('delete') + 1);
  deleteTask(fileDir, selectID);
}

if (inputs.at(0).startsWith('mark')) {
  const statusNameArr = inputs.at(0);
  const statusName = statusNameArr.slice(statusNameArr.indexOf('-') + 1);
  const targetID = inputs.at(1);
  console.log(statusName);
  statusUpdate(statusName, targetID, fileDir);
}
if (inputs.length === 1 && inputs.at(0) === 'list') {
  const fileData = await fs.readFile(fileDir, 'utf-8');
  console.table(fileData);
}
if (inputs.at(0).startsWith('list')) {
  const listType = inputs.at(1);
  const fileData = JSON.parse(await fs.readFile(fileDir, 'utf-8'));
  if (listType === 'todo') {
    const newData = fileData.filter(ele => ele.status === 'todo');
    console.log(newData);
  }
  if (listType === 'done') {
    const newData = fileData.filter(ele => ele.status === 'done');
    console.log(newData);
  }
  if (listType === 'in-progress') {
    const newData = fileData.filter(ele => ele.status === 'in-progress');
    console.log(newData);
  }
}
