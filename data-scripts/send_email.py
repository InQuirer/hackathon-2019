# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import sys

sender = "hackathon2019-SIS@gmail.com"
subject = 'Automatic report on vulnerabilities'
api_key = "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"
recipient = ""
message = ""

empty_email_data = {
    "subject": "empty subject",
    "body": "empty body"
}

with open("send_email_body.html") as f:
    email_body = f.read()


def set_recipient_data(recip: str = "", data: dict = empty_email_data):
    global message, recipient
    recipient = recip
    message = Mail(
        from_email=sender,
        to_emails=recipient,
        subject=data["subject"],
        html_content=data["body"])


def main():
    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        print(response.status_code)
        # print(response.body)
        # print(response.headers)
        return response.__bool__()
    except Exception as e:
        print(e)


def send_email(recipient: str, data: dict = empty_email_data):
    set_recipient_data(recipient, data)
    return main()


if __name__ == "__main__":
    set_recipient_data(sys.argv[1])
    main()
