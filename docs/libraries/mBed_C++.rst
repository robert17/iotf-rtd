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

  #include "DeviceClient.h"
  ....
  ....
  
  // Create DeviceClient
  IoTF::DeviceClient client(organization, deviceType, deviceId, method, token);
  
  bool status = client.connect();
  

After the successful connection to the IoTF service, the Device client can publish events to IBM Internet of Things Foundation and listen for sommands.

----

Publishing events
-------------------------------------------------------------------------------
Events are the mechanism by which devices publish data to the Internet of Things Foundation. The device controls the content of the event and assigns a name for each event it sends.

When an event is received by the IBM IoT Foundation the credentials of the connection on which the event was received are used to determine from which device the event was sent. With this architecture it is impossible for a device to impersonate another device.

Events can be published at any of the three `quality of service levels <../messaging/mqtt.html#/>` defined by the MQTT protocol.  By default events will be published as qos level 0.

Publish event using default quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The below sample shows how to publish various data points of LPC1768 like x,y & z axis, joystick position, current temperature reading and etc.. to IoT Foundation in JSON format.

.. code:: c++

	boolean status = client.connect();
	
	// Create buffer to hold the event
	char buf[250];
	
	// Construct an event message with desired datapoints in JSON format
	sprintf(buf,
            "{\"d\":{\"myName\":\"IoT mbed\",\"accelX\":%0.4f,\"accelY\":%0.4f,\"accelZ\":%0.4f,
            \"temp\":%0.4f,\"joystick\":\"%s\",\"potentiometer1\":%0.4f,\"potentiometer2\":%0.4f}}",
            MMA.x(), MMA.y(), MMA.z(), sensor.temp(), joystickPos, ain1.read(), ain2.read());
        
        status = client.publishEvent("blink", buf);
	....

The complete sample can be found `here <https://developer.mbed.org/teams/IBM_IoT/code/IBMIoTClientLibrarySample/file/e58533b6bc6b/src/Main.cpp>`__

Publish event using user-defined quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Events can be published at higher MQTT quality of servive levels, but these events may take slower than QoS level 0, because of the extra confirmation of receipt. Also Quickstart flow allows only Qos of 0.

.. code:: c

	#include "MQTTClient.h"
	
	boolean status = client.connect();
	
	// Create buffer to hold the event
	char buf[250];
	
	// Construct an event message with desired datapoints in JSON format
	sprintf(buf,
            "{\"d\":{\"myName\":\"IoT mbed\",\"accelX\":%0.4f,\"accelY\":%0.4f,\"accelZ\":%0.4f,
            \"temp\":%0.4f,\"joystick\":\"%s\",\"potentiometer1\":%0.4f,\"potentiometer2\":%0.4f}}",
            MMA.x(), MMA.y(), MMA.z(), sensor.temp(), joystickPos, ain1.read(), ain2.read());
        
        status = client.publishEvent("blink", buf, MQTT::QOS2);
	....

----

Handling commands
-------------------------------------------------------------------------------
When the device client connects it automatically subscribes to any commands for this device. To process specific commands you need to register a command callback method. 
The messages are returned as an instance of the Command class which has the following properties:

- command - name of the command invoked
- format - e.g json, xml
- payload

Following code defines a sample command callback function that processes the blink interval command from the application and adds the same to the DeviceClient instance.

.. code:: c++

    #include "DeviceClient.h"
    #include "Command.h"
    
    // Process the command and set the LED blink interval
    void processCommand(IoTF::Command &cmd)
    {
        if (strcmp(cmd.getCommand(), "blink") == 0) 
    	{
    	    char *payload = cmd.getPayload();
    	    char* pos = strchr(payload, '}');
    	    if (pos != NULL) {
    	        *pos = '\0';
    	        char* ratepos = strstr(payload, "rate");
    	        if(ratepos == NULL)
    	            return;
    	        if ((pos = strchr(ratepos, ':')) != NULL)
    	        {
    	            int blink_rate = atoi(pos + 1);
    	            blink_interval = (blink_rate <= 0) ? 0 : (blink_rate > 50 ? 1 : 50/blink_rate);
    	        }
    	    }
    	} else {
            WARN("Unsupported command: %s\n", cmd.getCommand());
        }
    }

    client.setCommandCallback(processCommand); 
    
    yield(1000);
    ....
    
The complete sample can be found `here <https://developer.mbed.org/teams/IBM_IoT/code/IBMIoTClientLibrarySample/file/e58533b6bc6b/src/Main.cpp>`__

.. note:: The 'yield' function must be called periodically to receive commands.


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
