from time import sleep
import requests

import shodan_data
import hibpwned_data
import weleak_data

url = "https://getsec.eu/api/v1/"


def main():

    assets_response = requests.get(url + "assets", auth=("admin", "garage48password"))
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
                if type == 3:
                    hibpwned_data.scan_email(asset)
                    sleep(1)
                # weleak_data.scan(asset)
                print()
                sleep(1)
        print("Starting 5 min counter")
        sleep(300)


if __name__ == '__main__':
    main()
