Introduction to Gateways in the IBM Internet of Things Foundation platform
============================================================================

.. note:: This documentation applies to the Gateway capability which is in beta state. Fully tested and documented, the beta allows us to seek feedback about the capability and potentially incorporate improvements before it becomes a fully supported part of the platform. Please try it out and use this forum, https://developer.ibm.com/answers/smart-spaces/17/internet-of-things.html to let us know what you think.



Gateways are a specialized class of devices in the Internet of Things Foundation. Gateways are devices which serve as access points to the Internet of Things Foundation for other devices.

Gateway devices have additional permission when compared to regular devices. Gateway devices can register new devices and can send and receive data on behalf of devices connected to them.

Additional Properties for Gateway Support
---------------------------------------------

Several new properties have been added to support gateway devices, and device connection via gateways.

A new device type property was introduced to support gateway devices. The *classId* property can have the following values:

- "Gateway": for IoTF devices which can act as gateways.
- "Device": For devices which cannot act as gateways, and are directly connected to the Internet of Things Foundation platform.

The *classId* property differentiates between gateways and regular devices. 

Two other device properties have been introduced for devices. The *gatewayId* property and *gatewayTypeId* property are used to define the gateway which a gateway-connected device connects to. 

The *gatewayId* device property is an optional property which is applied to non-gateway devices which connect to the Internet of Things Foundation platform via a gateway. The property should match the *deviceId* property of the gateway which the device is connected to.

The *gatewayTypeId* device property is an optional property which is applied to non-gateway devices which connect to the Internet of Things Foundation platform via a gateway. The property should match the *deviceType* property of the gateway which the device is connected to.

Data from gateways and gateway-connected devices
--------------------------------------------------

The topic structure for publishing and receiving data to and from gateways and gateway-connected devices is different to the structure for devices which are directly connected to the Internet of Things Foundation.

Directly connected devices publish their sensor data to the following topic:
``iot-2/evt/<eventType>/fmt/<payloadFormat>``
Directly connected devices receive commands on the following topic:
``iot-2/cmd/<commandType>/fmt/<payloadFormat>``

Gateway devices publish their own sensor data to the following topic:
``iot-2/type/<gatewayTypeId>/id/<gatewayDeviceId>/evt/<eventType>/fmt/<payloadFormat>``

Gateway devices receive commands on the following topic:
``iot-2/type/<gatewayTypeId>/id/<gatewayDeviceId>/cmd/<commandType>/fmt/<payloadFormat>``

Gateway-connected devices have their sensor data published by the gateway on the following topic:
``iot-2/type/<deviceTypeId>/id/<deviceId>/evt/<eventType>/fmt/<payloadFormat>``

Gateway-connected devices receive commands by subscribing from the gateway to the following topic:
``iot-2/type/<deviceTypeId>/id/<deviceId>/cmd/<commandType>/fmt/<payloadFormat>``

-----------

For instructions on how to connect a gateway device, or connect a device to a gateway, see the following documentation.
