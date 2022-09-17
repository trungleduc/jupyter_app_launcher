<h1 align="center">jupyter_app_launcher</h1>

[![Github Actions Status](https://github.com/trungleduc/jupyter_app_launcher/workflows/Build/badge.svg)](https://github.com/trungleduc/jupyter_app_launcher/actions/workflows/build.yml) [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/trungleduc/jupyter_app_launcher/main?urlpath=lab) [![Documentation Status](https://readthedocs.org/projects/jupyter-app-launcher/badge/?version=latest)](https://jupyter-app-launcher.readthedocs.io/en/latest/?badge=latest)

<h2 align="center"> A JupyterLab extension to create custom launcher entries </h2>

**jupyter_app_launcher** helps users customize the JupyterLab launcher with a simple YAML file. Users can add custom entries to the launcher to:

- Open a predefined notebook or markdown file.
- Render a notebook in dashboard mode
- Open a notebook with Voila
- Start a local web server and open the predefined URL.
- Open a remote URL.

![Demo](./docs/source/images/launcher-app.gif)

## Try it online!

You can try it online by clicking on this badge:

## Documentation

You can read the documentation following this link:

## Installation

You can install using `pip`:

```bash
pip install jupyter_app_launcher
```

Or using `conda`:

```bash
conda install -c conda-forge  jupyter_app_launcher
```

**jupyter_app_launcher** works with **JupyterLab**>=3.1

## Example

### Open a predefined notebook

![Dynamic layout](./docs/source/images/notebook.gif)

### Open a predefined markdown file

![Dynamic layout](./docs/source/images/markdown.gif)

### Render a notebook in dashboard mode

![Dynamic layout](./docs/source/images/notebook-grid.gif)

### Open a notebook with Voila

![Dynamic layout](./docs/source/images/voila.gif)

### Start a local web server and open the URL.

![Dynamic layout](./docs/source/images/local-url.gif)

### Open a remote URL

![Dynamic layout](./docs/source/images/url.gif)

## Contributing

See [Contributing]()

## Packaging the extension

See [RELEASE](RELEASE.md)
