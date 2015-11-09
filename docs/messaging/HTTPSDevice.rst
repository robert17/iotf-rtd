HTTP(S) Connectivity for Devices
=================================

The HTTP(S) messaging protocol can be used by devices and applications to interact with the  IBM Internet of Things Foundation. This messaging protocol can be used instead of the `MQTT messaging  protocol <../messaging/mqtt.html>`__ and the `optional client libraries <../libraries/programmingguides.html>`__.

All devices can use HTTP(S) messaging to communicate with the Internet of Things Foundation with no additional installation.

The HTTP(S) protocol can be used with devices and applications to send event messages to the Internet of Things Foundation. For details, please see:

- `Using HTTP(S) with the Internet of Things Foundation <../messaging/HTTPSIntro.html>`__.
- `HTTP(S) Connectivity for Applications <../messaging/HTTPSApplications.html>`__.


Using HTTP(S) with Devices and the Internet of Things Foundation
------------------------------------------------------------------

The HTTP(S) protocol allows devices to send event messages to the Internet of Things Foundation by sending an HTTP(S) POST request to the following URL:

.. code::

	<target server: org_id.internetofthings.ibmcloud.com>/api/v0002/device/types/{DeviceType}/devices/{DeviceID}/events/{eventID}

The request body (event payload) can have any content, however, MQTT message payload guidelines should be followed.

A Content-Type request header must be provided with the request. Only the following values are supported. The following table shows how they are mapped to the Internet of Things Foundation internal formats.

+----------------------------+-----------------------+
| Content-Type Header Volume | IoT Foundation Format |
+============================+=======================+
| text/plain                 | text                  |
+----------------------------+-----------------------+
| application/json           | json                  |
+----------------------------+-----------------------+
| application/xml            | xml                   |
+----------------------------+-----------------------+
| application/octet-stream   | bin                   |
+----------------------------+-----------------------+

Please Note: Devices must be registered before issuing an HTTP(S) request, and when connecting to the Quickstart service no authentication or registration is required, and the org_id should be set to "quickstart".


HTTP(S) Authentication
-----------------------

HTTP(S) requests must include an Authorization header if they are sent to registered organizations. Basic authentication is the only method supported. The username and password must be provided as described below.


Username
~~~~~~~~~

The service currently supports only token-based authentication for devices. The username must be set to ``use-token-auth``. This username indicates to the service that the authentication token for the device will be passed as the password for the HTTP(S) request.


Password
~~~~~~~~~

Submit the device authentication token as the password when issuing your HTTP(S) request.
