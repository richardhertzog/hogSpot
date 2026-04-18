require "rails_helper"

RSpec.describe Admin, type: :model do
  it "authenticates with correct password" do
    admin = create(:admin, password: "password")
    expect(admin.authenticate("password")).to eq(admin)
  end

  it "does not authenticate with wrong password" do
    admin = create(:admin, password: "password")
    expect(admin.authenticate("wrong")).to be_falsey
  end

  it "is invalid without email" do
    expect(build(:admin, email: nil)).not_to be_valid
  end

  it "is invalid with a duplicate email" do
    create(:admin, email: "taken@example.com")
    expect(build(:admin, email: "taken@example.com")).not_to be_valid
  end
end
