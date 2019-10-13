import hibpwned
from time import sleep

api_key = "ed12a2303fe74ced8cf5b040b2fa56b6"


def scan_email(asset: dict):
    sis = hibpwned.Pwned(asset["asset"], 'Hackathon 2019 SIS', api_key)

    breaches = sis.searchAllBreaches()
    # print(breaches)
    sleep(0.7)
    pastes = sis.searchPastes()
    # print(pastes)
    # myBreaches = myApp.searchAllBreaches()
    # Breaches = myApp.allBreaches()
    # adobe = myApp.singleBreach('adobe')
    # data = myApp.dataClasses()
    # myPastes = myApp.searchPastes()
    # password = myApp.searchPassword('BadPassword')
    # myHashes = myApp.searchHashes('21BD1')
    print(f"breaches: {breaches}")
    print(f"pastes: {pastes}")
    return {
        "breaches": breaches,
        "pastes": pastes
    }
