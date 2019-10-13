from time import sleep
import requests

import shodan_data
import hibpwned_data

url = "http://getsec.eu:8000/api/v1/"


def main():

    assets_response = requests.get(url + "assets", auth=("admin", "viensviens"))
    assets = []

    scan_assets = False
    if assets_response:
        assets = assets_response.json()
        scan_assets = True

    while True:
        if scan_assets:
            for asset in assets:
                print(f"asset: {asset}")
                type = asset["type"]
                if type in [1, 2]:
                    shodan_data.scan_ip("host", asset)
                elif type == 3:
                    hibpwned_data.scan_email(asset)
                    sleep(1)
                print()
                sleep(0.5)
        print("Starting 5 min counter")
        sleep(300)


if __name__ == '__main__':
    main()