import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { INotebookTracker } from '@jupyterlab/notebook';

/**
 * The message type for communication between the JupyterLite and the host.
 */
const MESSAGE_TYPE = 'jupyterlite-capytale';

/**
 * The list of actions for interacting the JupyterLite
 */
type Action = 'isDirty' | 'download' | 'restart' | 'save' | 'toggleTheme';

/**
 * Initialization data for the jupyterlab-capytale extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-capytale:plugin',
  autoStart: true,
  requires: [INotebookTracker, IThemeManager],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    themeManager: IThemeManager
  ) => {
    const { commands } = app;

    const toggleTheme = () => {
      if (themeManager.theme === 'JupyterLab Dark') {
        themeManager.setTheme('JupyterLab Light');
      } else {
        themeManager.setTheme('JupyterLab Dark');
      }
    };

    // handle outgoing messages
    const sendMessage = (action: Action, data?: any) => {
      window.parent.postMessage(
        {
          type: MESSAGE_TYPE,
          action,
          data
        },
        '*'
      );
    };

    // handle incoming message
    window.addEventListener('message', event => {
      if (event.data.type !== MESSAGE_TYPE) {
        // bail if not a message from the host
        return;
      }

      console.log('Message received:', event.data);

      const action = event.data.action as Action;

      switch (action) {
        case 'save':
          void commands.execute('docmanager:save');
          break;
        case 'download': {
          const json = notebookTracker.currentWidget?.context.model.toJSON();
          sendMessage('download', json);
          break;
        }
        case 'toggleTheme':
          toggleTheme();
          break;
      }
    });

    console.log('JupyterLab extension jupyterlab-capytale is activated!');
  }
};

export default plugin;
