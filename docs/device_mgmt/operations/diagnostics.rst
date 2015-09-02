===============================================================================
Device Management Operations - Diagnostics
===============================================================================

The device diagnostics operations are intended to provide information on device errors, and does not provide diagnostic information relating to the devices connection to the Internet of Things Foundation.

.. _diag-add-error-code:

Add Error Code
--------------

Devices can choose to notify the Internet of Things Foundation device management server about changes in their error status.

Topic
~~~~~~~

.. code:: 

	iotdevice-1/add/diag/errorCodes

Message Format
~~~~~~~~~~~~~~~

The "errorCode" is a current device error code that needs to be added to the Internet of Things Foundation.

Request Format:

.. code:: 

	{
		"d": {
			"errorCode": number
		},
		"reqId": "string"
	}


Response Format:

.. code::

	{
		"rc": 200,
		"reqId": "string"
	}

.. _diag-clear-error-codes:

Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: THe topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.


Clear Error Codes
-----------------

Devices can request that the Internet of Things Foundation clear all of their error codes.

Topic
~~~~~~

.. code::

	iotdevice-1/clear/diag/errorCodes

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


.. _diag-add-log:

Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: THe topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.


Add Log
-------

Devices can choose to notify IoTF device management support about changes a new log entry. Log entry includes a log messages, its timestamp and severity, as well as an optional base64-encoded binary diagnostic data.

Topic
~~~~~~~

.. code:: 

	iotdevice-1/add/diag/log

Message Format
~~~~~~~~~~~~~~~

"message" is a diagnostic message that needs to be added to IoTF.
"timestamp" is a date and time of the log entry in ISO8601 format.
"data" is an optional base64-encoded diagnostic data.
"severity" is a severity of the message (0: informational, 1: warning, 2: error).

Request Format:

.. code:: 

	{
		"d": {
			"message": string,
			"timestamp": string,
			"data": string,
			"severity": number
		},
		"reqId": "string"
	}


Response Format:

.. code::

	{
		"rc": 200,
		"reqId": "string"
	}

.. _diag-clear-logs:

Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: THe topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.


Clear Logs
----------

Devices can request that the Internet of Things Foundation clear all of their log entries.

Topic
~~~~~~

.. code::

	iotdevice-1/clear/diag/log

Message format
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

Possible Response Codes:
~~~~~~~~~~~~~~~~~~~~~~~~

- 200: The operation was successful.
- 400: The input message does not match the expected format, or one of the values is out of the valid range.
- 404: THe topic name is incorrect, or the device is not in the database.
- 409: A conflict occurred during the device database update. To resolve this, simplify the operation is necessary.
