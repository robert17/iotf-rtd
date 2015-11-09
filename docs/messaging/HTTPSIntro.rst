HTTP(S) Connectivity with the Internet of Things Foundation
============================================================

The HTTP(S) messaging protocol can be used by devices and applications to interact with the  IBM Internet of Things Foundation. This messaging protocol can be used instead of the `MQTT messgaing protocol <../messaging/mqtt.html>`__ and the `optional client libraries <../libraries/programmingguides.html>`__.

All devices can use HTTP(S) messaging to communicate with the Internet of Things Foundation with no additional installation.

The HTTP(S) protocol can be used with devices and applications to send event messages to the Internet of Things Foundation. For details, please see:

- `HTTP(S) Connectivity for Devices <../messaging/HTTPSDevice.html>`__.
- `HTTP(S) Connectivity for Applications <../messaging/HTTPSApplications.html>`__.

Please Note: Devices and applications cannot use the HTTP(S) protocol to issue commands.


HTTP(S) Request
----------------

HTTP(S) requests for applications and devices must be issued to the originating organization's unique endpoint. The organization endpoint uses the following format:

.. code:: 

  org_id.internetofthings.ibmcloud.com

Only HTTPS can be used with registered organizations. When using HTTPS with a registered organization, the data, including the issuer's credentials are encrypted. HTTP is supported in the Quickstart environment only.


Quality of Service
------------------------

The HTTP(S) protocol provides "at most once" best effort delivery, analagous to the QoS0 quality of service provided by the MQTT protocol. When using QoS0, or the HTTP(S) equivalent, to deliver event messages, the device or application must implement retry logic to guarantee delivery.

For more information on the MQTT protocol and Quality of Service levels, please see `MQTT for the Internet of Things Foundation <../messaging/mqtt.html>`__ documentation.
