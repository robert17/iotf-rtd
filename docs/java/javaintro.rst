Java Client Library - Introduction
============================================


Use the Java client library for interacting with the `IBM Internet of Things Foundation <https://internetofthings.ibmcloud.com>`__ and to automate commands using Java 7 or Java 8. The client library can be used to simplify interactions with the IBM Internet of Things Foundation. The following libraries contain instructions and guidance on using the java ibmiotf client library to interact with devices and applications within your organizations.

-  `Java 7 <http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html>`__
-  `Java 8 <https://java.com/en/download/>`__

This client library is divided into three sections, all included within the library.  

-  The Devices section contains information on how devices publish events and handle commands using the Java ibmiotf Client Library. 
-  The Managed Device section contains information on how devices can connect to the Internet of Things Foundation Device Management service using Java ibmiotf Client Library and perform device management operations like firmware update, location update, and diagnostics update.
-  The Applications section contains information on how applications can use the Java ibmiotf Client Library to interact with devices. 

Dependencies
-------------------------------------------------------------------------------

-  `Paho MQTT Java Client <http://git.eclipse.org/c/paho/org.eclipse.paho.mqtt.java.git/>`__   - provides a client class which enable applications to connect to an MQTT broker
-  `google-gson <https://code.google.com/p/google-gson/>`__   - library for interacting with JSON objects
-  `Apache Commons Logging <http://commons.apache.org/proper/commons-logging/download_logging.cgi>`__   - library for logging various informations
-  `Apache Commons Codec <https://commons.apache.org/proper/commons-codec/download_codec.cgi>`__  - provides common encoder and decoder functionalities such as Base64
-  `Apache Commons Lang <https://commons.apache.org/proper/commons-lang/download_lang.cgi>`__ - provides methods for manipulating core Java classes
-  `Apache Ant <http://ant.apache.org/>`__   - build tool for automated builds
-  `Apache HttpClient <https://hc.apache.org/downloads.cgi>`__   - A HTTP Client library
-  `Apache HttpCore <https://hc.apache.org/downloads.cgi>`__   - A HTTP Core library
-  `Joda-Time <http://www.joda.org/joda-time/download.html>`__ - The date and time library for Java 

----



Documentation
-------------
* `Device Client <../java/java_cli_devices.html>`__
* `Managed Device <../java/java_deviceManagement.html>`__
* `Application Client <https://github.com/ibm-messaging/iot-java/blob/master/samples/iotfdeviceclient/java_cli_for_applications.rst>`__ 
