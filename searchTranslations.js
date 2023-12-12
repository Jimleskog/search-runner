const vscode = require('vscode');
const path = require('path');

async function searchTranslation() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const documentName = vscode.workspace.getConfiguration().get('extension.searchTranslation.documentName');

    if (!documentName) {
        vscode.window.showErrorMessage('Document name is not specified in settings.');
        return;
    }

    const dartScriptPath = path.join(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '', documentName);

    try {
        // Open the Dart script in the editor
        const document = await vscode.workspace.openTextDocument(dartScriptPath);
        await vscode.commands.executeCommand('editor.action.addSelectionToNextFindMatch');
        await vscode.window.showTextDocument(document);
        // Move to the first occurrence in the opened file
        await vscode.commands.executeCommand('editor.action.nextMatchFindAction');




    } catch (error) {
        console.error(`Error opening Dart script: ${error.message}`);
        vscode.window.showErrorMessage('Error opening Dart script. See the console for details.');
    }
    // } else {
    //     vscode.window.showInformationMessage('No word selected for searching.');
    // }
}

module.exports = {
    searchTranslation
};
