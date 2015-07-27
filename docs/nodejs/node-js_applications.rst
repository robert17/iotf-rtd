Node.js Client Library - Applications
=======================================

The node.js client is used for simplifying the interacting with the Internet of Things Foundation. This client library contains instruction and guidance on using node.js with Internet of Things Foundation to interact with you devices and applications.

This client library is divided into two parts, Devices and Applications. The Devices section contains information on how devices publish events and handle commands using the node.js Internet of Things Foundation module, and the Applications section contains information on how applications can use the nodejs ibmiotf module to interact with devices.

*IotfApplication* is the application client for the Internet of Things Foundation service. This section contains information on how applications interact with devices.

Constructor
---------------

The constructor builds the application client instance. It accepts an configuration json containing the following :
- org - Your organization ID
- id - The unique ID of your application within your organization.
- auth-key - API key
- auth-token - API key token

If you want to use quickstart, then send only the first two properties.

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    var config = {
        "org" : orgId,
        "id" : appId,
        "auth-key" : apiKey,
        "auth-token" : apiToken
    }
    
    var appClient = new Client(config);

Using a configuration file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Instead of passing the configuration json directly, you can also use a configuration file. Use the following code snippet

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
The configuration file must be in the format of

.. code:: javascript

    org=$orgId
    id=$myUniqueIs
    auth-key=$apiKey
    auth-token=$token
    
Connecting to the Internet of Things Foundation
----------------------------------------------------

Connect to the Internet of Things Foundation by calling the *connect* function.

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    //Add your code here
    });
    

After the successful connection to the IoTF service, the application client sends a *connect* event. So all the logic can be implemented inside this callback function.

Subscribing to device events
----------------------------

Events are the mechanism by which devices publish data to the Internet of Things Foundation. The device controls the content of the event and assigns a name for each event it sends.

When an event is received by the Internet of Things Foundation, the credentials of the connection on which the event was received are used to determine from which device the event was sent. Using this architecture, it is impossible for a device to impersonate another device.

By default, applications will subscribe to all events from all connected devices. Use the type, id, event and msgFormat parameters to control the scope of the subscription. A single client can support multiple subscriptions. The code samples below give examples of how to subscribe to devices dependent on device type, id, event and msgFormat parameters.

To subscribe to all events from all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceEvents();
    });
    

To subscribe to all events from all devices of a specific type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {

        appClient.subscribeToDeviceEvents("mydeviceType");
    });


To subscribe to a specific event from all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceEvents("+","+","myevent");
    });
    

To subscribe to a specific event from two or more different devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceEvents("myDeviceType","device01","myevent");
        appClient.subscribeToDeviceEvents("myOtherDeviceType","device02","myevent");
    });
    

To subscribe to all events published by a device in json format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceEvents("myDeviceType","device01","+","json");
    
    });


Handling events from devices
--------------------------------

To process the events received by your subscriptions you need to implement an device event callback method. The ibmiotf application client emits the event *deviceEvent*. This function has the following properties:
-   deviceType
-   deviceId
-   eventType
-   format
-   payload - Device event payload
-   topic - Original topic

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceEvents("myDeviceType","device01","+","json");
    
    });
    appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    
        console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
    
    });
    

Subscribing to device status
----------------------------

By default, this will subscribe to status updates for all connected devices. Use the type and id parameters to control the scope of the subscription. A single client can support multiple subscriptions.

Subscribe to status updates for all devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceStatus();
    
    });


Subscribe to status updates for all devices of a specific type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceStatus("myDeviceType");
    
    });

Subscribe to status updates for two different devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceStatus("myDeviceType","device01");
        appClient.subscribeToDeviceStatus("myOtherDeviceType","device02");
    
    });

Handling status updates from devices
------------------------------------

To process the status updates received by your subscriptions you need to implement an device status callback method. The ibmiotf application client emits the event *deviceStatus*. This function has the following properties:

-   deviceType
-   deviceId
-   payload - Device status payload
-   topic

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        appClient.subscribeToDeviceStatus("myDeviceType","device01");
        appClient.subscribeToDeviceStatus("myOtherDeviceType","device02");
    
    });
    appClient.on("deviceStatus", function (deviceType, deviceId, payload, topic) {
    
        console.log("Device status from :: "+deviceType+" : "+deviceId+" with payload : "+payload);
    
    });

Publishing events from devices
------------------------------

Applications can publish events as if they originated from a Device. The function requires:

-   DeviceType
-   Device ID
-   Event Type
-   Format
-   Data

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        var myData={'name' : 'foo', 'cpu' : 60, 'mem' : 50}
        appClient.publishDeviceEvent("myDeviceType","device01", "myEvent", "json", myData);
    
    });

Publishing commands to devices
------------------------------

Applications can publish commands to connected devices. The function requires:

-   DeviceType
-   Device ID
-   Command Type
-   Format
-   Data

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();

    appClient.on("connect", function () {
    
        var myData={'DelaySeconds' : 10}
        appClient.publishDeviceCommand("myDeviceType","device01", "reboot", "json", myData);
    
    });

Disconnect Client
-----------------

Disconnects the client and releases the connections

.. code:: javascript

    var Client = require("ibmiotf").IotfApplication;
    
    var config = Client.parseConfigFile(configFilePath);    
    var appClient = new Client(config);
    
    appClient.connect();
    
    appClient.on("connect", function () {
    
        var myData={'DelaySeconds' : 10}
        appClient.publishDeviceCommand("myDeviceType","device01", "reboot", "json", myData);
    
        appClient.disconnect();
    });

Check Connection Status
-----------------------

*isConnected* gives the current status of the application client connection.

.. code:: javascript
    if(client.isConnected) {
        ....
        ....
    }
