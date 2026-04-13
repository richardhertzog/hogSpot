class SpotsController < ApplicationController
  def index
    spots = ParkingSpot.approved
    render json: spots
  end

  def create
    spot = ParkingSpot.new(spot_params)
    if spot.save
      render json: spot, status: :created
    else
      render json: { errors: spot.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def spot_params
    params.expect(parking_spot: [ :lat, :lng, :paid, :hours, :description, :notes, :address, :submitter_name, :submitter_email ])
  end
end
