require "rails_helper"

RSpec.describe "Api::Admin::Sessions", type: :request do
  let(:admin) { create(:admin, password: "password") }

  describe "POST /api/admin/session" do
    it "sets session on correct credentials" do
      post "/api/admin/session", params: { email: admin.email, password: "password" }

      expect(response).to have_http_status(:ok)
    end

    it "returns 401 on wrong password" do
      post "/api/admin/session", params: { email: admin.email, password: "wrong" }

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns 401 on unknown email" do
      post "/api/admin/session", params: { email: "nobody@example.com", password: "password" }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /api/admin/session" do
    it "clears the session and returns 204" do
      post "/api/admin/session", params: { email: admin.email, password: "password" }
      delete "/api/admin/session"

      expect(response).to have_http_status(:no_content)
    end
  end
end
