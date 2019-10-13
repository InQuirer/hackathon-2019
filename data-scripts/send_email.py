# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import sys

sender = "hackathon2019-SIS@gmail.com"
subject = 'Automatic report on vulnerabilities'
api_key = "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"
recipient = sys.argv[1]

with open("send_email_body.html") as f:
    email_body = f.read()

message = Mail(
    from_email=sender,
    to_emails=recipient,
    subject=subject,
    html_content=email_body)


def main():
    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        print(response.status_code)
        # print(response.body)
        # print(response.headers)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
