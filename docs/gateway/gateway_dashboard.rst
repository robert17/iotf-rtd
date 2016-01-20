Connecting and Using a Gateway Device using the IBM Internet of Things Foundation platform Dashboard
=========================================================================================================

This task describes the process of connecting a gateway device, which connects itself, and devices behind the gateway, and sends data from itself and devices behind it to the Internet of Things Foundation platform.

Gateways can also subscribe to commands on behalf of devices connected to the gateway.

Prerequisites
-----------------

This task assumes that you already have an Internet of Things Foundation platform organization. 

Procedure
----------

1. Creating a device type for your gateway: A gateway has more rights than a normal device, and can send and receive device data on behalf of other devices.

In your organization dashboard 'Devices' tab, select the 'Device Types' sub-tab. Click 'Create Type'. Click 'Create gateway type', and follow the instructions in the flow, including adding any device properties and metadata. Click 'Create' to complete the flow and create the device type.
	
2. To create a gateway device:

 In your organization dashboard 'Devices' tab, select the 'Browse' sub-tab and click 'Add device'. Select the gateway device type created in the previous step. Follow the 'Add device' flow, entering the mandatory *deviceId* property, and any other optional properties.
	
After creating a gateway device, the authentication token provided should be saved for use in configuring the gateway to connect to the Internet of Things Foundation platform.

3. Connecting the gateway to the Internet of Things Foundation platform.

There are a range of recipes available for connecting devices to the IoT Foundation platform. Connecting a gateway requires the same steps as connecting a normal device with one exception. When connecting a normal device, the clientId uses the following format:
	
``d:<orgId>:<typeId>:<deviceId>``
	
When connecting a gateway device, the clientId replaces ``d`` for ``g``:
	
``g:<orgId>:<typeId>:<deviceId>``
	
4. Set up devices that are connected to the gateway and are to be connected to the Internet of Things Foundation platform:

 Use the REST API Authenticate Gateway as described in the Connection Setup documentation. Create a device type for the device or devices which are to connect through the gateway. The devices should have *gatewayId* and *gatewayTypeId* properties matching the *deviceId* and *deviceTypeId* of the gateway they are connecting through. Add the devices which are connected to the gateway to the Internet of Things Foundation. 
	
The devices connected to the gateway should now be visible in your Internet of Things Foundation platform organization dashboard.
