import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import Tree from './Tree';
import ParseXML from './ParseXML';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export default function ViewTree() {
  const activeEditor = vscode.window.activeTextEditor;

  if (activeEditor) {
    const currentFilePath = activeEditor.document.uri.fsPath;
    const currentDirectory = path.dirname(currentFilePath);

    // Abrir el explorador de archivos del sistema en el directorio actual
    if (fs.existsSync(currentDirectory)) {
      console.log(`El directorio ${currentDirectory} existe.`);
      const fileName = path.basename(currentFilePath);
      vscode.workspace.openTextDocument(activeEditor.document.uri)
        .then(doc => {
          vscode.window.showTextDocument(doc);
          vscode.window.showInformationMessage(`Current files name: ${fileName}`);
          const panel = vscode.window.createWebviewPanel(
            'odootreeview',
            'Odoo Tree View',
            vscode.ViewColumn.One,
            {}
          );

          // Get content file
          const fileContent = doc.getText();
          const xmlFilePath = path.join(currentDirectory, fileName);
          const xmlString = fs.readFileSync(xmlFilePath, 'utf-8');

          const parsedXML: any = ParseXML(xmlString);

          // Cargar contenido HTML en el panel webview
          const TreeComponent = React.createElement(Tree, { fileName, parsedXML });
          panel.webview.html = ReactDOMServer.renderToString(TreeComponent);
        });
      // Crear y mostrar un panel webview
    } else {
      console.log(`The current file ${currentDirectory} does not exist.`);
      vscode.window.showErrorMessage(`The current file ${currentDirectory} does not exist.`);
    }
  } else {
    vscode.window.showErrorMessage('There is not active file.');
  }
}