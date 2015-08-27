=====================================================
Introduction to the Internet of Things Foundation API
=====================================================

The Internet of Things Foundation API can be used to interact with your organization in the Internet of Things Foundation. The IoT Foundation API supports the following tasks:

- View organization details.
- Bulk device operations (list all, add, remove).
- Device type operations (list all, create, delete, view details, update).
- Device operations (list devices, add, remove, view details, update, view location, view management information).
- Device diagnostic operations (clear log, retrieve logs, add log information, delete logs, get specific log, clear error codes, get device error codes, add an error code).
- Connection problem determination (list device connection log events).
- Historical event retrieval (view events from all devices, view events from a device type, view events for a specific device).
- Device management request operations (list device management requests, initiate a request, clear request status, get details of a request, get list of request statuses,  get device request status for a specific device).
- Usage management (retrieve number of active devices over a period of time, retrieve amount of storage used by historical event data, retrieve total amount of data used).
- Service status queries (retrieve service statuses for an organization).

The current version of the Internet of Things Foundation API is version 2. The details of the version 2 API operations can be found `here <http://>`_.

Version 1 of the API is still supported, however, some of the operations cannot be performed using version 1 of the API and others are performed using different API paths.

Restrictions of version 1 of the IoT Foundation API:

- Many of the API paths operations relating to devices have changed.
- Version 1 of the API does not support any device type operations, other than listing all device types.
- Operations related to device management, device management requests, diagnostic logs, or location cannot be performed using version 1 of the API.

The documentation for the operations supported by version 1 of the API can be found `here <http://.com>`_.
