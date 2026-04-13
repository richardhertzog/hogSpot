require "test_helper"

class AdminTest < ActiveSupport::TestCase
  test "authenticates with correct password" do
    admin = admins(:richard)
    assert admin.authenticate("password")
  end

  test "does not authenticate with wrong password" do
    admin = admins(:richard)
    assert_not admin.authenticate("wrong")
  end

  test "invalid without email" do
    admin = Admin.new(password: "password")
    assert_not admin.valid?
    assert_includes admin.errors[:email], "can't be blank"
  end

  test "invalid with duplicate email" do
    admin = Admin.new(email: "richard@example.com", password: "password")
    assert_not admin.valid?
    assert_includes admin.errors[:email], "has already been taken"
  end
end
