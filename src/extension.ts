import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  console.log('Disco Mode Extension Activated!');

  const disposable = vscode.commands.registerCommand('vscode-disco-plugin.runAndDisco', () => {
    vscode.window.showInformationMessage('Running Code and Activating Disco Mode!');
    console.log('Run and Disco Mode Triggered!');

    // Запуск Run (имитация выполнения кода)
    vscode.commands.executeCommand('workbench.action.debug.start');

    // Расширенный список тем
    const colors = [
      'Monokai',
      'Abyss',
      'Light+ (default light)',
      'Solarized Dark',
      'High Contrast',
      'Dracula',
      'Quiet Light',
      'SynthWave \'84',
      'Kimbie Dark',
      'Tomorrow Night Blue',
      'Cobalt2',
      'One Dark Pro',
      'Palenight',
      'Night Owl',
      'Shades of Purple',
      'GitHub Light',
      'Nord',
      'Winter is Coming (Dark)',
      'Dark+ (default dark)',
      'Horizon',
    ];

    let index = 0; // Начальный индекс
    const intervalDuration = 500; // Интервал в миллисекундах
    const maxDuration = 15000; // Общее время работы в миллисекундах
    const maxIterations = Math.floor(maxDuration / intervalDuration); // Количество переключений
    let iteration = 0; // Текущая итерация

    const interval = setInterval(() => {
      const currentTheme = colors[index];
      vscode.workspace.getConfiguration('workbench').update('colorTheme', currentTheme, true);
      console.log(`Switched to theme: ${currentTheme}`);

      // Увеличиваем индекс и сбрасываем его, если достигли конца списка
      index = (index + 1) % colors.length;

      // Увеличиваем счётчик итераций и останавливаем, если достигнут лимит
      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        vscode.window.showInformationMessage('Disco Mode Ended!');
      }
    }, intervalDuration);

    // Проигрывание музыки
    const audioPath = context.extensionPath + '/media/disco.mp3';
    console.log(`Audio path: ${audioPath}`);
    exec(`start ${audioPath}`, (error) => {
      if (error) {
        console.error('Error playing music:', error);
      } else {
        console.log('Music started successfully.');
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('Disco Mode Extension Deactivated!');
}
