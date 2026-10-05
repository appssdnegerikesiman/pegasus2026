export const counted = (event, place) => event.medalsConfirmed === true || (Number.isInteger(event.participants) && event.participants >= place + 2);
export function normalize(raw, schools) {
  const known = new Set(schools.map(s => s.id)), unique = new Map();
  for (const event of Array.isArray(raw.results) ? raw.results : []) {
    if (!event || typeof event.sport !== 'string' || typeof event.category !== 'string' || !['perorangan','beregu'].includes(event.type)) continue;
    const key = `${event.sport.trim().toLowerCase()}|${event.category.trim().toLowerCase()}`;
    const winners = [], places = new Set();
    for (const winner of Array.isArray(event.winners) ? event.winners : []) {
      if (!winner || !known.has(winner.schoolId) || ![1,2,3].includes(winner.place) || places.has(winner.place)) continue;
      places.add(winner.place); winners.push(winner);
    }
    const clean = {...event, winners, participants: Number.isInteger(event.participants) && event.participants >= 0 ? event.participants : null};
    if (!unique.has(key) || (Date.parse(clean.updatedAt) || 0) >= (Date.parse(unique.get(key).updatedAt) || 0)) unique.set(key, clean);
  }
  return [...unique.values()].sort((a,b) => (Date.parse(b.updatedAt)||0)-(Date.parse(a.updatedAt)||0));
}
export function standings(events, schools) {
  const rows = schools.map(s => ({...s, medals:[0,0,0], total:0, rank:null}));
  const byId = new Map(rows.map(s => [s.id,s]));
  for (const event of events) for (const w of event.winners) if (counted(event,w.place)) { const s=byId.get(w.schoolId); if(s) {s.medals[w.place-1]++;s.total++;} }
  rows.sort((a,b) => b.medals[0]-a.medals[0] || b.medals[1]-a.medals[1] || b.medals[2]-a.medals[2] || a.name.localeCompare(b.name,'id'));
  rows.forEach((s,i) => {if(s.total) s.rank = i && s.medals.every((n,j)=>n===rows[i-1].medals[j]) ? rows[i-1].rank : i+1;});
  return rows;
}
