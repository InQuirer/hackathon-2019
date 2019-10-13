import requests

api_key = "11f4b8ac5f9924d0e082d00c5b44228f3e3b7740"
hed = {
    'Authorization': 'Bearer ' + api_key,
    "User-Agent": "Hackathon 2019 SIS, getsec.eu",
    "Content-Type": "application/x-www-form-urlencoded"
}
url = "https://api.weleakinfo.com/v3/search"

types = {
    1: "ip",
    2: "domain_name",
    3: "email"
}


def scan(asset: dict):
    global weleak_search, api_key

    type = types[int(asset["type"])]
    data = {

    }
    response = requests.post(url, json=data, headers=hed)
