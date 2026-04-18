require "rails_helper"

RSpec.describe ParkingSpot, type: :model do
  it "is valid with required fields" do
    expect(build(:parking_spot)).to be_valid
  end

  it "is invalid without lat" do
    expect(build(:parking_spot, lat: nil)).not_to be_valid
  end

  it "is invalid without lng" do
    expect(build(:parking_spot, lng: nil)).not_to be_valid
  end

  it "is invalid without description" do
    expect(build(:parking_spot, description: nil)).not_to be_valid
  end

  it "is invalid when paid but hours is blank" do
    expect(build(:parking_spot, :paid, hours: nil)).not_to be_valid
  end

  it "is valid when paid and hours is present" do
    expect(build(:parking_spot, :paid)).to be_valid
  end

  it "defaults to pending status" do
    expect(ParkingSpot.new.status).to eq("pending")
  end
end
