import hibpwned
# import sys
# import os

# # Input validation
# if len(sys.argv) != 2:
#     print(f"""Usage: hibpwned_data.py email""")
#     sys.exit(1)

api_key = "ed12a2303fe74ced8cf5b040b2fa56b6"
print(api_key)


def scan_email(email: str):
    sis = hibpwned.Pwned(email, 'Hackathon 2019 SIS', api_key)

    breaches = sis.searchAllBreaches()
    print(breaches)
    pastes = sis.searchPastes()
    print(pastes)
    # myBreaches = myApp.searchAllBreaches()
    # Breaches = myApp.allBreaches()
    # adobe = myApp.singleBreach('adobe')
    # data = myApp.dataClasses()
    # myPastes = myApp.searchPastes()
    # password = myApp.searchPassword('BadPassword')
    # myHashes = myApp.searchHashes('21BD1')
    return {
        "breaches": breaches,
        "pastes": pastes
    }
