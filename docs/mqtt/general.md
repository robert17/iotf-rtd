#MQTT
The primary mechanism that devices and applications use to communicate with the IBM Internet of Things 
Foundation is MQTT; this is a protocol designed for the efficient exchange of real-time data with sensor 
and mobile devices.

MQTT runs over TCP/IP and, while it is possible to code directly to TCP/IP, you might prefer to use a
library that handles the details of the MQTT protocol for you. You will find there’s a wide range of 
MQTT client libraries available at http://mqtt.org/wiki/doku.php/libraries, with the best place to start 
looking being the Eclipse Paho project - http://eclipse.org/paho/. IBM contributes to the development and 
support of many of these libraries.

MQTT version 3.1 is the version of the protocol that is in widest use today. Version 3.1.1 contains a 
number of minor enhancements, and is currently a Candidate OASIS Standard (ratification by the OASIS 
standards development organization is expected later this year). The IBM Internet of Things Foundation 
offers informal support for version 3.1.1 now, with formal support to follow ratification.

One reason for using version 3.1.1 is that the maximum length of the MQTT Client Identifier (ClientId) is 
increased from the 23 character limit imposed by 3.1. The IoT service will often require longer ClientId’s 
and will accept long ClientId’s with either version of the protocol however some 3.1 client libraries 
check the ClientId and enforce the 23 character limit.

##Insecure MQTT client connection
Your client should connect to org_id.messaging.internetofthings.ibmcloud.com on port 1883.  Note that all 
information your device submits is being sent in plain text (this includes the credentials for your device).  
Outside of development and testing we do not recommend using an insecure connection.

##Secure MQTT client connection
Your client should connect to org_id.messaging.internetofthings.ibmcloud.com on port 8883.  The Foundation only 
supports TLS v1.2.  Please ensure your client library also supports this version of TLS.  Here, all communication to 
the service is encrypted. 
