===============================================================================
Device Management Operations - Manage
===============================================================================

The two device management actions are Manage and Unmanage. Both of these operations are mandatory for managed devices.

.. _manage-manage:

Manage Device
-------------

A device uses this request to become a managed device. It should be the first device management request sent by the device after connecting to the Internet of Things Foundation. It would be usual for a device management agent to send this whenever it starts or restarts. 

Topic
~~~~~~

.. code:: 

	iotdevice-1/mgmt/manage


Message Format
~~~~~~~~~~~~~~~~

For the request, the ``d`` field and all of its sub-fields are optional. The ``metadata`` and ``deviceInfo`` field values replace the corresponding attributes for the sending device if they are sent.

The optional ``lifetime`` field specifies the length of time in seconds within which the device must send another 'Manage device' request in order to avoid being reverted to an unmanaged device and marked as dormant. If omitted or if set to ``0``, the managed device will not become dormant.  When set, the minimum supported setting is ``3600`` (1 hour).

Optional ``supports.deviceActions`` and ``supports.firmwareActions`` indicate the capabilities of the device management agent. If ``supports.deviceActions`` is set, the agent supports Reboot and Factory Reset actions. For a device that does not distinguish between rebooting and factory reset, it is acceptable to use the same behaviour for both actions. If ``supports.firmwareActions`` is set, the agent supports Firmware Download and Firmware Update actions.

Request Format:

.. code:: 

	{
		"d": {
			"metadata":{},
			"lifetime": number,
			"supports": {
				"deviceActions": boolean,
				"firmwareActions": boolean
			},
			"deviceInfo": {
				"serialNumber": "string",
				"manufacturer": "string",
				"model": "string",
				"deviceClass": "string",
				"description" :"string",
				"fwVersion": "string",
				"hwVersion": "string",
				"descriptiveLocation": "string"
			}
		},
		"reqId": "string"
	}


Response Format:

.. code::

	{
		"rc": 200,
		"reqId": "string"
	}


.. _manage-unmanage:

Unmanage Device
---------------

A device uses this request when it no longer needs to be managed. The Internet of Things Foundation will no longer send new device management requests to this device and all device management requests from this device will be rejected other than a 'Manage device' request.

Topic
~~~~~~

.. code::

	iotdevice-1/mgmt/unmanage
	
Message Format
~~~~~~~~~~~~~~~

Request Format:

.. code::

	{
		"reqId": "string"
	}
	
Response Format:

.. code:: 

	{
		"rc": 200,
		"reqId": "string"
	}
	
