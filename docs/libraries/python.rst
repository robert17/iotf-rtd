IBM Internet of Things Foundation for Python
============================================

This python module has enables you to interact with the `IBM Internet of Things Foundation <https://internetofthings.ibmcloud.com>`__ using Python.

The following versions of Python are compatible with this module:

-  `Python 3.5 <https://www.python.org/downloads/release/python-350/>`__
-  `Python 3.4 <https://www.python.org/downloads/release/python-343/>`__
-  `Python 2.7 <https://www.python.org/downloads/release/python-2710/>`__

Note: Support for MQTT over SSL requires at least Python v2.7.9 or v3.4, and openssl v1.0.1

Dependencies
------------

The following libraries and modules are required in order to use the Internet of Things Foundation Python module.

-  The `paho-mqtt <https://pypi.python.org/pypi/paho-mqtt>`__ implements the MQTT protocol required for communicating with the Internet of Things Foundation.
-  `ISO8601 <https://pypi.python.org/pypi/iso8601>`__. This module parses ISO8601 date strings into datetime objects. 
-  The `pytz <https://pypi.python.org/pypi/pytz>`__ library enables accurate timezone calculations.
-  The `requests <https://pypi.python.org/pypi/requests>`__ library is a python HTTP library, enabling HTTP communication with the Internet of Things Foundation using python.

Installation
------------

Install the latest version of the library by using the following code in the command line.

::

    [root@localhost ~]# pip install ibmiotf

Uninstall
---------

Uninstall the module by using the following code in the command line.

::

    [root@localhost ~]# pip uninstall ibmiotf

Migrating from v0.0.x to v0.1.x
-------------------------------

There is a significant change between the 0.0.x releases and 0.1.x that will require changes to client code. The library now supports multiple message formats, so users should update calls to deviceClient.publishEvent, appClient.publishEvent and appClient.publishCommand to also supply the desired message format.

Sample code v0.0.9:

.. code:: python

    deviceOptions = {"org": organization, "type": deviceType, "id": deviceId, "auth-method": authMethod, "auth-token": authToken}
    deviceCli = ibmiotf.device.Client(deviceOptions)
    myData = { 'hello' : 'world', 'x' : x}
    deviceCli.publishEvent(event="greeting", data=myData)

Sample code v0.1.1:

.. code:: python

    deviceOptions = {"org": organization, "type": deviceType, "id": deviceId, "auth-method": authMethod, "auth-token": authToken}
    deviceCli = ibmiotf.device.Client(deviceOptions)
    myData = { 'hello' : 'world', 'x' : x}
    deviceCli.publishEvent(event="greeting", msgFormat="json", data=myData)

Also, as part of this change, events and commands sent as format "json" will not be assumed to meet the `IOTF JSON Payload Specification <https://docs.internetofthings.ibmcloud.com/messaging/payload.html#iotf-json-payload-specification>`__. The default client behaviour will be to parse commands and events with format "json" as a generic JSON object only. Only messages sent as format "json-iotf" will default to being decoded in this specification.

This can be easily changed with the following code.

.. code:: python

    import ibmiotf.device
    from ibmiotf.codecs import jsonIotfCodec

    deviceOptions = {"org": organization, "type": deviceType, "id": deviceId, "auth-method": authMethod, "auth-token": authToken}
    deviceCli = ibmiotf.device.Client(deviceOptions)
    # Revert to v0.0.x parsing for json messages -- assume all JSON events and commands use the IOTF JSON payload specification
    deviceCli.setMessageEncoderModule('json', jsonIotfCodec) 

Documentation
-------------

-  `Device
   Client <https://docs.internetofthings.ibmcloud.com/libraries/python_cli_for_devices.html>`__
-  `Application
   Client <https://docs.internetofthings.ibmcloud.com/libraries/python_cli_for_apps.html>`__
-  `API
   Client <https://docs.internetofthings.ibmcloud.com/libraries/python_cli_for_api.html>`__
