-- Update coordinates column to store GeoJSON polygons for accurate region boundaries
-- The coordinates will now store proper boundary polygons instead of just center points

-- Update Southeast Alaska region with accurate boundary
UPDATE regions 
SET coordinates = '{
  "type": "Polygon",
  "coordinates": [[
    [-130.0, 54.5], [-130.0, 60.0], [-135.0, 60.0], 
    [-137.5, 59.0], [-138.5, 58.5], [-138.0, 57.5], 
    [-137.0, 57.0], [-136.0, 56.5], [-135.5, 56.0],
    [-135.0, 55.5], [-134.5, 55.0], [-133.5, 54.8],
    [-132.5, 54.6], [-131.0, 54.5], [-130.0, 54.5]
  ]]
}'::jsonb
WHERE slug = 'southeast';

-- Update Southcentral Alaska region
UPDATE regions 
SET coordinates = '{
  "type": "Polygon",
  "coordinates": [[
    [-154.0, 59.0], [-154.0, 63.0], [-149.0, 63.5],
    [-146.0, 63.0], [-145.0, 62.5], [-144.0, 62.0],
    [-143.0, 61.5], [-142.0, 61.0], [-141.0, 60.5],
    [-141.0, 59.5], [-142.0, 59.0], [-144.0, 58.5],
    [-146.0, 58.5], [-148.0, 58.5], [-150.0, 58.5],
    [-152.0, 58.5], [-154.0, 59.0]
  ]]
}'::jsonb
WHERE slug = 'southcentral';

-- Update Interior Alaska region
UPDATE regions 
SET coordinates = '{
  "type": "Polygon",
  "coordinates": [[
    [-164.0, 63.0], [-164.0, 68.0], [-162.0, 68.5],
    [-158.0, 69.0], [-154.0, 69.0], [-150.0, 68.5],
    [-146.0, 68.0], [-142.0, 67.5], [-141.0, 67.0],
    [-141.0, 63.5], [-143.0, 63.5], [-145.0, 63.5],
    [-147.0, 63.5], [-150.0, 63.5], [-154.0, 63.5],
    [-158.0, 63.5], [-162.0, 63.5], [-164.0, 63.0]
  ]]
}'::jsonb
WHERE slug = 'interior';

-- Update Southwest Alaska region  
UPDATE regions 
SET coordinates = '{
  "type": "Polygon",
  "coordinates": [[
    [-170.0, 55.0], [-170.0, 62.0], [-165.0, 63.0],
    [-162.0, 63.0], [-159.0, 62.5], [-157.0, 62.0],
    [-155.5, 61.5], [-154.5, 60.5], [-154.0, 59.5],
    [-154.0, 58.5], [-155.0, 57.5], [-157.0, 56.5],
    [-159.0, 56.0], [-162.0, 55.5], [-165.0, 55.0],
    [-168.0, 55.0], [-170.0, 55.0]
  ]]
}'::jsonb
WHERE slug = 'southwest';

-- Update Northern Alaska region
UPDATE regions 
SET coordinates = '{
  "type": "Polygon",
  "coordinates": [[
    [-156.0, 68.0], [-156.0, 71.5], [-154.0, 71.5],
    [-150.0, 71.5], [-146.0, 71.5], [-142.0, 71.0],
    [-141.0, 70.5], [-141.0, 68.5], [-141.0, 67.5],
    [-143.0, 67.5], [-146.0, 68.0], [-150.0, 68.5],
    [-154.0, 68.5], [-156.0, 68.0]
  ]]
}'::jsonb
WHERE slug = 'northern';

-- Statewide doesn't need a boundary polygon
UPDATE regions 
SET coordinates = '{
  "type": "Point",
  "coordinates": [-152.0, 64.0]
}'::jsonb
WHERE slug = 'statewide';