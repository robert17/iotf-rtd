========================================================
Introduction to Device Operations and Return Codes
========================================================

The Device Management Protocol defines a set of supported actions. A device management agent can support a subset of the actions, but the Manage device and Unmanage device actions must be supported. A device supporting firmware actions must also support observation.

Actions taken by a device
--------------------------

- Manage device
	This action sets the device as a managed device in the Internet of Things Foundation. Devices can optionally be set to confirm this action regularly.
	
- Unmanage device
	This action reverts a device from managed to unmanaged.
	
- Update device attributes
	This action can be taken to update device-specific information like descriptive location.
	
- Add and clear device diagnostic information
	Devices can add new device-specific diagnostic information, for example, a new error code, log message, or to clear all existing error codes or log messages from the Internet of Things Foundation.

- Notify changes
	Devices must be able to observe changes in specific device attributes and notify the Internet of Things Foundation about changes, if the observation is requested.
	
Actions taken by the Internet of Things Foundation
---------------------------------------------------

- Update device attributes
	Devices should update attributes, such as metadata, location, or device information, upon a request from the Internet of Things Foundation.
	
- Observe device attributes
	This action requests devices to respond with changes in one or more attributes.
	
- Cancel observation
	This action requests the device to stop observing changes in one or more attributes.
	
- Initiate an action
	This action requests the device to initiate one of the following actions: reboot, factory reset, download firmware, or update firmware.
	
+-------------+----------------------+------------------------+------------------------+
| Originator  | Type                 | Action                 | Device Support         |
+=============+======================+========================+========================+
| Device      | Management           | Manage device          | Required               |
+             +----------------------+------------------------+------------------------+
|             | Management           | Unmanage device        | Required               |
+             +----------------------+------------------------+------------------------+
|             | Set device attribute | Update location        | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Device diagnostics   | Add an error code      | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Device diagnostics   | Clear an error code    | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Device diagnostics   | Add a log entry        | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Device diagnostics   | Clear log entries      | Optional               |
+-------------+----------------------+------------------------+------------------------+
| Internet of | Observation          | Notify                 | Optional, required     |
| of Things   |                      |                        | for devices supporting |
| Foundation  |                      |                        | firmware update        |
+             +----------------------+------------------------+------------------------+
|             | Observation          | Observe changes        | Optional, required for |
|             |                      |                        | devices supporting     |
|             |                      |                        | firmware update        |
+             +----------------------+------------------------+------------------------+
|             | Observation          | Cancel observation     | Optional, required for |
|             |                      |                        | devices supporting     |
|             |                      |                        | firmware update        |
+             +----------------------+------------------------+------------------------+
|             | Set device attribute | Update device          | Optional               |
|             |                      | attribute              |                        |
+             +----------------------+------------------------+------------------------+
|             | Device action        | Initiate reboot        | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Device action        | Initiate factory reset | Optional               |
+             +----------------------+------------------------+------------------------+
|             | Firmware action      | Initiate firmware      | Optional               |
|             |                      | download               |                        |
+             +----------------------+------------------------+------------------------+
|             | Firmware action      | Initiate firmware      | Optional               |
|             |                      | update                 |                        |
+-------------+----------------------+------------------------+------------------------+


Return Codes
-------------

There are seven return codes which are sent in response to the actions listed above.

- 200: Operation succeeded
- 202: Accepted (for initiating commands)
- 204: Changed (for attribute updates)
- 400: Bad request, for example, if a device is not in the appropriate state for this command
- 404: Attribute was not found
- 409: Resource could not be updated due to a conflict, for example, the resource is being updated by two simultaneous requests, so update could be retried later
- 500: Unexpected device error
- 501: Operation not implemented
