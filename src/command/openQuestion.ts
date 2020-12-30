import { resolve } from "path";
import * as fse from "fs-extra";
import { selectWorkspaceFolder } from "../shared/selectWorkspaceFolder";
import { Uri, ViewColumn, window } from "vscode";
import { ListItem } from "../service";

export async function openQuestion(ele: ListItem): Promise<void> {
  const { name, type, content, day_id } = ele;
  const workspaceFolder: string = await selectWorkspaceFolder();
  if (!workspaceFolder) {
    return;
  }
  const codeTemplate = getCodeTemplate(type, content);
  const finalPath = await showProblem(
    resolve(workspaceFolder, day_id + "." + name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '') + "." + type),
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

// async function getCodeTemplate(index: number) {
//   try {
//     let result = await client.get(index);
//     let buf = result.content;
//     return buf;
//   } catch (e) {
//     console.log(e);
//   }
// }

function getCodeTemplate(type: "md" | "js", content: string) {
  if (type === "md") {
    return `# Problem: ${content}

*[interview]: start

*[interview]: end
`;
  } else {
    return `// Problem: ${content}
// @interview start

// @interview start
`;
  }
}
