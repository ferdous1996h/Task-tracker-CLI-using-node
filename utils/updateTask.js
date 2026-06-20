import fs from 'node:fs/promises';

export async function updateTask(fileDir, selectID, updatedTask) {
  if (updatedTask) {
    const fileData = JSON.parse(await fs.readFile(fileDir, 'utf-8'));

    const targetItem = fileData.find(item => item.id === Number(selectID));
    if (!targetItem) {
      console.log('Task not found');
    }
    if (targetItem) {
      targetItem.description = updatedTask;
      targetItem.updatedAt = new Date().toLocaleString();
      await fs.writeFile(fileDir, JSON.stringify(fileData, null, 2));
      console.log('Task updated successfully');
    }
  } else {
    console.log('You must provide a task to update');
  }
}
