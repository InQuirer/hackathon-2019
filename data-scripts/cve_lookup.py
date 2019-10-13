import requests

url = "https://cve.circl.lu/api/cve/"


def cve_lookup(vuln: str):
    response = requests.get(url + vuln)
    if response:
        result = response.json()
        return result["cvss"]
    return ""


def total_risk(vulns: list):
    result = 1
    for vuln in vulns:
        risk = float(cve_lookup(vuln))
        result += risk ** 0.25
    result /= len(vulns)
    result = round(result ** (1/0.25), 1)
    print(result)
    return result
