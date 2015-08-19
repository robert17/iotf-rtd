==================
Device API v0002
==================

This API represents the newest version of the API for the Internet of Things Foundation. This API gives users the functionality to perform organizational operations, and interact with devices, device types, and device metadata, such as diagnostic logs, error codes and location.

------------------
View Organization
------------------

Description
~~~~~~~~~~~~

This API call is used to retrieve organization details. The following example response shows the fields returned.

Security
~~~~~~~~~

API key. Check me.

Request
~~~~~~~~~

GET org_id.internetofthings.ibmcloud.com/api/v0002/

Request Body
~~~~~~~~~~~~~

None.

Responses
~~~~~~~~~~

Response Body
~~~~~~~~~~~~~~

- id - String - Organization ID
- name - String - User assigned name for the organization
- enabled - boolean - Whether the organization is enabled. If the organization is disabled all API calls will be rejected and messaging will be disabled across all devices and applications.
- type - String - Must be one of the following values "Bluemix Free" "Bluemix Bronze" "Bluemix Silver" "Bluemix Gold" "Pending" "Trial" "Bronze" "Silver" "Gold" "Subscription"
- bluemix - Only present if the organization was provisioned via Bluemix.
      - region - String - The name of the Bluemix region this organization was provisioned in.
      - organizationGuid - String - The GUID of the associated organization in Bluemix.
      - serviceInstanceGuid - String - The GUID of the associated service instance in Bluemix.
      - spaceGuid - String - The GUID of the associated space in Bluemix.
      - planId - String - The ID of the pricing plan selected for this organization.
- config - The overall configuration of the organization.
    - historian - Configuration of the historian service for this organization.
        - enabled - Boolean - Enable or disable the historian service.
        - retention - Number - Number of months to retain data for; a retention of 0 retains data forever.
- created - ISO8601 date string
- updated - ISO8601 date string

Example Response and Response Codes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

200 Response - Success

.. code::

  {
    id: "ab8de4"
    name: "My organization"
    enabled: true
    type: "Bluemix Free"
    bluemix:
      region: "us-south"
      organizationGuid: "025273cb-d3c5-4204-9fef-ad5f84c2af02"
      serviceInstanceGuid: "90d13f02-152c-4cd7-b23e-aaae87b2f338"
      spaceGuid: "6d0535f9-9f15-48f3-8b67-43f59a3a5c65" 
      planId: "iotf-service-bronze-id"
    config: 
      historian:
        enabled: true
        retention: 1
    created: "2015-04-08T11:23:23+00:00"
    updated: "2015-04-08T11:23:23+00:00"
  }

401 - The authentication token is empty or invalid

403 - The authentication method is invalid or the API key used does not exist

404 - The organization does not exist

500- '#/responses/UnexpectedError'
