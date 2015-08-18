===============================================================================
Historical Event API
===============================================================================

-------------------------------------------------------------------------------
Authentication
-------------------------------------------------------------------------------

The API is only accessible over HTTPS and is protected by HTTP Basic 
Authentication. You must provide a username and password with every request.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Username
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A valid API key registered to the organization you want to work with.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The authentication token corresponding to your API key. 


----


-------------------------------------------------------------------------------
View all events
-------------------------------------------------------------------------------

View events across all devices registered to the organization

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET **org\_id**.internetofthings.ibmcloud.com/api/v0001/historian/

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- cursorId

  - Use the cursorId response header returned by the initial request to 
    iterate through the list of historical records

- Cookie

  - Required when setting the cursorId header. Use the iotHistorianSessionId 
    cookie returned by the initial request

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
None

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Query Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- evt_type - String
 
  - Restrict results only to those events published under this event identifier

- start	- Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  - Restrict results to events published after this date

- end - Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  -  Restrict results to events published before this date


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- cursorId: use the cursorId response header returned by the initial request to 
  iterate through the list of historical records
- Set-Cookie: iotHistorianSessionId

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list of historical data records sorted by timestamp in descending order

- device_id (String)
- device_type (String)
- evt_type (String)
- timestamp (Date)
- evt (Complex object)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Example Response
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: json

    [
        {
            "device_id":"d:ey67sp:my-device-type:device0001",
            "device_type":"my-device-type",
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        },
        {
            "device_id":"d:ey67sp:my-device-type:device0002",
            "device_type":"my-device-type",
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        }
    ]

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Common Response Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 200 (success)


----


-------------------------------------------------------------------------------
View events for a device type
-------------------------------------------------------------------------------

View events across all devices of a specific type

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET **org\_id**.internetofthings.ibmcloud.com/api/v0001/historian/**device_type**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- cursorId

  - Use the cursorId response header returned by the initial request to 
    iterate through the list of historical records

- Cookie

  - Required when setting the cursorId header. Use the iotHistorianSessionId 
    cookie returned by the initial request

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
None

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Query Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- evt_type - String

  - Restrict results only to those events published under this event identifier

- start	- Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  - Restrict results to events published after this date

- end - Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  - Restrict results to events published before this date

- top - Number between 1 and 100

  - Restrict the number of records returned (default=100)

- summarize - Array

  - A list of fields from the JSON event payload on which to perform the aggregate 
    function specified by the summarize_type parameter.  The format for the parameter 
    is {field1,field2,...,fieldN}

- summarize_type	- String

  - The aggregation to perform on the fields specified by the summarize parameter:

    - avg (default)
    - count
    - min
    - max
    - sum
    - range
    - stdev
    - variance
	
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- cursorId: use the cursorId response header returned by the initial request to 
  iterate through the list of historical records
- Set-Cookie: iotHistorianSessionId

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list of historical data records sorted by timestamp in descending order

- device_id (String)
- evt_type (String)
- timestamp (Date)
- evt (Complex object)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Example Response
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: json

    [
        {
            "device_id":"d:ey67sp:my-device-type:device0001",
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        },
        {
            "device_id":"d:ey67sp:my-device-type:device0002",
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        }
    ]


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Common Response Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 200 (success)


----


-------------------------------------------------------------------------------
View events for a device
-------------------------------------------------------------------------------

View events for a specific device

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GET **org\_id**.internetofthings.ibmcloud.com/api/v0001/historian/**device_type**/**device_id**

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- cursorId

  - Use the cursorId response header returned by the initial request to 
    iterate through the list of historical records

- Cookie

  - Required when setting the cursorId header. Use the iotHistorianSessionId 
    cookie returned by the initial request

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
None

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Query Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- evt_type - String

  - Restrict results only to those events published under this event identifier

- start	- Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  - Restrict results to events published after this date

- end - Number of milliseconds since January 1, 1970, 00:00:00 GMT)

  - Restrict results to events published before this date

- top - Number between 1 and 100

  - Restrict the number of records returned (default=100).

- summarize - Array

  - A list of fields from the JSON event payload on which to perform the aggregate 
    function specified by the summarize_type parameter.  The format for the parameter 
    is {field1,field2,...,fieldN}

- summarize_type	- String

  - The aggregation to perform on the fields specified by the summarize parameter:

    - avg (default)
    - count
    - min
    - max
    - sum
    - range
    - stdev
    - variance

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Headers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- cursorId: use the cursorId response header returned by the initial request to 
  iterate through the list of historical records
- Set-Cookie: iotHistorianSessionId

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Response Body
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Returns a list of historical data records sorted by timestamp in descending order

- evt_type (String)
- timestamp (Date)
- evt (Complex object)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Example Response
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: json

    [
        {
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        },
        {
            "evt_type":"sensor-event",
            "timestamp":{"$date":1407103315000},
            "evt":{"sensor1":76,"sensor2":0,"sensor3":79.98}
        }
    ]


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Common Response Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 200 (success)

