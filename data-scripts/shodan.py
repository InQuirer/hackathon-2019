import shodan
import sys

SHODAN_API_KEY = "2IiRx62xCK1DD75iPstCDpxaTmS1YqQj"

api = shodan.Shodan(SHODAN_API_KEY)
search_type = sys.argv[1]
search_term = sys.argv[2]

results = {}

# Input validation
if len(sys.argv) != 3:
        print(f"""Usage: shodan search_type search_term
        search_type: [search, host, etc..]
        search_term: anything
        """)
        sys.exit(1)

# Wrap the request in a try/ except block to catch errors
try:

    if search_type == "search":
        results = api.search(search_term)
    elif search_type == "host":
        results = api.host(search_term)

    # Show the results
    if "total" in results:
        print(f"Results found: {results['total']}")

    for result in results["matches"]:
        print(f"IP: {result['ip_str']}")
        print(result["data"])
        print("")

    print("\n" * 10)
    print(results)

except shodan.APIError as e:
    print(f"Error: {e}")
