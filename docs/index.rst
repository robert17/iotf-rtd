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
service.  If you are looking for tutorials you can find them on developerWorks Recipes_

.. _Recipes: https://developer.ibm.com/recipes/

The documentation is organized into a number of sections:

Introduction
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1

    index
    intro/getting_started
    reference/concepts


API
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
	
    api/device
    api/historical_events
    api/device_management

Device Management
------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
    
    device_mgmt/introduction
    device_mgmt/protocol
    device_mgmt/device_model
    device_mgmt/device_model_attributes
    device_mgmt/operations/index
    device_mgmt/operations/manage
    device_mgmt/operations/update
    device_mgmt/operations/diagnostics
    device_mgmt/operations/observations
    device_mgmt/operations/device_actions
    device_mgmt/operations/firmware_actions
    device_mgmt/updating_firmware
    

Programming Guides
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1
	
    libraries/programmingguides

    libraries/python
    libraries/python_cli_for_devices
    libraries/python_cli_for_apps

    embeddedc/embedcintro
    embeddedc/embeddedc_devices
    embeddedc/embeddedc_samples    

    java/javaintro.rst
    java/java_cli_devices.rst
    
    nodejs/node-js_intro.rst
    nodejs/node-js_devices.rst
    nodejs/node-js_applications.rst	

Messaging
-------------------------------------------------------------------------------

.. toctree::
    :maxdepth: 1

    messaging/mqtt
    messaging/devices
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

