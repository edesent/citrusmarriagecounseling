import json, time, urllib.request, urllib.parse
UA={"User-Agent":"citrusmarriagecounseling-site-build/1.0 (elimark1611@gmail.com)"}
def get(url):
    req=urllib.request.Request(url,headers=UA)
    return json.load(urllib.request.urlopen(req,timeout=30))
def geo(q):
    r=get("https://nominatim.openstreetmap.org/search?"+urllib.parse.urlencode({"q":q,"format":"json","limit":1,"countrycodes":"us"}))
    time.sleep(1.2)
    return (float(r[0]["lat"]),float(r[0]["lon"]),r[0]["display_name"]) if r else None
church=geo("2289 North McGee Drive, Hernando, Florida") or geo("N McGee Dr, Hernando, Citrus County, Florida")
print("CHURCH",church)
places=["Inverness","Inverness Highlands North","Inverness Highlands South","Floral City","Pineola","Hernando","Citrus Hills","Beverly Hills","Lecanto","Black Diamond","Pine Ridge","Citrus Springs","Holder","Crystal River","Meadowcrest","Red Level","Homosassa","Homosassa Springs","Chassahowitzka","Sugarmill Woods"]
out={}
for p in places:
    g=geo(f"{p}, Citrus County, Florida")
    if not g: print("NOGEO",p); continue
    url=f"https://router.project-osrm.org/route/v1/driving/{g[1]},{g[0]};{church[1]},{church[0]}?overview=false&steps=true"
    try:
        r=get(url)["routes"][0]
    except Exception as e:
        print("NOROUTE",p,e); continue
    roads={}
    for leg in r["legs"]:
        for s in leg["steps"]:
            n=(s.get("ref") or s.get("name") or "").strip()
            if n: roads[n]=roads.get(n,0)+s["distance"]
    top=sorted(roads.items(),key=lambda x:-x[1])[:4]
    out[p]={"lat":g[0],"lon":g[1],"miles":round(r["distance"]/1609.34,1),"minutes":round(r["duration"]/60),"roads":[(n,round(d/1609.34,1)) for n,d in top],"osm":g[2]}
    print(p,out[p]["miles"],"mi",out[p]["minutes"],"min",out[p]["roads"],"|",g[2][:70])
    time.sleep(0.5)
json.dump({"church":church,"places":out},open("routes.json","w"),indent=1)
