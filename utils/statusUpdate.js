import fs from 'node:fs/promises';

import { isNumeric } from './checkNumber.js';

export async function statusUpdate(status, id, fileDir) {
  if (isNumeric(id)) {
    const fileData = JSON.parse(await fs.readFile(fileDir, 'utf-8'));
    const targetTask = fileData.find(ele => ele.id === Number(id));
    if (!targetTask) {
      console.log('Task not found');
      return;
    }
    if (status === 'done') {
      targetTask.status = 'done';
      await fs.writeFile(fileDir, JSON.stringify(fileData, null, 2));
      console.log('Task marked as done');
    } else if (status === 'in-progress') {
      targetTask.status = 'in-progress';
      await fs.writeFile(fileDir, JSON.stringify(fileData, null, 2));
      console.log('Task marked as in-progress');
    } else {
      console.log('Please enter valid status of task');
    }
  } else {
    console.log('Not a valid id');
    console.log(status);
  }
}
