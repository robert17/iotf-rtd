HTTP(S) Connectivity for Applications
=====================================

The HTTP(S) messaging protocol can be used by devices and applications to interact with the IBM Internet of Things Foundation. This messaging protocol can be used instead of the `MQTT messgaing  protocol <../messaging/mqtt.html>`__ and the `optional client libraries <../libraries/programmingguides.html>`__.

The HTTP(S) protocol can be used with devices and applications to send event messages to the Internet of Things Foundation. For details, please see:

- `Using HTTP(S) with the Internet of Things Foundation <../messaging/HTTPSIntro.html>`__.
- `HTTP(S) Connectivity for Devices <../messaging/HTTPSDevices.html>`__.


Using HTTP(S) with Applications and the Internet of Things Foundation
----------------------------------------------------------------------

The HTTP(S) protocol allows applications to send event messages to the Internet of Things Foundation by sending an HTTP(S) POST request to the following URL:

..code:: 

	<target server: org_id.internetofthings.ibmcloud.com>/api/v0002/application/types/{DeviceType}/devices/{DeviceID}/events/{eventID}

For details, see the relevant `API documentation <https://docs.internetofthings.ibmcloud.com/swagger/v0002.html#/>`__. The request body (event payload) can have any content, however, MQTT message payload guidelines should be followed.

Please Note: An application does not need to be registered before it can issue an HTTP(S) request. When connecting to the Quickstart service, no authentication (or registration) is required, the org_id should be set to "quickstart".


HTTP(S) Authentication
-----------------------

HTTP(S) requests must include an Authorization header if they are sent to organizations that require authentication. Basic authentication the only method supported. The username and password must be provided as described below.

Applications require an API key to connect to an organization. When the API key is registered, a token will be generated that must be used with that API key.

API keys use the following format:

  ``a-org_id-a84ps90Ajs``

The token will follow the format of this example:

  ``MP$08VKz!8rXwnR-Q*``


Username
~~~~~~~~

In an HTTP(S) request, the API key must be used as the username.


Password
~~~~~~~~~

In an HTTP(S) request, the generated token must be used as the password.
