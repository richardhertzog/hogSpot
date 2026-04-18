class ParkingSpot < ApplicationRecord
  enum :status, { pending: 0, approved: 1, rejected: 2 }, default: :pending

  has_one_attached :photo

  validates :lat, :lng, :description, presence: true
  validates :hours, presence: true, if: :paid?
end
