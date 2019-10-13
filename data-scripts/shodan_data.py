# import sys
import socket
from datetime import datetime

import requests
import shodan

import cve_lookup
import send_email

# Input validation
# if len(sys.argv) != 3:
#     print(f"""Usage: shodan_data.py search_type search_term
#     search_type: [search, host, etc..]
#     search_term: anything
#     """)
#     sys.exit(1)

api_key = "2IiRx62xCK1DD75iPstCDpxaTmS1YqQj"

api = shodan.Shodan(api_key)
# search_type = sys.argv[1]
# search_term = sys.argv[2]

url = "https://getsec.eu/api/v1/"
url_contacts = "https://getsec.eu/api/v1/asset_processes_contacts/"


# def _compare_scans(old_scan, new_scan):
#     patched_vulns = [vuln for vuln in old_scan["vulns"] if vuln not in new_scan["vulns"]]
#     new_vulns = [vuln for vuln in new_scan["vulns"] if vuln not in old_scan["vulns"]]
#     old_ports = [port for port in old_scan["ports"] if port not in new_scan["ports"]]
#     new_ports = [port for port in new_scan["ports"] if port not in old_scan["ports"]]
#
#     return {
#         "something_changed": patched_vulns != new_vulns or old_ports != new_ports,
#         "diff": {
#             "patched_vulns": patched_vulns,
#             "new_vulns": new_vulns,
#             "old_ports": old_ports,
#             "new_ports": new_ports
#         }
#     }


def scan_ip(search_type: str, asset: dict):
    # Wrap the request in a try/ except block to catch errors
    try:
        results = {}
        if search_type == "search":
            pass
            # results = api.search(search_term)
            # # Show the results
            # if "total" in results:
            #     print(f"Results found: {results['total']}")
            #
            # if "matches" in results:
            #     for result in results["matches"]:
            #         print(f"IP: {result['ip_str']}")
            #         print(result["data"])
            #         print("")
            #
            # print("\n" * 10)
            # print(results)
            #
            # new_scan = {
            #     "last_update": results["last_update"],
            #     "vulns": results["vulns"],
            #     "ports": results["ports"]
            # }
            # last_scan_response = requests.get(url + "last_scan")
            # last_scan = last_scan_response.content
            #
            # if last_scan_response:
            #     if last_scan["last_update"] != results["last_update"]:
            #         # no scans currently in database or Shodan did a new scan
            #         new_scan_response = requests.post(url + "shodan_scan", json=new_scan)
            #         if new_scan_response:
            #             # Starting to compare scans
            #             # comparison = _compare_scans(last_scan, new_scan)
            #             # return comparison["something_changed"]
            #             return new_scan
            #         else:
            #             print("Failed to save new scan to database")
            # else:
            #     print("Failed to retrieve last scan data")
        elif search_type == "host":
            ip = asset["asset"]
            if asset["type"] == 2:
                ip = socket.gethostbyname(ip)
            print(f"\"{ip}\"")
            result = api.host(ip, minify=True)
            db_last_shodans = requests.get(url + "shodan_scans/?limit=1").json()["results"]
            if not (len(db_last_shodans) > 0 and result["last_update"] == db_last_shodans[0]["last_shodan_update"]):
                if "vulns" in result:
                    scan = {
                        "timestamp": datetime.now().ctime(),
                        "asset": asset["id"],
                        "last_shodan_update": result["last_update"]
                    }
                    response = requests.post(url + "shodan_scans/", json=scan, auth=("admin", "garage48password"))
                    print(response.text)
                    scan_id = response.json()["id"]
                    print(f"Scan: {scan}")
                    # print(requests.get(url + "shodan_scans", auth=("admin", "viensviens")).json())

                    vulns = result["vulns"]
                    ports = result["ports"]
                    print(f"vulns: {vulns}")
                    print(f"ports: {ports}")
                    for vuln in vulns:
                        requests.post(url + "shodan_vulns/", json={
                            "scan": scan_id,
                            "cve_name": vuln
                        }, auth=("admin", "garage48password"))
                    for port in ports:
                        requests.post(url + "shodan_ports/", json={
                            "scan": scan_id,
                            "port": port
                        }, auth=("admin", "garage48password"))

                    print("making intel")
                    intel = {
                        "asset": asset["id"],
                        "scan": scan_id,
                        "type": type,
                        "message": f"We have intelligence about some serious security risks in your company systems. We have identified {len(vulns) + len(ports)} serious threats that hackers can use to compromise your business.",
                        "risk": cve_lookup.total_risk(vulns)
                    }
                    print("intel made")
                    recipient = requests.get(url_contacts + str(asset["id"])).json()
                    print(f"recipient: {recipient}")
                    # TODO save intel to database

                    data = {
                        "subject": "Vulnerabilities detected",
                        "body": f"<h3>{intel['message']}</h3>"
                    }
                    send_email.send_email(recipient, data)
                    print(f"sending {data}")
                    print("email sent")

            else:
                print("No new update from Shodan")

    except Exception as e:
        print(e)
    return {}
