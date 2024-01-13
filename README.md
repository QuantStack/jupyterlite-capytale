# JupyterLite Capytale

[![lite-badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://quantstack.net/jupyterlite-demo)

Extension and demo to integrate JupyterLite with Capytale.

## Development

```bash
# Clone the repo to your local environment

# Create a new environment
mamba create -n jupyterlite-capytale -c conda-forge python=3.11 jupyterlite-pyodide-kernel=0.2 jupyterlab=4 notebook=7

# Activate the environment
mamba activate jupyterlite-capytale

# Install package in development mode
python -m pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
jlpm build
```

### Usage

Build a new JupyterLite site:

```bash
cd examples
jupyter lite build --contents content --output-dir lite

# start a local server
python -m http.server
```

Then go to http://localhost:8000
