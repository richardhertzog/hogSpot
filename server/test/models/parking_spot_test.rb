require "test_helper"

class ParkingSpotTest < ActiveSupport::TestCase
  def valid_attributes
    { lat: 37.7749, lng: -122.4194, description: "Behind the Safeway", paid: false }
  end

  test "valid with required fields" do
    spot = ParkingSpot.new(valid_attributes)
    assert spot.valid?
  end

  test "invalid without lat" do
    spot = ParkingSpot.new(valid_attributes.except(:lat))
    assert_not spot.valid?
    assert_includes spot.errors[:lat], "can't be blank"
  end

  test "invalid without lng" do
    spot = ParkingSpot.new(valid_attributes.except(:lng))
    assert_not spot.valid?
    assert_includes spot.errors[:lng], "can't be blank"
  end

  test "invalid without description" do
    spot = ParkingSpot.new(valid_attributes.except(:description))
    assert_not spot.valid?
    assert_includes spot.errors[:description], "can't be blank"
  end

  test "invalid when paid but hours blank" do
    spot = ParkingSpot.new(valid_attributes.merge(paid: true, hours: nil))
    assert_not spot.valid?
    assert_includes spot.errors[:hours], "can't be blank"
  end

  test "valid when paid and hours present" do
    spot = ParkingSpot.new(valid_attributes.merge(paid: true, hours: "9am-6pm Mon-Sat"))
    assert spot.valid?
  end

  test "defaults to pending status" do
    spot = ParkingSpot.new
    assert_equal "pending", spot.status
  end
end
