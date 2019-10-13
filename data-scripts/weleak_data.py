import requests

api_key = "f69cec9752631e509dcd19744df8dab3a2d33731"
headers = {
    'user-agent': "Hackathon2019-SIS",
    'authorization': api_key
}
querystring = {"details": "true"}

types = {
    1: "ip",
    2: "domain",
    3: "email"
}


def scan(asset: dict):

    type = types[int(asset["type"])]
    print(f"asset type: {type}")
    url = f"https://api.weleakinfo.com/v3/public/{type}/{asset['asset']}"

    response = requests.request("GET", url, headers=headers, params=querystring)
    print(f"weleak status: {response.status_code}")
    json = response.json()
    print(f"weleak json: {json}")
    if json["Success"] == "true":
        data = json["Data"]
        print(f"weleak data: {data}")
        return data
    else:
        print(f"Failed to acquire info about {asset['asset']} on weleak")
    return {}
