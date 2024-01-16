// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "odootree" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('odootree.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from odootree!');
		const activeEditor = vscode.window.activeTextEditor;

		if (activeEditor) {
			const currentFilePath = activeEditor.document.uri.fsPath;
			const currentDirectory = path.dirname(currentFilePath);

			// Abrir el explorador de archivos del sistema en el directorio actual
			if (fs.existsSync(currentDirectory)) {
				console.log(`El directorio ${currentDirectory} existe.`);
				vscode.workspace.openTextDocument(activeEditor.document.uri).then(doc => {
					vscode.window.showTextDocument(doc);
					vscode.window.showInformationMessage(`Nombre del archivo: ${path.basename(currentFilePath)}`);
				});
				// Crear y mostrar un panel webview
				const panel = vscode.window.createWebviewPanel(
					'informacionArchivo',
					'Información del Archivo',
					vscode.ViewColumn.One,
					{}
				);

				// Cargar contenido HTML en el panel webview
				panel.webview.html = getWebviewContent(path.basename(currentFilePath));
			} else {
				console.log(`El directorio ${currentDirectory} no existe.`);
				vscode.window.showErrorMessage(`El directorio ${currentDirectory} no existe.`);
			}
		} else {
			vscode.window.showErrorMessage('No hay un archivo activo.');
		}
	});

	context.subscriptions.push(disposable);
}
function getWebviewContent(fileName: string): string {
	return `
        <html>
        <body>
            <h1>Información del Archivo</h1>
            <p>Nombre del Archivo: ${fileName}</p>
        </body>
        </html>`;
}
// This method is called when your extension is deactivated
export function deactivate() { }
