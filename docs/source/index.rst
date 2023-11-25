
jupyter_app_launcher
=================================================================================

   Custom launcher entries for JupyterLab.

Version: |release|

**jupyter_app_launcher** helps users customize the JupyterLab launcher with a simple YAML file. Users can add custom entries to the launcher to:

- Open a predefined notebook or markdown file.
- Render a notebook in dashboard mode
- Open a notebook with Voila
- Start a local process and open the defined URL.
- Open a remote URL.

.. figure:: images/launcher-app.gif

   Launcher demo.

Installation
-------------

To get started with **jupyter_app_launcher**, install with pip::

    pip install jupyter_app_launcher

or with conda::

    conda install -c conda-forge  jupyter_app_launcher

Check your installation with::

    jupyter serverextension list
    jupyter labextension list

**jupyter_app_launcher** works with **JupyterLab**>=3.1

Contents
--------

.. toctree::
   :maxdepth: 2

   usage

.. toctree::
   :maxdepth: 2

   develop-install

.. toctree::
   :maxdepth: 1

   changelog

.. links

.. _`Jupyter widgets`: https://jupyter.org/widgets.html

.. _`notebook`: https://jupyter-notebook.readthedocs.io/en/latest/

.. _`Voila`: https://github.com/voila-dashboards/voila
