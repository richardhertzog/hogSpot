require "test_helper"

class Api::Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "login with correct credentials sets session" do
    post "/api/admin/session", params: { email: "richard@example.com", password: "password" }
    assert_response :success
    assert session[:admin_id].present?
  end

  test "login with bad credentials returns 401" do
    post "/api/admin/session", params: { email: "richard@example.com", password: "wrong" }
    assert_response :unauthorized
  end

  test "logout clears session" do
    post "/api/admin/session", params: { email: "richard@example.com", password: "password" }
    delete "/api/admin/session"
    assert_response :no_content
    assert_nil session[:admin_id]
  end

  test "login with unknown email returns 401" do
    post "/api/admin/session", params: { email: "nobody@example.com", password: "password" }
    assert_response :unauthorized
  end
end
