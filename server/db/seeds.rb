ParkingSpot.find_or_create_by!(address: "Civic Center Plaza, San Francisco, CA") do |spot|
  spot.lat         = 37.7793
  spot.lng         = -122.4193
  spot.paid        = false
  spot.description = "Good motorcycle parking near the main entrance"
  spot.notes       = "No parking 7–9am Tue/Fri street sweeping"
  spot.status      = :approved
end

ParkingSpot.find_or_create_by!(address: "5th St & Mission St, San Francisco, CA") do |spot|
  spot.lat         = 37.7836
  spot.lng         = -122.4033
  spot.paid        = true
  spot.hours       = "7am–6pm Mon–Sat"
  spot.description = "Metered motorcycle parking on 5th St"
  spot.notes       = "2 hour limit"
  spot.status      = :approved
end
