mBed C++ Client Library (Update In Progress)
=============================================

The `mBed C++ client library <https://developer.mbed.org/teams/IBM_IoT/code/IBMIoTF/>`_ can be used to simplify the interaction with the IBM Internet of Things Foundation. Although it uses C++, it still avoids dynamic memory allocations and use of STL functions. This library will enable `mBed devices <https://www.mbed.com/en/>`__ like `LPC1768 <https://developer.mbed.org/platforms/mbed-LPC1768/>`__, `FRDM-K64F <https://developer.mbed.org/platforms/FRDM-K64F/>`__ to communicate with the IBM IoT Foundation Cloud service using the MQTT protocol with simple APIs.

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

These arguments create creates definitions which are used to interact with the Internet of Things Foundation service. 

The following code shows how to create a DeviceClient instance to interact with the Internet of Things Foundation quickstart service.

.. code:: c

	#include "DeviceClient.h"
	....
	....
	Iotfclient client;
	//quickstart
	rc = initialize(&client,"quickstart","iotsample","001122334455",NULL,NULL);
	//registered
	rc = initialize(&client,"orgid","type","id","token","authtoken");
	....

.. code:: c

	#include "iotfclient.h"
	....
	....
	char *filePath = "./device.cfg";
	Iotfclient client;
	rc = initialize_configfile(&client, filePath);
	....


Connecting to the Service
-------------------------

After initializing the Internet of Things Foundation Embedded C client library, you can connect to the Internet of Things Foundation by calling the 'connectiotf' function.


.. code:: c

	#include "iotfclient.h"
	....
	....
	Iotfclient client;
	char *configFilePath = "./device.cfg";
	
	rc = initialize_configfile(&client, configFilePath);
	
	if(rc != SUCCESS){
		printf("initialize failed and returned rc = %d.\n Quitting..", rc);
		return 0;
	}
	
	rc = connectiotf(&client);
	
	if(rc != SUCCESS){
		printf("Connection failed and returned rc = %d.\n Quitting..", rc);
		return 0;
	}
	....


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
