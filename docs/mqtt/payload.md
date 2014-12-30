# Support
The Foundation supports sending and recieving messages in any format, however we recommend the use of JSON and 
the IOTF event format specification.

# IOTF JSON Payload Specification
It is simple to create a JSON message that meets the IOTF specification.  The message must be a valid JSON object with only 
two top level elements:  **d** and **ts**

### Data
The **d** element is where you include all data for the event (or command) being transmitted in the message.  This element is required for your message to meet 
the IOTF message specification, in the case where you wish to send no data the **d** element should still be present, but contain an empty object.

####Example 1 - Simple Data
```json
{
  "d": {"msg": "Hello World"}
}
```


####Example 2 - Complex data
```json
{
  "d": {
    "host": "IBM700-R9E683D", 
    "mem": 54.9, 
    "network": {
      "up": 1.22, 
      "down": 0.55
    },
    "cpu": 1.3, 
  }
}
```

####Example 3 - No data
```json
{
  "d": {}
}
```


### Timestamp
The **ts** element allows you to assoicate a timestamp with the event (or command).  This is an optional element, if included it's value should be a valid ISO8601 encoded timestamp.

```json
{
  "d": {
    "host": "IBM700-R9E683D", 
    "mem": 54.9, 
    "network": {
      "up": 1.22, 
      "down": 0.55
    },
    "cpu": 1.3, 
  },
  "ts": "2014-12-30T14:47:36+00:00"
}
```


