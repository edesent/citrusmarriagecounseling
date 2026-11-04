import json, math, sys
S=sys.argv[1]; OUT=sys.argv[2]
county=json.load(open(f"{S}/citrus.geojson"))["features"][0]["geometry"]
water=json.load(open(f"{S}/water.geojson"))["features"]
routes=json.load(open(f"{S}/routes.json"))
def rings(geom):
    if geom["type"]=="Polygon": return geom["coordinates"]
    return [r for p in geom["coordinates"] for r in p]
crings=rings(county)
lons=[p[0] for r in crings for p in r]; lats=[p[1] for r in crings for p in r]
minx,maxx,miny,maxy=min(lons),max(lons),min(lats),max(lats)
pad=0.01; minx-=pad; maxx+=pad; miny-=pad; maxy+=pad
# The county line runs nine miles out into the Gulf; start the map just off the coast.
minx=max(minx,-82.78)
k=math.cos(math.radians((miny+maxy)/2))
W=1000; H=round(W*(maxy-miny)/((maxx-minx)*k))
def P(lon,lat): return ((lon-minx)*k/((maxx-minx)*k)*W, (maxy-lat)/(maxy-miny)*H)
def rdp(pts,eps):
    if len(pts)<3: return pts
    a,b=pts[0],pts[-1]; dx,dy=b[0]-a[0],b[1]-a[1]; L=math.hypot(dx,dy) or 1e-9
    i,dm=0,0
    for j in range(1,len(pts)-1):
        d=abs(dy*pts[j][0]-dx*pts[j][1]+b[0]*a[1]-b[1]*a[0])/L
        if d>dm: i,dm=j,d
    if dm>eps: return rdp(pts[:i+1],eps)[:-1]+rdp(pts[i:],eps)
    return [a,b]
def path(rs,eps=1.2):
    out=[]
    for r in rs:
        q=[P(*p) for p in r]
        if q[0]==q[-1]: q=q[:-1]
        if len(q)<3: continue
        m=len(q)//2  # a closed ring has no chord, so simplify each half
        pts=rdp(q[:m+1],eps)[:-1]+rdp(q[m:]+[q[0]],eps)[:-1]
        if len(pts)<3: continue
        out.append("M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in pts)+"Z")
    return "".join(out)
cd=path(crings,1.0)
wd=path([r for f in water for r in rings(f["geometry"])],2.2)
pts={}
for name,v in routes["places"].items():
    x,y=P(v["lon"],v["lat"]); pts[name]=[round(x,1),round(y,1)]
cl=routes["church"]; cx,cy=P(cl[1],cl[0])
ts=f"""// Generated from Census TIGERweb (Citrus County boundary + large water areas) and
// OpenStreetMap place points. Regenerate with the script described in the README.
export const MAP = {{
  width: {W},
  height: {H},
  county: "{cd}",
  water: "{wd}",
  church: [{cx:.1f}, {cy:.1f}] as const,
  places: {json.dumps(pts)} as Record<string, [number, number]>,
}};
"""
open(OUT,"w").write(ts); print(W,H,len(cd),len(wd))
