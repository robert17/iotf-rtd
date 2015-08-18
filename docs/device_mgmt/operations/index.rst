============================
Device Management Operations
============================

The Device Management Protocol defines a set of supported operations. A device management agent can support a subset of the operations, but the Manage device and Unmanage device operations must be supported. A device supporting firmware action operations must also support observation.

Device Initiated
----------------

These operations are initiated by the device, manage and unmanage operations must be supported by all managed devices.  All other operations are optional. 


Management Operations
~~~~~~~~~~~~~~~~~~~~~

These operations control whether device management features are enabled for the device.

+------------------------+------------------------+
| Operation              | Device Support         |
+========================+========================+
| :ref:`manage-manage`   | Required               |
+------------------------+------------------------+
| :ref:`manage-unmanage` | Required               |
+------------------------+------------------------+

	
Device Property Changes
~~~~~~~~~~~~~~~~~~~~~~~

These optional operations, if implemented, allow the device to submit updated device-specific information to the service.

+----------------------------+------------------------+
| Operation                  | Device Support         |
+============================+========================+
| :ref:`update-location`     | Optional               |
+----------------------------+------------------------+
| :ref:`observations-notify` | Optional, required     |
|                            | for devices supporting |
|                            | firmware update        |
+----------------------------+------------------------+


Add and Clear Diagnostic Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Devices can add new device-specific diagnostic information, for example, a new error code, log message, or to clear all existing error codes or log messages from the Internet of Things Foundation.

+-------------------------------+------------------------+
| Operation                     | Device Support         |
+===============================+========================+
| :ref:`diag-add-error-code`    | Optional               |
+-------------------------------+------------------------+
| :ref:`diag-clear-error-codes` | Optional               |
+-------------------------------+------------------------+
| :ref:`diag-add-log`           | Optional               |
+-------------------------------+------------------------+
| :ref:`diag-clear-logs`        | Optional               |
+-------------------------------+------------------------+

	
Service Initiated
-----------------

These operations are initiated by the Internet of Things Foundation, a managed device does not need to support handling any of these operations.


Update Attributes
~~~~~~~~~~~~~~~~~
Devices should update attributes, such as metadata, location, or device information, upon a request from the Internet of Things Foundation.

+--------------------------+------------------------+
| Operation                | Device Support         |
+==========================+========================+
| :ref:`update-attributes` | Optional               |
+--------------------------+------------------------+


Attribute Observations
~~~~~~~~~~~~~~~~~~~~~~
These actions request devices to notify (or stop notifying) the service to changes in one or more attributes on the device.

+------------------------------+------------------------+
| Operation                    | Device Support         |
+==============================+========================+
| :ref:`observations-observe`  | Optional, required for |
|                              | devices supporting     |
|                              | firmware update        |
+------------------------------+------------------------+
| :ref:`observations-cancel`   | Optional, required for |
|                              | devices supporting     |
|                              | firmware update        |
+------------------------------+------------------------+


Initiate an action
~~~~~~~~~~~~~~~~~~

This action requests the device to initiate one of the following actions: reboot, factory reset, download firmware, or update firmware.

+----------------------+-------------------------------------------------+------------------------+
| Type                 | Operation                                       | Device Support         |
+======================+=================================================+========================+
| Device action        | :ref:`device-actions-reboot`                    | Optional               |
+----------------------+-------------------------------------------------+------------------------+
| Device action        | :ref:`device-actions-factory-reset`             | Optional               |
+----------------------+-------------------------------------------------+------------------------+
| Firmware action      | :ref:`firmware-actions-download`                | Optional               |
+----------------------+-------------------------------------------------+------------------------+
| Firmware action      | :ref:`firmware-actions-update`                  | Optional               |
+----------------------+-------------------------------------------------+------------------------+


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
