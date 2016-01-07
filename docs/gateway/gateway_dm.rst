Gateways and Device Management
===============================

Gateways and devices connected to them are compatible with the device management functions and operations. In order to be managed devices, devices must meet have a device management agent installed which can interpret the device management protocol. Gateways and gateway-connected devices can support the following device management operations:

- Reboot
- Factory Reset
- Firmware Download
- Firmware Update

.. _manage-request-gateway:

Setting up a gateway as a managed device
------------------------------------------

To set a gateway as a managed device, the gateway must publish a manage device request on the following topic:

``iotdevice-1/type/<gatewayTypeId>/id/<gatewayDeviceId>/mgmt/manage``

For details on message payload and response, see the section below.


Setting up a gateway-connected device as a managed device
------------------------------------------------------------

To set a gateway-connected device as a managed device, the device must publish a manage device request on the following topic:

``iotdevice-1/type/<typeId>/id/<deviceId>/mgmt/manage``

For details on message payload and response, see the section below.


Message Payload and Response
-----------------------------

The message should take the following format:

.. code::

	{
		"d": {
			"supports":{
				"deviceActions":true,
				"firmwareActions":true
			}
		}
		"reqId":"randomId_from_manage_message"
	}


The *deviceActions* variable controls whether the device supports Reboot and Factory Reset operations. The *firmwareActions* variable controls whether the device supports the Firmware Download and Firmware Update operations.

Response
~~~~~~~~~

The IoT Foundation will send a response on the following topic:

``iotdm-1/type/<typeId>/id/<deviceId>/response``

The message payload will follow this format:

.. code::

	{
		"rc":200,
		"reqId":"<randomId_from_manage_message>"
	}

For more details on possible response codes, see the API documentation.
