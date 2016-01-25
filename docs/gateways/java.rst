Java for Gateway Developers (Update in progress)
================================================

- See `iot-java <https://github.com/ibm-messaging/iot-java>`_ in GitHub

Constructor
-------------------------------------------------------------------------------

The constructor builds the Gateway client instance, and accepts a Properties object containing the following definitions:

* org - Your organization ID.
* type - The type of your Gateway device.
* id - The ID of your Gateway.
* auth-method - Method of authentication (The only value currently supported is "token"). 
* auth-token - API key token.

The Properties object creates definitions which are used to interact with the Watson Internet of Things Platform module. 

The following code snippet shows how to construct the GatewayClient instance,

.. code:: java
    
  Properties options = new Properties();
  options.setProperty("org", "<Your Organization ID>");
  options.setProperty("type", "<The Gateway Device Type>");
  options.setProperty("id", "The Gateway Device ID");
  options.setProperty("auth-method", "token");
  options.setProperty("auth-token", "API token");
  
  GatewayClient gwClient = new GatewayClient(options); 
    
Using a configuration file
~~~~~~~~~~~~~~~~~~~~~~~~~~

Instead of including a Properties object directly, you can use a configuration file containing the name-value pairs for Properties. If you are using a configuration file containing a Properties object, use the following code format.

.. code:: java

    Properties props = GatewayClient.parsePropertiesFile(new File("C:\\temp\\application.prop"));
    GatewayClient gwClient = new GatewayClient(props);
    ...

The Gateway device configuration file must be in the following format:

::

    [Gateway]
    org=$orgId
    typ=$myGatewayDeviceType
    id=$myGatewayDeviceId
    auth-method=token
    auth-token=$token

----


Connecting to the Watson Internet of Things Platform
----------------------------------------------------

Connect to the Watson Internet of Things Platform by calling the *connect* function.

.. code:: java

    Properties props = GatewayClient.parsePropertiesFile(new File("C:\\temp\\application.prop"));
    GatewayClient gwClient = new GatewayClient(props);
    
    gwClient.connect();
    

After the successful connection to the IBM Watson IoT Platform, the Gateway client can perform the following operations,

* Publish events for itself and on behalf of devices connected behind the Gateway.
* Subscribe to commands for itself and on behalf of devices behind the Gateway.

----

Register devices using the Watson IoT Platform API
-------------------------------------------------------------------------

The Watson IoT Platform API can be used to register the devices (that are connected to the Gateway) to the Watson IoT Platform. Get the APIClient instance by invoking the api() method as follows,

.. code:: java
     
     import com.ibm.iotf.client.api.APIClient;
     
     ....
     
     GatewayClient gwClient = new GatewayClient(props);
     gwClient.connect();
     
     APIClient api = gwClient.api();

Once you get the handle of APIClient, you can add the devices, by first adding the device type and then the device as shown below,

Following code snippet shows how to add a device type using the APIClient:

.. code:: java
 
    GatewayClient gwClient = new GatewayClient(props);
    gwClient.connect();
     
    final String deviceTypeToBeAdded = "{\"id\": \"" + DEVICE_TYPE + "\",\"description\": "
				+ "\"My Device Type\"}";
		
	JsonElement type = new JsonParser().parse(deviceTypeToBeAdded);
	JsonObject response = gwClient.api().addDeviceType(type);
	
Following code snippet shows how to add a device type using the APIClient:

.. code:: java
 
    GatewayClient gwClient = new GatewayClient(props);
    gwClient.connect();
     
    String deviceToBeAdded = "{\"deviceId\": \"" + DEVICE_ID +
						"\",\"authToken\": \"qwer123\"}";

	JsonParser parser = new JsonParser();
	JsonElement input = parser.parse(deviceToBeAdded);
	JsonObject response = this.gwClient.api().
				registerDeviceUnderGateway(DEVICE_TYPE, this.gwDeviceId, this.gwDeviceType, input);


----


Publishing events
-------------------------------------------------------------------------------
Events are the mechanism by which Gateways/devices publish data to the Watson IoT Platform. The Gateway/device controls the content of the event and assigns a name for each event it sends.

**The Gateway can publish events from itself and on behalf of any device connected via the Gateway**.

