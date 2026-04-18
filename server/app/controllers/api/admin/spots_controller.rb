class Api::Admin::SpotsController < ApplicationController
  include AdminAuthenticated

  def index
    spots = ParkingSpot.pending
    render json: spots
  end

  def update
    spot = ParkingSpot.find(params[:id])
    if spot.update(spot_params)
      render json: spot
    else
      render json: { errors: spot.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    ParkingSpot.find(params[:id]).destroy
    head :no_content
  end

  private

  def spot_params
    params.expect(parking_spot: [ :lat, :lng, :paid, :hours, :description, :notes, :address, :status ])
  end
end
