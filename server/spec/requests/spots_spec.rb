require "rails_helper"

RSpec.describe "Spots", type: :request do
  describe "GET /spots" do
    it "returns only approved spots" do
      approved = create(:parking_spot, :approved)
      pending_spot = create(:parking_spot)

      get "/spots"

      expect(response).to have_http_status(:ok)
      ids = response.parsed_body.map { |s| s["id"] }
      expect(ids).to include(approved.id)
      expect(ids).not_to include(pending_spot.id)
    end
  end

  describe "POST /spots" do
    it "creates a pending spot with valid params" do
      expect {
        post "/spots", params: {
          parking_spot: {
            lat: 37.7760,
            lng: -122.4200,
            description: "New spot by the library",
            paid: false
          }
        }
      }.to change(ParkingSpot, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(ParkingSpot.last.status).to eq("pending")
    end

    it "returns 422 with invalid params" do
      post "/spots", params: { parking_spot: { lat: 37.7760 } }

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"]).to be_present
    end
  end
end
