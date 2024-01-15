# JupyterLite Capytale

[![lite-badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://quantstack.net/jupyterlite-capytale)

Extension and demo to integrate JupyterLite with Capytale.

## Structure

This repository contains a JupyterLab extension to integrate JupyterLite with Capytale, and a demo to show how to use it.

### Extension

The extension is located in the `src` folder. It sets up a bridge between a host application and a JupyterLite instance by using `postMessage` to communicate between the two.

To install and develop the extension, see the `Development` and `Usage` sections below.

### Demo

The demo is located in the `demo` folder:

- `index.html`: the main entry point of the demo
- `content`: a few example notebooks
- `overrides.json`: default set of override JupyterLab settings to customize the UI, to use a default display language, hide buttons and menu entries, etc...
- `requirements.txt`: list of Python packages to install before building the JupyterLite site

This demo is also deployed on GitHub pages and available at https://quantstack.net/jupyterlite-capytale.

## Development

```bash
# Clone the repo to your local environment

# Create a new environment
mamba create -n jupyterlite-capytale -c conda-forge python=3.11 jupyterlite-pyodide-kernel=0.2 jupyterlab=4 notebook=7

# Activate the environment
mamba activate jupyterlite-capytale

# Install package in development mode
python -m pip install -e .

# Link your development version of the extension
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
jlpm build
```

### Usage

Build a new JupyterLite site:

```bash
# build the demo
jlpm demo:build

# serve the demo
jlpm demo:build
```

Then go to http://localhost:8000 to open the demo.
