===============================================================================
Concepts
===============================================================================

Organizations
-------------------------------------------------------------------------------
When you reigster with the Internet of Things Foundation you are given an 
organization ID, this is a unique 6 character identifier for your account.

**Organizations** ensure your data is only accessible from your devices and 
applications.  Once registered devices and API keys are bound to a single 
organization.  When an application connects to the service using an API key it
registers with the organization that "owns" the API key.

For your security it is impossible for cross-organization communication within the
Internet of Things Foundation eco-system, intentional or otherwise.  The only way 
to transmit data between two organizations it to explicitly create 
two applications, one within each organization, that communicate with each other to
act as a relay between the organizations.


Devices
-------------------------------------------------------------------------------
* A device can be anything that has a connection to the internet and has data it
  wants to get into the cloud.  
* A device is not able to directly interact with other devices.  
* Devices are able to accept commands from applications.
* Devices uniquely identify themselves to the IoT Foundation with an authentication
  token that will only be accepted for that device.
* Devices must be registered before they can connect to the IoT Foundation


Applications
-------------------------------------------------------------------------------
* An application is anything that has a connection to the internet and wants to 
  interact with data from devices and/or control the behaviour of those devices in
  some manner.
* Applications identify themselves to the IoT Foundation with an API key and a 
  unique application ID.
* Applications do not need to be registered before they can connect to the IoT 
  Foundation, however they must present a valid API key that has previously
  been registered.


Events
-------------------------------------------------------------------------------
Events are the mechanism by which **devices** publish data to the Internet of 
Things Foundation.  The device controls the content of the event and 
assigns a name for each event it sends.  

When an event is received by the IOT Foundation the credentials 
of the connection on which the event was receieved are used to determine which 
device the event was sent from.  With this architecture it is impossible for a 
device to impersonate another device.

**Devices** are unable to receive events, regardless of whether they are it's own 
events or those of another device.

**Applications** are able to process events from devices in real time.  When an 
application receieves an event it has visibility of the source of the event and
the data contained in that event.  Applications can be configured to subscribe 
to all events from all devices, a subset of events, a subset of devices or a 
combination of the two.


Commands
-------------------------------------------------------------------------------
**Commands** are the mechanism by which **applications** can communicate with 
**devices**.  Only applications can send commands, which must be issued to specific 
devices. 

The device must determines which action to take on receipt of any given command, 
and even controls which commands it will subscribe to in the first place.  It is 
possible to design your device that it will listen for any command, or to simply 
subscribe to a set of specific commands.

