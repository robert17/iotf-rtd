mBed C++ Client Library (Update In Progress)
=============================================

The `mBed C++ client library <https://developer.mbed.org/teams/IBM_IoT/code/IBMIoTF/>`_ can be used to simplify the interaction with the IBM Internet of Things Foundation. Although it uses C++, it still avoids dynamic memory allocations and use of STL functions. This library will enable `mBed devices <https://www.mbed.com/en/>`__ like `LPC1768 <https://developer.mbed.org/platforms/mbed-LPC1768/>`__, `FRDM-K64F <https://developer.mbed.org/platforms/FRDM-K64F/>`__ and etc.. to communicate with the IBM IoT Foundation Cloud service using the MQTT protocol with simple APIs.

Dependencies
------------

- `Eclipse Paho MQTT library for mBed devices <https://developer.mbed.org/teams/mqtt/code/MQTT/>`__ - provides an MQTT C client library, check `here <http://www.eclipse.org/paho/clients/c/embedded/>`__ for more information.

Installation
--------------
To install the Internet of Things Foundation client library for Embedded C follow the instructions below.

1. To install the latest version of the library, enter the following code in your command line.

.. code::

  [root@localhost ~]# git clone https://github.com/ibm-messaging/iotf-embeddedc.git

2. Copy the Paho library .tar file that was downloaded in the previous step to the *lib* directory.

.. code::
    
    cd iotf-embeddedc
    cp ~/org.eclipse.paho.mqtt.embedded-c-1.0.0.tar.gz lib/

3. Extract the library file

.. code::
    
    cd lib
    tar xvzf org.eclipse.paho.mqtt.embedded-c-1.0.0.tar.gz


When downloaded, the client has the following file structure:

.. code::

 |-lib - contains all the dependent files
 |-samples - contains the helloWorld and sampleDevice samples
   |-sampleDevice.c - sample device implementation
   |-helloworld.c - quickstart application
   |-README.md
   |-Makefile
   |-build.sh
 |-iotfclient.c - Main client file
 |-iotfclient.h - Header file for the client
 
 
Constructor
-------------------------------------------------------------------------------

The constructor builds the client instance, and accepts the following parameters:

* org - Your organization ID. (This is a required field. In case of quickstart flow, provide org as quickstart.)
* type - The type of your device. (This is a required field.)
* id - The ID of your device. (This is a required field.
* auth-method - Method of authentication (This is an optional field, needed only for registered flow and the only value currently supported is "token"). 
* auth-token - API key token (This is an optional field, needed only for registered flow).

These arguments create definitions which are used to interact with the Internet of Things Foundation service. 

The following code block shows how to create a DeviceClient instance to interact with the Internet of Things Foundation quickstart service.

.. code:: c++

  #include "DeviceClient.h"
  ....
  ....
  
  // Set IoT Foundation connection parameters
  char organization[11] = "quickstart";     // For a registered connection, replace with your org
  char deviceType[8] = "LPC1768";          // For a registered connection, replace with your device type
  char deviceId[3] = "01";                // For a registered connection, replace with your device id

  // Create DeviceClient
  IoTF::DeviceClient client(organization, deviceType, deviceId);
  ....

The following code block shows how to create a DeviceClient instance to interact with the Internet of Things Foundation Registered organization.

.. code:: c++

  #include "DeviceClient.h"
  ....
  ....
  
  // Set IoT Foundation connection parameters
  char organization[11] = "hrcl78";     // For a registered connection, replace with your org
  char deviceType[8] = "LPC1768";       // For a registered connection, replace with your device type
  char deviceId[3] = "01";              // For a registered connection, replace with your device id
  char method[6] = "token";             // Not required to change as IBM IoTF expects only "token" for now
  char token[9] = "password";           // For a registered connection, replace with your auth-token
  
  // Create DeviceClient
  IoTF::DeviceClient client(organization, deviceType, deviceId, method, token);
  ....

----

Connecting to the Internet of Things Foundation
------------------------------------------------

Connect to the Internet of Things Foundation by calling the connect function on the DeviceClient instance.

.. code:: c++

  #include "iotfclient.h"
  ....
  ....
  
  // Create DeviceClient
  IoTF::DeviceClient client(organization, deviceType, deviceId, method, token);
  
  bool status = false;
  
  // keep on retrying till the connection is successful
  while(status == false)
  {
  	status = client.connect();
  }

After the successful connection to the IoTF service, the Device client can publish events to IBM Internet of Things Foundation and listen for sommands.

----

Publishing events
-------------------------------------------------------------------------------
Events are the mechanism by which devices publish data to the Internet of Things Foundation. The device controls the content of the event and assigns a name for each event it sends.

When an event is received by the IBM IoT Foundation the credentials of the connection on which the event was received are used to determine from which device the event was sent. With this architecture it is impossible for a device to impersonate another device.

Events can be published at any of the three `quality of service levels <../messaging/mqtt.html#/>` defined by the MQTT protocol.  By default events will be published as qos level 0.

Publish event using default quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: java

			myClient.connect();
			
			JsonObject event = new JsonObject();
			event.addProperty("name", "foo");
			event.addProperty("cpu",  90);
			event.addProperty("mem",  70);
		    
			myClient.publishEvent("status", event);


Publish event using user-defined quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Events can be published at higher MQTT quality of servive levels, but these events may take slower than QoS level 0, because of the extra confirmation of receipt. Also Quickstart flow allows only Qos of 0

.. code:: java

			myClient.connect();
			
			JsonObject event = new JsonObject();
			event.addProperty("name", "foo");
			event.addProperty("cpu",  90);
			event.addProperty("mem",  70);
		    
			//Registered flow allows 0, 1 and 2 QoS
			myClient.publishEvent("status", event, 2);

----

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

.. note:: The 'yield' function must be called periodically to receive commands.


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
-----------------

To disconnect the client and release the connections, run the following code snippet.

.. code:: c

	#include "iotfclient.h"
	....
	rc = connectiotf (org, type, id , authmethod, authtoken);
	char *payload = {\"d\" : {\"temp\" : 34 }};
	
	rc= publishEvent("status","json", payload , QOS0);
	...
	rc = disconnect();
	....


Samples
-------

Sample device and application code is provided in `GitHub <https://github.com/ibm-messaging/iotf-embeddedc/tree/master/samples>`_.
