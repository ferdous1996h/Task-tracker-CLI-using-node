import fs from 'node:fs/promises';

export async function addTask(fileDir, task) {
  if (task) {
    const fileData = JSON.parse(await fs.readFile(fileDir, 'utf-8'));
    const taskIDsArray = fileData.map(ele => ele.id);
    const serialNUM = Math.max(...taskIDsArray) + 1;
    const obj = {
      id: serialNUM,
      description: task,
      status: 'todo',
      createdAt: new Date().toLocaleString(),
      updatedAt: 'Not updated yet',
    };

    fileData.push(obj);
    await fs.writeFile(fileDir, JSON.stringify(fileData, null, 2));
    console.log(`Task added successfully (ID: ${serialNUM})`);
  } else {
    console.log('You must add task in one string');
  }
}
