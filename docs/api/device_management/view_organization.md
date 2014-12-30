#View Organization

Retrieve details about an organization.
##Request
GET https://internetofthings.ibmcloud.com/api/v0001/organizations/**org_id**

##Request Body
None

##Response Body
 * id - String
 * name - String
 * created - ISO8601 date string
 * updated - ISO8601 date string

##Example Response
```json
{
  "id": "ey67sp",
  "name": "My Organization",
  "created":"2014-07-04T21:36:05Z",
  "updated":"2014-07-04T21:36:05Z"
}
```

##Common Response Codes
 * 200 (Success)
