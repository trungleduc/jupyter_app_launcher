
jupyter_app_launcher - A JupyterLab extension to create custom launcher entries. 
=================================================================================

Version: |release|

**jupyter_app_launcher** aims to help users customize the JupyterLab launcher with a simple YAML file. Users can add custom entries entry to the launcher in order to:

- Create a predefined notebook or markdown file.
- Render a notebook in dashboard mode
- Open a notebook with Voila  
- Open a local/remote URL.

.. figure:: images/launcher-app.gif

   Launcher demo.  

Installation
-------------

To get started with **jupyter_app_launcher**, install with pip::

    pip install jupyter_app_launcher

or with conda::

    conda install -c conda-forge  jupyter_app_launcher

**jupyter_app_launcher** works with JupyterLab>=3.1

Contents
--------

.. toctree::
   :maxdepth: 2
   :caption: Installation and usage

   installing
   usage

.. toctree::
   :maxdepth: 1

   examples/index

.. toctree::
   :maxdepth: 1
   :caption: Changelog
   
   changelog


.. toctree::
   :maxdepth: 2
   :caption: Development

   develop-install


.. links

.. _`Jupyter widgets`: https://jupyter.org/widgets.html

.. _`notebook`: https://jupyter-notebook.readthedocs.io/en/latest/

.. _`Voila`: https://github.com/voila-dashboards/voila
