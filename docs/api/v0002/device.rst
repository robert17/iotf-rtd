================
Device API v0002
================

+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| Path                           | GET                     | POST                | PATCH                | DELETE             |
+================================+=========================+=====================+======================+====================+
| /                              | Get organization        |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types                  | List device types       | Create device type  |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}         | Get device type         |                     | Update device type   | Delete device type |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | List devices            | Add device          |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device              |                     | Update device        | Remove device      |
| /{deviceID}                    |                         |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device diagnostic   |                     |                      |                    |
| /{deviceID}/diag               | information             |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device diagnostic   | Add error code      |                      | Clear error codes  |
| /{deviceID}/diag/errorCodes    | error codes             |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device diagnostic   | Add device          |                      |                    |
| /{deviceID}/diag/log           | log                     | diagnostic log      |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device location     |                     | Update device        |                    |
| /{deviceID}/location           | information             |                     | location information |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /device/types/{typeID}/devices | Get device management   |                     |                      |                    |
| /{deviceID}/mgmt               | information             |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /bulk/devices                  | List devices in bulk,   |                     |                      |                    |
|                                | with paging and         |                     |                      |                    |
|                                | filtering               |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /bulk/devices/add              |                         | Add devices in      |                      |                    |
|                                |                         | bulk                |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /bulk/devices/remove           |                         | Remove devices in   |                      |                    | 
|                                |                         | bulk                |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /logs/connection?typeId=       | Get connection log for  |                     |                      |                    |
| {typeId}&deviceId={deviceId}   | device                  |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /mgmt/requests                 | List device management  | Initiate device     |                      |                    |
|                                | requests                | management requests |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /mgmt/requests/{requestId}     | Get device management   |                     |                      | Clear device       |
|                                | request                 |                     |                      | management request |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+
| /mgmt/requests/{requestId}     | Get device status for   |                     |                      |                    |
| /deviceStatus                  | management requests     |                     |                      |                    |
+--------------------------------+-------------------------+---------------------+----------------------+--------------------+

Filtering and Querying
------------------------

An important part of device management is the ability to query and filter information about devices. This is important for operator dashboards as well as building tools using APIs. For example a tool might query for a list of devices, filtering by device type, last activity and connection status.

The following API will permit a query string to qualify the devices whose information is being requested.
- GET /bulk/devices 

The query string will be able to refer to all of the device attributes in the core device model, plus the management and diagnostic extensions. The location extension is excluded, meaning devices cannot be queried for their latitude and longitude. The query string can contain the following attributes:

- typeId
- deviceId
- status.alert
- deviceInfo.serialNumber
- deviceInfo.manufacturer
- deviceInfo.model
- deviceInfo.deviceClass
- deviceInfo.description
- deviceInfo.fwVersion
- deviceInfo.hwVersion
- deviceInfo.descriptiveLocation
- mgmt.dormant
- mgmt.supports.deviceActions
- mgmt.supports.firmwareActions

The query string takes the form of a list of attribute=value pairs separated by '&'. This corresponds to an equality match on the attributes and values supplied. For example:

.. code::

	GET /bulk/devices?typeId='wdl5205'&deviceInfo.fwVersion=17
	
However, there is no capability to perform other types of matches, such as greater than or regular expressions. It is possible to specify fields that are required using a query parameter of the following form:

.. code:: 

	?_fields=<field1>,<field2>...
	
The query string will be able to refer to all of the device attributes in the core device model, and the attributes in the diagnostic and device management extensions. For example, to request the client ID and the firmware version on the devices, you can use:

.. code:: 

	GET /bulk/devices?typeId='wdl5205'&_fields=clientId,deviceInfo.fwVersion
	
