# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import sys

# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'ACb7b5cdfef14e61b707ea966cbfa5e696'
auth_token = 'fd0cd017f4306908652d2ef992991377'
client = Client(account_sid, auth_token)
recipient = sys.argv[1]
body = sys.argv[2]

message = client.messages.create(
    from_="+12056199625",
    to=recipient,
    body=body
)

print(message.sid)
