===============================================================================
Python Client Library - Applications
===============================================================================

Introduction
-------------------------------------------------------------------------------

This client library describes how to use applications with the python ibmiotf module. For help with getting started with this module, see `Python Client Library - Introduction <../libraries/python.html#/>`__. 

This client library is divided into two sections, both included within the library. This section contains information on how applications interact with devices using the Python ibmiotf module, and the Devices section contains information on how devices can use the ibmiotf module publish events and handle commands.

Constructor
-------------------------------------------------------------------------------

The constructor builds the client instance, and accepts an options dict containing the following definitions:

* org - Your organization ID.
* id - The unique ID of your application within your organization.
* auth-method - Method of authentication (the only value currently supported is "apikey").
* auth-key - API key (required if auth-method is "apikey").
* auth-token - API key token (required if auth-method is "apikey").

If no options dict is provided, the client will connect to the Internet of Things Foundation Quickstart, and default to an unregistered device. The options dict creates definitions which are used to interact with the Internet of Things Foundation module.

.. code:: python

    import ibmiotf.application
    try:
      options = {
        "org": organization, 
        "id": appId, 
        "auth-method": authMethod, 
        "auth-key": authKey, 
        "auth-token": authToken
      }
      client = ibmiotf.application.Client(options)
    except ibmiotf.ConnectionException  as e:
      ...


Using a configuration file
~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are not using an options dict as shown above, you include a configuration file containing an options dict. If you are using a configuration file containing an options dict, use the following code format.

.. code:: python

    import ibmiotf.application
    try:
      options = ibmiotf.application.ParseConfigFile(configFilePath)
      client = ibmiotf.application.Client(options)
    except ibmiotf.ConnectionException  as e:
      ...

The application configuration file must be in the following format:

::

    [application]
    org=$orgId
    id=$myApplication
    auth-method=apikey
    auth-key=$key
    auth-token=$token


----


Subscribing to device events
-------------------------------------------------------------------------------
Events are the mechanism by which devices publish data to the Internet of Things Foundation. The device controls the content of the event and assigns a name for each event it sends.

When an event is received by the IoT Foundation the credentials of the connection on which the event was received are used to determine from which device the event was sent. With this architecture it is impossible for a device to impersonate another device.

By default, applications will subscribe to all events from all connected devices. Use the type, id, event and msgFormat parameters to control the scope of the subscription. A single client can support multiple subscriptions. The code samples below give examples of how to subscribe to devices dependent on device type, id, event and msgFormat parameters.


To subscribe to all events from all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceEvents()


To subscribe to all events from all devices of a specific type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceEvents(deviceType=myDeviceType)


To subscribe to a specific event from all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceEvents(event=myEvent)


To subscribe to a specific event from two or more different devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceEvents(deviceType=myDeviceType, deviceId=myDeviceId, event=myEvent)
    client.subscribeToDeviceEvents(deviceType=myOtherDeviceType, deviceId=myOtherDeviceId, event=myEvent)


To subscribe to all events published by a device in json format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceEvents(deviceType=myDeviceType, deviceId=myDeviceId, msgFormat="json")


----

Handling events from devices
-------------------------------------------------------------------------------
To process the events received by your subscriptions you need to register an event callback method. The messages are returned as an instance of the Event class:

* event.device - string (uniquely identifies the device across all types of devices in the organization)
* event.deviceType - string
* event.deviceId - string
* event.event - string
* event.format - string
* event.data - dict
* event.timestamp - datetime

.. code:: python

    def myEventCallback(event):
      str = "%s event '%s' received from device [%s]: %s"
      print(str % (event.format, event.event, event.device, json.dumps(event.data)))

    ...
    client.connect()
    client.deviceEventCallback = myEventCallback
    client.subscribeToDeviceEvents()


----


Subscribing to device status
-------------------------------------------------------------------------------
By default, this will subscribe to status updates for all connected devices. Use the type and id parameters to control the scope of the subscription. A single client can support multiple subscriptions.

Subscribe to status updates for all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceStatus()


Subscribe to status updates for all devices of a specific type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceStatus(deviceType=myDeviceType)


Subscribe to status updates for two different devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    client.connect()
    client.subscribeToDeviceStatus(deviceType=myDeviceType, deviceId=myDeviceId)
    client.subscribeToDeviceStatus(deviceType=myOtherDeviceType, deviceId=myOtherDeviceId)


----


Handling status updates from devices
-------------------------------------------------------------------------------
To process the status updates received by your subscriptions you need to register an event callback method. The messages are returned as an instance of the Status class:

The following properties are set for both "Connect" and "Disconnect" status events:
  
* status.clientAddr - string
* status.protocol - string
* status.clientId - string
* status.user - string
* status.time - datetime
* status.action - string
* status.connectTime - datetime
* status.port - integer

The following properties are only set when the action is "Disconnect":

* status.writeMsg - integer
* status.readMsg - integer
* status.reason - string
* status.readBytes - integer
* status.writeBytes - integer

.. code:: python

    def myStatusCallback(status):
      if status.action == "Disconnect":
        str = "%s - device %s - %s (%s)"
        print(str % (status.time.isoformat(), status.device, status.action, status.reason))
      else:
        print("%s - %s - %s" % (status.time.isoformat(), status.device, status.action))

    ...
    client.connect()
    client.deviceStatusCallback = myStatusCallback
    client.subscribeToDeviceStstus()


----


Publishing events from devices
-------------------------------------------------------------------------------
Applications can publish events as if they originated from a Device

.. code:: python

    client.connect()
    myData={'name' : 'foo', 'cpu' : 60, 'mem' : 50}
    client.publishEvent(myDeviceType, myDeviceId, "status", "json", myData)


----


Publishing commands to devices
-------------------------------------------------------------------------------
Applications can publish commands to connected devices

.. code:: python

    client.connect()
    commandData={'rebootDelay' : 50}
    client.publishCommand(myDeviceType, myDeviceId, "reboot", "json", myData)


----


Retrieve device details
-------------------------------------------------------------------------------

Retrieve details of all registered devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    deviceList = client.api.getDevices()
    print(deviceList)


Retrieve details of a specific device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    device = client.api.getDevice(deviceType, deviceId)
    print(device)


----


Register a new device
-------------------------------------------------------------------------------

.. code:: python

    device = client.api.registerDevice(deviceType, deviceId, metadata)
    print(device)
    print("Generated Authentication Token = %s" % (device['password']))


----


Delete a device
-------------------------------------------------------------------------------

.. code:: python

    try:
      client.api.deleteDevice(deviceType, deviceId)
    except Exception as e:
      print(str(e))


----


Access historical event data
-------------------------------------------------------------------------------

Get historical event data for a specific device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    result = client.api.getHistoricalEvents(deviceType, deviceId)
    print(result)


Get historical event data for all devices of a specific type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    result = client.api.getHistoricalEvents(deviceType)
    print(result)


Get historical event data for all devices of all types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    result = client.api.getHistoricalEvents()
    print(result)
