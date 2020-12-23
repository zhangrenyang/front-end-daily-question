import { resolve } from "path";
import * as fse from "fs-extra";
import client from "../mock";
import { selectWorkspaceFolder } from "../shared/selectWorkspaceFolder";
import { Uri, ViewColumn, window } from "vscode";

export async function openQuestion(name: string, index: number): Promise<void> {
  const workspaceFolder: string = await selectWorkspaceFolder();
  if (!workspaceFolder) {
    return;
  }
  const codeTemplate = await getCodeTemplate(index);
  const finalPath = await showProblem(
    resolve(workspaceFolder, name + '.md'),
    codeTemplate || ""
  );
  await window.showTextDocument(Uri.file(finalPath), {
    preview: false,
    viewColumn: ViewColumn.One,
  });
  return;
}

async function showProblem(filePath: string, codeTemplate: string) {
  if (!(await fse.pathExists(filePath))) {
    await fse.createFile(filePath);
    await fse.writeFile(filePath, codeTemplate);
  }
  return filePath;
}

async function getCodeTemplate(index: number) {
  try {
    let result = await client.get(index);
    let buf = result.content;
    return buf;
  } catch (e) {
    console.log(e);
  }
}
