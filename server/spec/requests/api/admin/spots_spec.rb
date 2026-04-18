require "rails_helper"

RSpec.describe "Api::Admin::Spots", type: :request do
  let(:admin) { create(:admin, password: "password") }

  def login
    post "/api/admin/session", params: { email: admin.email, password: "password" }
  end

  describe "GET /api/admin/spots" do
    it "returns 401 when not authenticated" do
      get "/api/admin/spots"
      expect(response).to have_http_status(:unauthorized)
    end

    it "returns only pending spots when authenticated" do
      pending_spot = create(:parking_spot)
      approved_spot = create(:parking_spot, :approved)

      login
      get "/api/admin/spots"

      expect(response).to have_http_status(:ok)
      ids = response.parsed_body.map { |s| s["id"] }
      expect(ids).to include(pending_spot.id)
      expect(ids).not_to include(approved_spot.id)
    end
  end

  describe "PATCH /api/admin/spots/:id" do
    it "returns 401 when not authenticated" do
      spot = create(:parking_spot)
      patch "/api/admin/spots/#{spot.id}", params: { parking_spot: { status: "approved" } }
      expect(response).to have_http_status(:unauthorized)
    end

    it "approves a spot" do
      spot = create(:parking_spot)

      login
      patch "/api/admin/spots/#{spot.id}", params: { parking_spot: { status: "approved" } }

      expect(response).to have_http_status(:ok)
      expect(spot.reload.status).to eq("approved")
    end

    it "rejects a spot" do
      spot = create(:parking_spot)

      login
      patch "/api/admin/spots/#{spot.id}", params: { parking_spot: { status: "rejected" } }

      expect(response).to have_http_status(:ok)
      expect(spot.reload.status).to eq("rejected")
    end

    it "updates spot fields" do
      spot = create(:parking_spot, description: "Old description")

      login
      patch "/api/admin/spots/#{spot.id}", params: { parking_spot: { description: "Updated description" } }

      expect(response).to have_http_status(:ok)
      expect(spot.reload.description).to eq("Updated description")
    end

    it "returns 422 when update is invalid" do
      spot = create(:parking_spot)

      login
      patch "/api/admin/spots/#{spot.id}", params: { parking_spot: { description: "" } }

      expect(response).to have_http_status(:unprocessable_content)
      expect(response.parsed_body["errors"]).to be_present
    end
  end

  describe "DELETE /api/admin/spots/:id" do
    it "returns 401 when not authenticated" do
      spot = create(:parking_spot)
      delete "/api/admin/spots/#{spot.id}"
      expect(response).to have_http_status(:unauthorized)
    end

    it "deletes the spot" do
      spot = create(:parking_spot)

      login
      expect {
        delete "/api/admin/spots/#{spot.id}"
      }.to change(ParkingSpot, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
