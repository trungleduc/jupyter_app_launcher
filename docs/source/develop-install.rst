
Contribution
=================

Development installation
--------------------------

Note: You will need NodeJS to build the extension package.

The ``jlpm`` command is JupyterLab's pinned version of `yarn <https://yarnpkg.com/>`_  that is installed with JupyterLab. You may use
``yarn`` or ``npm`` in lieu of ``jlpm`` below.

.. code-block:: bash

    # Clone the repo to your local environment
    # Change directory to the jupyter_app_launcher directory
    # Install package in development mode
    pip install -e .
    # Link your development version of the extension with JupyterLab
    jupyter labextension develop . --overwrite
    # Server extension must be manually installed in develop mode
    jupyter server extension enable jupyter_app_launcher
    # Rebuild extension Typescript source after making changes
    jlpm build


You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

.. code-block:: bash

    # Watch the source directory in one terminal, automatically rebuilding when needed
    jlpm watch
    # Run JupyterLab in another terminal
    jupyter lab

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

.. code-block:: bash

    jupyter lab build --minimize=False

Development uninstallation
---------------------------

.. code-block:: bash

    # Server extension must be manually disabled in develop mode
    jupyter server extension disable jupyter_app_launcher
    pip uninstall jupyter_app_launcher


In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyter_app_launcher` within that folder.
