.. IBM IOT Foundation documentation master file, created by
   sphinx-quickstart on Wed Dec 31 00:00:45 2014.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

===============================================================================
Introduction
===============================================================================

About
-------------------------------------------------------------------------------
Welcome to the documentation/reference material for IBM's IoT Foundation 
service.  If you are looking for tutorials you can find them on developerWorks Recipes_.

.. _Recipes: https://developer.ibm.com/recipes/

The documentation is organized into a number of sections:

Introduction
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1

    index
    intro/getting_started
    reference/concepts
    reference/device_model
    reference/device_mgmt

API
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
    
    api/api_intro
    `Internet of Things Foundation API Version 2 <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html>`_
    `Internet of Things Foundation API Version 1 <https://docs.internetofthings.ibmcloud.com/swagger/v0001.html>`_

Device Management Operations
------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
    
    device_mgmt/operations/index
    device_mgmt/operations/manage
    device_mgmt/operations/update
    device_mgmt/operations/diagnostics
    device_mgmt/operations/observations
    device_mgmt/operations/device_actions
    device_mgmt/operations/firmware_actions
    

Programming Guides
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
	
    libraries/programmingguides

    libraries/python
    libraries/python_cli_for_devices
    libraries/python_cli_for_apps

    libraries/embedded_c

    java/javaintro
    java/java_cli_devices
    
    nodejs/node-js_intro
    nodejs/node-js_devices
    nodejs/node-js_applications	
    
    libraries/c_sharp_introduction
    libraries/c_sharp_devices
    libraries/c_sharp_applications

Messaging
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1

    messaging/mqtt
    messaging/devices
    messaging/managed_devices
    messaging/applications
    messaging/payload


Reference Material
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1

    reference/overview
    reference/security


Contribute
-------------------------------------------------------------------------------
If it's not working for you, it's not working for us. The source of this documentation 
is available on GitHub_, we welcome both `suggestions for improvement`_ and community 
contributions via the use of issues and pull requests against our repository.

.. _GitHub: https://github.com/ibm-messaging/iotf-rtd
.. _suggestions for improvement: https://github.com/ibm-messaging/iotf-rtd/issues

