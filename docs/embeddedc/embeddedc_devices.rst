Embedded C Client Library - Devices and Applications
=========================================

This client library describes how to use devices with the embedded c iotfclient library. For help with getting started, see `Embedded C Client Library - Introduction <https://docs.internetofthings.ibmcloud.com/embeddedc/embedcintro.html#/>`__. 

This client library contains information on how devices publish events and handle commands and how applications can use the embedded c client library to interact with devices.

Handling commands
------------------------------------------

When the device client connects, it automatically subscribes to any command for this device. To process specific commands you need to register a command callback function by calling the function 'setCommandHandler'. The commands are returned as:

- commandName - name of the command invoked
- format - e.g json, xml
- payload

.. code:: c
	#include "iotfclient.h"
	
	void myCallback (char* commandName, char* format, void* payload)
	{
	printf("The command received :: %s\n", commandName);
	printf("format : %s\n", format);
	printf("Payload is : %s\n", (char *)payload);
	}
	...
	...
	char *filePath = "./device.cfg";
	rc = connectiotfConfig(filePath);
	setCommandHandler(myCallback);
	
	yield(1000);
	....


**Note** : The 'yield' function must be called periodically to receive commands.

Publishing events
-----------------------------------

Events can be published by using:

- eventType - Type of event to be published e.g status, gps
- eventFormat - Format of the event e.g json
- data - Payload of the event
- QoS - qos for the publish event. Supported values : QOS0, QOS1, QOS2

.. code:: c
	#include "iotfclient.h"
	....
	rc = connectiotf (org, type, id , authmethod, authtoken);
	char *payload = {\"d\" : {\"temp\" : 34 }};
	
	rc= publishEvent("status","json", "{\"d\" : {\"temp\" : 34 }}", QOS0); 
	....

Disconnect Client
--------------------------------------

Disconnects the client and releases the connections

.. code:: c
	#include "iotfclient.h"
	....
	rc = connectiotf (org, type, id , authmethod, authtoken);
	char *payload = {\"d\" : {\"temp\" : 34 }};
	
	rc= publishEvent("status","json", payload , QOS0);
	...
	rc = disconnect();
	....
