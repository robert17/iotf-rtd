Node.js Client Library
========================

The node.js client is used for simplifying the interacting with the Internet of Things Foundation. The following libraries contain instructions and guidance on using the nodejs ibmiotf node to interact with devices and applications within your organizations.

This client library is divided into two parts, Device and Application. The Devices section contains information on how devices publish events and handle commands using the nodejs ibmiotf module, and the Applications section contains information on how applications can use the nodejs ibmiotf module to interact with devices.

Devices
===============================

*IotfDevice* is device client for the Internet of Things Foundation
service. You can use this client to connect to the service, publish
events from the device and subscribe to commands.

Constructor
-----------

The constructor builds the device client instance. It accepts an
configuration json containing the following :

-   org - Your organization ID
-   type - The type of your device
-   id - The ID of your device
-   auth-method - Method of authentication (the only value currently
    supported is “token”)
-   auth-token - API key token (required if auth-method is “token”)

If you want to use quickstart, then send only the first three
properties.

``` {.sourceCode .javascript}
var Client = require("ibmiotf").IotfDevice;
var config = {
    "org" : "organization",
    "id" : "deviceId",
    "type" : "deviceType",
    "auth-method" : "token",
    "auth-token" : "authToken"
};

var deviceClient = new Client(config);

....
```

#### Using a configuration file

Instead of passing the configuration json directly, you can also use a
configuration file. Use the following code snippet

``` {.sourceCode .javascript}
var Client = require("ibmiotf").IotfDevice;

var config = Client.parseConfigFile(configFilePath);    
var deviceClient = new Client(config);

....
```

The configuration file must be in the format of

``` {.sourceCode .}
org=$orgId
type=$myDeviceType
id=$myDeviceId
auth-method=token
auth-token=$token
```

Connect
-------

Connect to the Internet of Things Foundation by calling the *connect*
function

``` {.sourceCode .javascript}
var Client = require("ibmiotf").IotfDevice;

var config = Client.parseConfigFile(configFilePath);    
var deviceClient = new Client(config);

deviceClient.connect();

deviceClient.on("connect", function () {

//Add your code here
});

....
```

After the successful connection to the IoTF service, the device client
emits *connect* event. So all the device logic can be implemented inside
this callback function.
