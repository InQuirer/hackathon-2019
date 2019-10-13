import requests

url = "https://cve.circl.lu/api/cve/"


def cve_lookup(vuln: dict):
    response = requests.get(url + vuln["cve_name"])
    if response:
        result = response.json()
        return result["cvss"]
    return ""
