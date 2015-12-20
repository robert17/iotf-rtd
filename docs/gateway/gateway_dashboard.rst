Connecting and Using a Gateway Device using the IBM Internet of Things Foundation platform Dashboard
=========================================================================================================

This task describes the process of connecting a gateway device, which connects itself, and devices behind the gateway, and sends data from itself and devices behind it to the Internet of Things Foundation platform.

Prerequisites
-----------------

This task assumes that you already have an Internet of Things Foundation platform organization. 

Procedure
----------

1. Creating a device type for your gateway. A gateway has more rights than a normal device, and can send and receive device data on behalf of other devices.

	a. In your organization dashboard 'Devices' tab, select the 'Device Types' sub-tab.
	b. Click 'Create Type'.
	c. Click 'Create gateway type', and follow the instructions in the flow, including adding any device properties and metadata.
	d. Click 'Create' to complete the flow and create the device type.
	
2. Creating a gateway device. 

	a. In your organization dashboard 'Devices' tab, select the 'Browse' sub-tab and click 'Add device'.
	b. Select the gateway device type created in the previous step.
	c. Follow the 'Add device' flow, entering the mandatory *deviceId* property, and any other optional properties.
	
After creating a gateway device, the authentication token provided should be saved for use in configuring the gateway to connect to the Internet of Things Foundation platform.

3. Connecting the gateway to the Internet of Things Foundation platform.

	- There are a range of recipes available for connecting devices to the IoT Foundation platform.
	- Connecting a gateway requires the same steps as connecting a normal device with one exception. When connecting a normal device, the clientId uses the following format:
	
	``d:<orgId>:<typeId>:<deviceId>``
	
	When connecting a gateway device, the clientId replaces ``d`` for ``g``:
	
	``g:<orgId>:<typeId>:<deviceId>``
	
4. Set up devices that are connected to the gateway and are to be connected to the Internet of Things Foundation platform.

	a. Use the REST API Authenticate Gateway stuff as described in the Connection Setup documentation.
	b. Create a device type for the device or devices which are to connect through the gateway. The devices should have *gatewayId* and *gatewayTypeId* properties matching the *deviceId* and *deviceTypeId* of the gateway they are connecting through.
	c. Add the devices which are connected to the gateway to the Internet of Things Foundation. 
	
The devices connected to the gateway should now be visible in the your Internet of Things Foundation platform organization dashboard.
