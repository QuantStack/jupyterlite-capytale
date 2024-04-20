import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { INotebookTracker } from '@jupyterlab/notebook';

// import de la définition des contrats Capytale
import type { CapytaleContracts } from "@capytale/contracts";

// import de l'agent *Application* de Capytale
import { getSocket } from '@capytale/app-agent';

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

    const setTheme = (theme?: string | null) => {
      if (theme === 'light') {
        themeManager.setTheme('JupyterLab Light');
      } else if (theme === 'dark') {
        themeManager.setTheme('JupyterLab Dark');
      }
    };

    // obtention du 'socket' de communication
    const socket = getSocket<CapytaleContracts>();

    // branchement de l'implémentation du côté *Application* des contrats suivants :
    //  - 'theme' version 1
    //  - 'simple-content(text)' version 1
    socket.plug(
      ['theme:1', 'simple-content(text):1'],
      () => {
        return [
          // implementation de theme:1
          {
            setTheme(theme: string | null) {
              setTheme(theme);
            }
          },
          // implementation de simple-content(text):1
          {
            loadContent(content: string | null) {
              if (content == null) {
                console.log("should load an empty notebook...");
              } else {
                if (notebookTracker.currentWidget == null) throw new Error("Could not load content");
                notebookTracker.currentWidget.context.model.fromString(content);
              }

            },
            getContent() {
              if (notebookTracker.currentWidget == null) throw new Error("No content");
              return notebookTracker.currentWidget.context.model.toString();
            },
            contentSaved() {
              console.log("thank you");
            }
          }
        ];
      }
    )

    // utilisation du contrat 'theme' pour obtenir le thème actuel au démarrage
    socket.use<['theme']>(
      ['theme'],
      async ([tc]) => {
        const theme = await tc.i?.getCurrentTheme();
        setTheme(theme);
      }
    )

    console.log('JupyterLab extension jupyterlab-capytale is activated!');
  }
};

export default plugin;
