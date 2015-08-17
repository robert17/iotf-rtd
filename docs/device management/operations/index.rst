============================
Device Management Operations
============================

The Device Management Protocol defines a set of supported operations. A device management agent can support a subset of the operations, but the Manage device and Unmanage device operations must be supported. A device supporting firmware action operations must also support observation.

Device Initiated
----------------

Thesre operations are initiated by the device, manage and unmanage operations must be supported by all managed devices.  All other operations are optional. 


Management Operations
~~~~~~~~~~~~~~~~~~~~~

This action sets the device as a managed device in the Internet of Things Foundation. Devices can optionally be set to confirm this action regularly.

+------------------------+------------------------+
| Operation              | Device Support         |
+========================+========================+
| Manage device          | Required               |
+------------------------+------------------------+
| Unmanage device        | Required               |
+------------------------+------------------------+

	
Device Property Changes
~~~~~~~~~~~~~~~~~~~~~~~

These optional operations, if implemented allow the device to submit updated device-specific information to the service.

+------------------------+------------------------+
| Action                 | Device Support         |
+========================+========================+
| Update location        | Optional               |
+------------------------+------------------------+
| Notify                 | Optional, required     |
|                        | for devices supporting |
|                        | firmware update        |
+------------------------+------------------------+


Add and Clear Diagnostic Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Devices can add new device-specific diagnostic information, for example, a new error code, log message, or to clear all existing error codes or log messages from the Internet of Things Foundation.

+------------------------+------------------------+
| Action                 | Device Support         |
+========================+========================+
| Add an error code      | Optional               |
+------------------------+------------------------+
| Clear an error code    | Optional               |
+------------------------+------------------------+
| Add a log entry        | Optional               |
+------------------------+------------------------+
| Clear log entries      | Optional               |
+------------------------+------------------------+

	
Service Initiated
-----------------

These operations are initiated by the Internet of Things Foundation, a managed device does not need to support handling any of these operations.


Update Attributes
~~~~~~~~~~~~~~~~~
Devices should update attributes, such as metadata, location, or device information, upon a request from the Internet of Things Foundation.

+------------------------+------------------------+
| Operation              | Device Support         |
+========================+========================+
| Update attribute       | Optional               |
+------------------------+------------------------+


Attribute Observations
~~~~~~~~~~~~~~~~~~~~~~
These actions request devices to notify (or stop notifying) the service to changes in one or more attributes on the device.

+------------------------+------------------------+
| Operation              | Device Support         |
+========================+========================+
| Observe changes        | Optional, required for |
|                        | devices supporting     |
|                        | firmware update        |
+------------------------+------------------------+
| Cancel observation     | Optional, required for |
|                        | devices supporting     |
|                        | firmware update        |
+------------------------+------------------------+


Initiate an action
~~~~~~~~~~~~~~~~~~

This action requests the device to initiate one of the following actions: reboot, factory reset, download firmware, or update firmware.

+----------------------+------------------------+------------------------+
| Type                 | Operation              | Device Support         |
+======================+========================+========================+
| Device action        | Initiate reboot        | Optional               |
+----------------------+------------------------+------------------------+
| Device action        | Initiate factory reset | Optional               |
+----------------------+------------------------+------------------------+
| Firmware action      | Initiate firmware      | Optional               |
|                      | download               |                        |
+----------------------+------------------------+------------------------+
| Firmware action      | Initiate firmware      | Optional               |
|                      | update                 |                        |
+----------------------+------------------------+------------------------+


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
