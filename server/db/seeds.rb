ParkingSpot.find_or_create_by!(address: "Civic Center Plaza, San Francisco, CA") do |spot|
  spot.lat         = 37.7793
  spot.lng         = -122.4193
  spot.paid        = false
  spot.description = "Good motorcycle parking near the main entrance"
  spot.notes       = "No parking 7–9am Tue/Fri street sweeping"
  spot.status      = :approved
end
