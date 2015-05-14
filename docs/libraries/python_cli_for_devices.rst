===============================================================================
Python Client Library - Devices
===============================================================================

Constructor
-------------------------------------------------------------------------------

The Client constructor accepts an options dict containing: 

* org - Your organization ID 
* type - The type of your device
* id - The ID of your device
* auth-method - Method of authentication (the only value currently 
  supported is "token") 
* auth-token - API key token (required if auth-method is "token")

.. code:: python

    import ibmiotf.device
    try:
      options = {
        "org": organization, 
        "type": deviceType, 
        "id": deviceId, 
        "auth-method": authMethod, 
        "auth-token": authToken
      }
      client = ibmiotf.device.Client(options)
    except ibmiotf.ConnectionException  as e:
      ...


Using a configuration file
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    import ibmiotf.device
    try:
      options = ibmiotf.device.ParseConfigFile(configFilePath)
      client = ibmiotf.device.Client(options)
    except ibmiotf.ConnectionException  as e:
      ...

The device configuration file must be in the following format:

::

    [device]
    org=$orgId
    typ=$myDeviceType
    id=$myDeviceId
    auth-method=token
    auth-token=$token


----


Handling commands
-------------------------------------------------------------------------------
When the device client connects it automatically subscribes to any command 
for this device.  To process specific commands you need to register a command 
callback method. The messages are returned as an instance of the Command class 
which has the following properties:

* payload - string
* format - string
* data - dict 
* timestamp - datetime

.. code:: python

    def myCommandCallback(cmd):
      print("Command received: %s" % cmd.payload)
      if cmd.command == "setInterval":
        if 'interval' not in cmd.data:
          print("Error - command is missing required information: 'interval'")
        else:
          interval = cmd.data['interval']
      elif cmd.command == "print":
        if 'message' not in cmd.data:
          print("Error - command is missing required information: 'message'")
        else:
          print(cmd.data['message'])

    ...
    client.connect()
    client.commandCallback = myCommandCallback


----


Publishing events
-------------------------------------------------------------------------------
Events can be published at any of the three :ref:`quality of service levels <qoslevels>`
defined by the MQTT protocol.  By default events will be published as qos level 0.

Publish event using default quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: python

    client.connect()
    myData={'name' : 'foo', 'cpu' : 60, 'mem' : 50}
    client.publishEvent("status", myData)

Publish event using user-defined quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: python

    client.connect()
    myQosLevel=2
    myData={'name' : 'foo', 'cpu' : 60, 'mem' : 50}
    client.publishEvent("status", myData, myQosLevel)

