# import sys
import shodan
import os
import requests
from datetime import datetime

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

url = "http://getsec.eu:8000/api/v1/"


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


def scan_ip(search_type: str, search_term: str):
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
            result = api.host(search_term)
            if "vulns" in result:
                scan = {
                    "timestamp": datetime.now(),
                    "last_shodan_update": result["last_update"]
                }
                requests.post(url + "shodan_scans", json=scan)

                for vuln in result["vulns"]:
                    requests.post(url + "shodan_vulns", json={
                        "scan": scan,
                        "cve_name": vuln
                    })
                for port in result["ports"]:
                    requests.post(url + "shodan_ports", json={
                        "scan": scan,
                        "port": port
                    })

    except Exception as e:
        print(e)
    return {}
