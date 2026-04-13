require "test_helper"

class SpotsControllerTest < ActionDispatch::IntegrationTest
  test "GET /spots returns only approved spots" do
    get "/spots"
    assert_response :success
    ids = JSON.parse(response.body).map { |s| s["id"] }
    assert_includes ids, parking_spots(:approved_free).id
    assert_includes ids, parking_spots(:approved_paid).id
    assert_not_includes ids, parking_spots(:pending_spot).id
  end

  test "POST /spots creates a pending spot with valid params" do
    assert_difference "ParkingSpot.count", 1 do
      post "/spots", params: {
        parking_spot: {
          lat: 37.7760,
          lng: -122.4200,
          description: "New spot by the library",
          paid: false
        }
      }
    end
    assert_response :created
    assert_equal "pending", ParkingSpot.last.status
  end

  test "POST /spots returns 422 with invalid params" do
    post "/spots", params: { parking_spot: { lat: 37.7760 } }
    assert_response :unprocessable_entity
    body = JSON.parse(response.body)
    assert body["errors"].any?
  end
end
