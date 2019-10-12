from time import sleep
import requests
import socket

import send_email
import send_sms

import shodan_data
import hibpwned_data

url = "http://getsec.eu:8000/api/v1/"


def main():

    assets_response = requests.get(url + "assets")
    assets = {}

    scan_assets = False
    if assets_response and "asset" in assets_response.content:
        assets = assets_response.content["asset"]
        scan_assets = True

    while True:
        if scan_assets:
            for asset in assets:
                type = asset["type"]
                if type in [1, 2]:
                    ip = ""
                    if type == 1:
                        ip = asset["asset"]
                    elif type == 2:
                        ip = socket.gethostbyname(asset["asset"])
                    shodan_data.scan_ip("host", ip)
                elif type == 3:
                    hibpwned_data.scan_email(asset["asset"])
        sleep(300)


if __name__ == '__main__':
    main()