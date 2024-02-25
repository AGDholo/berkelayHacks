import http.client
from fastapi import FastAPI
import http.client

conn = http.client.HTTPSConnection("hcb.hackclub.com")

headers = { 'Accept': "application/json" }

conn.request("GET", "/api/v3/organizations/hq/card_charges?page=1&per_page=20", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))