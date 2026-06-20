import fs from 'node:fs/promises';

export async function deleteTask(fileDir, id) {
  const fileData = JSON.parse(await fs.readFile(fileDir, 'utf-8'));
  const mutateData = fileData.filter(ele => ele.id !== Number(id));
  await fs.writeFile(fileDir, JSON.stringify(mutateData, null, 2));
  console.log('Task deleted successfully');
}