When an event is received by the IBM Watson IoT Platform the credentials of the connection on which the event was received are used to determine from which Gateway the event was sent. With this architecture it is impossible for a Gateway to impersonate another device.

Events can be published at any of the three `quality of service levels <../messaging/mqtt.html#/>`__ defined by the MQTT protocol.  By default events will be published as qos level 0.

Publish Gateway event using default quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code:: java
    
    gwClient.connect();
    JsonObject event = new JsonObject();
    event.addProperty("name", "foo");
    event.addProperty("cpu",  90);
    event.addProperty("mem",  70);
    
    gwClient.publishGatewayEvent("status", event);


Publish Gateway event using user-defined quality of service
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Events can be published at higher MQTT quality of service levels, but these events may take slower than QoS level 0, because of the extra confirmation of receipt. 

.. code:: java

    gwClient.connect();
    JsonObject event = new JsonObject();
    event.addProperty("name", "foo");
    event.addProperty("cpu",  90);
    event.addProperty("mem",  70);
    
    gwClient.publishGatewayEvent("status", event, 2);

    
Publishing events from devices
-------------------------------------------------------------------------------

The Gateway can publish events on behalf of any device connected via the Gateway by passing the appropriate typeId and deviceId based on the origin of the event:

.. code:: java

    gwClient.connect()
    
    //Generate the event to be published
    JsonObject event = new JsonObject();
    event.addProperty("name", "foo");
    event.addProperty("cpu",  60);
    event.addProperty("mem",  40);
    
    // publish the event on behalf of device
     gwClient.publishDeviceEvent(deviceType, deviceId, eventName, event);

One can use the overloaded publishDeviceEvent() method to publish the device event in the desired quality of service. Refer to `MQTT Connectivity for Gateways <https://docs.internetofthings.ibmcloud.com/gateways/mqtt.html>`__ documentation to know more about the topic structure used.

----


Handling commands
-------------------------------------------------------------------------------
The Gateway can subscribe to commands directed at the gateway itself and to any device connected via the gateway. When the Gateway client connects, it automatically subscribes to any commands for this Gateway. But to subscribe to any commands for the devices connected via the Gateway, use one of the overloaded subscribeToDeviceCommands() method, for example,

.. code:: java

    gwClient.connect()
    
    // subscribe to commands on behalf of device
    gwClient.subscribeToDeviceCommands(DEVICE_TYPE, DEVICE_ID);

To process specific commands you need to register a command callback method. The messages are returned as an instance of the Command class which has the following properties:

* deviceType - The device type for which the command is received.
* deviceId - The device id for which the command is received, Could be the Gateway or any device connected via the Gateway.
* payload - The command payload.
* format - The format of the command payload, currently only JSON format is supported in the Java Client Library.
* command - The name of the command.
* timestamp - The org.joda.time.DateTime when the command is sent.

A sample implementation of the Command callback is shown below,

.. code:: java

    import com.ibm.iotf.client.gateway.Command;
    import com.ibm.iotf.client.gateway.CommandCallback;
    
    public class GatewayCommandCallback implements CommandCallback, Runnable {
    	// A queue to hold & process the commands
    	private BlockingQueue<Command> queue = new LinkedBlockingQueue<Command>();
    	
    	public void processCommand(Command cmd) {
    	    queue.put(cmd);
    	}
    	
    	public void run() {
    	    while(true) {
    	        Command cmd = queue.take();
    	        System.out.println("Command " + cmd.getPayload());
    	        
    	        // code to process the command
    	    }
    	}
    } 
  
Once the Command callback is added to the GatewayClient, the processCommand() method is invoked whenever any command is published on the subscribed criteria, The following snippet shows how to add the command call back into GatewayClient instance,

.. code:: java

    gwClient.connect()
    GatewayCommandCallback callback = new GatewayCommandCallback();
    gwClient.setCommandCallback(callback);
    //Subscribe to device connected to the Gateway
    gwClient.subscribeToDeviceCommands(DEVICE_TYPE, DEVICE_ID);


Overloaded methods are available to control the command subscription. 

----

Examples
-------------
* `MQTTApplicationDeviceEventPublish <https://github.com/ibm-messaging/iot-java/blob/master/samples/iotfdeviceclient/src/com/ibm/iotf/sample/client/application/MQTTApplicationDeviceEventPublish.java>`__ - A sample application that shows how to publish device events.
